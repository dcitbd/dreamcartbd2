/**
 * DREAM CART BD — REUSABLE UI COMPONENTS (UPDATED)
 * With Shop Logo, Slogan, Two Contact Numbers, Floating Action Buttons, A5 Voucher
 */
const COMPONENTS = {
  // Top Notice Bar + Desktop & Mobile Navigation Bar
  renderNavbar() {
    const cartCount = STORE.cart.getCount();
    const wishlistCount = STORE.wishlist.items.length;
    const isDark = STORE.theme.current === 'dark';
    const customer = STORE.auth.customer;
    const wholesaler = STORE.auth.wholesaler;
    const admin = STORE.auth.admin;

    return `
      <!-- Top Announcement & Slogan Bar -->
      <div class="top-announcement-bar py-1 px-3 text-xs d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2 overflow-hidden text-truncate">
          <span class="badge bg-danger text-white animate-pulse">মেগা অফার</span>
          <span class="announcement-text text-truncate">
            🎉 ২০০০ টাকার বেশি অর্ডারে সারা দেশে <strong>ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</strong> ⚡ বিকাশ/নগদ/রকেট/ব্যাংক পেমেন্টে <strong>ইনস্ট্যান্ট ৫% ডিসকাউন্ট!</strong>
          </span>
        </div>
        <div class="d-none d-md-flex align-items-center gap-3 font-monospace">
          <span><i class="bi bi-telephone-fill text-success me-1"></i> ${CONFIG.phone1} / ${CONFIG.phone2}</span>
          <a href="${CONFIG.whatsappUrl1}" target="_blank" class="text-emerald text-decoration-none fw-bold"><i class="bi bi-whatsapp"></i> WhatsApp ১</a>
          <a href="${CONFIG.whatsappUrl2}" target="_blank" class="text-emerald text-decoration-none fw-bold"><i class="bi bi-whatsapp"></i> WhatsApp ২</a>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <header class="main-navbar fixed-top">
        <div class="container-fluid px-3 px-lg-5">
          <div class="d-flex align-items-center justify-content-between py-2 gap-2 gap-lg-3">
            
            <!-- 1. Shop Logo & Name & Slogan -->
            <a href="#/" class="navbar-brand d-flex align-items-center gap-2 text-decoration-none me-2">
              <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" class="brand-logo-img rounded-circle" />
              <div class="d-flex flex-column">
                <span class="brand-name">${CONFIG.appName}</span>
                <span class="brand-slogan d-none d-xl-inline text-truncate max-w-xs text-[10px] text-emerald">${CONFIG.slogan}</span>
              </div>
            </a>

            <!-- 2. Global Search Bar (Desktop) -->
            <div class="search-box-wrapper flex-grow-1 d-none d-lg-block mx-2 max-w-md">
              <div class="input-group search-group">
                <input type="text" id="desktop-search-input" class="form-control search-input" 
                       placeholder="প্রোডাক্টের নাম, SKU বা ক্যাটাগরি খুঁজুন..." />
                <button class="btn btn-search" id="btn-desktop-search" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <!-- 3. Desktop Navigation Links -->
            <div class="d-none d-lg-flex align-items-center gap-2 gap-xl-3 desktop-nav-actions">
              
              <!-- Hotlines & WhatsApp Callouts -->
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-success dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-headset"></i> হেল্পলাইন
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg bg-slate-900 border-slate-800 text-xs">
                  <li class="dropdown-header text-muted text-uppercase">সরাসরি কল করুন</li>
                  <li><a class="dropdown-item text-white" href="tel:${CONFIG.phone1}"><i class="bi bi-telephone-fill text-success me-2"></i> ${CONFIG.phone1}</a></li>
                  <li><a class="dropdown-item text-white" href="tel:${CONFIG.phone2}"><i class="bi bi-telephone-fill text-success me-2"></i> ${CONFIG.phone2}</a></li>
                  <li><hr class="dropdown-divider border-slate-800"></li>
                  <li class="dropdown-header text-muted text-uppercase">হোয়াটসঅ্যাপ মেসেজ</li>
                  <li><a class="dropdown-item text-emerald" href="${CONFIG.whatsappUrl1}" target="_blank"><i class="bi bi-whatsapp me-2"></i> WhatsApp 1 (${CONFIG.phone1})</a></li>
                  <li><a class="dropdown-item text-emerald" href="${CONFIG.whatsappUrl2}" target="_blank"><i class="bi bi-whatsapp me-2"></i> WhatsApp 2 (${CONFIG.phone2})</a></li>
                </ul>
              </div>

              
              <!-- Live Sheet Sync Button -->
              <button class="btn btn-sm btn-outline-emerald d-flex align-items-center gap-1" id="btn-sync-live-sheet" 
                      onclick="API.fetchLiveSheetData().then(s => { STORE.toast(s ? 'success' : 'info', s ? 'গুগল শিট সিঙ্ক সফল!' : 'ক্যাশ ডেটা আপডেট রয়েছে'); window.location.reload(); })" 
                      title="গুগল শিট থেকে লাইভ প্রোডাক্ট সিঙ্ক করুন">
                <i class="bi bi-arrow-repeat"></i> <span class="d-none d-xxl-inline">শিট সিঙ্ক</span>
              </button>

              <!-- Products -->
              <a href="#/products" class="nav-link-custom">
                <i class="bi bi-grid-fill"></i> প্রোডাক্টস
              </a>

              <!-- Favorites -->
              <a href="#/favorites" class="nav-link-custom position-relative" title="ফেভরিট লিস্ট">
                <i class="bi bi-heart-fill text-danger"></i>
                ${wishlistCount > 0 ? `<span class="badge-counter">${wishlistCount}</span>` : ''}
              </a>

              <!-- Cart -->
              <a href="#/cart" class="nav-link-custom position-relative" title="শপিং কার্ট">
                <i class="bi bi-bag-check-fill text-emerald"></i> কার্ট
                <span class="badge-counter cart-count-badge">${cartCount}</span>
              </a>

              <!-- Dark Mode Toggle (Dark mode default) -->
              <button class="btn-theme-toggle" id="btn-toggle-theme" title="ডার্ক/লাইট মোড">
                <i class="bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-info'}"></i>
              </button>

              <!-- Customer Login / Dashboard -->
              ${customer ? `
                <a href="#/customer/dashboard" class="btn btn-customer-account">
                  <i class="bi bi-person-check-fill"></i> ${customer.name || 'কাস্টমার'}
                </a>
              ` : `
                <a href="#/customer/login" class="btn btn-customer-login">
                  <i class="bi bi-person-fill"></i> কাস্টমার লগইন
                </a>
              `}

              <!-- As A WholeSeller -->
              ${wholesaler ? `
                <a href="#/wholesale/dashboard" class="btn btn-wholesale-active">
                  <i class="bi bi-boxes"></i> হোলসেল
                </a>
              ` : `
                <a href="#/wholesale/login" class="btn btn-wholesale">
                  <i class="bi bi-shop"></i> As A WholeSaller
                </a>
              `}

              <!-- Admin Login (icon only as requested) -->
              <a href="${admin ? '#/admin/dashboard' : '#/admin/login'}" class="btn-admin-icon" title="এডমিন লগইন (আইকন)">
                <i class="bi bi-shield-lock-fill"></i>
              </a>

              <!-- Others Market -->
              <div class="dropdown">
                <button class="btn btn-outline-market dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  অন্যান্য মার্কেট
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg market-dropdown bg-slate-900 border-slate-800">
                  <li><a class="dropdown-item text-white" href="https://www.daraz.com.bd" target="_blank"><i class="bi bi-bag me-2 text-warning"></i>Daraz Mall</a></li>
                  <li><a class="dropdown-item text-white" href="https://bikroy.com" target="_blank"><i class="bi bi-tag me-2 text-info"></i>Bikroy</a></li>
                  <li><a class="dropdown-item text-white" href="https://othoba.com" target="_blank"><i class="bi bi-cart me-2 text-success"></i>Othoba</a></li>
                  <li><a class="dropdown-item text-white" href="https://shopify.com" target="_blank"><i class="bi bi-shop me-2 text-primary"></i>Shopify Global</a></li>
                </ul>
              </div>

            </div>

            <!-- Mobile Controls -->
            <div class="d-flex d-lg-none align-items-center gap-2">
              <a href="#/cart" class="mobile-icon-btn position-relative" title="কার্ট">
                <i class="bi bi-bag-fill text-emerald"></i>
                <span class="badge-counter cart-count-badge">${cartCount}</span>
              </a>

              <button class="mobile-icon-btn" id="btn-toggle-theme-mobile" title="মোড">
                <i class="bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-info'}"></i>
              </button>

              <button class="mobile-icon-btn" id="btn-open-mobile-drawer" type="button" title="মেনু">
                <i class="bi bi-list fs-4"></i>
              </button>
            </div>

          </div>

          <!-- Mobile Search Bar (<br> search) -->
          <div class="d-block d-lg-none pb-2 pt-1">
            <div class="input-group search-group-mobile">
              <input type="text" id="mobile-search-input" class="form-control form-control-sm search-input-mobile" 
                     placeholder="প্রোডাক্ট খুঁজুন..." />
              <button class="btn btn-sm btn-search" id="btn-mobile-search" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
            <!-- Quick Call Buttons for Mobile -->
            <div class="d-flex justify-content-between gap-1 mt-1 text-[11px]">
              <a href="tel:${CONFIG.phone1}" class="btn btn-xs btn-outline-success flex-grow-1"><i class="bi bi-telephone me-1"></i> ${CONFIG.phone1}</a>
              <a href="tel:${CONFIG.phone2}" class="btn btn-xs btn-outline-success flex-grow-1"><i class="bi bi-telephone me-1"></i> ${CONFIG.phone2}</a>
              <a href="${CONFIG.whatsappUrl1}" target="_blank" class="btn btn-xs btn-success"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>

        </div>
      </header>

      <!-- Floating Dual WhatsApp & Call Action Buttons -->
      <div class="floating-quick-contacts d-flex flex-column gap-2">
        <a href="${CONFIG.whatsappUrl1}" target="_blank" class="quick-contact-btn whatsapp shadow-lg" title="WhatsApp ১: ${CONFIG.phone1}">
          <i class="bi bi-whatsapp"></i>
          <span class="tooltip-label">WhatsApp ১</span>
        </a>
        <a href="${CONFIG.whatsappUrl2}" target="_blank" class="quick-contact-btn whatsapp-alt shadow-lg" title="WhatsApp ২: ${CONFIG.phone2}">
          <i class="bi bi-chat-dots-fill"></i>
          <span class="tooltip-label">WhatsApp ২</span>
        </a>
        <a href="tel:${CONFIG.phone1}" class="quick-contact-btn phone shadow-lg" title="কল করুন: ${CONFIG.phone1}">
          <i class="bi bi-telephone-fill"></i>
          <span class="tooltip-label">কল ১</span>
        </a>
      </div>

      <!-- Mobile Offcanvas Drawer Menu -->
      <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-drawer-header d-flex align-items-center justify-content-between p-3 border-bottom border-slate-800">
          <div class="d-flex align-items-center gap-2">
            <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" width="34" height="34" class="rounded-circle" />
            <div>
              <span class="fw-bold fs-6 d-block">${CONFIG.appName}</span>
              <small class="text-emerald text-[10px]">${CONFIG.slogan}</small>
            </div>
          </div>
          <button class="btn-close-drawer text-white" id="btn-close-mobile-drawer"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="mobile-drawer-body p-3">
          <ul class="mobile-menu-list list-unstyled">
            <li><a href="#/" class="mobile-menu-link"><i class="bi bi-house-door-fill me-2 text-primary"></i> হোম</a></li>
            <li><a href="#/products" class="mobile-menu-link"><i class="bi bi-grid-fill me-2 text-info"></i> Products</a></li>
            <li><a href="#/track" class="mobile-menu-link"><i class="bi bi-truck me-2 text-warning"></i> ট্রেকিং পেজ (by number, order id)</a></li>
            <li><a href="#/favorites" class="mobile-menu-link"><i class="bi bi-heart-fill me-2 text-danger"></i> ফেভরিট পেজ</a></li>
            <li><a href="#/cart" class="mobile-menu-link"><i class="bi bi-bag-check-fill me-2 text-emerald"></i> কার্ট পেজ</a></li>
            <hr class="my-2 border-slate-800">
            <li><a href="#/customer/login" class="mobile-menu-link text-emerald"><i class="bi bi-person-circle me-2"></i> Customer Login / Dashboard</a></li>
            <li><a href="#/wholesale/login" class="mobile-menu-link text-amber"><i class="bi bi-shop me-2"></i> As A WholeSaller</a></li>
            <li><a href="#/admin/login" class="mobile-menu-link text-sky"><i class="bi bi-shield-lock me-2"></i> Admin Login (icon only)</a></li>
            <hr class="my-2 border-slate-800">
            <div class="text-xs text-muted mb-2 fw-bold text-uppercase">সরাসরি যোগাযোগ</div>
            <li class="mb-1"><a href="tel:${CONFIG.phone1}" class="text-white text-xs text-decoration-none"><i class="bi bi-telephone text-success me-2"></i> ${CONFIG.phone1}</a></li>
            <li class="mb-1"><a href="tel:${CONFIG.phone2}" class="text-white text-xs text-decoration-none"><i class="bi bi-telephone text-success me-2"></i> ${CONFIG.phone2}</a></li>
            <li class="mb-1"><a href="${CONFIG.whatsappUrl1}" target="_blank" class="text-emerald text-xs text-decoration-none"><i class="bi bi-whatsapp me-2"></i> হোয়াটসঅ্যাপ সাপোর্ট ১</a></li>
            <li><a href="${CONFIG.whatsappUrl2}" target="_blank" class="text-emerald text-xs text-decoration-none"><i class="bi bi-whatsapp me-2"></i> হোয়াটসঅ্যাপ সাপোর্ট ২</a></li>
          </ul>
        </div>
      </div>
    `;
  },

  // Footer Component
  renderFooter() {
    return `
      <footer class="main-footer mt-5 pt-5 pb-4">
        <div class="container-fluid px-3 px-lg-5">
          <div class="row g-4">
            
            <!-- Col 1: Shop Logo, Name & Slogan -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="d-flex align-items-center gap-2 mb-3">
                <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" width="48" height="48" class="rounded-circle shadow" />
                <div>
                  <h4 class="brand-name mb-0">${CONFIG.appName}</h4>
                  <small class="text-emerald font-monospace">${CONFIG.slogan}</small>
                </div>
              </div>
              <p class="footer-desc text-xs text-slate-400">
                ${CONFIG.tagline}। সরাসরি আমদানিকারক ও মাস্টার হোলসেলার থেকে সংগৃহীত খাঁটি পণ্য। ২০০০৳+ শপিংয়ে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
              </p>
              <div class="d-flex align-items-center gap-2 mt-3">
                <a href="${CONFIG.whatsappUrl1}" target="_blank" class="social-circle whatsapp" title="WhatsApp 1"><i class="bi bi-whatsapp"></i></a>
                <a href="${CONFIG.whatsappUrl2}" target="_blank" class="social-circle whatsapp" title="WhatsApp 2"><i class="bi bi-chat-dots-fill"></i></a>
                <a href="tel:${CONFIG.phone1}" class="social-circle phone" title="Call 1"><i class="bi bi-telephone-fill"></i></a>
                <a href="tel:${CONFIG.phone2}" class="social-circle phone" title="Call 2"><i class="bi bi-phone-vibrate-fill"></i></a>
              </div>
            </div>

            <!-- Col 2: Pages Links -->
            <div class="col-6 col-md-6 col-lg-3">
              <h6 class="footer-heading">প্রয়োজনীয় পেজ</h6>
              <ul class="list-unstyled footer-links">
                <li><a href="#/"><i class="bi bi-chevron-right me-1"></i> হোম পেজ</a></li>
                <li><a href="#/products"><i class="bi bi-chevron-right me-1"></i> সকল প্রোডাক্টস</a></li>
                <li><a href="#/track"><i class="bi bi-chevron-right me-1"></i> ট্রেকিং পেজ</a></li>
                <li><a href="#/favorites"><i class="bi bi-chevron-right me-1"></i> ফেভরিট পেজ</a></li>
                <li><a href="#/cart"><i class="bi bi-chevron-right me-1"></i> কার্ট ও চেকআউট</a></li>
                <li><a href="#/wholesale/login"><i class="bi bi-chevron-right me-1"></i> এস এ হোলসেলার</a></li>
              </ul>
            </div>

            <!-- Col 3: Address, Phone, Mail -->
            <div class="col-6 col-md-6 col-lg-3">
              <h6 class="footer-heading">যোগাযোগ ও হেল্পলাইন</h6>
              <ul class="list-unstyled footer-contact-info text-xs space-y-2">
                <li><i class="bi bi-geo-alt-fill text-danger me-2"></i> ${CONFIG.address}</li>
                <li><i class="bi bi-telephone-fill text-success me-2"></i> হেল্পলাইন ১: <strong>${CONFIG.phone1}</strong></li>
                <li><i class="bi bi-telephone-fill text-success me-2"></i> হেল্পলাইন ২: <strong>${CONFIG.phone2}</strong></li>
                <li><i class="bi bi-envelope-fill text-info me-2"></i> ${CONFIG.email}</li>
                <li><i class="bi bi-credit-card-2-front-fill text-warning me-2"></i> বিকাশ/নগদে ৫% তাৎক্ষণিক ছাড়</li>
              </ul>
            </div>

            <!-- Col 4: Office Time & Guidelines -->
            <div class="col-12 col-md-6 col-lg-3">
              <h6 class="footer-heading">অফিস টাইম ও নির্দেশিকা</h6>
              <div class="p-3 rounded-3 footer-info-card bg-slate-900 border border-slate-800">
                <div class="mb-2">
                  <strong class="text-white"><i class="bi bi-clock-fill text-warning me-1"></i> অফিস সময়:</strong>
                  <div class="text-xs text-slate-300 mt-1">${CONFIG.officeTime}</div>
                </div>
                <div class="mt-3">
                  <strong class="text-white"><i class="bi bi-shield-check text-emerald me-1"></i> ডেলিভারি রেট:</strong>
                  <div class="text-xs text-slate-300 mt-1">
                    • কুমিল্লা: ৳${CONFIG.deliveryCumilla} | ঢাকা: ৳${CONFIG.deliveryDhaka} | বাইরে: ৳${CONFIG.deliveryOutside}<br>
                    • <strong>২০০০৳+ শপিংয়ে ফ্রি ডেলিভারি!</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr class="my-4 footer-divider border-slate-800" />

          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-xs text-muted">
            <div>
              © 2026 <strong>${CONFIG.appName}</strong> — ${CONFIG.slogan}। সর্বস্বত্ব সংরক্ষিত।
            </div>
            <div class="d-flex gap-3">
              <a href="#/terms" class="text-muted text-decoration-none">ব্যবহারের শর্তাবলী</a>
              <a href="#/privacy" class="text-muted text-decoration-none">গোপনীয়তা নীতি</a>
              <a href="#/admin/login" class="text-muted text-decoration-none">এডমিন পোর্টাল</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // Product Card (Grid-6 Ready)
  renderProductCard(p) {
    const isLoved = STORE.wishlist.has(p.sku);
    const inStock = p.stock > 0;

    return `
      <div class="product-card" data-sku="${p.sku}">
        
        <!-- Image & Badges -->
        <div class="product-card-img-wrap">
          <img src="${p.primaryImage}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';" />
          
          ${p.discountPercent > 0 ? `
            <span class="product-discount-badge">-${p.discountPercent}%</span>
          ` : ''}

          <button class="btn-wishlist-heart ${isLoved ? 'active' : ''}" 
                  onclick="event.stopPropagation(); STORE.wishlist.toggle(${JSON.stringify(p).replace(/"/g, '&quot;')});" 
                  title="ফেভরিট">
            <i class="bi ${isLoved ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>

          ${!inStock ? `<span class="product-out-stock-badge">স্টক আউট</span>` : ''}
        </div>

        <!-- Content -->
        <div class="product-card-body">
          <div class="product-card-category">${p.category}</div>
          <a href="#/product/${p.sku}" class="product-card-title text-truncate-2" title="${p.name}">
            ${p.name}
          </a>

          <!-- Pricing -->
          <div class="product-card-prices">
            <span class="product-selling-price">${CONFIG.currency}${p.sellingPrice.toLocaleString()}</span>
            ${p.originalPrice > p.sellingPrice ? `
              <span class="product-original-price">${CONFIG.currency}${p.originalPrice.toLocaleString()}</span>
            ` : ''}
          </div>

          <!-- Stock Indicator -->
          <div class="product-stock-bar mt-1">
            <div class="stock-text ${inStock ? 'text-success' : 'text-danger'}">
              <i class="bi ${inStock ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i> 
              ${inStock ? `ইন স্টক (${p.stock})` : 'স্টক আউট'}
            </div>
          </div>

          <!-- Card Action Buttons -->
          <div class="product-card-actions mt-2">
            <button class="btn btn-sm btn-quick-cart w-100" 
                    ${!inStock ? 'disabled' : ''}
                    onclick="event.stopPropagation(); STORE.cart.addItem(${JSON.stringify(p).replace(/"/g, '&quot;')}, 1);">
              <i class="bi bi-cart-plus me-1"></i> কার্টে যোগ করুন
            </button>
          </div>
        </div>

      </div>
    `;
  },

  // Page Preloader with Shop Logo Image
  renderLoader() {
    return `
      <div id="page-loader" class="page-loader-screen">
        <div class="loader-content-box">
          <div class="loader-logo-ring">
            <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" class="loader-logo-circle shadow" />
          </div>
          <h3 class="loader-shop-title">${CONFIG.appName}</h3>
          <p class="loader-shop-tagline text-emerald">${CONFIG.slogan}</p>
          <div class="loader-progress-bar">
            <div class="loader-progress-fill"></div>
          </div>
        </div>
      </div>
    `;
  },

  // A5 Printable Order Voucher Generator
  renderVoucherModal(order) {
    const isFreeDel = (order.subtotal || 0) > CONFIG.freeDeliveryThreshold || order.deliveryCharge === 0;
    
    return `
      <div class="modal fade" id="voucherModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-slate-900 text-light border-slate-700">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title font-bold"><i class="bi bi-receipt me-2 text-emerald"></i>অর্ডার ইনভয়েস ভাউচার (A5 Size)</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-0">
              <!-- Printable Area (Formatted for A5 Page Print) -->
              <div id="printable-a5-voucher" class="a5-voucher-sheet">
                
                <!-- Voucher Header with Shop Logo -->
                <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <div class="d-flex align-items-center gap-2">
                    <img src="${CONFIG.logoUrl}" width="54" height="54" class="rounded-circle border" />
                    <div>
                      <h4 class="mb-0 fw-bold text-white">${CONFIG.appName}</h4>
                      <div class="text-xs text-muted">${CONFIG.slogan}</div>
                      <div class="text-xs text-muted">ফোন: ${CONFIG.phone1}, ${CONFIG.phone2} | ${CONFIG.address}</div>
                    </div>
                  </div>
                  <div class="text-end">
                    <span class="badge bg-success fs-6 px-3 py-1">অর্ডার নিশ্চিত</span>
                    <div class="fw-bold mt-1 text-sm text-white">ভাউচার নং: ${order.orderId}</div>
                    <div class="text-xs text-muted">তারিখ: ${order.date}</div>
                  </div>
                </div>

                <!-- Customer Details -->
                <div class="row g-2 mb-3 bg-light text-white p-2 rounded">
                  <div class="col-6">
                    <div class="text-xs text-muted">গ্রাহকের নাম:</div>
                    <div class="fw-bold">${order.customerName}</div>
                    <div class="text-xs text-muted mt-1">মোবাইল নম্বর:</div>
                    <div class="fw-bold">${order.phone}</div>
                  </div>
                  <div class="col-6">
                    <div class="text-xs text-muted">ডেলিভারি ঠিকানা:</div>
                    <div class="fw-bold">${order.address}</div>
                    <div class="text-xs text-muted mt-1">ডেলিভারি মেথড:</div>
                    <div class="fw-bold">${order.deliveryType}</div>
                  </div>
                </div>

                <!-- Payment Details Banner -->
                <div class="p-2 mb-3 rounded bg-emerald/10 border border-emerald/30 text-xs text-white d-flex justify-content-between">
                  <div><strong>পেমেন্ট মাধ্যম:</strong> ${order.paymentMethod || 'ক্যাশ অন ডেলিভারি'}</div>
                  ${order.trxId ? `<div><strong>TrxID / প্রেরক:</strong> ${order.trxId}</div>` : ''}
                  ${order.onlineDiscount > 0 ? `<div class="text-success fw-bold">অনলাইন পেমেন্ট ৫% ছাড় সমন্বিত</div>` : ''}
                </div>

                <!-- Product Table -->
                <table class="table table-bordered table-sm text-xs mb-3 text-white">
                  <thead class="table-dark">
                    <tr>
                      <th>#</th>
                      <th>প্রোডাক্টের বিবরণ</th>
                      <th class="text-center">পরিমাণ</th>
                      <th class="text-end">দর</th>
                      <th class="text-end">মোট</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(order.items || []).map((it, idx) => `
                      <tr>
                        <td>${idx + 1}</td>
                        <td><strong>${it.name}</strong> <span class="text-muted">(${it.sku})</span></td>
                        <td class="text-center">${it.quantity || it.qty || 1}</td>
                        <td class="text-end">${CONFIG.currency}${(it.price || 0).toLocaleString()}</td>
                        <td class="text-end">${CONFIG.currency}${((it.price || 0) * (it.quantity || it.qty || 1)).toLocaleString()}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="4" class="text-end">সাবটোটাল:</th>
                      <th class="text-end">${CONFIG.currency}${(order.subtotal || order.totalAmount).toLocaleString()}</th>
                    </tr>
                    ${order.onlineDiscount > 0 ? `
                      <tr>
                        <th colspan="4" class="text-end text-success">অনলাইন পেমেন্ট ৫% ছাড়:</th>
                        <th class="text-end text-success">-${CONFIG.currency}${order.onlineDiscount.toLocaleString()}</th>
                      </tr>
                    ` : ''}
                    <tr>
                      <th colspan="4" class="text-end">ডেলিভারি চার্জ:</th>
                      <th class="text-end">
                        ${isFreeDel ? `<span class="badge bg-success">ফ্রি (২০০০৳+)</span>` : `${CONFIG.currency}${order.deliveryCharge || 0}`}
                      </th>
                    </tr>
                    <tr class="table-dark">
                      <th colspan="4" class="text-end fs-6">সর্বমোট প্রদেয় টাকা:</th>
                      <th class="text-end fs-6 text-emerald">${CONFIG.currency}${order.totalAmount.toLocaleString()}</th>
                    </tr>
                  </tfoot>
                </table>

                <!-- Voucher Footer Notice -->
                <div class="border-top pt-2 mt-3 d-flex justify-content-between text-xs text-muted">
                  <div>* ডেলিভারিম্যানের সামনে পার্সেল চেক করে গ্রহণ করুন। কোনো সমস্যায় হেল্পলাইনে কল করুন: ${CONFIG.phone1}</div>
                  <div>${CONFIG.appName} Official Invoice</div>
                </div>

              </div>
            </div>
            <div class="modal-footer border-slate-800">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">বন্ধ করুন</button>
              <button type="button" class="btn btn-primary btn-sm" onclick="window.print();"><i class="bi bi-printer-fill me-1"></i> A5 ভাউচার প্রিন্ট করুন</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.COMPONENTS = COMPONENTS;
