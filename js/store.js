/**
 * DREAM CART BD — REACTIVE GLOBAL STORE
 * Handles Cart, Wishlist, Authentication (Customer, Wholesaler, Admin Roles), Theme
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
    },

    addItem(product, qty = 1, isWholesale = false) {
      const price = isWholesale ? (product.wholesalePrice || product.sellingPrice) : product.sellingPrice;
      const existing = this.items.find(i => i.sku === product.sku);
      if (existing) {
        existing.quantity += qty;
      } else {
        this.items.push({
          id: product.id,
          sku: product.sku,
          name: product.name,
          category: product.category,
          price: price,
          originalPrice: product.originalPrice,
          image: product.primaryImage,
          quantity: qty,
          isWholesale: isWholesale,
          minOrderQ: product.minOrderQ || 1
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
    },

    toggle(product) {
      const exists = this.items.some(p => p.sku === product.sku);
      if (exists) {
        this.items = this.items.filter(p => p.sku !== product.sku);
        STORE.toast('info', 'ফেভরিট তালিকা থেকে সরানো হয়েছে');
      } else {
        this.items.push(product);
        STORE.toast('success', 'ফেভরিটে যুক্ত করা হয়েছে!', product.name);
      }
      this.save();
    },

    has(sku) {
      return this.items.some(p => p.sku === sku);
    }
  },

  // Auth State for 3 user roles: Customer, Wholesaler, Admin/Worker
  auth: {
    customer: JSON.parse(localStorage.getItem('dcbd_customer_session') || 'null'),
    wholesaler: JSON.parse(localStorage.getItem('dcbd_wholesaler_session') || 'null'),
    admin: JSON.parse(localStorage.getItem('dcbd_admin_session') || 'null'),

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
      STORE.safeSet('dcbd_admin_session', data);
      STORE.emit('auth_changed', { type: 'admin', user: data });
    },

    logoutAdmin() {
      this.admin = null;
      localStorage.removeItem('dcbd_admin_session');
      STORE.emit('auth_changed', { type: 'admin', user: null });
      STORE.toast('info', 'এডমিন লগআউট সফল হয়েছে');
    }
  },

  // Theme Mode (Dark mode by default)
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
      this.listeners[event].forEach(cb => cb(data));
    }
  },

  // Interactive Toast Notification
  toast(type, title, message = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    const borderColors = {
      success: 'border-emerald-500 text-emerald-400',
      error: 'border-rose-500 text-rose-400',
      info: 'border-sky-500 text-sky-400'
    };
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    toastEl.className = `toast-item ${type || 'info'}`;
    toastEl.innerHTML = `
      <div class="toast-icon">${icons[type] || 'ℹ'}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-msg">${message}</div>` : ''}
      </div>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.add('hide');
      setTimeout(() => toastEl.remove(), 300);
    }, 3500);
  }
};

window.STORE = STORE;
