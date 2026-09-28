// Dream Cart BD - Direct Google Sheet Dynamic Loader & Hybrid Storage Engine
// Live Sheet ID: 1W4k4HP1MBuHfdU7AkPHPf_P-huHATEpIbGhJQDRtpH4

const API = {
  DEFAULT_SHEET_ID: '1W4k4HP1MBuHfdU7AkPHPf_P-huHATEpIbGhJQDRtpH4',

  KEYS: {
    PRODUCTS: 'dcbd_products_v2',
    CATEGORIES: 'dcbd_categories_v2',
    BRANDS: 'dcbd_brands_v2',
    BANNERS: 'dcbd_banners_v2',
    SETTINGS: 'dcbd_settings_v2',
    ORDERS: 'dcbd_orders_v2',
    INCOMPLETE_ORDERS: 'dcbd_incomplete_orders_v2',
    CUSTOMERS: 'dcbd_customers_v2',
    RESELLERS: 'dcbd_resellers_v2',
    WHOLESALERS: 'dcbd_wholesalers_v2',
    STAFF: 'dcbd_staff_v2',
    SHEET_ID: 'dcbd_active_sheet_id',
    GAS_ENDPOINT: 'dcbd_gas_endpoint_url',
    LAST_SYNC: 'dcbd_last_sheet_sync_time'
  },

  listeners: [],

  onDataChange(fn) {
    if (typeof fn === 'function') this.listeners.push(fn);
  },

  notifyListeners() {
    this.listeners.forEach(fn => {
      try { fn(); } catch (e) { console.error('Listener callback error:', e); }
    });
  },

  init() {
    if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
      localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(this.KEYS.CATEGORIES)) {
      localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem(this.KEYS.BANNERS)) {
      localStorage.setItem(this.KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS));
    }
    if (!localStorage.getItem(this.KEYS.SETTINGS)) {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(SITE_SETTINGS));
    }
    if (!localStorage.getItem(this.KEYS.SHEET_ID)) {
      localStorage.setItem(this.KEYS.SHEET_ID, this.DEFAULT_SHEET_ID);
    }
    if (!localStorage.getItem(this.KEYS.STAFF)) {
      localStorage.setItem(this.KEYS.STAFF, JSON.stringify([
        {
          id: 'ADMIN-001',
          name: 'Jainal Abedin (CEO)',
          mobile: '01581703822',
          mail: 'jainal.dcitbd@gmail.com',
          role: 'ALL',
          username: 'jainal.dcitbd@gmail.com',
          password: 'Dcbd@2026'
        }
      ]));
    }
    if (!localStorage.getItem(this.KEYS.ORDERS)) localStorage.setItem(this.KEYS.ORDERS, JSON.stringify([]));
    if (!localStorage.getItem(this.KEYS.INCOMPLETE_ORDERS)) localStorage.setItem(this.KEYS.INCOMPLETE_ORDERS, JSON.stringify([]));
    if (!localStorage.getItem(this.KEYS.CUSTOMERS)) localStorage.setItem(this.KEYS.CUSTOMERS, JSON.stringify([]));

    // Auto-fetch live data from Google Sheet on start
    setTimeout(() => {
      this.syncAllFromSheet(false);
    }, 500);
  },

  getSheetId() {
    return localStorage.getItem(this.KEYS.SHEET_ID) || this.DEFAULT_SHEET_ID;
  },

  setSheetId(id) {
    if (id && id.trim()) {
      localStorage.setItem(this.KEYS.SHEET_ID, id.trim());
      this.syncAllFromSheet(true);
    }
  },

  getGasEndpoint() {
    return localStorage.getItem(this.KEYS.GAS_ENDPOINT) || '';
  },

  setGasEndpoint(url) {
    localStorage.setItem(this.KEYS.GAS_ENDPOINT, url);
  },

  // Fetch and parse Google Sheet via gviz/tq
  async fetchGvizSheet(sheetName) {
    const sheetId = this.getSheetId();
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&headers=1`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} on sheet ${sheetName}`);
    const text = await resp.text();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Invalid GViz response');
    const json = JSON.parse(text.substring(start, end + 1));
    return json.table || {};
  },

  // Dynamic Products, Categories, Brands, Colors & Sizes loader
  async syncAllFromSheet(showToast = true) {
    const statusEl = document.getElementById('sheet-sync-status');
    if (statusEl) statusEl.textContent = 'সিঙ্ক হচ্ছে...';

    try {
      const table = await this.fetchGvizSheet('Products');
      const rows = table.rows || [];
      if (!rows.length) throw new Error('প্রোডাক্ট সীটে কোন ডাটা পাওয়া যায়নি।');

      const parsedProducts = [];
      const catMap = {}; // For dynamic 3-level tree
      const brandSet = new Set();

      rows.forEach(r => {
        const cells = r.c || [];
        const getVal = (idx) => {
          if (!cells[idx]) return '';
          const v = cells[idx].v;
          return v === null || v === undefined ? '' : String(v).trim();
        };
        const getNum = (idx, fallback = 0) => {
          if (!cells[idx]) return fallback;
          const v = cells[idx].v;
          const n = parseFloat(v);
          return isNaN(n) ? fallback : n;
        };

        const sku = getVal(0);
        const name = getVal(1);
        if (!sku && !name) return; // Skip empty row

        const cat = getVal(2) || 'General';
        const subCat = getVal(3) || 'General';
        const childCat = getVal(4) || 'General';
        const brand = getVal(5) || 'Generic';
        const buyingPrice = getNum(6);
        const sellingPrice = getNum(7);
        const stock = parseInt(getNum(8, 5));
        const originalPrice = getNum(9) || (sellingPrice * 1.2);
        const wholesalePrice = getNum(10) || (sellingPrice * 0.85);
        const minOrderQ = parseInt(getVal(11).replace(/[^0-9]/g, '')) || 1;
        const imagesRaw = getVal(12);
        const desc = getVal(13);
        const spec = getVal(14);
        const others = getVal(15);
        const colorRaw = getVal(16);
        const sizeRaw = getVal(17);

        // Parse images
        let images = imagesRaw.split(',').map(s => s.trim()).filter(Boolean);
        if (!images.length) {
          images = ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'];
        }

        // Parse colors
        let colors = colorRaw.split(',').map(s => s.trim()).filter(Boolean);
        if (!colors.length) colors = ['Standard'];

        // Parse sizes
        let sizes = sizeRaw.split(',').map(s => s.trim()).filter(Boolean);
        if (!sizes.length) sizes = ['Standard'];

        const resellerPrice = Math.round(sellingPrice * 0.9);

        parsedProducts.push({
          id: sku || ('DCBD-' + (1000 + parsedProducts.length)),
          name: name,
          category: cat,
          sub_category: subCat,
          child_category: childCat,
          brand: brand,
          buying_price: buyingPrice,
          selling_price: sellingPrice,
          original_price: originalPrice,
          wholesale_price: wholesalePrice,
          reseller_price: resellerPrice,
          stock: stock,
          min_order_q: minOrderQ,
          images: images,
          description: desc,
          specification: spec,
          others: others,
          color: colors,
          size: sizes
        });

        // Populate Brand
        if (brand) brandSet.add(brand);

        // Build 3-level Category Tree
        if (!catMap[cat]) catMap[cat] = {};
        if (!catMap[cat][subCat]) catMap[cat][subCat] = new Set();
        if (childCat) catMap[cat][subCat].add(childCat);
      });

      // Construct category tree
      const dynamicCategoryTree = Object.keys(catMap).map((catName, idx) => ({
        id: `cat-sheet-${idx + 1}`,
        name: catName,
        subcategories: Object.keys(catMap[catName]).map((subName, sIdx) => ({
          id: `sub-sheet-${idx + 1}-${sIdx + 1}`,
          name: subName,
          children: Array.from(catMap[catName][subName])
        }))
      }));

      // Save to localStorage
      if (parsedProducts.length > 0) {
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(parsedProducts));
        localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(dynamicCategoryTree));
        localStorage.setItem(this.KEYS.BRANDS, JSON.stringify(Array.from(brandSet)));
        localStorage.setItem(this.KEYS.LAST_SYNC, new Date().toLocaleTimeString('bn-BD'));

        if (statusEl) statusEl.textContent = `লাইভ (${parsedProducts.length} টি)`;
        if (showToast && typeof App !== 'undefined' && App.showToast) {
          App.showToast(`গুগল সীট থেকে ${parsedProducts.length}টি প্রোডাক্ট সফলভাবে লোড হয়েছে!`, 'success');
        }

        // Notify UI to re-render
        this.notifyListeners();
        return { success: true, count: parsedProducts.length };
      }
    } catch (err) {
      console.warn('Google Sheet live sync failed or offline:', err);
      if (statusEl) statusEl.textContent = 'ক্যাশড ডাটা';
      if (showToast && typeof App !== 'undefined' && App.showToast) {
        App.showToast('সীট কানেকশনে সমস্যা হয়েছে। সংরক্ষিত ক্যাশড ডাটা ব্যবহৃত হচ্ছে।', 'warning');
      }
      return { success: false, error: err.message };
    }
  },

  getProducts() {
    return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS) || '[]');
  },

  saveProducts(list) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(list));
    this.notifyListeners();
  },

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },

  addProduct(product) {
    const list = this.getProducts();
    list.unshift(product);
    this.saveProducts(list);
    return product;
  },

  updateProduct(id, updatedFields) {
    const list = this.getProducts();
    const index = list.findIndex(p => p.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      this.saveProducts(list);
      return list[index];
    }
    return null;
  },

  deleteProduct(id) {
    let list = this.getProducts();
    list = list.filter(p => p.id !== id);
    this.saveProducts(list);
  },

  getCategories() {
    return JSON.parse(localStorage.getItem(this.KEYS.CATEGORIES) || '[]');
  },

  getBrands() {
    return JSON.parse(localStorage.getItem(this.KEYS.BRANDS) || '[]');
  },

  getBanners() {
    return JSON.parse(localStorage.getItem(this.KEYS.BANNERS) || '[]');
  },

  getSettings() {
    return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS) || JSON.stringify(SITE_SETTINGS));
  },

  saveSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
  },

  getOrders() {
    return JSON.parse(localStorage.getItem(this.KEYS.ORDERS) || '[]');
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));

    if (orderData.items && Array.isArray(orderData.items)) {
      const products = this.getProducts();
      orderData.items.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
      });
      this.saveProducts(products);
    }
    this.syncWithGas('createOrder', { order: orderData });
    return orderData;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
      this.syncWithGas('updateOrderStatus', { orderId, status: newStatus });
      return order;
    }
    return null;
  },

  deleteOrder(orderId) {
    let orders = this.getOrders();
    orders = orders.filter(o => o.orderId !== orderId);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
  },

  recordIncompleteOrder(data) {
    const list = JSON.parse(localStorage.getItem(this.KEYS.INCOMPLETE_ORDERS) || '[]');
    const existingIdx = list.findIndex(item => item.phone === data.phone && data.phone !== '');
    if (existingIdx !== -1) {
      list[existingIdx] = { ...list[existingIdx], ...data, date: new Date().toISOString() };
    } else {
      list.unshift({ ...data, id: 'INC-' + Date.now(), date: new Date().toISOString(), status: 'Incomplete' });
    }
    localStorage.setItem(this.KEYS.INCOMPLETE_ORDERS, JSON.stringify(list));
    this.syncWithGas('recordIncompleteOrder', { incompleteOrder: data });
  },

  getIncompleteOrders() {
    return JSON.parse(localStorage.getItem(this.KEYS.INCOMPLETE_ORDERS) || '[]');
  },

  deleteIncompleteOrder(id) {
    let list = this.getIncompleteOrders();
    list = list.filter(item => item.id !== id);
    localStorage.setItem(this.KEYS.INCOMPLETE_ORDERS, JSON.stringify(list));
  },

  getCustomers() {
    return JSON.parse(localStorage.getItem(this.KEYS.CUSTOMERS) || '[]');
  },

  async syncWithGas(action, payload) {
    const endpoint = this.getGasEndpoint();
    if (!endpoint) return null;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action, ...payload })
      });
      return await response.json();
    } catch (err) {
      console.warn('Google Apps Script endpoint offline:', err);
      return null;
    }
  }
};

API.init();
