/**
 * DREAM CART BD — REACTIVE GLOBAL STORE
 * Handles Cart, Wishlist, Authentication (Customer, Wholesaler, Admin Roles with SessionStorage), Theme
 */
const STORE = {
  // Safe Currency Formatter
  formatPrice(val) {
    const n = Number(val);
    return isNaN(n) ? '0' : n.toLocaleString('en-US');
  },
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
    items: (function() {
      try {
        const raw = JSON.parse(localStorage.getItem('dcbd_cart') || '[]');
        if (!Array.isArray(raw)) return [];
        return raw.filter(i => i && (i.sku || i.id)).map(i => {
          const rawPrice = i.price !== undefined ? i.price : (i.sellingPrice !== undefined ? i.sellingPrice : 0);
          const price = Number(rawPrice) || 0;
          const origPrice = Number(i.originalPrice || (price > 0 ? price * 1.2 : 0)) || price;
          return {
            id: i.id || i.sku,
            sku: i.sku || i.id,
            name: i.name || 'পণ্য',
            category: i.category || 'General',
            price: price,
            originalPrice: origPrice,
            image: i.image || i.primaryImage || (i.images && i.images[0]) || CONFIG.fallbackLogoUrl,
            quantity: Math.max(1, Number(i.quantity) || 1),
            isWholesale: !!i.isWholesale,
            minOrderQ: i.minOrderQ || 1,
            selectedColor: i.selectedColor || 'Default',
            selectedSize: i.selectedSize || 'Standard'
          };
        });
      } catch (e) {
        return [];
      }
    })(),
    
    save() {
      STORE.safeSet('dcbd_cart', this.items);
      STORE.emit('cart_updated', this.items);
      const count = this.getCount();
      const flCart = document.getElementById('floating-cart-count');
      if (flCart) flCart.textContent = count;
      const navCart = document.getElementById('nav-cart-count');
      if (navCart) navCart.textContent = count;
      const navCartMobile = document.getElementById('nav-cart-count-mobile');
      if (navCartMobile) navCartMobile.textContent = count;
    },

    addItem(product, qty = 1, isWholesale = false) {
      if (!product || (!product.sku && !product.id)) return;
      const sku = product.sku || product.id;
      const isWs = isWholesale || (typeof STORE !== 'undefined' && STORE.auth && STORE.auth.wholesaler !== null) || !!product.isWholesale;
      const rawPrice = isWs
        ? (product.wholesalePrice ?? product.sellingPrice ?? product.price ?? 0)
        : (product.sellingPrice ?? product.price ?? 0);
      const price = Number(rawPrice) || 0;
      const originalPrice = Number(product.originalPrice || (price > 0 ? price * 1.2 : 0)) || price;
      const quantity = Math.max(1, Number(qty) || 1);

      const selColor = product.selectedColor || product.color || 'Default';
      const selSize = product.selectedSize || product.size || 'Standard';
      const existing = this.items.find(i => i.sku === sku && i.selectedColor === selColor && i.selectedSize === selSize && i.isWholesale === isWs);
      if (existing) {
        existing.quantity += quantity;
        if (price > 0) existing.price = price;
      } else {
        this.items.push({
          id: product.id || sku,
          sku: sku,
          name: product.name || 'পণ্য',
          category: product.category || 'General',
          price: price,
          originalPrice: originalPrice,
          image: product.primaryImage || product.image || (product.images && product.images[0]) || CONFIG.fallbackLogoUrl,
          quantity: quantity,
          isWholesale: isWs,
          minOrderQ: product.minOrderQ || 1,
          selectedColor: selColor,
          selectedSize: selSize
        });
      }
      this.save();
      STORE.toast('success', 'কার্টে যুক্ত করা হয়েছে!', product.name || sku);
    },

    addBySku(sku, qty = 1, isWholesale = false) {
      if (!sku) return;
      let p = (window.API && typeof API.getProductBySku === 'function') ? API.getProductBySku(sku) : null;
      if (!p) {
        try {
          const prods = JSON.parse(localStorage.getItem('dcbd_products_cache') || '[]');
          p = prods.find(x => x.sku === sku || x.id === sku);
        } catch(e) {}
      }
      if (p) {
        this.addItem(p, qty, isWholesale);
      } else {
        this.addItem({ sku: sku, name: 'পণ্য ' + sku, sellingPrice: 0, price: 0 }, qty, isWholesale);
      }
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
      return this.items.reduce((s, i) => s + (Math.max(1, Number(i.quantity) || 1)), 0);
    },

    getSubtotal() {
      return this.items.reduce((s, i) => s + ((Number(i.price) || 0) * (Math.max(1, Number(i.quantity) || 1))), 0);
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
