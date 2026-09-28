// Dream Cart BD - Admin Panel Core Controller
// Full ERP, Product Management, Inline Editing, Bulk Operations, Orders, and Financial Tracking

const Admin = {
  currentTab: 'dashboard',
  adminSession: null,

  init() {
    this.checkAuth();
    if (this.adminSession) {
      this.renderCurrentView();
      this.startLiveCounters();
    }
  },

  checkAuth() {
    const session = sessionStorage.getItem('dcbd_admin_session');
    if (session) {
      this.adminSession = JSON.parse(session);
      document.getElementById('admin-login-screen')?.classList.add('d-none');
      document.getElementById('admin-main-screen')?.classList.remove('d-none');
      document.getElementById('admin-username-display').textContent = this.adminSession.name;
    } else {
      document.getElementById('admin-login-screen')?.classList.remove('d-none');
      document.getElementById('admin-main-screen')?.classList.add('d-none');
      this.generateCaptcha();
    }
  },

  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    window._captchaAnswer = num1 + num2;
    const label = document.getElementById('captcha-question');
    if (label) label.textContent = `${num1} + ${num2} = ?`;
  },

  login(username, password, captchaInput) {
    if (parseInt(captchaInput) !== window._captchaAnswer) {
      alert('ক্যাপচা সঠিক নয়! পুনরায় চেষ্টা করুন।');
      this.generateCaptcha();
      return false;
    }

    const staffList = JSON.parse(localStorage.getItem(API.KEYS.STAFF) || '[]');
    const match = staffList.find(s => (s.username === username || s.mail === username) && s.password === password);

    if (match) {
      this.adminSession = match;
      sessionStorage.setItem('dcbd_admin_session', JSON.stringify(match));
      this.checkAuth();
      this.renderCurrentView();
      return true;
    } else {
      alert('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
      this.generateCaptcha();
      return false;
    }
  },

  logout() {
    sessionStorage.removeItem('dcbd_admin_session');
    window.location.reload();
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.admin-nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabName);
    });
    this.renderCurrentView();
  },

  renderCurrentView() {
    const container = document.getElementById('admin-view-container');
    if (!container) return;

    switch (this.currentTab) {
      case 'dashboard':
        this.renderDashboard(container);
        break;
      case 'products':
        this.renderProducts(container);
        break;
      case 'orders':
        this.renderOrders(container);
        break;
      case 'incomplete-orders':
        this.renderIncompleteOrders(container);
        break;
      case 'customers':
        this.renderCustomers(container);
        break;
      case 'wholesalers':
        this.renderWholesalers(container);
        break;
      case 'resellers':
        this.renderResellers(container);
        break;
      case 'finance':
        this.renderFinance(container);
        break;
      case 'categories':
        this.renderCategories(container);
        break;
      case 'banners':
        this.renderBanners(container);
        break;
      case 'settings':
        this.renderSettings(container);
        break;
      default:
        this.renderDashboard(container);
    }
  },

  startLiveCounters() {
    // Simulated active live viewers (random oscillation between 15 and 35)
    setInterval(() => {
      const el = document.getElementById('live-viewer-count');
      if (el) {
        const current = parseInt(el.textContent) || 24;
        const delta = Math.floor(Math.random() * 5) - 2;
        el.textContent = Math.max(12, current + delta);
      }
    }, 4000);
  },

  // 1. Dashboard View
  renderDashboard(container) {
    const products = API.getProducts();
    const orders = API.getOrders();
    const customers = API.getCustomers();
    const incomplete = API.getIncompleteOrders();

    const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockCount = products.filter(p => p.stock <= 0).length;

    container.innerHTML = `
      <div class="stat-grid-4">
        <div class="stat-card">
          <div class="stat-card-info">
            <h3>৳${totalSales.toLocaleString()}</h3>
            <p>মোট মোট বিক্রয় (বিক্রয় রেভিনিউ)</p>
          </div>
          <div class="stat-card-icon icon-green"><i class="fas fa-chart-line"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-info">
            <h3>${orders.length}</h3>
            <p>সর্বমোট অর্ডার (${pendingOrders} পেন্ডিং)</p>
          </div>
          <div class="stat-card-icon icon-blue"><i class="fas fa-shopping-bag"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-info">
            <h3>${products.length}</h3>
            <p>প্রোডাক্ট সংখ্যা (${outOfStockCount} স্টক আউট)</p>
          </div>
          <div class="stat-card-icon icon-yellow"><i class="fas fa-boxes"></i></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-info">
            <h3 id="live-viewer-count">24</h3>
            <p>লাইভ ভিজিটর সংখ্যা</p>
          </div>
          <div class="stat-card-icon icon-red"><i class="fas fa-eye"></i></div>
        </div>
      </div>

      ${lowStockCount > 0 ? `
        <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; padding: 0.75rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span><i class="fas fa-exclamation-triangle" style="color:#f59e0b; margin-right:8px;"></i> <strong>লো-স্টক সতর্কতা:</strong> ${lowStockCount}টি প্রোডাক্টের স্টক ৫ পিসের নিচে নেমে গেছে!</span>
          <button class="btn btn-sm btn-outline-warning" onclick="Admin.switchTab('products')">স্টক দেখুন</button>
        </div>
      ` : ''}

      <div class="admin-table-card">
        <div class="table-header-bar">
          <h4 style="margin:0;"><i class="fas fa-clock"></i> সাম্প্রতিক অর্ডারসমূহ</h4>
          <button class="btn btn-sm btn-primary" onclick="Admin.switchTab('orders')">সব অর্ডার দেখুন</button>
        </div>
        <div class="table-responsive">
          <table class="table-custom">
            <thead>
              <tr>
                <th>অর্ডার আইডি</th>
                <th>তারিখ</th>
                <th>গ্রাহক</th>
                <th>মোবাইল</th>
                <th>মোট মূল্য</th>
                <th>পেমেন্ট</th>
                <th>স্ট্যাটাস</th>
                <th>একশন</th>
              </tr>
            </thead>
            <tbody>
              ${orders.slice(0, 8).map(o => `
                <tr>
                  <td><strong>${o.orderId}</strong></td>
                  <td>${o.date || 'আজ'}</td>
                  <td>${o.customerName}</td>
                  <td>${o.phone}</td>
                  <td>৳${o.totalAmount}</td>
                  <td><span class="badge ${o.paymentMethod !== 'Cash On Delivery' ? 'bg-success' : 'bg-secondary'}">${o.paymentMethod || 'COD'}</span></td>
                  <td><span class="badge bg-primary">${o.status}</span></td>
                  <td>
                    <button class="btn btn-sm btn-info" onclick="Admin.printVoucher('${o.orderId}')"><i class="fas fa-print"></i> ভাউচার</button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="8" class="text-center py-4">এখনো কোন অর্ডার নেই।</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 2. Product Management View
  renderProducts(container) {
    const products = API.getProducts();

    container.innerHTML = `
      <div class="table-header-bar mb-3" style="background:#111827; border-radius:8px;">
        <div>
          <h4 style="margin:0;"><i class="fas fa-boxes"></i> প্রোডাক্ট ম্যানেজমেন্ট</h4>
          <small class="text-muted">ক্লিক করে সরাসরি যেকোনো দাম বা স্টক এডিট করতে পারবেন</small>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-sm btn-success" onclick="Admin.openAddProductModal()"><i class="fas fa-plus"></i> নতুন প্রোডাক্ট যোগ</button>
          <button class="btn btn-sm btn-outline-info" onclick="Admin.exportProductsCSV()"><i class="fas fa-file-csv"></i> CSV ডাউনলোড</button>
          <label class="btn btn-sm btn-outline-warning mb-0" style="cursor:pointer;">
            <i class="fas fa-file-upload"></i> বাল্ক আপলোড
            <input type="file" id="bulk-product-file" style="display:none;" onchange="Admin.handleBulkProductUpload(event)">
          </label>
        </div>
      </div>

      <div class="admin-table-card">
        <div class="table-header-bar">
          <input type="text" id="admin-product-search" placeholder="প্রোডাক্ট নাম, SKU বা ক্যাটাগরি দিয়ে সার্চ..." 
                 class="form-control" style="max-width:320px;" oninput="Admin.filterProductTable()">
          <div>
            <select class="form-control" id="admin-stock-filter" onchange="Admin.filterProductTable()">
              <option value="all">সকল স্টক ফিল্টার</option>
              <option value="in_stock">ইন-স্টক (>0)</option>
              <option value="low_stock">লো-স্টক (1-5)</option>
              <option value="out_stock">স্টক-আউট (0)</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table-custom" id="admin-product-table">
            <thead>
              <tr>
                <th>ছবি</th>
                <th>SKU</th>
                <th>প্রোডাক্ট নাম</th>
                <th>ক্যাটাগরি</th>
                <th>অরিজিনাল (৳)</th>
                <th>সেলিং (৳)</th>
                <th>বাইয়িং (৳)</th>
                <th>হোলসেল (৳)</th>
                <th>রিসেলার (৳)</th>
                <th>স্টক</th>
                <th>একশন</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr data-id="${p.id}" data-name="${p.name.toLowerCase()}" data-cat="${(p.category||'').toLowerCase()}" data-stock="${p.stock}">
                  <td>
                    <img src="${Array.isArray(p.images) ? p.images[0] : p.images}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                  </td>
                  <td><code>${p.id}</code></td>
                  <td><strong>${p.name}</strong></td>
                  <td><span class="badge bg-secondary">${p.category}</span></td>
                  <td>
                    <span class="editable-field" title="ক্লিক করে পরিবর্তন করুন" 
                          onclick="Admin.inlineEdit('${p.id}', 'original_price', ${p.original_price})">
                      ৳${p.original_price}
                    </span>
                  </td>
                  <td>
                    <span class="editable-field" title="ক্লিক করে পরিবর্তন করুন" 
                          onclick="Admin.inlineEdit('${p.id}', 'selling_price', ${p.selling_price})">
                      ৳${p.selling_price}
                    </span>
                  </td>
                  <td>
                    <span class="editable-field" title="ক্লিক করে পরিবর্তন করুন" 
                          onclick="Admin.inlineEdit('${p.id}', 'buying_price', ${p.buying_price})">
                      ৳${p.buying_price}
                    </span>
                  </td>
                  <td>৳${p.wholesale_price || '-'}</td>
                  <td>৳${p.reseller_price || '-'}</td>
                  <td>
                    <span class="editable-field badge ${p.stock > 5 ? 'bg-success' : (p.stock > 0 ? 'bg-warning' : 'bg-danger')}" 
                          title="ক্লিক করে স্টক আপডেট করুন" onclick="Admin.inlineEdit('${p.id}', 'stock', ${p.stock})">
                      ${p.stock} pcs
                    </span>
                  </td>
                  <td>
                    <div style="display:flex; gap:4px;">
                      <button class="btn btn-sm btn-outline-primary" onclick="Admin.openEditProductModal('${p.id}')"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-sm btn-outline-danger" onclick="Admin.deleteProduct('${p.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  inlineEdit(id, field, currentVal) {
    const newVal = prompt(`নতুন ${field} লিখুন:`, currentVal);
    if (newVal !== null && newVal.trim() !== '') {
      const parsed = isNaN(newVal) ? newVal : parseFloat(newVal);
      const updateObj = {};
      updateObj[field] = parsed;
      API.updateProduct(id, updateObj);
      this.renderCurrentView();
      App.showToast('সফলভাবে আপডেট করা হয়েছে!', 'success');
    }
  },

  openAddProductModal() {
    const modal = document.getElementById('admin-product-modal');
    if (!modal) return;
    document.getElementById('product-modal-title').textContent = 'নতুন প্রোডাক্ট যুক্ত করুন';
    document.getElementById('form-product-id').value = 'DCBD-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('form-product-name').value = '';
    document.getElementById('form-product-buying').value = '';
    document.getElementById('form-product-selling').value = '';
    document.getElementById('form-product-original').value = '';
    document.getElementById('form-product-reseller').value = '';
    document.getElementById('form-product-wholesale').value = '';
    document.getElementById('form-product-stock').value = '10';
    document.getElementById('form-product-minq').value = '1';
    document.getElementById('form-product-images').value = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800';
    document.getElementById('form-product-desc').value = '';
    document.getElementById('form-product-spec').value = '';
    document.getElementById('form-product-color').value = 'Black';
    document.getElementById('form-product-size').value = 'Standard';
    modal.classList.add('show');
  },

  openEditProductModal(id) {
    const p = API.getProductById(id);
    if (!p) return;
    const modal = document.getElementById('admin-product-modal');
    if (!modal) return;
    document.getElementById('product-modal-title').textContent = 'প্রোডাক্ট এডিট করুন';
    document.getElementById('form-product-id').value = p.id;
    document.getElementById('form-product-name').value = p.name;
    document.getElementById('form-product-category').value = p.category;
    document.getElementById('form-product-brand').value = p.brand;
    document.getElementById('form-product-buying').value = p.buying_price;
    document.getElementById('form-product-selling').value = p.selling_price;
    document.getElementById('form-product-original').value = p.original_price;
    document.getElementById('form-product-reseller').value = p.reseller_price || '';
    document.getElementById('form-product-wholesale').value = p.wholesale_price || '';
    document.getElementById('form-product-stock').value = p.stock;
    document.getElementById('form-product-minq').value = p.min_order_q || '1';
    document.getElementById('form-product-images').value = Array.isArray(p.images) ? p.images.join(', ') : p.images;
    document.getElementById('form-product-desc').value = p.description || '';
    document.getElementById('form-product-spec').value = p.specification || '';
    document.getElementById('form-product-color').value = Array.isArray(p.color) ? p.color.join(', ') : (p.color || '');
    document.getElementById('form-product-size').value = Array.isArray(p.size) ? p.size.join(', ') : (p.size || '');
    modal.classList.add('show');
  },

  closeProductModal() {
    document.getElementById('admin-product-modal')?.classList.remove('show');
  },

  saveProductFromModal() {
    const id = document.getElementById('form-product-id').value;
    const name = document.getElementById('form-product-name').value;
    if (!name) { alert('প্রোডাক্ট নাম আবশ্যক!'); return; }

    const rawImgs = document.getElementById('form-product-images').value;
    const images = rawImgs.split(',').map(s => s.trim()).filter(Boolean);

    const productData = {
      id: id,
      name: name,
      category: document.getElementById('form-product-category').value,
      sub_category: 'Standard',
      child_category: 'Standard',
      brand: document.getElementById('form-product-brand').value,
      buying_price: parseFloat(document.getElementById('form-product-buying').value) || 0,
      selling_price: parseFloat(document.getElementById('form-product-selling').value) || 0,
      original_price: parseFloat(document.getElementById('form-product-original').value) || 0,
      reseller_price: parseFloat(document.getElementById('form-product-reseller').value) || 0,
      wholesale_price: parseFloat(document.getElementById('form-product-wholesale').value) || 0,
      stock: parseInt(document.getElementById('form-product-stock').value) || 0,
      min_order_q: parseInt(document.getElementById('form-product-minq').value) || 1,
      images: images.length ? images : ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
      description: document.getElementById('form-product-desc').value,
      specification: document.getElementById('form-product-spec').value,
      color: document.getElementById('form-product-color').value.split(',').map(s => s.trim()).filter(Boolean),
      size: document.getElementById('form-product-size').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    const existing = API.getProductById(id);
    if (existing) {
      API.updateProduct(id, productData);
      App.showToast('প্রোডাক্ট সফলভাবে আপডেট করা হয়েছে!', 'success');
    } else {
      API.addProduct(productData);
      App.showToast('নতুন প্রোডাক্ট সফলভাবে যোগ করা হয়েছে!', 'success');
    }
    this.closeProductModal();
    this.renderCurrentView();
  },

  deleteProduct(id) {
    if (confirm('আপনি কি নিশ্চিত এই প্রোডাক্টটি ডিলিট করতে চান?')) {
      API.deleteProduct(id);
      this.renderCurrentView();
      App.showToast('প্রোডাক্ট মুছে ফেলা হয়েছে।', 'info');
    }
  },

  filterProductTable() {
    const q = (document.getElementById('admin-product-search')?.value || '').toLowerCase();
    const stockFilter = document.getElementById('admin-stock-filter')?.value || 'all';
    const rows = document.querySelectorAll('#admin-product-table tbody tr');

    rows.forEach(r => {
      const name = r.dataset.name || '';
      const cat = r.dataset.cat || '';
      const stock = parseInt(r.dataset.stock) || 0;

      let matchText = name.includes(q) || cat.includes(q);
      let matchStock = true;

      if (stockFilter === 'in_stock') matchStock = stock > 0;
      else if (stockFilter === 'low_stock') matchStock = stock > 0 && stock <= 5;
      else if (stockFilter === 'out_stock') matchStock = stock <= 0;

      r.style.display = matchText && matchStock ? '' : 'none';
    });
  },

  exportProductsCSV() {
    const products = API.getProducts();
    let csv = 'ID/SKU,P_Name,Category,Brand,Buying_price,Selling_Price,Stock,Original_Price,WholeSale_price,Reseller_Price\n';
    products.forEach(p => {
      csv += `"${p.id}","${p.name.replace(/"/g, '""')}","${p.category}","${p.brand}",${p.buying_price},${p.selling_price},${p.stock},${p.original_price},${p.wholesale_price},${p.reseller_price}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Dream_Cart_BD_Products_${Date.now()}.csv`;
    link.click();
  },

  // 3. Orders View
  renderOrders(container) {
    const orders = API.getOrders();
    container.innerHTML = `
      <div class="table-header-bar mb-3" style="background:#111827; border-radius:8px;">
        <h4 style="margin:0;"><i class="fas fa-shopping-bag"></i> অর্ডার ম্যানেজমেন্ট</h4>
        <span class="badge bg-primary">মোট অর্ডার: ${orders.length}</span>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="table-custom">
            <thead>
              <tr>
                <th>অর্ডার আইডি</th>
                <th>তারিখ</th>
                <th>গ্রাহকের নাম ও ফোন</th>
                <th>ঠিকানা</th>
                <th>আইটেমস</th>
                <th>মোট টাকা</th>
                <th>পেমেন্ট</th>
                <th>স্ট্যাটাস</th>
                <th>একশন</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td><code>${o.orderId}</code></td>
                  <td>${o.date || 'আজ'}</td>
                  <td>
                    <strong>${o.customerName}</strong><br>
                    <small class="text-muted"><a href="tel:${o.phone}">${o.phone}</a></small>
                  </td>
                  <td><small>${o.address}</small></td>
                  <td>
                    ${(o.items || []).map(i => `${i.name} (x${i.quantity})`).join('<br>')}
                  </td>
                  <td><strong>৳${o.totalAmount}</strong></td>
                  <td>
                    ${o.paymentMethod}<br>
                    ${o.trxId ? `<small class="text-warning">Trx: ${o.trxId}</small>` : ''}
                  </td>
                  <td>
                    <select class="form-control form-control-sm" style="width:130px;" 
                            onchange="Admin.changeOrderStatus('${o.orderId}', this.value)">
                      <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                      <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                      <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                      <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                      <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                      <option value="Returned" ${o.status === 'Returned' ? 'selected' : ''}>Returned</option>
                    </select>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-info" onclick="Admin.printVoucher('${o.orderId}')"><i class="fas fa-print"></i> ভাউচার</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="Admin.deleteOrder('${o.orderId}')"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="9" class="text-center py-4">কোন অর্ডার পাওয়া যায়নি।</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  changeOrderStatus(orderId, status) {
    API.updateOrderStatus(orderId, status);
    App.showToast(`অর্ডার স্ট্যাটাস '${status}' এ পরিবর্তিত হয়েছে।`, 'info');
  },

  deleteOrder(orderId) {
    if (confirm('অর্ডারটি মুছে ফেলতে চান?')) {
      API.deleteOrder(orderId);
      this.renderCurrentView();
    }
  },

  printVoucher(orderId) {
    const orders = API.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const printArea = document.getElementById('voucher-print-area');
    if (!printArea) return;

    printArea.innerHTML = `
      <div style="text-align:center; border-bottom:2px solid #333; padding-bottom:10px; margin-bottom:15px;">
        <h2 style="margin:0; font-size:22px;">Dream Cart BD</h2>
        <p style="margin:2px 0; font-size:12px;">You make. | Office Equipment & Camera Import Solutions</p>
        <p style="margin:2px 0; font-size:11px;">চৌধুরী প্লাজা, পদুয়ার বাজার, বিশ্ব রোড, কুমিল্লা | হটলাইন: 01581703822</p>
      </div>

      <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:12px;">
        <div>
          <strong>গ্রাহকের তথ্য:</strong><br>
          নাম: ${order.customerName}<br>
          মোবাইল: ${order.phone}<br>
          ঠিকানা: ${order.address}
        </div>
        <div style="text-align:right;">
          <strong>অর্ডার ইনভয়েস</strong><br>
          ইনভয়েস নং: <code>${order.orderId}</code><br>
          তারিখ: ${order.date || new Date().toLocaleDateString('bn-BD')}<br>
          পেমেন্ট: ${order.paymentMethod || 'COD'}
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:15px;">
        <thead>
          <tr style="background:#eee; border-top:1px solid #333; border-bottom:1px solid #333;">
            <th style="padding:6px; text-align:left;">বিবরণ</th>
            <th style="padding:6px; text-align:center;">পরিমাণ</th>
            <th style="padding:6px; text-align:right;">একক মূল্য</th>
            <th style="padding:6px; text-align:right;">মোট</th>
          </tr>
        </thead>
        <tbody>
          ${(order.items || []).map(i => `
            <tr style="border-bottom:1px solid #ddd;">
              <td style="padding:6px;">${i.name}</td>
              <td style="padding:6px; text-align:center;">${i.quantity}</td>
              <td style="padding:6px; text-align:right;">৳${i.price}</td>
              <td style="padding:6px; text-align:right;">৳${i.price * i.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="width:220px; margin-left:auto; font-size:12px; line-height:1.6;">
        <div style="display:flex; justify-content:space-between;"><span>সাবটোটাল:</span><span>৳${order.subtotal || order.totalAmount}</span></div>
        ${order.discount ? `<div style="display:flex; justify-content:space-between; color:green;"><span>অনলাইন ডিসকাউন্ট:</span><span>-৳${order.discount}</span></div>` : ''}
        <div style="display:flex; justify-content:space-between;"><span>ডেলিভারি চার্জ:</span><span>৳${order.deliveryFee || 0}</span></div>
        <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px; border-top:1px solid #333; padding-top:4px;">
          <span>সর্বমোট প্রদেয়:</span><span>৳${order.totalAmount}</span>
        </div>
      </div>

      <div style="margin-top:30px; padding-top:10px; border-top:1px dashed #999; display:flex; justify-content:space-between; font-size:11px;">
        <div>গ্রাহকের স্বাক্ষর</div>
        <div>অনুমোদিত কর্মকর্তা (Dream Cart BD)</div>
      </div>
    `;

    window.print();
  },

  // 4. Incomplete Orders View
  renderIncompleteOrders(container) {
    const incList = API.getIncompleteOrders();
    container.innerHTML = `
      <div class="table-header-bar mb-3" style="background:#111827; border-radius:8px;">
        <h4 style="margin:0;"><i class="fas fa-user-clock"></i> ইন-কমপ্লিট অর্ডারসমূহ</h4>
        <small class="text-muted">যারা চেকআউট ফর্মে নাম/ফোন লিখে অর্ডার সম্পূর্ণ করেনি</small>
      </div>

      <div class="admin-table-card">
        <div class="table-responsive">
          <table class="table-custom">
            <thead>
              <tr>
                <th>তারিখ</th>
                <th>গ্রাহক</th>
                <th>মোবাইল</th>
                <th>ঠিকানা</th>
                <th>আইটেমস</th>
                <th>একশন</th>
              </tr>
            </thead>
            <tbody>
              ${incList.map(item => `
                <tr>
                  <td>${item.date}</td>
                  <td><strong>${item.name || 'অজ্ঞাত'}</strong></td>
                  <td><a href="tel:${item.phone}">${item.phone}</a></td>
                  <td>${item.address || 'ফিলাপ করেনি'}</td>
                  <td>${(item.items || []).map(i => i.name).join(', ')}</td>
                  <td>
                    <a href="https://wa.me/88${item.phone}?text=Hello,%20we%20noticed%20you%20started%20an%20order%20on%20Dream%20Cart%20BD.%20Do%20you%20need%20any%20help?" 
                       target="_blank" class="btn btn-sm btn-success"><i class="fab fa-whatsapp"></i> ফলোআপ</a>
                    <button class="btn btn-sm btn-outline-danger" onclick="Admin.deleteIncomplete('${item.id}')"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center py-4">কোন ইন-কমপ্লিট অর্ডার নেই।</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  deleteIncomplete(id) {
    API.deleteIncompleteOrder(id);
    this.renderCurrentView();
  },

  // 5. Settings View
  renderSettings(container) {
    const settings = API.getSettings();
    const gasUrl = API.getGasEndpoint();

    container.innerHTML = `
      <div class="admin-table-card p-4">
        <h4><i class="fas fa-cogs"></i> ওয়েবসাইট ও ইন্টিগ্রেশন সেটিংস</h4>
        <hr style="border-color:#374151;">

        <div class="form-group mb-3">
          <label>Google Apps Script Web App URL (ডাটা অটো ব্যাকআপ ও ইমেইলের জন্য)</label>
          <input type="text" id="setting-gas-url" class="form-control" value="${gasUrl}" placeholder="https://script.google.com/macros/s/.../exec">
          <small class="text-muted">আপনার গুগল সীটের সাথে সংযুক্ত করতে গুগল এপস স্ক্রিপ্ট ডেপ্লয় করে প্রাপ্ত URL এখানে দিন।</small>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label>কুমিল্লার ভিতর ডেলিভারি চার্জ (৳)</label>
            <input type="number" id="setting-del-cumilla" class="form-control" value="${settings.delivery_rates.cumilla}">
          </div>
          <div class="form-group">
            <label>ঢাকার ভিতরে ডেলিভারি চার্জ (৳)</label>
            <input type="number" id="setting-del-dhaka" class="form-control" value="${settings.delivery_rates.dhaka}">
          </div>
          <div class="form-group">
            <label>ঢাকা ও কুমিল্লার বাইরে ডেলিভারি চার্জ (৳)</label>
            <input type="number" id="setting-del-outside" class="form-control" value="${settings.delivery_rates.outside}">
          </div>
          <div class="form-group">
            <label>ফ্রি ডেলিভারি শপিং লিমিট (৳)</label>
            <input type="number" id="setting-del-free" class="form-control" value="${settings.delivery_rates.free_threshold}">
          </div>
        </div>

        <div class="form-group mt-3">
          <button class="btn btn-primary" onclick="Admin.saveSettingsForm()"><i class="fas fa-save"></i> সেটিংস সংরক্ষণ করুন</button>
        </div>
      </div>
    `;
  },

  saveSettingsForm() {
    const gasUrl = document.getElementById('setting-gas-url').value;
    API.setGasEndpoint(gasUrl);

    const settings = API.getSettings();
    settings.delivery_rates.cumilla = parseFloat(document.getElementById('setting-del-cumilla').value) || 90;
    settings.delivery_rates.dhaka = parseFloat(document.getElementById('setting-del-dhaka').value) || 110;
    settings.delivery_rates.outside = parseFloat(document.getElementById('setting-del-outside').value) || 135;
    settings.delivery_rates.free_threshold = parseFloat(document.getElementById('setting-del-free').value) || 2000;

    API.saveSettings(settings);
    App.showToast('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  Admin.init();
});
