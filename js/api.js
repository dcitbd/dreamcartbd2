// Dream Cart BD - Hybrid Storage & API Layer
// Supports LocalStorage Persistence out-of-the-box and Google Apps Script WebApp integration

const API = {
  // Key prefixes for localStorage
  KEYS: {
    PRODUCTS: 'dcbd_products_v2',
    CATEGORIES: 'dcbd_categories_v2',
    BANNERS: 'dcbd_banners_v2',
    SETTINGS: 'dcbd_settings_v2',
    ORDERS: 'dcbd_orders_v2',
    INCOMPLETE_ORDERS: 'dcbd_incomplete_orders_v2',
    CUSTOMERS: 'dcbd_customers_v2',
    RESELLERS: 'dcbd_resellers_v2',
    WHOLESALERS: 'dcbd_wholesalers_v2',
    STAFF: 'dcbd_staff_v2',
    FINANCE_BUYING: 'dcbd_finance_buying_v2',
    FINANCE_COSTS: 'dcbd_finance_costs_v2',
    FINANCE_INVEST: 'dcbd_finance_invest_v2',
    REVIEWS: 'dcbd_reviews_v2',
    GAS_ENDPOINT: 'dcbd_gas_endpoint_url'
  },

  // Initialize data if not yet present
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
    if (!localStorage.getItem(this.KEYS.STAFF)) {
      // Default admin user as requested: jainal.dcitbd@gmail.com / Dcbd@2026
      const defaultStaff = [
        {
          id: 'ADMIN-001',
          name: 'Jainal Abedin (CEO)',
          mobile: '01581703822',
          mail: 'jainal.dcitbd@gmail.com',
          address: 'Cumilla, Bangladesh',
          worker_type: 'Super Admin',
          role: 'ALL',
          username: 'jainal.dcitbd@gmail.com',
          password: 'Dcbd@2026'
        },
        {
          id: 'STAFF-002',
          name: 'Saiful Islam',
          mobile: '01818273838',
          mail: 'saiful05333@gmail.com',
          address: 'Chowdhury Plaza, Cumilla',
          worker_type: 'Manager',
          role: 'ORDERS_PRODUCTS_VIEW',
          username: 'saiful05333@gmail.com',
          password: 'Dcbd@2026'
        }
      ];
      localStorage.setItem(this.KEYS.STAFF, JSON.stringify(defaultStaff));
    }
    if (!localStorage.getItem(this.KEYS.ORDERS)) {
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.INCOMPLETE_ORDERS)) {
      localStorage.setItem(this.KEYS.INCOMPLETE_ORDERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.CUSTOMERS)) {
      localStorage.setItem(this.KEYS.CUSTOMERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.RESELLERS)) {
      localStorage.setItem(this.KEYS.RESELLERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.WHOLESALERS)) {
      localStorage.setItem(this.KEYS.WHOLESALERS, JSON.stringify([]));
    }
  },

  getGasEndpoint() {
    return localStorage.getItem(this.KEYS.GAS_ENDPOINT) || '';
  },

  setGasEndpoint(url) {
    localStorage.setItem(this.KEYS.GAS_ENDPOINT, url);
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
      console.warn('Google Apps Script sync offline / fallback to local storage:', err);
      return null;
    }
  },

  // Products
  getProducts() {
    return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS) || '[]');
  },

  saveProducts(list) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(list));
    this.syncWithGas('bulkUpdateProducts', { products: list });
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

  // Orders
  getOrders() {
    return JSON.parse(localStorage.getItem(this.KEYS.ORDERS) || '[]');
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));

    // Also deduct stock from products
    if (orderData.items && Array.isArray(orderData.items)) {
      const products = this.getProducts();
      orderData.items.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
        }
      });
      this.saveProducts(products);
    }

    // Auto add or update Customer record
    this.recordCustomerActivity(orderData);

    // Sync to GAS if configured
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
    this.syncWithGas('deleteOrder', { orderId });
  },

  // Incomplete Orders
  recordIncompleteOrder(data) {
    const list = JSON.parse(localStorage.getItem(this.KEYS.INCOMPLETE_ORDERS) || '[]');
    // prevent duplicate flood by phone
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

  // Customers
  getCustomers() {
    return JSON.parse(localStorage.getItem(this.KEYS.CUSTOMERS) || '[]');
  },

  recordCustomerActivity(order) {
    const customers = this.getCustomers();
    let cust = customers.find(c => c.mobile === order.phone);
    if (!cust) {
      cust = {
        userId: 'CUST-' + Date.now().toString().slice(-6),
        name: order.customerName,
        mobile: order.phone,
        mail: order.email || '',
        address: order.address,
        totalOrders: 1,
        successOrders: 0,
        cancelOrders: 0,
        status: 'verified',
        rating: 5.0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      customers.unshift(cust);
    } else {
      cust.totalOrders = (cust.totalOrders || 0) + 1;
      cust.name = order.customerName || cust.name;
      cust.address = order.address || cust.address;
    }
    localStorage.setItem(this.KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  // Categories & Banners
  getCategories() {
    return JSON.parse(localStorage.getItem(this.KEYS.CATEGORIES) || '[]');
  },

  saveCategories(catList) {
    localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(catList));
  },

  getBanners() {
    return JSON.parse(localStorage.getItem(this.KEYS.BANNERS) || '[]');
  },

  saveBanners(bannerList) {
    localStorage.setItem(this.KEYS.BANNERS, JSON.stringify(bannerList));
  },

  getSettings() {
    return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS) || JSON.stringify(SITE_SETTINGS));
  },

  saveSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    this.syncWithGas('saveSettings', { settings });
  }
};

// Initialize immediately
API.init();
