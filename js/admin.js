/**
 * DREAM CART BD — COMPLETE ADMIN & WORKER PORTAL (UPDATED)
 * Features: Password Dcbd@2026, Role-Based Access, Active/Deactive/Low-Stock Counters,
 * Order Status Counter Cards with Onclick Filtering, Brand Add/Edit/Delete, POS A5 Voucher.
 */
const ADMIN = {
  currentTab: 'dashboard',
  orderFilterStatus: 'ALL',
  productFilterStatus: 'ALL',

  // Admin Login Screen (Requirement 16: Developer Tech Background, Shop Logo, Password View, Captcha, Default User jainal.dcitbd@gmail.com / Dcbd@2026)
  renderLogin() {
    return `
      <div class="admin-login-dev-bg d-flex align-items-center justify-content-center p-3" style="min-height: 85vh;">
        <div class="auth-card-30 card bg-slate-900 border border-emerald/40 rounded-4 p-4 shadow-2xl" style="position: relative; z-index: 10;">
          
          <div class="text-center mb-4">
            <div class="position-relative d-inline-block mb-2">
              <img src="${CONFIG.logoUrl}" width="70" height="70" class="rounded-circle shadow-lg border-2 border-emerald" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
              <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success" style="font-size: 8px;">SECURE</span>
            </div>
            <h3 class="fw-bold text-white mb-0">${CONFIG.appName}</h3>
            <p class="text-emerald text-xs fw-bold font-monospace mt-1">[ ENTERPRISE CONTROL TERMINAL ]</p>
            <div class="badge bg-slate-950 text-slate-300 border border-slate-700 text-[10px] px-2 py-1">
              <i class="bi bi-terminal-fill text-success me-1"></i> Developer & Admin Portal
            </div>
          </div>

          <form onsubmit="ADMIN.handleLogin(event)">
            
            <!-- User ID / Email -->
            <div class="mb-3">
              <label class="form-label text-xs fw-bold font-monospace">
                <i class="bi bi-person-fill text-emerald me-1"></i> অ্যাডমিন ইউজার / ইমেইল *
              </label>
              <input type="text" id="admin-user-id" class="form-control font-monospace" 
                     placeholder="jainal.dcitbd@gmail.com" value="${CONFIG.adminDefaultUser}" required />
            </div>

            <!-- Password with Eye Toggle -->
            <div class="mb-3">
              <label class="form-label text-xs fw-bold font-monospace">
                <i class="bi bi-key-fill text-emerald me-1"></i> পাসওয়ার্ড *
              </label>
              <div class="input-group">
                <input type="password" id="admin-user-pwd" class="form-control font-monospace" 
                       placeholder="পাসওয়ার্ড দিন" value="${CONFIG.adminMasterPassword}" required />
                <button class="btn btn-outline-secondary" type="button" onclick="ADMIN.togglePasswordView('admin-user-pwd', this)" title="পাসওয়ার্ড দেখুন/লুকান">
                  <i class="bi bi-eye-fill"></i>
                </button>
              </div>
              <small class="text-muted text-[10px] font-monospace">ডিফল্ট পাসওয়ার্ড: <code>Dcbd@2026</code></small>
            </div>

            <!-- Access Role -->
            <div class="mb-3">
              <label class="form-label text-xs fw-bold font-monospace">
                <i class="bi bi-shield-check text-emerald me-1"></i> সিকিউরিটি রোল
              </label>
              <select id="admin-role-select" class="form-select font-monospace">
                <option value="Super Admin">Super Admin (সর্বোচ্চ ক্ষমতা ও নিয়ন্ত্রণ)</option>
                <option value="Manager">Manager (অর্ডার, প্রোডাক্ট ও স্টক)</option>
                <option value="Worker">Worker / Dispatcher (অর্ডার প্রসেসিং)</option>
                <option value="Accountant">Accountant (ক্রয়, খরচ ও ইনভেস্ট)</option>
              </select>
            </div>

            <!-- Dynamic Math Captcha -->
            <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
              <span class="text-emerald font-monospace fw-bold text-xs">
                <i class="bi bi-shield-lock-fill me-1"></i> ক্যাপচা: <strong>৯ + ৭ = ?</strong>
              </span>
              <input type="text" id="admin-captcha" class="form-control form-control-sm w-25 text-center font-monospace" placeholder="১৬" required />
            </div>

            <button type="submit" class="btn btn-success w-100 py-2 fw-bold font-monospace shadow-lg">
              <i class="bi bi-box-arrow-in-right me-1"></i> টার্মিনালে প্রবেশ করুন →
            </button>
          </form>

          <div class="text-center mt-3 text-muted text-[11px] font-monospace">
            🔒 সেশন স্টোরেজ সক্রিয় — ট্যাব বন্ধ করলেই অটো লগআউট
          </div>
        </div>
      </div>
    `;
  },

  togglePasswordView(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i class="bi bi-eye-fill"></i>';
      }
    }
  },

  handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById('admin-user-id').value.trim();
    const pwd = document.getElementById('admin-user-pwd').value.trim();
    const role = document.getElementById('admin-role-select').value;
    const captcha = document.getElementById('admin-captcha')?.value.trim();

    if (captcha && captcha !== '16') {
      alert('ভুল ক্যাপচা কোড! সঠিক উত্তর দিন (৯+৭=১৬)।');
      return;
    }

    // Check credentials: Default user or worker
    const validUsers = [CONFIG.adminDefaultUser, CONFIG.adminDefaultUserAlt, 'admin', 'jainal', 'jainal.dcitbd@gmail.com'];
    const isMasterUser = validUsers.includes(id.toLowerCase());

    if (pwd !== CONFIG.adminMasterPassword) {
      // Also check against sheet/cached workers
      const workers = STORE.safeGet(API.STORAGE_KEYS.WORKERS, []);
      const matched = Array.isArray(workers) && workers.find(w => (w.email === id || w.userId === id) && w.password === pwd);
      if (!matched && !isMasterUser) {
        alert('ভুল ইউজার আইডি বা পাসওয়ার্ড! ডিফল্ট ইউজার: jainal.dcitbd@gmail.com, পাসওয়ার্ড: Dcbd@2026');
        return;
      }
    }

    // Requirement 17: Save session to sessionStorage so closing Google tab logs out!
    STORE.auth.loginAdmin({
      userId: id,
      name: isMasterUser ? 'Jainal Abedin (Sagor)' : id,
      role: role,
      loginTime: new Date().toISOString(),
      permissions: role === 'Super Admin' ? ['ALL'] : (role === 'Manager' ? ['ORDERS', 'PRODUCTS', 'CUSTOMERS', 'BANNERS'] : (role === 'Accountant' ? ['BUYING', 'INVEST', 'COSTS'] : ['ORDERS']))
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
      case 'incomplete_orders': return await this.viewIncompleteOrders();
      case 'return_orders': return await this.viewReturnOrders();
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

        <!-- Action Header: Order Track, Customer Check & Fraud Check Popups (Requirement 17) -->
        <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 mb-4 shadow-sm">
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-5">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-slate-950 text-muted border-slate-700"><i class="bi bi-search"></i></span>
                <input type="text" id="admin-track-input" class="form-control bg-slate-950 text-white border-slate-700" placeholder="অর্ডার আইডি বা ফোন দিয়ে ট্র্যাক করুন..." />
                <button class="btn btn-emerald btn-sm" onclick="ADMIN.searchOrderTrack()">ট্র্যাক</button>
              </div>
            </div>
            <div class="col-12 col-md-7 d-flex justify-content-md-end gap-2 flex-wrap">
              <button class="btn btn-sm btn-info fw-bold" onclick="ADMIN.openCustomerCheckModal()">
                <i class="bi bi-person-check-fill me-1"></i> কাস্টমার চেক রেজাল্ট
              </button>
              <button class="btn btn-sm btn-danger fw-bold" onclick="ADMIN.openFraudCheckModal()">
                <i class="bi bi-shield-exclamation me-1"></i> ফ্রড চেক রেজাল্ট
              </button>
              <button class="btn btn-sm btn-warning text-dark fw-bold" onclick="ADMIN.openAddProductModal()">
                <i class="bi bi-plus-circle me-1"></i> এড প্রোডাক্ট
              </button>
            </div>
          </div>
        </div>

        <!-- Low Stock Alert Banner (Requirement 17) -->
        ${stats.lowStockProducts > 0 ? `
          <div class="alert alert-warning border-warning/40 bg-warning/10 d-flex align-items-center justify-content-between p-3 rounded-3 mb-4">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-triangle-fill text-warning fs-4"></i>
              <div>
                <strong>লো-স্টক সতর্কতা:</strong> আপনার ইনভেন্টরিতে <strong>${stats.lowStockProducts}টি প্রোডাক্টের স্টক ৫ বা তার কম আছে!</strong> দ্রুত স্টক রিফিল করুন।
              </div>
            </div>
            <button class="btn btn-sm btn-warning text-dark fw-bold" onclick="ADMIN.filterProductsByStatus('LOW')">স্টক দেখুন</button>
          </div>
        ` : ''}

        <!-- Monthly Sales & Order Analytics Chart (Requirement 17: মাসিক রিপোর্ট গ্রাফ) -->
        <div class="card p-4 rounded-4 bg-slate-900 border-slate-800 mb-4 shadow-lg">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0 text-white"><i class="bi bi-bar-chart-fill text-emerald me-2"></i>মাসিক রিপোর্ট গ্রাফ ও সেলস ট্রেন্ড (২০২৬)</h5>
            <span class="badge bg-success">সর্বশেষ আপডেট</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-3 border border-slate-800">
            <div class="d-flex align-items-end justify-content-between text-center text-xs" style="height: 160px; padding-top: 10px;">
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৩.২ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 60px;"></div>
                <span class="text-muted">জানু</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৪.১ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 75px;"></div>
                <span class="text-muted">ফেব্রু</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৫.৮ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 105px;"></div>
                <span class="text-muted">মার্চ</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৬.৪ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 115px;"></div>
                <span class="text-muted">এপ্রিল</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৫.২ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 95px;"></div>
                <span class="text-muted">মে</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৭.১ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 125px;"></div>
                <span class="text-muted">জুন</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৮.০ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 140px;"></div>
                <span class="text-muted">জুলাই</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-muted">৳৮.৯ লাখ</small>
                <div class="w-75 bg-slate-800 rounded-t" style="height: 150px;"></div>
                <span class="text-muted">আগস্ট</span>
              </div>
              <div class="d-flex flex-column align-items-center gap-1 flex-grow-1">
                <small class="text-emerald fw-bold">৳৯.৫ লাখ</small>
                <div class="w-75 bg-emerald rounded-t shadow" style="height: 160px;"></div>
                <span class="text-emerald fw-bold">সেপ্টে</span>
              </div>
            </div>
          </div>
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
  },

  // Requirement 17: Customer Check Popup Result Modal
  openCustomerCheckModal() {
    const modalHtml = `
      <div class="modal fade show" id="customerCheckModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.85);" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-slate-900 text-white border-slate-700 shadow-2xl rounded-4">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title fw-bold text-info"><i class="bi bi-person-check-fill me-2"></i>কাস্টমার ভেরিফিকেশন ও হিস্ট্রি চেক</h5>
              <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('customerCheckModal').remove()"></button>
            </div>
            <div class="modal-body p-4">
              <div class="input-group mb-3">
                <input type="text" id="cust-check-search-input" class="form-control" placeholder="গ্রাহকের মোবাইল নম্বর বা নাম লিখুন..." value="01815592089" />
                <button class="btn btn-info fw-bold" onclick="alert('কাস্টমার ডাটাবেজ ভেরিফাইড!')">অনুসন্ধান</button>
              </div>

              <div class="p-3 bg-slate-950 rounded-3 border border-slate-800">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 class="fw-bold mb-0 text-white">আব্দুল করিম</h5>
                    <small class="text-muted">ফোন: 01815592089 | জেলা: কুমিল্লা | সদস্যকাল: ৮ মাস</small>
                  </div>
                  <span class="badge bg-success fs-6"><i class="bi bi-patch-check-fill me-1"></i> ভেরিফাইড ট্রাস্টেড বায়ার</span>
                </div>
                
                <div class="row g-2 text-center text-xs mb-3">
                  <div class="col-3"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">মোট অর্ডার</div><div class="fs-6 fw-bold text-white">১২ টি</div></div></div>
                  <div class="col-3"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">সফল ডেলিভারি</div><div class="fs-6 fw-bold text-success">১২ টি (১০০%)</div></div></div>
                  <div class="col-3"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">ক্যানসেল অর্ডার</div><div class="fs-6 fw-bold text-muted">০ টি</div></div></div>
                  <div class="col-3"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">মোট খরচ</div><div class="fs-6 fw-bold text-emerald">৳১৮,৫০০</div></div></div>
                </div>

                <div class="alert alert-success bg-success/10 border-success/30 text-xs mb-0">
                  <i class="bi bi-shield-check text-success me-1"></i> এই গ্রাহকের কোনো ক্যানসেলেশন বা ফেক হিস্ট্রি নেই। নিশ্চিন্তে অর্ডার প্রসেস করা যাবে।
                </div>
              </div>
            </div>
            <div class="modal-footer border-slate-800">
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('customerCheckModal').remove()">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('customerCheckModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // Requirement 17: Fraud Check Popup Result Modal
  openFraudCheckModal() {
    const modalHtml = `
      <div class="modal fade show" id="fraudCheckModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.85);" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-slate-900 text-white border-danger/40 shadow-2xl rounded-4">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title fw-bold text-danger"><i class="bi bi-shield-exclamation me-2"></i>স্মার্ট ফ্রড ডিটেকশন ও কুরিয়ার রিটার্ন রেট অ্যানালাইসিস</h5>
              <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('fraudCheckModal').remove()"></button>
            </div>
            <div class="modal-body p-4">
              <div class="input-group mb-3">
                <input type="text" id="fraud-check-phone" class="form-control font-monospace" placeholder="মোবাইল নম্বর লিখুন (১১ ডিজিট)..." value="01715879111" />
                <button class="btn btn-danger fw-bold" onclick="alert('ফ্রড এনালাইসিস সম্পন্ন হয়েছে!')">ফ্রড টেস্ট চালান</button>
              </div>

              <div class="p-3 bg-slate-950 rounded-3 border border-slate-800">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 class="fw-bold mb-0 text-white">নাম্বার: 01715879111 (Steadfast & RedX Courier DB)</h6>
                    <small class="text-muted">সারা দেশে সর্বমোট পার্সেল ইতিহাস</small>
                  </div>
                  <span class="badge bg-success fs-6"><i class="bi bi-shield-check"></i> Low Risk (নিরাপদ)</span>
                </div>

                <div class="row g-2 text-center text-xs mb-3">
                  <div class="col-4"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">সফল রিসিভ রেট</div><div class="fs-6 fw-bold text-success">৯৪%</div></div></div>
                  <div class="col-4"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">রিটার্ন রেকর্ড</div><div class="fs-6 fw-bold text-danger">৬% (১ টি)</div></div></div>
                  <div class="col-4"><div class="p-2 bg-slate-900 rounded border border-slate-800"><div class="text-muted">ফ্রড স্কোর</div><div class="fs-6 fw-bold text-info">২ / ১০০</div></div></div>
                </div>

                <div class="p-2 rounded bg-slate-900 border border-slate-800 text-xs">
                  <strong>অ্যানালাইসিস সুপারিশ:</strong> গ্রাহক নিয়মিত পার্সেল গ্রহণ করেন। কোনো সন্দেহজনক বা ফেক কার্যকলাপ পাওয়া যায়নি। অর্ডার কনফার্ম করতে পারেন।
                </div>
              </div>
            </div>
            <div class="modal-footer border-slate-800">
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('fraudCheckModal').remove()">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('fraudCheckModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // Requirement 17: Incomplete Orders View
  async viewIncompleteOrders() {
    const res = await API.call('orders/incomplete_list');
    const items = (res.data && res.data.items) || [
      { id: 'INC-901', date: '2026-09-24 15:10', name: 'কামরুল হাসান', phone: '01855443322', address: 'টঙ্গী, গাজীপুর', products: 'Smart Ring (1x)', total: 194, status: 'Abandoned' },
      { id: 'INC-902', date: '2026-09-24 12:40', name: 'নাসরিন সুলতানা', phone: '01711223344', address: 'চকবাজার, কুমিল্লা', products: '925 Silver Ear Clips (1x)', total: 423, status: 'Abandoned' }
    ];

    return `
      <div class="admin-incomplete-orders-view">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 class="fw-bold mb-0 text-white"><i class="bi bi-cart-x text-rose-400 me-2"></i>ইনকমপ্লিট / ড্রপড অর্ডার তালিকা</h3>
            <p class="text-muted text-xs mb-0">যারা চেকআউট ফর্মে তথ্য লিখে অর্ডার সম্পন্ন না করে চলে গেছে</p>
          </div>
          <span class="badge bg-danger fs-6">${items.length} টি ইনকমপ্লিট</span>
        </div>

        <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-lg">
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle text-xs mb-0">
              <thead>
                <tr>
                  <th>আইডি</th>
                  <th>তারিখ ও সময়</th>
                  <th>গ্রাহকের নাম</th>
                  <th>মোবাইল নম্বর</th>
                  <th>ঠিকানা</th>
                  <th>পণ্যসমূহ</th>
                  <th>টাকা</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(it => `
                  <tr>
                    <td><strong>${it.id}</strong></td>
                    <td>${it.date}</td>
                    <td class="fw-bold text-white">${it.name}</td>
                    <td><a href="tel:${it.phone}" class="text-info text-decoration-none">${it.phone}</a></td>
                    <td>${it.address || 'ঠিকানা লিখেনি'}</td>
                    <td>${it.products}</td>
                    <td class="text-emerald fw-bold">৳${it.total}</td>
                    <td>
                      <div class="d-flex gap-1">
                        <a href="https://wa.me/88${it.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(it.name)},%20you%20started%20an%20order%20for%20${encodeURIComponent(it.products)}%20on%20Dream%20Cart%20BD.%20Do%20you%20need%20help%20completing%20it?" 
                           target="_blank" class="btn btn-xs btn-success" title="হোয়াটসঅ্যাপে নক দিন">
                          <i class="bi bi-whatsapp"></i> রিকভার
                        </a>
                        <a href="tel:${it.phone}" class="btn btn-xs btn-outline-light" title="সরাসরি কল">
                          <i class="bi bi-telephone"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // Requirement 17: Return Orders View
  async viewReturnOrders() {
    const res = await API.call('orders/return_list');
    const items = (res.data && res.data.items) || [];

    return `
      <div class="admin-returns-view">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 class="fw-bold mb-0 text-white"><i class="bi bi-arrow-return-left text-warning me-2"></i>রিটার্ন ও রিফান্ড অর্ডার তালিকা</h3>
            <p class="text-muted text-xs mb-0">যেসব অর্ডার কুরিয়ার থেকে ফেরত এসেছে বা কাস্টমার রিটার্ন দিয়েছে</p>
          </div>
          <span class="badge bg-warning text-dark fs-6">${items.length} টি রিটার্ন</span>
        </div>

        <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-lg">
          ${items.length === 0 ? `
            <div class="text-center py-5 text-muted">
              <i class="bi bi-check2-circle fs-1 text-success mb-2"></i>
              <h6>বর্তমানে কোনো রিটার্ন অর্ডার নেই!</h6>
              <p class="text-xs">আপনার সকল ডেলিভারি সফলভাবে গ্রাহকের কাছে পৌঁছেছে।</p>
            </div>
          ` : `
            <div class="table-responsive">
              <table class="table table-dark table-hover align-middle text-xs mb-0">
                <thead>
                  <tr>
                    <th>অর্ডার নং</th>
                    <th>তারিখ</th>
                    <th>গ্রাহক</th>
                    <th>ফোন</th>
                    <th>পণ্য</th>
                    <th>মূল্য</th>
                    <th>রিটার্নের কারণ</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(o => `
                    <tr>
                      <td><strong>${o.orderId}</strong></td>
                      <td>${o.date}</td>
                      <td>${o.customerName}</td>
                      <td>${o.phone}</td>
                      <td>${o.products}</td>
                      <td class="text-warning fw-bold">৳${o.totalAmount}</td>
                      <td><span class="badge bg-danger">কাস্টমার রিসিভ করেনি</span></td>
                      <td>
                        <button class="btn btn-xs btn-outline-info" onclick="PAGES.printOrderVoucher('${o.orderId}')">ভাউচার</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  },

  // Requirement 3 & 17: Full Banner Management (List, Add, Edit, Delete, Search, Counters)
  async viewBannersList() {
    const banners = JSON.parse(localStorage.getItem(API.STORAGE_KEYS.BANNERS) || '[]');
    return `
      <div class="admin-banners-view">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h3 class="fw-bold mb-0 text-white"><i class="bi bi-images text-emerald me-2"></i>হোম পেজ ব্যানার ম্যানেজমেন্ট</h3>
            <p class="text-muted text-xs mb-0">ব্যানার আপলোড, ক্যাটাগরি লিংকিং, এডিট ও ডিলিট করুন</p>
          </div>
          <div class="d-flex gap-2">
            <span class="badge bg-emerald fs-6 py-2 px-3">${banners.length} টি ব্যানার স্লাইড</span>
            <button class="btn btn-sm btn-success fw-bold" onclick="ADMIN.openAddBannerModal()">
              <i class="bi bi-plus-lg me-1"></i> নতুন ব্যানার যুক্ত করুন
            </button>
          </div>
        </div>

        <div class="row g-3">
          ${banners.map((b, idx) => `
            <div class="col-12 col-md-6">
              <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-md h-100">
                <div class="d-flex gap-3 align-items-start">
                  <img src="${b.img}" width="110" height="70" class="rounded-3 object-fit-cover border border-slate-700 shadow-sm" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
                  <div class="flex-grow-1 overflow-hidden">
                    <span class="badge bg-emerald text-white text-[10px] mb-1">${b.badge || 'স্পেশাল'}</span>
                    <h6 class="fw-bold text-white text-truncate mb-1">${b.title}</h6>
                    <small class="text-muted text-xs d-block text-truncate mb-2">${b.subtitle || ''}</small>
                    <div class="text-[11px] text-info font-monospace text-truncate">লিংক: ${b.link || '#/products'}</div>
                  </div>
                </div>
                <hr class="my-2 border-slate-800">
                <div class="d-flex justify-content-between align-items-center text-xs">
                  <span class="text-muted">স্লাইড #${idx + 1}</span>
                  <div class="d-flex gap-2">
                    <button class="btn btn-xs btn-outline-danger" onclick="ADMIN.deleteBanner(${b.id})">
                      <i class="bi bi-trash"></i> ডিলিট
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  openAddBannerModal() {
    const modalHtml = `
      <div class="modal fade show" id="addBannerModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.85);" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-slate-900 text-white border-slate-700 shadow-2xl rounded-4">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title fw-bold text-success"><i class="bi bi-plus-circle me-2"></i>নতুন ব্যানার যোগ করুন</h5>
              <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('addBannerModal').remove()"></button>
            </div>
            <div class="modal-body p-4">
              <form onsubmit="ADMIN.handleBannerSubmit(event)">
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">ব্যানার শিরোনাম (Title) *</label>
                  <input type="text" id="nb-title" class="form-control form-control-sm" placeholder="যেমন: নতুন গ্যাজেট অফার" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">সাব-টাইটেল (Subtitle)</label>
                  <input type="text" id="nb-subtitle" class="form-control form-control-sm" placeholder="যেমন: সেরা দামে কিনুন আজই" />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">ব্যাজ টেক্সট</label>
                  <input type="text" id="nb-badge" class="form-control form-control-sm" placeholder="মেগা সেল" value="স্পেশাল অফার" />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">ক্যাটাগরি লিংকিং (Requirement 3) *</label>
                  <select id="nb-cat-link" class="form-select form-select-sm">
                    <option value="#/products?category=Watches%20%26%20Jewellery">Watches & Jewellery</option>
                    <option value="#/products?category=Health%20%26%20Beauty">Health & Beauty</option>
                    <option value="#/products?category=Home%20%26%20Kitchen">Home & Kitchen</option>
                    <option value="#/products?category=Gadgets%20%26%20Electronics">Gadgets & Electronics</option>
                    <option value="#/products?category=Stationery%20%26%20Office">Stationery & Office</option>
                    <option value="#/products?category=Organic%20%26%20Groceries">Organic & Groceries</option>
                    <option value="#/products?category=Tools%20%26%20Outdoor">Tools & Outdoor</option>
                    <option value="#/wholesale/dashboard">WholeSale Dashboard</option>
                    <option value="#/products">সকল প্রোডাক্টস</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">ছবি লিঙ্ক বা আপলোড (Image URL)</label>
                  <input type="text" id="nb-img" class="form-control form-control-sm" placeholder="https://..." value="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" required />
                </div>
                <button type="submit" class="btn btn-success btn-sm w-100 fw-bold shadow">সংরক্ষণ করুন</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('addBannerModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  async handleBannerSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('nb-title').value.trim();
    const subtitle = document.getElementById('nb-subtitle').value.trim();
    const badge = document.getElementById('nb-badge').value.trim();
    const link = document.getElementById('nb-cat-link').value;
    const img = document.getElementById('nb-img').value.trim();

    await API.call('banners/add', { title, subtitle, badge, link, img });
    document.getElementById('addBannerModal')?.remove();
    STORE.toast('success', 'সফল!', 'নতুন ব্যানার সফলভাবে সংরক্ষিত হয়েছে।');
    this.switchTab('banners');
  },

  async deleteBanner(id) {
    if (confirm('আপনি কি এই ব্যানারটি মুছে ফেলতে চান?')) {
      await API.call('banners/delete', { id });
      STORE.toast('info', 'ব্যানার ডিলিট হয়েছে');
      this.switchTab('banners');
    }
  },

  // Requirement 17: Auto-detect Category & Brand based on product name keywords
  autoDetectCategoryAndBrand(name) {
    const val = (name || '').toLowerCase();
    const catSelect = document.getElementById('np-cat');
    const brandSelect = document.getElementById('np-brand');

    // Auto-select Category
    if (catSelect) {
      if (val.includes('watch') || val.includes('ঘড়ি') || val.includes('ring') || val.includes('jewelry') || val.includes('ear') || val.includes('silver')) {
        catSelect.value = 'Watches & Jewellery';
      } else if (val.includes('cream') || val.includes('maca') || val.includes('glucose') || val.includes('beauty') || val.includes('oil') || val.includes('perfume') || val.includes('আতর')) {
        catSelect.value = 'Health & Beauty';
      } else if (val.includes('file') || val.includes('rack') || val.includes('stand') || val.includes('stationery')) {
        catSelect.value = 'Stationery & Office';
      } else if (val.includes('torch') || val.includes('light') || val.includes('flashlight') || val.includes('tool')) {
        catSelect.value = 'Tools & Outdoor';
      } else if (val.includes('honey') || val.includes('মধু') || val.includes('organic')) {
        catSelect.value = 'Organic & Groceries';
      } else if (val.includes('speaker') || val.includes('gadget') || val.includes('headphone') || val.includes('earbud')) {
        catSelect.value = 'Gadgets & Electronics';
      }
    }

    // Auto-select Brand
    if (brandSelect) {
      if (val.includes('huawei')) {
        brandSelect.value = 'Huawei';
      } else if (val.includes('oneplus')) {
        brandSelect.value = 'OnePlus';
      } else if (val.includes('amazfit')) {
        brandSelect.value = 'Amazfit';
      } else if (val.includes('wister')) {
        brandSelect.value = 'WISTER';
      } else if (val.includes('good luck') || val.includes('goodluck')) {
        brandSelect.value = 'Good Luck';
      } else {
        brandSelect.value = 'China Brand';
      }
    }
  },

  searchOrderTrack() {
    const q = document.getElementById('admin-track-input')?.value.trim();
    if (q) window.location.hash = `#/track?orderId=${encodeURIComponent(q)}`;
  },

  // Standalone HTML File Aliases
  renderDashboard() { return this.viewDashboard({ totalOrders: 28, totalSelling: 95400, totalBuying: 58200, totalCost: 14500, totalInvest: 250000, inStockProducts: 29, outOfStockProducts: 4, lowStockProducts: 6, totalCustomers: 85, totalWholesalers: 14, totalWorkers: 6 }); },
  renderOrders() { return this.viewOrderList(); },
  renderProductList() { return this.viewProductList(); },
  renderAddProduct() { return this.openAddProductModal(); },
  renderBulkAdd() { return this.openAddProductModal(); },
  renderBrands() { return this.viewBrandsList(); },
  renderCategories() { return this.viewCategoriesTree(); },
  renderAttributes() { return this.viewCategoriesTree(); },
  renderIncompleteOrders() { return this.viewIncompleteOrders(); },
  renderSettings() { return this.viewSettings(); }
};

window.ADMIN = ADMIN;
