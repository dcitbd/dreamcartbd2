/**
 * DREAM CART BD — REUSABLE UI COMPONENTS (COMPREHENSIVE UPDATE)
 * Features:
 * - Developer & CEO Credits (Jainal Abedin, Dream Career IT BD)
 * - Fixed Floating Action Buttons on Right (Cart with Badge, 2 WhatsApp, 2 Phone Call)
 * - 12 Marketplace Links Integration
 * - High-Contrast Dark & Light Theme Adaptive
 * - A5 Print-Ready Order Voucher
 * - Standalone HTML & SPA Dual Mount Support
 */

const COMPONENTS = {
  // Top Notice Bar + Desktop & Mobile Navigation Bar
  renderNavbar() {
    const cartCount = (typeof STORE !== 'undefined' && STORE.cart) ? STORE.cart.getCount() : 0;
    const wishlistCount = (typeof STORE !== 'undefined' && STORE.wishlist) ? STORE.wishlist.items.length : 0;
    const isDark = (typeof STORE !== 'undefined' && STORE.theme) ? (STORE.theme.current === 'dark') : true;
    const customer = (typeof STORE !== 'undefined' && STORE.auth) ? STORE.auth.customer : null;
    const wholesaler = (typeof STORE !== 'undefined' && STORE.auth) ? STORE.auth.wholesaler : null;
    const admin = (typeof STORE !== 'undefined' && STORE.auth) ? STORE.auth.admin : null;

    return `
      <!-- Sticky Top Header Container -->
      <div class="site-header-wrapper sticky-top">
        <!-- Top Announcement & Slogan Bar -->
        <div class="top-announcement-bar py-1 px-3 text-xs d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2 overflow-hidden text-truncate">
          <span class="badge bg-danger text-white">মেগা অফার</span>
          <span class="announcement-text text-truncate">
            🎉 ২০০০৳ এর বেশি কেনাকাটায় সারা দেশে <strong>ডেলিভারি সম্পূর্ণ ফ্রি!</strong> ⚡ বিকাশ/নগদ/রকেট/ব্যাংক পেমেন্টে <strong>ইনস্ট্যান্ট ৫% ছাড়!</strong>
          </span>
        </div>
        <div class="d-none d-md-flex align-items-center gap-3 font-monospace">
          <span><i class="bi bi-telephone-fill text-success me-1"></i> ${CONFIG.phone1} / ${CONFIG.phone2}</span>
          <a href="${CONFIG.whatsappUrl1}" target="_blank" class="text-white text-decoration-none"><i class="bi bi-whatsapp text-success"></i> WhatsApp ১</a>
          <a href="${CONFIG.whatsappUrl2}" target="_blank" class="text-white text-decoration-none"><i class="bi bi-whatsapp text-success"></i> WhatsApp ২</a>
        </div>
      </div>

        <!-- Main Navigation Bar -->
        <nav class="main-navbar">
        <div class="container-fluid px-3 px-lg-5">
          <div class="d-flex align-items-center justify-content-between py-2 gap-2 gap-lg-3">
            
            <!-- 1. Shop Logo & Name & Slogan -->
            <a href="#/" class="navbar-brand d-flex align-items-center gap-2 text-decoration-none me-2">
              <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" class="brand-logo-img rounded-circle" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
              <div class="d-flex flex-column">
                <span class="brand-name">${CONFIG.appName}</span>
                <span class="brand-slogan d-none d-xl-inline text-truncate max-w-xs text-[10px] text-emerald">${CONFIG.slogan}</span>
              </div>
            </a>

            <!-- 2. Global Search Bar (Desktop) -->
            <div class="search-box-wrapper flex-grow-1 d-none d-lg-block mx-2 max-w-md">
              <div class="input-group search-group">
                <input type="text" id="desktop-search-input" class="form-control search-input" 
                       placeholder="প্রোডাক্টের নাম, SKU বা ক্যাটাগরি খুঁজুন..." 
                       onkeydown="if(event.key==='Enter'){window.location.hash='#/products?search='+encodeURIComponent(this.value);}" />
                <button class="btn btn-search" id="btn-desktop-search" type="button" 
                        onclick="const val=document.getElementById('desktop-search-input').value; window.location.hash='#/products?search='+encodeURIComponent(val);">
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
                <ul class="dropdown-menu dropdown-menu-end shadow-lg p-2 text-xs">
                  <li><span class="dropdown-header fw-bold text-uppercase">সরাসরি কল করুন</span></li>
                  <li><a class="dropdown-item py-2" href="tel:${CONFIG.phone1}"><i class="bi bi-telephone-fill text-success me-2"></i> ${CONFIG.phone1} (হটলাইন ১)</a></li>
                  <li><a class="dropdown-item py-2" href="tel:${CONFIG.phone2}"><i class="bi bi-telephone-fill text-success me-2"></i> ${CONFIG.phone2} (হটলাইন ২)</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><span class="dropdown-header fw-bold text-uppercase">হোয়াটসঅ্যাপ চ্যাট</span></li>
                  <li><a class="dropdown-item py-2" href="${CONFIG.whatsappUrl1}" target="_blank"><i class="bi bi-whatsapp text-emerald me-2"></i> WhatsApp ক্যাটালগ ১</a></li>
                  <li><a class="dropdown-item py-2" href="${CONFIG.whatsappUrl2}" target="_blank"><i class="bi bi-whatsapp text-emerald me-2"></i> WhatsApp সাপোর্ট ২</a></li>
                </ul>
              </div>

              <!-- Other Marketplaces Dropdown -->
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-info dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-grid-3x3-gap"></i> মার্কেটসমূহ
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg p-2 text-xs" style="min-width: 230px;">
                  <li><span class="dropdown-header fw-bold text-uppercase">অন্যান্য শপ ও মার্কেট</span></li>
                  ${CONFIG.marketplaces.map(m => `
                    <li>
                      <a class="dropdown-item py-1 d-flex align-items-center justify-content-between" href="${m.url}" target="_blank">
                        <span><i class="bi ${m.icon} me-2" style="color: ${m.color}"></i> ${m.name}</span>
                        <i class="bi bi-box-arrow-up-right text-muted" style="font-size: 10px;"></i>
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Wishlist Link -->
              <a href="#/favorites" class="btn btn-sm btn-outline-secondary position-relative" title="ফেভরিট লিস্ট">
                <i class="bi bi-heart"></i>
                <span id="nav-wishlist-count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${wishlistCount ? '' : 'd-none'}">
                  ${wishlistCount}
                </span>
              </a>

              <!-- Cart Link -->
              <a href="#/cart" class="btn btn-sm btn-primary position-relative d-flex align-items-center gap-2" title="কার্ট">
                <i class="bi bi-cart3"></i>
                <span class="d-none d-xl-inline">কার্ট</span>
                <span id="nav-cart-count" class="badge rounded-pill bg-danger">
                  ${cartCount}
                </span>
              </a>

              <!-- Track Order -->
              <a href="#/track" class="btn btn-sm btn-outline-warning" title="অর্ডার ট্র্যাক">
                <i class="bi bi-truck me-1"></i> ট্র্যাক
              </a>

              <!-- User Portals Dropdown -->
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-light dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-person-circle"></i>
                  <span>${customer ? customer.name.split(' ')[0] : (wholesaler ? wholesaler.shopName : (admin ? admin.role : 'অ্যাকাউন্ট'))}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg p-2 text-xs">
                  ${customer ? `
                    <li><span class="dropdown-header fw-bold text-emerald">কাস্টমার প্রোফাইল</span></li>
                    <li><a class="dropdown-item" href="#/customer/dashboard"><i class="bi bi-speedometer2 me-2"></i> কাস্টমার ড্যাশবোর্ড</a></li>
                    <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="STORE.auth.logoutCustomer(); window.location.hash='#/';"><i class="bi bi-box-arrow-right me-2"></i> লগআউট</a></li>
                  ` : wholesaler ? `
                    <li><span class="dropdown-header fw-bold text-amber">হোলসেলার প্রোফাইল</span></li>
                    <li><a class="dropdown-item" href="#/wholesale/dashboard"><i class="bi bi-shop me-2"></i> হোলসেল ড্যাশবোর্ড</a></li>
                    <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="STORE.auth.logoutWholesaler(); window.location.hash='#/';"><i class="bi bi-box-arrow-right me-2"></i> লগআউট</a></li>
                  ` : admin ? `
                    <li><span class="dropdown-header fw-bold text-sky">এডমিন পোর্টাল</span></li>
                    <li><a class="dropdown-item" href="#/admin/dashboard"><i class="bi bi-shield-check me-2"></i> এডমিন প্যানেল</a></li>
                    <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="STORE.auth.logoutAdmin(); window.location.hash='#/';"><i class="bi bi-box-arrow-right me-2"></i> লগআউট</a></li>
                  ` : `
                    <li><a class="dropdown-item" href="#/customer/login"><i class="bi bi-person me-2"></i> কাস্টমার লগইন / রেজিস্টার</a></li>
                    <li><a class="dropdown-item" href="#/wholesale/login"><i class="bi bi-shop me-2"></i> As A WholeSaller</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-muted" href="#/admin/login"><i class="bi bi-lock me-2"></i> এডমিন লগইন</a></li>
                  `}
                </ul>
              </div>

              <!-- Theme Toggle -->
              <button class="btn btn-sm btn-outline-secondary" id="theme-toggle-btn" 
                      onclick="STORE.theme.toggle()" title="থিম পরিবর্তন">
                <i class="bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}"></i>
              </button>

            </div>

            <!-- Mobile Action Buttons -->
            <div class="d-flex d-lg-none align-items-center gap-2">
              <a href="#/cart" class="btn btn-sm btn-primary position-relative p-2" title="কার্ট">
                <i class="bi bi-cart3"></i>
                <span id="nav-cart-count-mobile" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  ${cartCount}
                </span>
              </a>
              <button class="btn btn-sm btn-outline-secondary" onclick="STORE.theme.toggle()">
                <i class="bi ${isDark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill'}"></i>
              </button>
              <button class="btn btn-sm btn-outline-light" id="btn-open-mobile-drawer" 
                      onclick="document.getElementById('mobile-drawer')?.classList.add('open'); document.getElementById('mobile-drawer-overlay')?.classList.add('open');">
                <i class="bi bi-list fs-5"></i>
              </button>
            </div>

          </div>

          <!-- Mobile Search Bar -->
          <div class="d-block d-lg-none pb-2">
            <div class="input-group input-group-sm">
              <input type="text" id="mobile-search-input" class="form-control" 
                     placeholder="পণ্য বা ক্যাটাগরি সার্চ করুন..." 
                     onkeydown="if(event.key==='Enter'){window.location.hash='#/products?search='+encodeURIComponent(this.value);}" />
              <button class="btn btn-success" type="button" 
                      onclick="const v=document.getElementById('mobile-search-input').value; window.location.hash='#/products?search='+encodeURIComponent(v);">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>

        </div>
        </nav>
      </div>

      <!-- 2. Fixed Floating Action Buttons (Right-Side: Cart + WhatsApp 1 & 2 + Call 1 & 2) -->
      <div class="floating-quick-contacts">
        <a href="#/cart" class="quick-contact-btn cart-float" title="শপিং কার্ট">
          <i class="bi bi-cart3"></i>
          <span class="cart-badge-count badge rounded-pill bg-danger" id="floating-cart-count">${cartCount}</span>
          <span class="tooltip-label">কার্ট (${cartCount})</span>
        </a>
        <a href="${CONFIG.whatsappUrl1}" target="_blank" class="quick-contact-btn whatsapp" title="WhatsApp ১: ${CONFIG.phone1}">
          <i class="bi bi-whatsapp"></i>
          <span class="tooltip-label">WhatsApp ১: ${CONFIG.phone1}</span>
        </a>
        <a href="${CONFIG.whatsappUrl2}" target="_blank" class="quick-contact-btn whatsapp-alt" title="WhatsApp ২: ${CONFIG.phone2}">
          <i class="bi bi-chat-dots-fill"></i>
          <span class="tooltip-label">WhatsApp ২: ${CONFIG.phone2}</span>
        </a>
        <a href="tel:${CONFIG.phone1}" class="quick-contact-btn phone" title="কল করুন: ${CONFIG.phone1}">
          <i class="bi bi-telephone-fill"></i>
          <span class="tooltip-label">কল ১: ${CONFIG.phone1}</span>
        </a>
        <a href="tel:${CONFIG.phone2}" class="quick-contact-btn phone-alt" title="কল করুন: ${CONFIG.phone2}">
          <i class="bi bi-phone-vibrate-fill"></i>
          <span class="tooltip-label">কল ২: ${CONFIG.phone2}</span>
        </a>
      </div>

      <!-- Mobile Offcanvas Drawer Menu -->
      <div class="mobile-drawer-overlay" id="mobile-drawer-overlay" 
           onclick="document.getElementById('mobile-drawer')?.classList.remove('open'); this.classList.remove('open');"></div>
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-drawer-header d-flex align-items-center justify-content-between p-3 border-bottom border-slate-800">
          <div class="d-flex align-items-center gap-2">
            <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" width="36" height="36" class="rounded-circle border" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
            <div>
              <span class="fw-bold fs-6 d-block">${CONFIG.appName}</span>
              <small class="text-emerald text-[10px]">${CONFIG.slogan}</small>
            </div>
          </div>
          <button class="btn btn-sm btn-close-drawer text-white" 
                  onclick="document.getElementById('mobile-drawer')?.classList.remove('open'); document.getElementById('mobile-drawer-overlay')?.classList.remove('open');">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="mobile-drawer-body p-3 overflow-y-auto" style="max-height: calc(100vh - 80px);">
          <ul class="mobile-menu-list list-unstyled space-y-2">
            <li><a href="#/" class="mobile-menu-link text-decoration-none py-2 d-block"><i class="bi bi-house-door-fill me-2 text-primary"></i> হোম পেজ</a></li>
            <li><a href="#/products" class="mobile-menu-link text-decoration-none py-2 d-block"><i class="bi bi-grid-fill me-2 text-info"></i> সকল প্রোডাক্টস</a></li>
            <li><a href="#/track" class="mobile-menu-link text-decoration-none py-2 d-block"><i class="bi bi-truck me-2 text-warning"></i> অর্ডার ট্র্যাক</a></li>
            <li><a href="#/favorites" class="mobile-menu-link text-decoration-none py-2 d-block"><i class="bi bi-heart-fill me-2 text-danger"></i> ফেভরিট লিস্ট</a></li>
            <li><a href="#/cart" class="mobile-menu-link text-decoration-none py-2 d-block"><i class="bi bi-bag-check-fill me-2 text-emerald"></i> শপিং কার্ট</a></li>
            <hr class="my-2 border-slate-800">
            <li><a href="#/customer/login" class="mobile-menu-link text-emerald text-decoration-none py-2 d-block"><i class="bi bi-person-circle me-2"></i> কাস্টমার লগইন / ড্যাশবোর্ড</a></li>
            <li><a href="#/wholesale/login" class="mobile-menu-link text-amber text-decoration-none py-2 d-block"><i class="bi bi-shop me-2"></i> As A WholeSaller</a></li>
            <li><a href="#/admin/login" class="mobile-menu-link text-sky text-decoration-none py-2 d-block"><i class="bi bi-shield-lock me-2"></i> এডমিন পোর্টাল</a></li>
            <hr class="my-2 border-slate-800">
            <div class="text-xs text-muted mb-2 fw-bold text-uppercase">অন্যান্য মার্কেটপ্লেস</div>
            ${CONFIG.marketplaces.slice(0, 6).map(m => `
              <li class="mb-1"><a href="${m.url}" target="_blank" class="text-decoration-none text-xs d-flex align-items-center gap-2"><i class="bi ${m.icon}" style="color: ${m.color}"></i> ${m.name}</a></li>
            `).join('')}
            <hr class="my-2 border-slate-800">
            <div class="text-xs text-muted mb-2 fw-bold text-uppercase">সরাসরি যোগাযোগ</div>
            <li class="mb-1"><a href="tel:${CONFIG.phone1}" class="text-decoration-none text-xs"><i class="bi bi-telephone text-success me-2"></i> ${CONFIG.phone1}</a></li>
            <li class="mb-1"><a href="tel:${CONFIG.phone2}" class="text-decoration-none text-xs"><i class="bi bi-telephone text-success me-2"></i> ${CONFIG.phone2}</a></li>
            <li class="mb-1"><a href="${CONFIG.whatsappUrl1}" target="_blank" class="text-emerald text-xs text-decoration-none"><i class="bi bi-whatsapp me-2"></i> WhatsApp ১</a></li>
            <li><a href="${CONFIG.whatsappUrl2}" target="_blank" class="text-emerald text-xs text-decoration-none"><i class="bi bi-whatsapp me-2"></i> WhatsApp ২</a></li>
          </ul>
        </div>
      </div>
    `;
  },

  // Global Footer Component
  renderFooter() {
    return `
      <footer class="main-footer mt-5 pt-5 pb-4 border-top border-slate-800">
        <div class="container-fluid px-3 px-lg-5">
          <div class="row g-4">
            
            <!-- Col 1: Shop Logo, Name, Slogan & Hotlines -->
            <div class="col-12 col-md-6 col-lg-3">
              <div class="d-flex align-items-center gap-2 mb-3">
                <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" width="48" height="48" class="rounded-circle shadow border border-emerald" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
                <div>
                  <h4 class="brand-name mb-0 text-white">${CONFIG.appName}</h4>
                  <small class="text-emerald font-monospace">${CONFIG.slogan}</small>
                </div>
              </div>
              <p class="footer-desc text-xs text-slate-400">
                ${CONFIG.tagline}। সরাসরি আমদানিকারক ও মাস্টার হোলসেলার থেকে সংগৃহীত খাঁটি পণ্য। ২০০০৳+ শপিংয়ে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
              </p>
              <div class="d-flex align-items-center gap-2 mt-3">
                <a href="${CONFIG.whatsappUrl1}" target="_blank" class="quick-contact-btn whatsapp" style="width:36px; height:36px; font-size:16px;" title="WhatsApp 1"><i class="bi bi-whatsapp"></i></a>
                <a href="${CONFIG.whatsappUrl2}" target="_blank" class="quick-contact-btn whatsapp-alt" style="width:36px; height:36px; font-size:16px;" title="WhatsApp 2"><i class="bi bi-chat-dots-fill"></i></a>
                <a href="tel:${CONFIG.phone1}" class="quick-contact-btn phone" style="width:36px; height:36px; font-size:16px;" title="Call 1"><i class="bi bi-telephone-fill"></i></a>
                <a href="tel:${CONFIG.phone2}" class="quick-contact-btn phone-alt" style="width:36px; height:36px; font-size:16px;" title="Call 2"><i class="bi bi-phone-vibrate-fill"></i></a>
              </div>
            </div>

            <!-- Col 2: Useful Page Links & Legal -->
            <div class="col-6 col-md-6 col-lg-2">
              <h6 class="footer-heading fw-bold mb-3">প্রয়োজনীয় পেজ</h6>
              <ul class="list-unstyled footer-links text-xs space-y-2">
                <li><a href="#/" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> হোম পেজ</a></li>
                <li><a href="#/products" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> সকল প্রোডাক্টস</a></li>
                <li><a href="#/track" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> ট্রেকিং পেজ</a></li>
                <li><a href="#/favorites" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> ফেভরিট পেজ</a></li>
                <li><a href="#/cart" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> কার্ট ও চেকআউট</a></li>
                <li><a href="#/terms" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> ব্যবহারের শর্তাবলী</a></li>
                <li><a href="#/privacy" class="text-decoration-none"><i class="bi bi-chevron-right me-1 text-emerald"></i> গোপনীয়তা নীতি</a></li>
              </ul>
            </div>

            <!-- Col 3: Address, Phone, Mail -->
            <div class="col-6 col-md-6 col-lg-4">
              <h6 class="footer-heading fw-bold mb-3">যোগাযোগ ও হেল্পলাইন</h6>
              <ul class="list-unstyled footer-contact-info text-xs space-y-2">
                <li><i class="bi bi-geo-alt-fill text-danger me-2"></i> ${CONFIG.address}</li>
                <li><i class="bi bi-telephone-fill text-success me-2"></i> হেল্পলাইন ১: <strong>${CONFIG.phone1}</strong></li>
                <li><i class="bi bi-telephone-fill text-success me-2"></i> হেল্পলাইন ২: <strong>${CONFIG.phone2}</strong></li>
                <li><i class="bi bi-envelope-fill text-info me-2"></i> ইমেইল: ${CONFIG.email1}, ${CONFIG.email2}</li>
                <li><i class="bi bi-clock-fill text-warning me-2"></i> অফিস সময়: ${CONFIG.officeTime}</li>
                <li><i class="bi bi-shield-check text-emerald me-2"></i> ডেলিভারি: কুমিল্লা ৳${CONFIG.deliveryCumilla} | ঢাকা ৳${CONFIG.deliveryDhaka} | বাইরে ৳${CONFIG.deliveryOutside} (২০০০৳+ অর্ডারে ফ্রি)</li>
              </ul>
            </div>

            <!-- Col 4: Marketplaces Links (Requirement 13) -->
            <div class="col-12 col-md-6 col-lg-3">
              <h6 class="footer-heading fw-bold mb-3">অন্যান্য মার্কেটপ্লেস ও স্টোর</h6>
              <div class="d-flex flex-wrap gap-2">
                ${CONFIG.marketplaces.map(m => `
                  <a href="${m.url}" target="_blank" class="badge bg-slate-900 border border-slate-700 text-decoration-none p-2 text-xs d-flex align-items-center gap-1 shadow-sm">
                    <i class="bi ${m.icon}" style="color: ${m.color}"></i> ${m.name}
                  </a>
                `).join('')}
              </div>
            </div>

          </div>

          <hr class="my-4 footer-divider border-slate-800" />

          <!-- Bottom Credits & Developer Attribution (Requirement 1) -->
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-xs text-muted">
            <div>
              © 2026 <strong>${CONFIG.appName}</strong> — ${CONFIG.slogan}। সর্বস্বত্ব সংরক্ষিত।
            </div>
            
            <!-- Exact Developer Attribution per Requirement 1 -->
            <div class="p-2 rounded-3 bg-slate-900 border border-slate-800 text-center text-md-end">
              <span>ডেভেলপার: </span>
              <a href="${CONFIG.developerProfileUrl}" target="_blank" class="text-emerald fw-bold text-decoration-none">
                ${CONFIG.developerName}
              </a>
              <span> (${CONFIG.developerProfileUrl}), </span>
              <span>CEO, </span>
              <a href="${CONFIG.developerCompanyUrl}" target="_blank" class="text-info fw-bold text-decoration-none">
                ${CONFIG.developerCompany}
              </a>
              <span> (${CONFIG.developerCompanyUrl})</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // Product Card (Responsive Grid 6 Ready)
  renderProductCard(p) {
    const isWishlist = (typeof STORE !== 'undefined' && STORE.wishlist) ? STORE.wishlist.has(p.sku) : false;
    const discount = p.discountPercent || (p.originalPrice > p.sellingPrice ? Math.round(((p.originalPrice - p.sellingPrice)/p.originalPrice)*100) : 0);
    const inStock = (parseInt(p.stock, 10) || 0) > 0;

    return `
      <div class="product-card scroll-reveal">
        <div class="product-card-img-wrap">
          ${discount > 0 ? `<span class="product-badge-discount">-${discount}%</span>` : ''}
          <button class="product-fav-btn ${isWishlist ? 'text-danger' : ''}" 
                  onclick="STORE.wishlist.toggle('${p.sku}'); this.classList.toggle('text-danger');" 
                  title="ফেভরিট">
            <i class="bi ${isWishlist ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>
          <a href="#/product/${p.sku}">
            <img src="${p.primaryImage || p.images[0] || CONFIG.fallbackLogoUrl}" 
                 alt="${p.name}" class="product-card-img" 
                 loading="lazy"
                 onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
          </a>
        </div>
        <div class="product-card-body">
          <span class="badge bg-slate-800 text-muted mb-1 text-[10px] w-fit">${p.category || 'General'}</span>
          <h4 class="product-card-title">
            <a href="#/product/${p.sku}" class="text-decoration-none text-white">${p.name}</a>
          </h4>
          <div class="product-card-price-row">
            <span class="price-current">${CONFIG.currency}${(p.sellingPrice || 0).toLocaleString()}</span>
            ${p.originalPrice > p.sellingPrice ? `<span class="price-original">${CONFIG.currency}${(p.originalPrice).toLocaleString()}</span>` : ''}
          </div>
          <div class="d-flex align-items-center justify-content-between gap-1 mt-2">
            ${inStock ? `
              <button class="btn btn-sm btn-success w-100 py-1 fw-bold text-xs" 
                      onclick="STORE.cart.addBySku('${p.sku}')">
                <i class="bi bi-cart-plus me-1"></i> কার্ট
              </button>
              <a href="#/product/${p.sku}" class="btn btn-sm btn-outline-primary px-2 py-1 text-xs" title="অর্ডার করুন">
                অর্ডার
              </a>
            ` : `
              <button class="btn btn-sm btn-secondary w-100 py-1 text-xs" disabled>
                স্টক আউট
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  // Splash Loader Screen with Shop Logo
  renderLoader() {
    return `
      <div id="page-loader" class="page-loader-screen">
        <div class="loader-content-box">
          <div class="loader-logo-ring">
            <img src="${CONFIG.logoUrl}" alt="${CONFIG.appName}" class="loader-logo-circle" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
          </div>
          <div class="loader-shop-title">${CONFIG.appName}</div>
          <div class="loader-shop-tagline text-muted text-xs">${CONFIG.slogan}</div>
          <div class="loader-progress-bar">
            <div class="loader-progress-fill"></div>
          </div>
        </div>
      </div>
    `;
  },

  // A5 Print-Ready Order Voucher Modal
  renderVoucherModal(order) {
    if (!order) return '';
    const dateFormatted = order.date || new Date().toLocaleString();
    const items = order.items || [{ name: order.products || 'অর্ডারকৃত পণ্য', quantity: order.quantity || 1, price: order.totalAmount }];

    return `
      <div class="modal fade show" id="orderVoucherModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.85);" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content bg-white text-dark p-4 rounded-4 shadow-2xl border-0" id="printable-voucher-card">
            
            <!-- Voucher Top Actions -->
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom btn-print-hide">
              <span class="badge bg-success px-3 py-2 fs-6">অফিসিয়াল অর্ডার চালান / ভাউচার</span>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-primary btn-sm" onclick="window.print()">
                  <i class="bi bi-printer-fill me-1"></i> A5 প্রিন্ট করুন
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.getElementById('voucherModalContainer').innerHTML = '';">
                  <i class="bi bi-x-lg"></i> বন্ধ করুন
                </button>
              </div>
            </div>

            <!-- A5 Printable Canvas Header -->
            <div class="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div class="d-flex align-items-center gap-3">
                <img src="${CONFIG.logoUrl}" width="60" height="60" class="rounded-circle border" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
                <div>
                  <h3 class="fw-bold mb-0 text-dark">${CONFIG.appName}</h3>
                  <small class="text-success fw-bold">${CONFIG.slogan}</small>
                  <div class="text-muted" style="font-size: 11px;">${CONFIG.address}</div>
                  <div class="text-muted" style="font-size: 11px;">হটলাইন: ${CONFIG.phone1} / ${CONFIG.phone2} | ইমেইল: ${CONFIG.email1}</div>
                </div>
              </div>
              <div class="text-end">
                <h5 class="fw-bold text-primary mb-1">ইনভয়েস #${order.orderId}</h5>
                <div class="text-muted" style="font-size: 11px;">তারিখ: ${dateFormatted}</div>
                <span class="badge bg-secondary">${order.status || 'Pending'}</span>
              </div>
            </div>

            <!-- Customer Details Block -->
            <div class="row g-2 mb-3 p-2 bg-light rounded border text-xs">
              <div class="col-6">
                <strong>গ্রাহকের নাম:</strong> ${order.customerName || order.name || 'সম্মানিত গ্রাহক'}<br>
                <strong>মোবাইল নম্বর:</strong> ${order.phone}<br>
                <strong>ডেলিভারি ঠিকানা:</strong> ${order.address}
              </div>
              <div class="col-6 text-end">
                <strong>পেমেন্ট মেথড:</strong> ${order.paymentMethod || 'ক্যাশ অন ডেলিভারি (COD)'}<br>
                <strong>ডেলিভারি ধরন:</strong> ${order.deliveryType || 'Standard Courier'}<br>
                <strong>শিপিং হাব:</strong> কুমিল্লা / ঢাকা কর্পোরেট হাব
              </div>
            </div>

            <!-- Items Table -->
            <div class="table-responsive mb-3">
              <table class="table table-bordered table-sm text-xs mb-0">
                <thead class="table-light">
                  <tr>
                    <th>বিবরণ ও পণ্য</th>
                    <th class="text-center" width="80">পরিমাণ</th>
                    <th class="text-end" width="100">একক মূল্য</th>
                    <th class="text-end" width="110">মোট টাকা</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(it => `
                    <tr>
                      <td>${it.name || it.productName || 'Product'}</td>
                      <td class="text-center">${it.quantity || 1}</td>
                      <td class="text-end">৳${(it.price || 0).toLocaleString()}</td>
                      <td class="text-end">৳${((it.price || 0) * (it.quantity || 1)).toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-end fw-bold">সাবটোটাল:</td>
                    <td class="text-end">৳${(order.subtotal || order.totalAmount || 0).toLocaleString()}</td>
                  </tr>
                  ${order.discount ? `
                    <tr>
                      <td colspan="3" class="text-end text-success fw-bold">অনলাইন পেমেন্ট ৫% ছাড়:</td>
                      <td class="text-end text-success fw-bold">-৳${order.discount.toLocaleString()}</td>
                    </tr>
                  ` : ''}
                  <tr>
                    <td colspan="3" class="text-end fw-bold">ডেলিভারি চার্জ:</td>
                    <td class="text-end">${order.deliveryCharge ? `৳${order.deliveryCharge}` : 'ফ্রি (০৳)'}</td>
                  </tr>
                  <tr class="table-active">
                    <td colspan="3" class="text-end fw-black fs-6">সর্বমোট প্রদেয়:</td>
                    <td class="text-end fw-black fs-6 text-primary">৳${(order.totalAmount || 0).toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Guidelines & Developer Signature -->
            <div class="d-flex justify-content-between align-items-end mt-4 pt-3 border-top text-xs text-muted">
              <div>
                <strong>বিশেষ নির্দেশিকা:</strong><br>
                • পার্সেল ডেলিভারিম্যানের সামনে চেক করে গ্রহণ করুন।<br>
                • যেকোনো সমস্যায় কল করুন: <strong>${CONFIG.phone1}</strong> অথবা <strong>${CONFIG.phone2}</strong><br>
                • শর্ত প্রযোজ্য (www.dreamcartbd.com)
              </div>
              <div class="text-center">
                <div style="border-bottom: 1px solid #999; width: 140px; margin-bottom: 4px;"></div>
                <span>কর্তৃপক্ষের স্বাক্ষর</span><br>
                <small class="text-[9px] text-muted">Dream Cart BD Management</small>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  // Standalone HTML Helpers
  renderHeader() {
    const mount = document.getElementById('navbar-mount') || document.getElementById('header-container');
    if (mount) mount.innerHTML = this.renderNavbar();
  },

  renderFloatingContacts() {
    const mount = document.getElementById('floating-contacts-container');
    if (mount) {
      if (document.querySelector('.floating-quick-contacts')) { mount.innerHTML = ''; return; }
      const cartCount = (typeof STORE !== 'undefined' && STORE.cart) ? STORE.cart.getCount() : 0;
      mount.innerHTML = `
        <div class="floating-quick-contacts">
          <a href="#/cart" class="quick-contact-btn cart-float" title="শপিং কার্ট">
            <i class="bi bi-cart3"></i>
            <span class="cart-badge-count badge rounded-pill bg-danger">${cartCount}</span>
            <span class="tooltip-label">কার্ট (${cartCount})</span>
          </a>
          <a href="${CONFIG.whatsappUrl1}" target="_blank" class="quick-contact-btn whatsapp" title="WhatsApp ১: ${CONFIG.phone1}">
            <i class="bi bi-whatsapp"></i>
            <span class="tooltip-label">WhatsApp ১: ${CONFIG.phone1}</span>
          </a>
          <a href="${CONFIG.whatsappUrl2}" target="_blank" class="quick-contact-btn whatsapp-alt" title="WhatsApp ২: ${CONFIG.phone2}">
            <i class="bi bi-chat-dots-fill"></i>
            <span class="tooltip-label">WhatsApp ২: ${CONFIG.phone2}</span>
          </a>
          <a href="tel:${CONFIG.phone1}" class="quick-contact-btn phone" title="কল করুন: ${CONFIG.phone1}">
            <i class="bi bi-telephone-fill"></i>
            <span class="tooltip-label">কল ১: ${CONFIG.phone1}</span>
          </a>
          <a href="tel:${CONFIG.phone2}" class="quick-contact-btn phone-alt" title="কল করুন: ${CONFIG.phone2}">
            <i class="bi bi-phone-vibrate-fill"></i>
            <span class="tooltip-label">কল ২: ${CONFIG.phone2}</span>
          </a>
        </div>
      `;
    }
  },

  renderMobileDrawer() {
    // Already in renderNavbar
  },

  renderModals() {
    const mount = document.getElementById('modal-mount') || document.getElementById('modals-container');
    if (mount && !document.getElementById('voucherModalContainer')) {
      mount.innerHTML = `<div id="voucherModalContainer"></div>`;
    }
  }
};

window.COMPONENTS = COMPONENTS;
