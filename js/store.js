/**
 * DREAM CART BD — REACTIVE GLOBAL STORE
 * Handles Cart, Wishlist, Authentication (Customer, Wholesaler, Admin Roles with SessionStorage), Theme
 */
const STORE = {
  safeSet(key, value) {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (e) {
      console.warn(`[Storage Safe Notice] Could not write ${key} to localStorage:`, e);
    }
  },
  safeGet(key, defaultVal = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? raw : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  },

  // Cart Management
  cart: {
    items: JSON.parse(localStorage.getItem('dcbd_cart') || '[]'),
    
    save() {
      STORE.safeSet('dcbd_cart', this.items);
      STORE.emit('cart_updated', this.items);
      const flCart = document.getElementById('floating-cart-count');
      if (flCart) flCart.textContent = this.getCount();
      const navCart = document.getElementById('nav-cart-count');
      if (navCart) navCart.textContent = this.getCount();
    },

    addItem(product, qty = 1, isWholesale = false) {
      const price = isWholesale ? (product.wholesalePrice || product.sellingPrice) : product.sellingPrice;
      const existing = this.items.find(i => i.sku === product.sku);
      if (existing) {
        existing.quantity += qty;
      } else {
        this.items.push({
          id: product.id || product.sku,
          sku: product.sku,
          name: product.name,
          category: product.category,
          price: price,
          originalPrice: product.originalPrice,
          image: product.primaryImage || product.image || (product.images && product.images[0]) || CONFIG.fallbackLogoUrl,
          quantity: qty,
          isWholesale: isWholesale,
          minOrderQ: product.minOrderQ || 1,
          selectedColor: product.selectedColor || 'Default',
          selectedSize: product.selectedSize || 'Standard'
        });
      }
      this.save();
      STORE.toast('success', 'কার্টে যুক্ত করা হয়েছে!', product.name);
    },

    updateQty(sku, delta) {
      const item = this.items.find(i => i.sku === sku);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.items = this.items.filter(i => i.sku !== sku);
        }
        this.save();
      }
    },

    removeItem(sku) {
      this.items = this.items.filter(i => i.sku !== sku);
      this.save();
      STORE.toast('info', 'কার্ট থেকে সরানো হয়েছে');
    },

    clear() {
      this.items = [];
      this.save();
    },

    getCount() {
      return this.items.reduce((s, i) => s + i.quantity, 0);
    },

    getSubtotal() {
      return this.items.reduce((s, i) => s + (i.price * i.quantity), 0);
    }
  },

  // Favorites / Wishlist Management
  wishlist: {
    items: JSON.parse(localStorage.getItem('dcbd_wishlist') || '[]'),

    save() {
      STORE.safeSet('dcbd_wishlist', this.items);
      STORE.emit('wishlist_updated', this.items);
      const navWish = document.getElementById('nav-wishlist-count');
      if (navWish) {
        navWish.textContent = this.items.length;
        navWish.classList.toggle('d-none', this.items.length === 0);
      }
    },

    toggle(product) {
      const sku = typeof product === 'string' ? product : product.sku;
      const exists = this.items.some(p => (typeof p === 'string' ? p : p.sku) === sku);
      if (exists) {
        this.items = this.items.filter(p => (typeof p === 'string' ? p : p.sku) !== sku);
        STORE.toast('info', 'ফেভরিট তালিকা থেকে সরানো হয়েছে');
      } else {
        this.items.push(typeof product === 'string' ? { sku: product } : product);
        STORE.toast('success', 'ফেভরিটে যুক্ত করা হয়েছে!', product.name || sku);
      }
      this.save();
    },

    has(sku) {
      return this.items.some(p => (typeof p === 'string' ? p : p.sku) === sku);
    }
  },

  // Authentication State
  // Requirement 17: Admin authentication uses sessionStorage so closing the tab automatically logs out!
  auth: {
    customer: JSON.parse(localStorage.getItem('dcbd_customer_session') || 'null'),
    wholesaler: JSON.parse(localStorage.getItem('dcbd_wholesaler_session') || 'null'),
    admin: JSON.parse(sessionStorage.getItem('dcbd_admin_session') || 'null'),

    loginCustomer(data) {
      this.customer = data;
      STORE.safeSet('dcbd_customer_session', data);
      STORE.emit('auth_changed', { type: 'customer', user: data });
    },

    logoutCustomer() {
      this.customer = null;
      localStorage.removeItem('dcbd_customer_session');
      STORE.emit('auth_changed', { type: 'customer', user: null });
      STORE.toast('info', 'কাস্টমার লগআউট সফল হয়েছে');
    },

    loginWholesaler(data) {
      this.wholesaler = data;
      STORE.safeSet('dcbd_wholesaler_session', data);
      STORE.emit('auth_changed', { type: 'wholesaler', user: data });
    },

    logoutWholesaler() {
      this.wholesaler = null;
      localStorage.removeItem('dcbd_wholesaler_session');
      STORE.emit('auth_changed', { type: 'wholesaler', user: null });
      STORE.toast('info', 'হোলসেলার লগআউট সফল হয়েছে');
    },

    loginAdmin(data) {
      this.admin = data;
      sessionStorage.setItem('dcbd_admin_session', JSON.stringify(data));
      // Remove from localStorage to prevent persistent leaks
      localStorage.removeItem('dcbd_admin_session');
      STORE.emit('auth_changed', { type: 'admin', user: data });
    },

    logoutAdmin() {
      this.admin = null;
      sessionStorage.removeItem('dcbd_admin_session');
      localStorage.removeItem('dcbd_admin_session');
      STORE.emit('auth_changed', { type: 'admin', user: null });
      STORE.toast('info', 'এডমিন লগআউট সফল হয়েছে');
    },

    isLoggedInAdmin() {
      return Boolean(this.admin && sessionStorage.getItem('dcbd_admin_session'));
    }
  },

  // Theme Mode (Dark mode by default, high-contrast light mode support)
  theme: {
    current: localStorage.getItem('dcbd_theme') || CONFIG.defaultTheme,

    init() {
      document.documentElement.setAttribute('data-theme', this.current);
      if (this.current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    toggle() {
      this.current = this.current === 'dark' ? 'light' : 'dark';
      STORE.safeSet('dcbd_theme', this.current);
      this.init();
      STORE.emit('theme_changed', this.current);
    }
  },

  // Event Subscription System
  listeners: {},
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try { cb(data); } catch(e) { console.error(e); }
      });
    }
  },

  // Interactive Toast Notification
  toast(type, title, message = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = '99999';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    const borderColors = {
      success: 'border-emerald-500 text-emerald-400',
      error: 'border-rose-500 text-rose-400',
      info: 'border-sky-500 text-sky-400'
    };
    const icons = {
      success: '<i class="bi bi-check-circle-fill text-success fs-5"></i>',
      error: '<i class="bi bi-x-circle-fill text-danger fs-5"></i>',
      info: '<i class="bi bi-info-circle-fill text-info fs-5"></i>'
    };

    toastEl.className = `toast align-items-center show mb-2 border-0 shadow-lg ${type === 'success' ? 'bg-slate-900 border-start border-4 border-success' : (type === 'error' ? 'bg-slate-900 border-start border-4 border-danger' : 'bg-slate-900 border-start border-4 border-info')}`;
    toastEl.role = 'alert';
    toastEl.innerHTML = `
      <div class="d-flex p-2 align-items-center">
        <div class="p-2">${icons[type] || icons.info}</div>
        <div class="toast-body flex-grow-1 text-white">
          <div class="fw-bold fs-6">${title}</div>
          ${message ? `<div class="text-xs text-muted">${message}</div>` : ''}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.closest('.toast').remove()"></button>
      </div>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 400);
    }, 4000);
  }
};

window.STORE = STORE;
