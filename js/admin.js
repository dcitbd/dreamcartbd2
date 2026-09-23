/**
 * DREAM CART BD — COMPLETE ADMIN & WORKER PORTAL (UPDATED)
 * Features: Password Dcbd@2026, Role-Based Access, Active/Deactive/Low-Stock Counters,
 * Order Status Counter Cards with Onclick Filtering, Brand Add/Edit/Delete, POS A5 Voucher.
 */
const ADMIN = {
  currentTab: 'dashboard',
  orderFilterStatus: 'ALL',
  productFilterStatus: 'ALL',

  // Admin Login Screen
  renderLogin() {
    return `
      <div class="auth-container max-w-md mx-auto py-5">
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-2xl">
          <div class="text-center mb-4">
            <img src="${CONFIG.logoUrl}" width="64" height="64" class="rounded-circle mb-2 shadow border-2 border-emerald" />
            <h3 class="fw-bold text-white">${CONFIG.appName}</h3>
            <p class="text-emerald text-xs fw-bold">${CONFIG.slogan}</p>
            <span class="badge bg-slate-800 text-muted mt-1">এডমিন ও কর্মী পোর্টাল</span>
          </div>

          <form onsubmit="ADMIN.handleLogin(event)">
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">ইউজার আইডি / ইমেইল</label>
              <input type="text" id="admin-user-id" class="form-control bg-slate-950 border-slate-700 text-white" 
                     placeholder="admin বা worker আইডি" value="admin" required />
            </div>
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">মাস্টার পাসওয়ার্ড</label>
              <input type="password" id="admin-user-pwd" class="form-control bg-slate-950 border-slate-700 text-white" 
                     placeholder="পাসওয়ার্ড দিন" value="Dcbd@2026" required />
              <small class="text-muted text-[10px]">অফিসিয়াল পাসওয়ার্ড: <code>Dcbd@2026</code></small>
            </div>
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">অ্যাক্সেস রোল</label>
              <select id="admin-role-select" class="form-select bg-slate-950 border-slate-700 text-white">
                <option value="Super Admin">Super Admin (সম্পূর্ণ এক্সেস)</option>
                <option value="Manager">Manager (অর্ডার, প্রোডাক্ট ও স্টক)</option>
                <option value="Worker">Worker / Dispatcher (অর্ডার প্রসেসিং)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100 py-2 fw-bold shadow-lg">
              লগইন করুন →
            </button>
          </form>
        </div>
      </div>
    `;
  },

  handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById('admin-user-id').value.trim();
    const pwd = document.getElementById('admin-user-pwd').value.trim();
    const role = document.getElementById('admin-role-select').value;

    if (pwd !== CONFIG.adminMasterPassword) {
      alert('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (Dcbd@2026)');
      return;
    }

    STORE.auth.loginAdmin({
      userId: id,
      name: id === 'admin' ? 'Jainal Abedin (Sagor)' : 'Authorized Worker',
      role: role,
      permissions: role === 'Super Admin' ? ['ALL'] : (role === 'Manager' ? ['ORDERS', 'PRODUCTS', 'CUSTOMERS'] : ['ORDERS'])
    });

    STORE.toast('success', 'এডমিন লগইন সফল!', `স্বাগতম, ${role}`);
    window.location.hash = '#/admin/dashboard';
  },

  // Main Admin Layout with Sidebar & Role-Based Nav
  async renderPortal() {
    const admin = STORE.auth.admin;
    if (!admin) {
      window.location.hash = '#/admin/login';
      return '';
    }

    const statsRes = await API.call('admin/stats');
    const stats = statsRes.data || {};

    return `
      <div class="admin-portal-wrapper">
        <div class="row g-0">
          
          <!-- Admin Sidebar -->
          <div class="col-12 col-md-3 col-xl-2 admin-sidebar p-3 border-end border-slate-800">
            
            <div class="d-flex align-items-center gap-2 mb-3 p-2 rounded-3 bg-slate-950 border border-slate-800">
              <img src="${CONFIG.logoUrl}" width="38" height="38" class="rounded-circle border border-emerald" />
              <div class="overflow-hidden">
                <div class="fw-bold text-xs text-white text-truncate">${admin.name}</div>
                <div class="badge bg-emerald/20 text-emerald text-[10px]">${admin.role}</div>
              </div>
            </div>

            <!-- Live Viewer Counter in Sidebar -->
            <div class="live-counter-pill mb-3 p-2 rounded-3 bg-emerald/10 border border-emerald/30 text-emerald text-xs d-flex align-items-center justify-content-between">
              <span><i class="bi bi-circle-fill text-danger animate-pulse me-1"></i> লাইভ ভিউয়ার:</span>
              <strong class="fs-6">${stats.liveViewers || 24} জন</strong>
            </div>

            <!-- Sidebar Navigation Links -->
            <ul class="nav flex-column admin-nav-links gap-1">
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('dashboard')" class="admin-link ${this.currentTab === 'dashboard' ? 'active' : ''}">
                  <i class="bi bi-speedometer2 me-2"></i> Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('products')" class="admin-link ${this.currentTab === 'products' ? 'active' : ''}">
                  <i class="bi bi-box-seam me-2"></i> Product List
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('orders')" class="admin-link ${this.currentTab === 'orders' ? 'active' : ''}">
                  <i class="bi bi-cart-check me-2"></i> Order List
                  ${stats.pendingOrders > 0 ? `<span class="badge bg-danger ms-auto">${stats.pendingOrders}</span>` : ''}
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('create_order')" class="admin-link ${this.currentTab === 'create_order' ? 'active' : ''}">
                  <i class="bi bi-plus-circle me-2"></i> Create Order (POS)
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('customers')" class="admin-link ${this.currentTab === 'customers' ? 'active' : ''}">
                  <i class="bi bi-people me-2"></i> User / Customer
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('wholesalers')" class="admin-link ${this.currentTab === 'wholesalers' ? 'active' : ''}">
                  <i class="bi bi-shop me-2"></i> WholeSeller List
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('buying')" class="admin-link ${this.currentTab === 'buying' ? 'active' : ''}">
                  <i class="bi bi-bag-check me-2"></i> Buying (ক্রয়)
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('invest')" class="admin-link ${this.currentTab === 'invest' ? 'active' : ''}">
                  <i class="bi bi-piggy-bank me-2"></i> Invest (বিনিয়োগ)
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('costs')" class="admin-link ${this.currentTab === 'costs' ? 'active' : ''}">
                  <i class="bi bi-cash-stack me-2"></i> Cost (খরচ)
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('workers')" class="admin-link ${this.currentTab === 'workers' ? 'active' : ''}">
                  <i class="bi bi-person-badge me-2"></i> Admin / Worker
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('brands')" class="admin-link ${this.currentTab === 'brands' ? 'active' : ''}">
                  <i class="bi bi-tags me-2"></i> Brands (এড/এডিট)
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('categories_tree')" class="admin-link ${this.currentTab === 'categories_tree' ? 'active' : ''}">
                  <i class="bi bi-diagram-3 me-2"></i> Categories Tree
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('reviews')" class="admin-link ${this.currentTab === 'reviews' ? 'active' : ''}">
                  <i class="bi bi-chat-left-text me-2"></i> Reviews
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('banners')" class="admin-link ${this.currentTab === 'banners' ? 'active' : ''}">
                  <i class="bi bi-images me-2"></i> Add Banner
                </a>
              </li>
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="ADMIN.switchTab('settings')" class="admin-link ${this.currentTab === 'settings' ? 'active' : ''}">
                  <i class="bi bi-gear me-2"></i> Settings
                </a>
              </li>
              <hr class="border-slate-800 my-2">
              <li class="nav-item">
                <a href="javascript:void(0)" onclick="STORE.auth.logoutAdmin(); window.location.hash='#/';" class="admin-link text-danger">
                  <i class="bi bi-box-arrow-right me-2"></i> Logout
                </a>
              </li>
            </ul>

          </div>

          <!-- Main Admin Content Area -->
          <div class="col-12 col-md-9 col-xl-10 admin-main-content p-4">
            <div id="admin-subview-mount">
              ${await this.renderTabView(this.currentTab, stats)}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async switchTab(tab) {
    this.currentTab = tab;
    const statsRes = await API.call('admin/stats');
    const mount = document.getElementById('admin-subview-mount');
    if (mount) {
      mount.innerHTML = await this.renderTabView(tab, statsRes.data || {});
    }
  },

  async renderTabView(tab, stats) {
    switch (tab) {
      case 'dashboard': return this.viewDashboard(stats);
      case 'products': return await this.viewProductList();
      case 'orders': return await this.viewOrderList();
      case 'create_order': return await this.viewCreateOrderPOS();
      case 'customers': return await this.viewCustomerList();
      case 'wholesalers': return await this.viewWholesalerList();
      case 'buying': return await this.viewBuyingList();
      case 'invest': return await this.viewInvestList();
      case 'costs': return await this.viewCostsList();
      case 'workers': return await this.viewWorkerList();
      case 'brands': return await this.viewBrandsList();
      case 'categories_tree': return await this.viewCategoriesTree();
      case 'reviews': return await this.viewReviewsList();
      case 'banners': return await this.viewBannersList();
      case 'settings': return this.viewSettings();
      default: return this.viewDashboard(stats);
    }
  },

  // 1. Dashboard Tab
  viewDashboard(stats) {
    return `
      <div class="admin-dashboard-view">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex align-items-center gap-3">
            <img src="${CONFIG.logoUrl}" width="50" height="50" class="rounded-circle shadow" />
            <div>
              <h3 class="fw-bold mb-0">অ্যাডমিন কন্ট্রোল ড্যাশবোর্ড</h3>
              <p class="text-muted text-xs mb-0">${CONFIG.slogan}</p>
            </div>
          </div>
          <button class="btn btn-sm btn-outline-emerald" onclick="ADMIN.switchTab('dashboard')">
            <i class="bi bi-arrow-clockwise me-1"></i> রিফ্রেশ
          </button>
        </div>

        <!-- 14 Counter Dashboard Cards -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট বিক্রয় (Selling)</div>
              <div class="kpi-val text-emerald">${CONFIG.currency}${(stats.totalSelling || 0).toLocaleString()}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট ক্রয় (Buying)</div>
              <div class="kpi-val text-amber">${CONFIG.currency}${(stats.totalBuying || 0).toLocaleString()}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট খরচ (Cost)</div>
              <div class="kpi-val text-danger">${CONFIG.currency}${(stats.totalCost || 0).toLocaleString()}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট ইনভেস্ট (Invest)</div>
              <div class="kpi-val text-info">${CONFIG.currency}${(stats.totalInvest || 0).toLocaleString()}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট অর্ডার (Orders)</div>
              <div class="kpi-val">${stats.totalOrders || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">পেন্ডিং অর্ডার (Pending)</div>
              <div class="kpi-val text-warning">${stats.pendingOrders || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">ইন-কমপ্লিট অর্ডার</div>
              <div class="kpi-val text-rose-400">${stats.incompleteOrders || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">মোট প্রোডাক্টস</div>
              <div class="kpi-val">${stats.totalProducts || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">কাস্টমার সংখ্যা</div>
              <div class="kpi-val">${stats.totalCustomers || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">হোলসেলার পার্টনার</div>
              <div class="kpi-val">${stats.totalWholesalers || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">কর্মী ও এডমিন</div>
              <div class="kpi-val">${stats.totalWorkers || 0}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-3">
            <div class="kpi-metric-card bg-slate-900 border-slate-800">
              <div class="text-xs text-muted">ব্র্যান্ড ও ক্যাটাগরি</div>
              <div class="kpi-val">${stats.totalBrands || 0} / ${stats.totalCategories || 0}</div>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  // 2. Product List Tab (Dynamic Onclick Counters for Active, Inactive, Low-Stock)
  async viewProductList() {
    const res = await API.call('products/list', { stockStatus: 'all' });
    let products = (res.data && res.data.items) || [];

    // Counters
    const totalCount = products.length;
    const activeCount = products.filter(p => (p.stock > 0) && (p.status !== 'inactive')).length;
    const inactiveCount = products.filter(p => p.status === 'inactive').length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outStockCount = products.filter(p => p.stock <= 0).length;

    return `
      <div class="admin-products-view">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h3 class="fw-bold mb-0">প্রোডাক্ট ম্যানেজমেন্ট</h3>
            <p class="text-muted text-xs">এড, এডিট, এক্টিভ/ডিএক্টিভ, স্টক ও ইনলাইন মূল্য পরিবর্তন</p>
          </div>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-sm btn-outline-light" onclick="ADMIN.exportCSV('product-table')"><i class="bi bi-file-earmark-spreadsheet me-1"></i> CSV</button>
            <button class="btn btn-sm btn-outline-light" onclick="window.print()"><i class="bi bi-printer me-1"></i> Print</button>
            <button class="btn btn-sm btn-primary fw-bold" onclick="ADMIN.openAddProductModal()"><i class="bi bi-plus-lg me-1"></i> Add Product (A-R)</button>
          </div>
        </div>

        <!-- On-Click Filter Counter Cards (Filter updates counters automatically) -->
        <div class="row g-2 mb-3">
          <div class="col-6 col-md-4 col-xl">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.productFilterStatus==='ALL'?'border-emerald':''}" 
                 onclick="ADMIN.filterProductsByStatus('ALL')">
              <span class="text-xs text-muted">সকল প্রোডাক্ট</span>
              <div class="fs-5 fw-bold text-white">${totalCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.productFilterStatus==='ACTIVE'?'border-emerald':''}" 
                 onclick="ADMIN.filterProductsByStatus('ACTIVE')">
              <span class="text-xs text-success">এক্টিভ প্রোডাক্ট</span>
              <div class="fs-5 fw-bold text-success">${activeCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.productFilterStatus==='INACTIVE'?'border-emerald':''}" 
                 onclick="ADMIN.filterProductsByStatus('INACTIVE')">
              <span class="text-xs text-danger">ডি-এক্টিভ প্রোডাক্ট</span>
              <div class="fs-5 fw-bold text-danger">${inactiveCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.productFilterStatus==='LOW_STOCK'?'border-emerald':''}" 
                 onclick="ADMIN.filterProductsByStatus('LOW_STOCK')">
              <span class="text-xs text-warning">লো স্টক (≤৫)</span>
              <div class="fs-5 fw-bold text-warning">${lowStockCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.productFilterStatus==='OUT_OF_STOCK'?'border-emerald':''}" 
                 onclick="ADMIN.filterProductsByStatus('OUT_OF_STOCK')">
              <span class="text-xs text-muted">আউট অব স্টক</span>
              <div class="fs-5 fw-bold text-rose-400">${outStockCount}</div>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="card bg-slate-900 border-slate-800 p-2 rounded-3 mb-3">
          <input type="text" class="form-control form-control-sm bg-slate-950 border-slate-700 text-white" 
                 placeholder="নাম, SKU, ব্র্যান্ড বা ক্যাটাগরি দিয়ে খুঁজুন..." oninput="ADMIN.searchProductTable(this.value)" />
        </div>

        <!-- Product Table with Onclick Inline Editable Fields -->
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle text-xs mb-0" id="product-table">
              <thead class="table-slate-800 text-muted text-uppercase">
                <tr>
                  <th>Image</th>
                  <th>Name & SKU</th>
                  <th>Category</th>
                  <th>Original (J)</th>
                  <th>Selling (H)</th>
                  <th>Buying (G)</th>
                  <th>Stock (I)</th>
                  <th>Status</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => {
                  const isLow = p.stock > 0 && p.stock <= 5;
                  const isOut = p.stock <= 0;
                  const isInactive = p.status === 'inactive';

                  return `
                    <tr class="prod-row ${isInactive ? 'status-inactive' : (isOut ? 'status-out' : (isLow ? 'status-low' : 'status-active'))}">
                      <td><img src="${p.primaryImage}" width="38" height="38" class="rounded" style="object-fit: cover;" /></td>
                      <td style="max-width: 180px;">
                        <div class="fw-bold text-white text-truncate">${p.name}</div>
                        <small class="text-muted">${p.sku} | ${p.brand}</small>
                      </td>
                      <td><span class="badge bg-slate-800">${p.category}</span></td>
                      
                      <!-- Original Price (Onclick Editable) -->
                      <td>
                        <span class="editable-cell" onclick="ADMIN.inlineEdit(this, '${p.sku}', 'originalPrice')">
                          ${CONFIG.currency}${p.originalPrice}
                        </span>
                      </td>

                      <!-- Selling Price (Onclick Editable) -->
                      <td>
                        <span class="editable-cell text-emerald fw-bold" onclick="ADMIN.inlineEdit(this, '${p.sku}', 'sellingPrice')">
                          ${CONFIG.currency}${p.sellingPrice}
                        </span>
                      </td>

                      <!-- Buying Price (Onclick Editable) -->
                      <td>
                        <span class="editable-cell text-amber" onclick="ADMIN.inlineEdit(this, '${p.sku}', 'buyingPrice')">
                          ${CONFIG.currency}${p.buyingPrice}
                        </span>
                      </td>

                      <!-- Stock (Onclick Editable) -->
                      <td>
                        <span class="editable-cell ${isOut ? 'text-danger' : (isLow ? 'text-warning' : 'text-success')}" 
                              onclick="ADMIN.inlineEdit(this, '${p.sku}', 'stock')">
                          ${p.stock}
                        </span>
                      </td>

                      <td>
                        <button class="btn btn-xs ${isInactive ? 'btn-outline-danger' : 'btn-outline-success'}" 
                                onclick="ADMIN.toggleProductStatus('${p.sku}')">
                          ${isInactive ? 'ডি-এক্টিভ' : 'এক্টিভ'}
                        </button>
                      </td>

                      <td class="text-end">
                        <button class="btn btn-xs btn-outline-info me-1" onclick="window.location.hash='#/product/${p.sku}'"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-xs btn-outline-danger" onclick="ADMIN.deleteProduct('${p.sku}')"><i class="bi bi-trash"></i></button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  filterProductsByStatus(status) {
    this.productFilterStatus = status;
    const rows = document.querySelectorAll('#product-table tbody tr');
    rows.forEach(r => {
      if (status === 'ALL') r.style.display = '';
      else if (status === 'ACTIVE') r.style.display = (r.classList.contains('status-active') || r.classList.contains('status-low')) ? '' : 'none';
      else if (status === 'INACTIVE') r.style.display = r.classList.contains('status-inactive') ? '' : 'none';
      else if (status === 'LOW_STOCK') r.style.display = r.classList.contains('status-low') ? '' : 'none';
      else if (status === 'OUT_OF_STOCK') r.style.display = r.classList.contains('status-out') ? '' : 'none';
    });
  },

  async toggleProductStatus(sku) {
    const prods = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.PRODUCTS) || '[]');
    const p = prods.find(item => item.sku === sku);
    if (p) {
      p.status = (p.status === 'inactive') ? 'active' : 'inactive';
      localStorage.setItem(API.STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
      STORE.toast('info', 'স্ট্যাটাস পরিবর্তিত হয়েছে', `${p.name} এখন ${p.status}`);
      ADMIN.switchTab('products');
    }
  },

  async inlineEdit(element, sku, field) {
    const currentVal = element.textContent.replace(/[^0-9.]/g, '').trim();
    const newVal = prompt(`নতুন ${field} নির্ধারণ করুন:`, currentVal);
    if (newVal !== null && newVal !== currentVal && newVal !== '') {
      const payload = { sku };
      payload[field] = newVal;
      const res = await API.call('products/update_inline', payload);
      if (res.success) {
        element.textContent = (field === 'stock') ? newVal : `${CONFIG.currency}${parseFloat(newVal).toLocaleString()}`;
        STORE.toast('success', 'আপডেট সফল!', `${field} পরিবর্তিত হয়েছে।`);
      }
    }
  },

  async deleteProduct(sku) {
    if (confirm('আপনি কি এই প্রোডাক্টটি নিশ্চিতভাবে মুছে ফেলতে চান?')) {
      await API.call('products/delete', { sku });
      STORE.toast('info', 'প্রোডাক্ট ডিলিট করা হয়েছে');
      ADMIN.switchTab('products');
    }
  },

  openAddProductModal() {
    const modalHtml = `
      <div class="modal fade" id="addProductModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-slate-900 text-white border-slate-700">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title fw-bold">নতুন প্রোডাক্ট যুক্ত করুন (Columns A-R)</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form onsubmit="ADMIN.handleAddProductSubmit(event)">
                <div class="row g-2">
                  <div class="col-6"><label class="form-label text-xs">A: ID / SKU *</label><input type="text" id="np-sku" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" placeholder="SKU" required /></div>
                  <div class="col-6"><label class="form-label text-xs">B: Product Name *</label><input type="text" id="np-name" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" placeholder="নাম" required /></div>
                  <div class="col-4"><label class="form-label text-xs">C: Category *</label><input type="text" id="np-cat" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required /></div>
                  <div class="col-4"><label class="form-label text-xs">D: Sub Category</label><input type="text" id="np-subcat" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-4"><label class="form-label text-xs">E: Child Category</label><input type="text" id="np-childcat" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-6"><label class="form-label text-xs">F: Brand</label><input type="text" id="np-brand" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-6"><label class="form-label text-xs">G: Buying Price</label><input type="number" id="np-buy" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required /></div>
                  <div class="col-4"><label class="form-label text-xs">H: Selling Price *</label><input type="number" id="np-sell" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required /></div>
                  <div class="col-4"><label class="form-label text-xs">I: Stock Qty *</label><input type="number" id="np-stock" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required /></div>
                  <div class="col-4"><label class="form-label text-xs">J: Original Price</label><input type="number" id="np-orig" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-6"><label class="form-label text-xs">K: Wholesale Price</label><input type="number" id="np-ws" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-6"><label class="form-label text-xs">L: Min Order Qty</label><input type="text" id="np-minq" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="5 Pcs" /></div>
                  <div class="col-12"><label class="form-label text-xs">M: Images URL (কমা দিয়ে একাধিক)</label><input type="text" id="np-images" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-12"><label class="form-label text-xs">N: Description</label><textarea id="np-desc" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" rows="2"></textarea></div>
                  <div class="col-12"><label class="form-label text-xs">O: Specification</label><textarea id="np-spec" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" rows="2"></textarea></div>
                  <div class="col-4"><label class="form-label text-xs">P: Others</label><input type="text" id="np-others" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-4"><label class="form-label text-xs">Q: Color</label><input type="text" id="np-color" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                  <div class="col-4"><label class="form-label text-xs">R: Size</label><input type="text" id="np-size" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" /></div>
                </div>
                <div class="mt-4 text-end">
                  <button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal">বাতিল</button>
                  <button type="submit" class="btn btn-primary btn-sm px-4">সংরক্ষণ করুন</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    const container = document.getElementById('modal-mount') || document.body;
    document.getElementById('addProductModal')?.remove();
    container.insertAdjacentHTML('beforeend', modalHtml);
    new bootstrap.Modal(document.getElementById('addProductModal')).show();
  },

  async handleAddProductSubmit(e) {
    e.preventDefault();
    const payload = {
      sku: document.getElementById('np-sku').value,
      name: document.getElementById('np-name').value,
      category: document.getElementById('np-cat').value,
      subCategory: document.getElementById('np-subcat').value,
      childCategory: document.getElementById('np-childcat').value,
      brand: document.getElementById('np-brand').value,
      buyingPrice: document.getElementById('np-buy').value,
      sellingPrice: document.getElementById('np-sell').value,
      stock: document.getElementById('np-stock').value,
      originalPrice: document.getElementById('np-orig').value,
      wholesalePrice: document.getElementById('np-ws').value,
      minOrderQ: document.getElementById('np-minq').value,
      images: (document.getElementById('np-images').value || '').split(',').map(s=>s.trim()).filter(Boolean),
      description: document.getElementById('np-desc').value,
      specification: document.getElementById('np-spec').value,
      others: document.getElementById('np-others').value,
      color: document.getElementById('np-color').value,
      size: document.getElementById('np-size').value
    };

    const res = await API.call('products/add', payload);
    if (res.success) {
      bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
      STORE.toast('success', 'প্রোডাক্ট যুক্ত হয়েছে!', payload.name);
      ADMIN.switchTab('products');
    }
  },

  searchProductTable(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#product-table tbody tr');
    rows.forEach(r => {
      r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  },

  // 3. Orders List & Incomplete Orders Tab (Dynamic Onclick Status Filter Cards)
  async viewOrderList() {
    const ordersRes = await API.call('orders/list');
    const orders = (ordersRes.data && ordersRes.data.items) || [];

    const incRes = await API.call('orders/incomplete_list');
    const incOrders = (incRes.data && incRes.data.items) || [];

    // Order status counters
    const totalCount = orders.length;
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const successCount = orders.filter(o => o.status === 'Delivered').length;
    const cancelCount = orders.filter(o => o.status === 'Cancelled').length;
    const returnCount = orders.filter(o => o.status === 'Returned').length;
    const damageCount = orders.filter(o => o.status === 'Damage').length;

    return `
      <div class="admin-orders-view">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 class="fw-bold mb-0">অর্ডার কন্ট্রোল সেন্টার</h3>
            <p class="text-muted text-xs">স্ট্যাটাস অনুযায়ী রিয়েল-টাইম ফিল্টার, ইনভয়েস ও ইন-কমপ্লিট অর্ডার</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-light" onclick="ADMIN.exportCSV('orders-table')"><i class="bi bi-download me-1"></i> Export CSV</button>
            <button class="btn btn-sm btn-outline-light" onclick="window.print()"><i class="bi bi-printer me-1"></i> Print</button>
          </div>
        </div>

        <!-- Status Filter Counter Cards -->
        <div class="row g-2 mb-3">
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='ALL'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('ALL')">
              <span class="text-xs text-muted">মোট অর্ডার</span>
              <div class="fs-5 fw-bold text-white">${totalCount}</div>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='Pending'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('Pending')">
              <span class="text-xs text-warning">পেন্ডিং</span>
              <div class="fs-5 fw-bold text-warning">${pendingCount}</div>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='Delivered'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('Delivered')">
              <span class="text-xs text-success">সাকসেস</span>
              <div class="fs-5 fw-bold text-success">${successCount}</div>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='Cancelled'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('Cancelled')">
              <span class="text-xs text-danger">ক্যান্সেল</span>
              <div class="fs-5 fw-bold text-danger">${cancelCount}</div>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='Returned'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('Returned')">
              <span class="text-xs text-info">রিটার্ন</span>
              <div class="fs-5 fw-bold text-info">${returnCount}</div>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="card p-2 rounded-3 bg-slate-900 border-slate-800 text-center cursor-pointer counter-card ${this.orderFilterStatus==='Damage'?'border-emerald':''}" 
                 onclick="ADMIN.filterOrdersByStatus('Damage')">
              <span class="text-xs text-muted">ড্যামেজ/লস</span>
              <div class="fs-5 fw-bold text-muted">${damageCount}</div>
            </div>
          </div>
        </div>

        <!-- Orders Navigation Tabs -->
        <ul class="nav nav-tabs border-slate-800 mb-3" id="orderSubTabs" role="tablist">
          <li class="nav-item">
            <button class="nav-link active btn-sm text-white" data-bs-toggle="tab" data-bs-target="#activeOrdersPane">
              অর্ডার তালিকা (${orders.length})
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link btn-sm text-rose-400" data-bs-toggle="tab" data-bs-target="#incompleteOrdersPane">
              ইন-কমপ্লিট অর্ডার (${incOrders.length})
            </button>
          </li>
        </ul>

        <div class="tab-content" id="orderSubTabContent">
          
          <div class="tab-pane fade show active" id="activeOrdersPane">
            <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle text-xs mb-0" id="orders-table">
                  <thead class="table-slate-800 text-muted">
                    <tr>
                      <th>OrderID</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Product Name</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th class="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orders.map(o => `
                      <tr data-status="${o.status}">
                        <td><strong>${o.orderId}</strong></td>
                        <td>${o.date}</td>
                        <td class="fw-bold">${o.customerName}</td>
                        <td>${o.phone}</td>
                        <td class="text-truncate" style="max-width: 120px;">${o.address}</td>
                        <td class="text-truncate" style="max-width: 140px;">${o.products}</td>
                        <td>${o.quantity || 1}</td>
                        <td class="text-emerald fw-bold">${CONFIG.currency}${o.totalAmount.toLocaleString()}</td>
                        <td>
                          <select class="form-select form-select-xs bg-slate-950 text-white border-slate-700" 
                                  onchange="ADMIN.updateOrderStatus('${o.orderId}', this.value)">
                            <option value="Pending" ${o.status==='Pending'?'selected':''}>Pending</option>
                            <option value="Confirmed" ${o.status==='Confirmed'?'selected':''}>Confirmed</option>
                            <option value="Shipped" ${o.status==='Shipped'?'selected':''}>Shipped</option>
                            <option value="Delivered" ${o.status==='Delivered'?'selected':''}>Delivered</option>
                            <option value="Cancelled" ${o.status==='Cancelled'?'selected':''}>Cancelled</option>
                            <option value="Returned" ${o.status==='Returned'?'selected':''}>Returned</option>
                            <option value="Damage" ${o.status==='Damage'?'selected':''}>Damage</option>
                          </select>
                        </td>
                        <td class="text-end">
                          <button class="btn btn-xs btn-outline-info me-1" onclick="PAGES.printOrderVoucher('${o.orderId}')" title="A5 ভাউচার প্রিন্ট"><i class="bi bi-printer"></i></button>
                          <button class="btn btn-xs btn-outline-danger" onclick="ADMIN.deleteOrder('${o.orderId}')"><i class="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="incompleteOrdersPane">
            <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle text-xs mb-0">
                  <thead class="table-slate-800 text-muted">
                    <tr>
                      <th>Incomplete ID</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Products</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${incOrders.map(io => `
                      <tr>
                        <td><span class="text-rose-400 font-monospace">${io.orderId}</span></td>
                        <td>${io.date}</td>
                        <td>${io.customerName}</td>
                        <td class="fw-bold"><a href="tel:${io.phone}" class="text-emerald text-decoration-none"><i class="bi bi-telephone me-1"></i>${io.phone}</a></td>
                        <td>${io.address || 'N/A'}</td>
                        <td>${io.products}</td>
                        <td>
                          <button class="btn btn-xs btn-success me-1" onclick="ADMIN.sendToOrderList('${io.orderId}')">Send to Order List</button>
                          <button class="btn btn-xs btn-outline-danger" onclick="alert('Delete simulated')">Delete</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  filterOrdersByStatus(status) {
    this.orderFilterStatus = status;
    const rows = document.querySelectorAll('#orders-table tbody tr');
    rows.forEach(r => {
      if (status === 'ALL') r.style.display = '';
      else r.style.display = (r.dataset.status === status) ? '' : 'none';
    });
  },

  async updateOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.ORDERS) || '[]');
    const o = orders.find(item => item.orderId === orderId);
    if (o) {
      o.status = newStatus;
      localStorage.setItem(API.STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      STORE.toast('success', 'স্ট্যাটাস আপডেট হয়েছে', `${orderId} এখন ${newStatus}`);
      ADMIN.switchTab('orders');
    }
  },

  async deleteOrder(orderId) {
    if (confirm('অর্ডারটি মুছে ফেলতে নিশ্চিত?')) {
      let orders = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.ORDERS) || '[]');
      orders = orders.filter(o => o.orderId !== orderId);
      localStorage.setItem(API.STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      STORE.toast('info', 'অর্ডার ডিলিট হয়েছে');
      ADMIN.switchTab('orders');
    }
  },

  async sendToOrderList(incompleteId) {
    let incOrders = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.INCOMPLETE) || '[]');
    const found = incOrders.find(io => io.orderId === incompleteId);
    if (found) {
      await API.call('orders/create', {
        name: found.customerName,
        phone: found.phone,
        address: found.address,
        totalAmount: found.totalAmount,
        items: found.items,
        source: 'Recovered from Incomplete'
      });
      incOrders = incOrders.filter(io => io.orderId !== incompleteId);
      localStorage.setItem(API.STORAGE_KEYS.INCOMPLETE, JSON.stringify(incOrders));
      STORE.toast('success', 'অর্ডার সফলভাবে মূল তালিকায় যুক্ত হয়েছে!');
      ADMIN.switchTab('orders');
    }
  },

  // 4. POS / Create Order Tab (with A5 Voucher generator)
  async viewCreateOrderPOS() {
    const prodsRes = await API.call('products/list');
    const prods = (prodsRes.data && prodsRes.data.items) || [];

    return `
      <div class="admin-pos-view">
        <h3 class="fw-bold mb-3">নতুন অর্ডার তৈরি করুন (POS / ম্যানুয়াল অর্ডার)</h3>
        
        <div class="row g-4">
          <div class="col-12 col-lg-7">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
              <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2">অর্ডার ও কাস্টমার ফর্ম</h5>
              <form onsubmit="ADMIN.handlePOSSubmit(event)">
                <div class="row g-2 mb-3">
                  <div class="col-6">
                    <label class="form-label text-xs fw-bold">কাস্টমারের নাম *</label>
                    <input type="text" id="pos-cust-name" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required />
                  </div>
                  <div class="col-6">
                    <label class="form-label text-xs fw-bold">মোবাইল নম্বর *</label>
                    <input type="tel" id="pos-cust-phone" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required />
                  </div>
                  <div class="col-12">
                    <label class="form-label text-xs fw-bold">ডেলিভারি ঠিকানা *</label>
                    <input type="text" id="pos-cust-addr" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" required />
                  </div>
                  <div class="col-6">
                    <label class="form-label text-xs fw-bold">ডেলিভারি এরিয়া</label>
                    <select id="pos-delivery-zone" class="form-select form-select-sm bg-slate-950 text-white border-slate-700" onchange="ADMIN.updatePOSTotals()">
                      <option value="${CONFIG.deliveryCumilla}">কুমিল্লার ভেতর (৳${CONFIG.deliveryCumilla})</option>
                      <option value="${CONFIG.deliveryDhaka}">ঢাকার ভেতরে (৳${CONFIG.deliveryDhaka})</option>
                      <option value="${CONFIG.deliveryOutside}" selected>উভয়ের বাইরে (৳${CONFIG.deliveryOutside})</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label class="form-label text-xs fw-bold">ডিসকাউন্ট (৳)</label>
                    <input type="number" id="pos-discount" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="0" oninput="ADMIN.updatePOSTotals()" />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">প্রোডাক্ট নির্বাচন করুন</label>
                  <select id="pos-product-select" class="form-select form-select-sm bg-slate-950 text-white border-slate-700" onchange="ADMIN.addPOSItem(this.value)">
                    <option value="">-- প্রোডাক্ট বেছে নিন --</option>
                    ${prods.map(p => `<option value="${p.sku}">${p.name} — ${CONFIG.currency}${p.sellingPrice} (Stock: ${p.stock})</option>`).join('')}
                  </select>
                </div>

                <div id="pos-items-table" class="mb-3">
                  <div class="text-muted text-xs py-2">কোনো প্রোডাক্ট যোগ করা হয়নি।</div>
                </div>

                <div class="d-flex justify-content-between align-items-center border-top border-slate-800 pt-3 mb-3">
                  <span class="fw-bold">সর্বমোট প্রদেয় টাকা:</span>
                  <span id="pos-grand-total" class="fs-4 fw-bold text-emerald">${CONFIG.currency}০</span>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
                  <i class="bi bi-printer me-1"></i> অর্ডার সাবমিট ও A5 ভাউচার তৈরি করুন
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  _posItems: [],
  addPOSItem(sku) {
    if (!sku) return;
    const prods = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.PRODUCTS) || '[]');
    const p = prods.find(item => item.sku === sku);
    if (p) {
      this._posItems.push({ sku: p.sku, name: p.name, price: p.sellingPrice, qty: 1 });
      this.renderPOSItems();
    }
  },

  renderPOSItems() {
    const mount = document.getElementById('pos-items-table');
    if (!mount) return;
    if (this._posItems.length === 0) {
      mount.innerHTML = `<div class="text-muted text-xs py-2">কোনো প্রোডাক্ট যোগ করা হয়নি।</div>`;
      this.updatePOSTotals();
      return;
    }

    mount.innerHTML = `
      <table class="table table-dark table-sm text-xs mb-0">
        <thead><tr><th>আইটেম</th><th>মূল্য</th><th>পরিমাণ</th><th>মোট</th><th></th></tr></thead>
        <tbody>
          ${this._posItems.map((it, idx) => `
            <tr>
              <td>${it.name}</td>
              <td>${CONFIG.currency}${it.price}</td>
              <td><input type="number" value="${it.qty}" min="1" class="form-control form-control-sm w-16 text-center" onchange="ADMIN._posItems[${idx}].qty=parseInt(this.value,10); ADMIN.updatePOSTotals();"></td>
              <td>${CONFIG.currency}${(it.price * it.qty).toLocaleString()}</td>
              <td><button type="button" class="btn btn-link text-danger p-0" onclick="ADMIN._posItems.splice(${idx},1); ADMIN.renderPOSItems();"><i class="bi bi-trash"></i></button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    this.updatePOSTotals();
  },

  updatePOSTotals() {
    const sub = this._posItems.reduce((s, i) => s + (i.price * i.qty), 0);
    let del = parseInt(document.getElementById('pos-delivery-zone')?.value || CONFIG.deliveryOutside, 10);
    if (sub >= CONFIG.freeDeliveryThreshold) del = 0;
    const disc = parseInt(document.getElementById('pos-discount')?.value || '0', 10);
    const grand = Math.max(0, sub + del - disc);
    const el = document.getElementById('pos-grand-total');
    if (el) el.textContent = `${CONFIG.currency}${grand.toLocaleString()}`;
  },

  async handlePOSSubmit(e) {
    e.preventDefault();
    if (this._posItems.length === 0) {
      alert('দয়া করে অন্তত একটি প্রোডাক্ট যোগ করুন!');
      return;
    }
    const name = document.getElementById('pos-cust-name').value;
    const phone = document.getElementById('pos-cust-phone').value;
    const address = document.getElementById('pos-cust-addr').value;
    const sub = this._posItems.reduce((s, i) => s + (i.price * i.qty), 0);
    let deliveryCharge = parseInt(document.getElementById('pos-delivery-zone').value, 10);
    if (sub >= CONFIG.freeDeliveryThreshold) deliveryCharge = 0;
    const discount = parseInt(document.getElementById('pos-discount').value || '0', 10);
    const totalAmount = sub + deliveryCharge - discount;

    const payload = {
      name, phone, address,
      deliveryZone: deliveryCharge === 90 ? 'cumilla' : (deliveryCharge === 110 ? 'dhaka' : 'outside'),
      deliveryCharge,
      discount,
      totalAmount,
      subtotal: sub,
      source: 'Admin POS (Manual Order)',
      items: this._posItems
    };

    const res = await API.call('orders/create', payload);
    if (res.success && res.data) {
      STORE.toast('success', 'POS অর্ডার তৈরি হয়েছে!', `অর্ডার নং: ${res.data.orderId}`);
      this._posItems = [];
      PAGES.printOrderVoucher(res.data.orderId);
      ADMIN.switchTab('orders');
    }
  },

  // 5. Brands Tab (Add, Edit, Delete Brands)
  async viewBrandsList() {
    const brands = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BRANDS) || JSON.stringify([
      { id: 'BRD-01', name: 'Huawei', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100', desc: 'গ্লোবাল প্রিমিয়াম স্মার্টওয়াচ ও ব্যান্ড' },
      { id: 'BRD-02', name: 'OnePlus', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100', desc: 'ডুয়াল ইঞ্জিন স্মার্ট ওয়েরেবল' },
      { id: 'BRD-03', name: 'Amazfit', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100', desc: 'অ্যামোলেড ফিটনেস ট্র্যাকিং স্মার্টওয়াচ' },
      { id: 'BRD-04', name: 'Dream Pure', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100', desc: '১০০% খাঁটি পেরুভিয়ান অর্গানিক সাপ্লিমেন্ট' }
    ]));

    return `
      <div class="admin-brands-view">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 class="fw-bold mb-0">ব্র্যান্ড ম্যানেজমেন্ট</h3>
            <p class="text-muted text-xs">এড, এডিট ও ডিলিট ব্র্যান্ডস</p>
          </div>
          <button class="btn btn-sm btn-primary" onclick="ADMIN.openAddBrandModal()"><i class="bi bi-plus-lg me-1"></i> Add Brand</button>
        </div>

        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover align-middle text-xs mb-0">
            <thead class="table-slate-800 text-muted">
              <tr><th>Brand ID</th><th>Logo</th><th>Brand Name</th><th>Description</th><th class="text-end">Action</th></tr>
            </thead>
            <tbody>
              ${brands.map(b => `
                <tr>
                  <td>${b.id}</td>
                  <td><img src="${b.image}" width="36" height="36" class="rounded" style="object-fit: cover;" /></td>
                  <td class="fw-bold text-white">${b.name}</td>
                  <td class="text-muted">${b.desc}</td>
                  <td class="text-end">
                    <button class="btn btn-xs btn-outline-info me-1" onclick="ADMIN.editBrand('${b.id}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-xs btn-outline-danger" onclick="ADMIN.deleteBrand('${b.id}')"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openAddBrandModal() {
    const name = prompt('ব্র্যান্ডের নাম লিখুন:');
    if (!name) return;
    const desc = prompt('ব্র্যান্ড বিবরণ:');
    const brands = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BRANDS) || '[]');
    const newBrd = {
      id: 'BRD-0' + (brands.length + 1),
      name,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
      desc: desc || ''
    };
    brands.push(newBrd);
    localStorage.setItem(API.STORAGE_KEYS.BRANDS, JSON.stringify(brands));
    STORE.toast('success', 'নতুন ব্র্যান্ড যুক্ত হয়েছে!');
    ADMIN.switchTab('brands');
  },

  editBrand(id) {
    const brands = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BRANDS) || '[]');
    const b = brands.find(item => item.id === id);
    if (b) {
      const name = prompt('নতুন ব্র্যান্ডের নাম:', b.name);
      if (name) {
        b.name = name;
        localStorage.setItem(API.STORAGE_KEYS.BRANDS, JSON.stringify(brands));
        STORE.toast('success', 'ব্র্যান্ড আপডেট হয়েছে!');
        ADMIN.switchTab('brands');
      }
    }
  },

  deleteBrand(id) {
    if (confirm('ব্র্যান্ডটি মুছে ফেলতে চান?')) {
      let brands = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BRANDS) || '[]');
      brands = brands.filter(b => b.id !== id);
      localStorage.setItem(API.STORAGE_KEYS.BRANDS, JSON.stringify(brands));
      STORE.toast('info', 'ব্র্যান্ড ডিলিট হয়েছে');
      ADMIN.switchTab('brands');
    }
  },

  // 6. Customers Tab
  async viewCustomerList() {
    return `
      <div class="admin-customers-view">
        <h3 class="fw-bold mb-3">কাস্টমার ডাটাবেজ ও ভেরিফিকেশন</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover align-middle text-xs mb-0">
            <thead class="table-slate-800 text-muted">
              <tr><th>Customer ID</th><th>Name</th><th>Phone</th><th>Address</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>CUST-1001</td><td class="fw-bold">আব্দুল করিম</td><td>01815592089</td><td>কুমিল্লা, বাংলাদেশ</td><td><span class="badge bg-success">Verified</span></td></tr>
              <tr><td>CUST-1002</td><td class="fw-bold">মো: রফিকুল</td><td>01712000000</td><td>মিরপুর, ঢাকা</td><td><span class="badge bg-danger">Fraud Suspect</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 7. Wholesalers Tab
  async viewWholesalerList() {
    return `
      <div class="admin-ws-view">
        <h3 class="fw-bold mb-3">হোলসেলার তালিকা (WholeSeller)</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>Shop ID</th><th>Shop Name</th><th>Owner</th><th>Mobile</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>WS-401</td><td class="fw-bold text-amber">কাইরুল আমিন কম্পিউটার</td><td>কাইরুল আমিন</td><td>8801735-442672</td><td><span class="badge bg-success">Active Wholesaler</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 8. Buying Tab
  async viewBuyingList() {
    return `
      <div class="admin-buying-view">
        <h3 class="fw-bold mb-3">ক্রয় তালিকা (Buying)</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>Date</th><th>Product</th><th>Buying Price</th><th>Qty</th><th>Total</th><th>Supplier</th></tr></thead>
            <tbody>
              <tr><td>2026-09-15</td><td>Huawei Watch GT 4 Pro</td><td>৳১৮,৫০০</td><td>২০ পিস</td><td class="text-amber fw-bold">৳৩,৭০,০০০</td><td>Azad Importers</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 9. Invest Tab
  async viewInvestList() {
    return `
      <div class="admin-invest-view">
        <h3 class="fw-bold mb-3">ইনভেস্টমেন্ট রেকর্ডস (Invest)</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>Date</th><th>Type</th><th>Investor</th><th>Amount</th><th>Note</th></tr></thead>
            <tbody>
              <tr><td>2026-08-01</td><td>Stock Capital</td><td>J.A. Sagor</td><td class="text-emerald fw-bold">৳২,৫০,০০০</td><td>গ্যাজেট ও অর্গানিক স্টক ফান্ড</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 10. Cost Tab
  async viewCostsList() {
    return `
      <div class="admin-cost-view">
        <h3 class="fw-bold mb-3">খরচের হিসাব (Costs)</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>Date</th><th>Purpose</th><th>Amount</th><th>Note</th></tr></thead>
            <tbody>
              <tr><td>2026-09-01</td><td>প্যাকেজিং বক্স ও লেবেল প্রিন্ট</td><td class="text-danger fw-bold">৳৪,৫০০</td><td>৫০০ পিস বক্স</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 11. Workers Tab
  async viewWorkerList() {
    return `
      <div class="admin-workers-view">
        <h3 class="fw-bold mb-3">কর্মী ও এডমিন তালিকা</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>USER_ID</th><th>Name</th><th>Role</th><th>Mobile</th></tr></thead>
            <tbody>
              <tr><td>ADM-01</td><td class="fw-bold">Jainal Abedin (Sagor)</td><td><span class="badge bg-danger">Super Admin</span></td><td>01351003958</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 12. Categories Tree Tab
  async viewCategoriesTree() {
    return `
      <div class="admin-categories-tree-view">
        <h3 class="fw-bold mb-3">ক্যাটাগরি ট্রি (Category Tree Architecture)</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
          <div class="p-2 rounded bg-slate-950 border border-slate-800 mb-2">
            <strong class="text-emerald">📂 Smartwatches & Wearables</strong>
            <div class="ms-4 text-xs text-muted mt-1">└── 📁 Bluetooth Calling ➔ 📄 AMOLED Watch</div>
          </div>
          <div class="p-2 rounded bg-slate-950 border border-slate-800 mb-2">
            <strong class="text-emerald">📂 Torch & Tactical Light</strong>
            <div class="ms-4 text-xs text-muted mt-1">└── 📁 Searchlights ➔ 📄 5000LM Rechargeable</div>
          </div>
          <div class="p-2 rounded bg-slate-950 border border-slate-800">
            <strong class="text-emerald">📂 Organic Health Supplements</strong>
            <div class="ms-4 text-xs text-muted mt-1">└── 📁 Herbal Powders ➔ 📄 Peruvian Maca (250g)</div>
          </div>
        </div>
      </div>
    `;
  },

  // 13. Reviews Tab
  async viewReviewsList() {
    return `
      <div class="admin-reviews-view">
        <h3 class="fw-bold mb-3">কাস্টমার রিভিউ</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 shadow-lg overflow-hidden">
          <table class="table table-dark table-hover text-xs mb-0">
            <thead><tr class="text-muted"><th>Customer</th><th>Rating</th><th>Review</th></tr></thead>
            <tbody>
              <tr><td>রাশেদুল ইসলাম</td><td class="text-warning">★★★★★</td><td>অরিজিনাল প্রোডাক্ট, বিকাশ পেমেন্টে ৫% ছাড় পেয়েছি।</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 14. Banners Tab
  async viewBannersList() {
    const banners = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BANNERS) || '[]');
    return `
      <div class="admin-banners-view">
        <h3 class="fw-bold mb-3">হোম পেজ ব্যানার স্লাইডার (${banners.length} টি স্লাইড)</h3>
        <div class="row g-3">
          ${banners.map(b => `
            <div class="col-12 col-md-6">
              <div class="card bg-slate-900 border-slate-800 rounded-3 p-3 d-flex flex-row gap-3 align-items-center">
                <img src="${b.img}" width="80" height="50" class="rounded object-fit-cover" />
                <div class="flex-grow-1 overflow-hidden">
                  <div class="fw-bold text-white text-truncate text-xs">${b.title}</div>
                  <small class="text-muted text-[10px]">${b.badge}</small>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 15. Settings Tab
  viewSettings() {
    return `
      <div class="admin-settings-view max-w-2xl">
        <h3 class="fw-bold mb-3">ওয়েবসাইট গ্লোবাল সেটিংস</h3>
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
          <form onsubmit="alert('সেটিংস সংরক্ষিত হয়েছে!'); return false;">
            <div class="mb-3"><label class="form-label text-xs fw-bold">ওয়েবসাইট নাম</label><input type="text" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="${CONFIG.appName}" /></div>
            <div class="mb-3"><label class="form-label text-xs fw-bold">স্লোগান</label><input type="text" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="${CONFIG.slogan}" /></div>
            <div class="row g-2 mb-3">
              <div class="col-6"><label class="form-label text-xs fw-bold">ফোন ১</label><input type="text" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="${CONFIG.phone1}" /></div>
              <div class="col-6"><label class="form-label text-xs fw-bold">ফোন ২</label><input type="text" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="${CONFIG.phone2}" /></div>
            </div>
            <div class="mb-3"><label class="form-label text-xs fw-bold">অফিসিয়াল ইমেইল</label><input type="email" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" value="${CONFIG.email}" /></div>
            <div class="mb-3"><label class="form-label text-xs fw-bold">গুগল স্প্রেডশীট আইডি</label><input type="text" class="form-control form-control-sm bg-slate-950 text-muted border-slate-700" value="${CONFIG.spreadsheetId}" readonly /></div>
            <button type="submit" class="btn btn-primary btn-sm px-4">সেভ সেটিংস</button>
          </form>
        </div>
      </div>
    `;
  },

  exportCSV(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    let csv = [];
    for (let row of table.rows) {
      let cols = [];
      for (let cell of row.cells) {
        cols.push('"' + cell.innerText.replace(/"/g, '""').trim() + '"');
      }
      csv.push(cols.join(','));
    }
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableId}_export.csv`;
    a.click();
  }
};

window.ADMIN = ADMIN;
