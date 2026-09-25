/**
 * DREAM CART BD — STOREFRONT & CUSTOMER PAGES (UPDATED)
 * Full Implementation: Category 1-8 (12 pcs Grid-6), Smart Address Detection (Cumilla 90, Dhaka 110, Outside 135),
 * Free Delivery (>2000 BDT), 5% Online Payment Discount & TrxID verification.
 */
const PAGES = {

  // 1. HOME PAGE (Requirement 1: 10% Margin, Developer Credits; Requirement 4: 12 pcs slider per category; Requirement 5: In-stock only)
  async renderHome() {
    const bannersRes = await API.call('banners/list');
    const banners = bannersRes.data || [];
    
    // Group products by category (Requirement 5: in-stock only)
    const catRes = await API.call('products/get_by_category');
    const categoryGroups = (catRes.data && catRes.data.groups) || [];

    const allProdsRes = await API.call('products/list');
    const allProducts = (allProdsRes.data && allProdsRes.data.items) || [];

    return `
      <div class="home-page-container">
        
        <!-- Slogan, Highlights & Top Notice -->
        <div class="promo-highlight-banner p-3 rounded-4 mb-4 text-white d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-lg">
          <div class="d-flex align-items-center gap-3">
            <img src="${CONFIG.logoUrl}" width="54" height="54" class="rounded-circle border-2 border-emerald shadow" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
            <div>
              <h4 class="mb-0 fw-bold text-white">${CONFIG.appName}</h4>
              <div class="text-xs text-emerald fw-bold">${CONFIG.slogan}</div>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 text-xs">
            <span class="badge bg-success p-2"><i class="bi bi-truck me-1"></i> ২০০০৳+ শপিংয়ে ডেলিভারি ফ্রি</span>
            <span class="badge bg-warning text-dark p-2"><i class="bi bi-credit-card me-1"></i> অনলাইন পেমেন্টে ৫% ছাড়</span>
            <span class="badge bg-info text-dark p-2"><i class="bi bi-telephone me-1"></i> ${CONFIG.phone1} / ${CONFIG.phone2}</span>
          </div>
        </div>

        <!-- 10+ Slide Animated Hero Banner with Category Linking (Requirement 3) -->
        <section class="banner-carousel-section mb-5">
          <div id="homeHeroCarousel" class="carousel slide carousel-fade shadow-2xl rounded-4 overflow-hidden border border-slate-800" data-bs-ride="carousel" data-bs-interval="4000">
            
            <div class="carousel-indicators">
              ${banners.map((b, i) => `
                <button type="button" data-bs-target="#homeHeroCarousel" data-bs-slide-to="${i}" 
                        class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i + 1}"></button>
              `).join('')}
            </div>

            <div class="carousel-inner">
              ${banners.map((b, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}" style="background: ${b.bg || '#0f172a'}; min-height: 380px;">
                  <div class="container py-4 py-md-5">
                    <div class="row align-items-center g-4">
                      <div class="col-12 col-md-7 text-white z-2">
                        <span class="badge bg-emerald px-3 py-1 text-uppercase fw-bold mb-2">${b.badge || 'স্পেশাল অফার'}</span>
                        <h1 class="display-6 fw-black mb-3 slide-title">${b.title}</h1>
                        <p class="lead text-slate-300 fs-6 mb-4 slide-desc">${b.subtitle || ''}</p>
                        <div class="d-flex flex-wrap gap-2">
                          <a href="${b.link || '#/products'}" class="btn btn-primary px-4 py-2 fw-bold shadow">
                            এখনই কিনুন →
                          </a>
                          <a href="#/products" class="btn btn-outline-light px-4 py-2">
                            সকল প্রোডাক্ট দেখুন
                          </a>
                        </div>
                      </div>
                      <div class="col-12 col-md-5 text-center z-2">
                        <img src="${b.img}" alt="${b.title}" class="img-fluid rounded-3 shadow-lg banner-featured-img" style="max-height: 280px; object-fit: cover;" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
        </section>

        <!-- Trust Badges Bar -->
        <section class="trust-features-bar mb-5">
          <div class="row g-3">
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border border-slate-800 p-3 rounded-3 d-flex align-items-center gap-3">
                <i class="bi bi-gift-fill text-emerald fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">ফ্রি ডেলিভারি অফার</div>
                  <small class="text-muted text-xs">২০০০৳ বেশি অর্ডারে ফ্রি</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border border-slate-800 p-3 rounded-3 d-flex align-items-center gap-3">
                <i class="bi bi-percent text-warning fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">৫% ইনস্ট্যান্ট ডিসকাউন্ট</div>
                  <small class="text-muted text-xs">বিকাশ/নগদ/রকেট/ব্যাংকে</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border border-slate-800 p-3 rounded-3 d-flex align-items-center gap-3">
                <i class="bi bi-patch-check-fill text-info fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">১০০% খাঁটি পণ্য</div>
                  <small class="text-muted text-xs">৭ দিনের সহজ রিটার্ন</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border border-slate-800 p-3 rounded-3 d-flex align-items-center gap-3">
                <i class="bi bi-headset text-success fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">সার্বক্ষণিক হেল্পলাইন</div>
                  <small class="text-muted text-xs">${CONFIG.phone1}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Live Google Sheet Status Banner -->
        <div class="alert bg-slate-900 border border-emerald/40 text-white rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="spinner-grow spinner-grow-sm text-emerald" role="status"></span>
            <span class="fw-bold text-sm">গুগল সীট থেকে লাইভ ডেটাবেজ সংযুক্ত</span>
            <span class="badge bg-emerald text-dark fw-bold">${allProducts.length} টি পণ্য সক্রিয়</span>
          </div>
          <a href="#/products" class="btn btn-xs btn-outline-emerald text-xs fw-bold">সব প্রোডাক্ট দেখুন →</a>
        </div>

        <!-- Category-Wise Product Sections (Requirement: 12 pcs product by Grid 6 per Category with See All) -->
        <section class="category-sections-wrapper space-y-5">
          ${categoryGroups.slice(0, 8).map((group, idx) => `
            <div class="category-block mb-5">
              
              <!-- Category Header with Title and See All -->
              <div class="category-header-line d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-slate-800">
                <div class="d-flex align-items-center gap-2 flex-grow-1 me-3">
                  <span class="badge bg-emerald rounded-circle p-2" style="width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem;">${idx + 1}</span>
                  <div>
                    <h3 class="category-heading mb-0 fw-bold fs-5 text-white">${group.categoryName}</h3>
                    <div class="text-xs text-emerald fw-semibold">${group.totalCount} টি প্রোডাক্ট উপলব্ধ</div>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <a href="#/products?category=${encodeURIComponent(group.categoryName)}" class="btn btn-sm btn-outline-success text-nowrap fw-bold px-3 py-1">
                    See all (${group.totalCount}) <i class="bi bi-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>

              <!-- 12 pcs product by grid 6 -->
              <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                ${group.products.slice(0, 12).map(p => `
                  <div class="col">
                    ${COMPONENTS.renderProductCard(p)}
                  </div>
                `).join('')}
              </div>

            </div>
          `).join('')}
        </section>

        <!-- Wholesale Call to Action Banner -->
        <section class="wholesale-cta-box my-5 p-4 p-md-5 rounded-4 text-white shadow-xl" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #334155;">
          <div class="row align-items-center">
            <div class="col-12 col-md-8">
              <span class="badge bg-warning text-dark fw-bold mb-2">হোলসেলার ও বাল্ক পার্টনারশিপ</span>
              <h2 class="fw-black mb-2">আপনি কি পাইকারি মূল্যে পণ্য কিনতে চান?</h2>
              <p class="text-slate-300 mb-0 text-sm">ড্রিম কার্ট বিডি-এর স্পেশাল হোলসেল রেট এবং মিনিমাম অর্ডার কোয়ান্টিটি (MOQ) সুবিধা পেতে আজই যুক্ত হোন।</p>
            </div>
            <div class="col-12 col-md-4 text-md-end mt-3 mt-md-0">
              <a href="#/wholesale/login" class="btn btn-warning btn-lg px-4 py-2 fw-bold text-dark shadow">
                <i class="bi bi-shop me-1"></i> As A WholeSaller
              </a>
            </div>
          </div>
        </section>

        <!-- Developer Credit Card prominently on Home Page (Requirement 1) -->
        <div class="p-3 my-4 rounded-4 bg-slate-900 border border-slate-800 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-xs shadow-sm">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-code-slash text-emerald fs-4"></i>
            <div>
              <strong class="text-white">ডেভেলপার পরিচিতি:</strong>
              <div>
                <a href="${CONFIG.developerProfileUrl}" target="_blank" class="text-emerald fw-bold text-decoration-none">
                  ${CONFIG.developerName}
                </a> (${CONFIG.developerProfileUrl})
              </div>
            </div>
          </div>
          <div class="text-md-end">
            <span class="text-muted">প্রতিষ্ঠান: </span>
            <span class="fw-bold text-white">${CONFIG.developerRole} — </span>
            <a href="${CONFIG.developerCompanyUrl}" target="_blank" class="text-info fw-bold text-decoration-none">
              ${CONFIG.developerCompany}
            </a> (${CONFIG.developerCompanyUrl})
          </div>
        </div>

      </div>
    `;
  },

  scrollSlider(elementId, distance) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollBy({ left: distance, behavior: 'smooth' });
    }
  },

  // 2. PRODUCTS PAGE (Requirement 6: Category Tree & Filters; Requirement 7: 120 products per page with pagination)
  async renderProducts(queryParams = {}) {
    const activeCategory = queryParams.category || 'all';
    const activeSub = queryParams.subCategory || '';
    const activeChild = queryParams.childCategory || '';
    const activeBrand = queryParams.brand || 'all';
    const activeStock = queryParams.stock || 'all'; // Default: All products from Google Sheet
    const minPrice = queryParams.minPrice || '';
    const maxPrice = queryParams.maxPrice || '';
    const search = queryParams.search || '';
    const currentPage = parseInt(queryParams.page, 10) || 1;
    const pageSize = 120; // Requirement 7: 120 pcs per page

    // Fetch filtered products
    const res = await API.call('products/list', {
      category: activeCategory !== 'all' ? activeCategory : '',
      subCategory: activeSub,
      childCategory: activeChild,
      brand: activeBrand !== 'all' ? activeBrand : '',
      stockStatus: activeStock,
      minPrice,
      maxPrice,
      search
    });
    
    let allFiltered = (res.data && res.data.items) || [];
    
    // Additional refinement for tree sub/child if passed
    if (activeSub) {
      allFiltered = allFiltered.filter(p => p.subCategory && p.subCategory.toLowerCase() === activeSub.toLowerCase());
    }
    if (activeChild) {
      allFiltered = allFiltered.filter(p => p.childCategory && p.childCategory.toLowerCase() === activeChild.toLowerCase());
    }

    const totalItems = allFiltered.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = allFiltered.slice(startIndex, startIndex + pageSize);

    // Fetch category tree hierarchy (Requirement 6)
    const treeRes = await API.call('categories/tree');
    const categoryTree = treeRes.data || [];

    // Fetch brands
    const brandsRes = await API.call('brands/list');
    const brandsList = (brandsRes.data && brandsRes.data.items) || [];

    // Convert number to Bengali numerals
    const toBengaliNumber = (n) => {
      const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
      return String(n).split('').map(d => bnDigits[d] || d).join('');
    };

    return `
      <div class="products-page-container">
        
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb text-xs">
            <li class="breadcrumb-item"><a href="#/" class="text-emerald text-decoration-none">হোম</a></li>
            <li class="breadcrumb-item active" aria-current="page">সকল প্রোডাক্টস</li>
            ${activeCategory !== 'all' ? `<li class="breadcrumb-item active">${activeCategory}</li>` : ''}
            ${activeSub ? `<li class="breadcrumb-item active">${activeSub}</li>` : ''}
          </ol>
        </nav>

        <div class="row g-4">
          
          <!-- Left Sidebar: Filters & Tree Categories (Requirement 6) -->
          <div class="col-12 col-lg-3">
            <div class="d-lg-none mb-3">
              <button class="btn btn-sm btn-outline-success w-100 d-flex align-items-center justify-content-between p-2 rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#mobileFilterPanel">
                <span><i class="bi bi-sliders me-2 text-emerald"></i> ক্যাটাগরি ও ফিল্টার অপশন</span>
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>
            <div class="filter-sidebar p-3 rounded-4 shadow-sm bg-slate-900 border border-slate-800 collapse d-lg-block" id="mobileFilterPanel">
              <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-slate-800 pb-2">
                <h6 class="mb-0 fw-bold"><i class="bi bi-sliders me-1 text-emerald"></i> ফিল্টার অপশন</h6>
                <a href="#/products" class="text-xs text-danger text-decoration-none">সব রিসেট</a>
              </div>

              <!-- Stock Filter (Requirement 5) -->
              <div class="mb-4">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">স্টক ফিল্টার</label>
                <div class="stock-filter-options space-y-2">
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockIn" value="in_stock" 
                           ${activeStock === 'in_stock' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'in_stock')">
                    <label class="form-check-label text-xs text-success fw-bold" for="stockIn">
                      <i class="bi bi-check-circle-fill me-1"></i> ইন স্টক (স্টকে আছে - ডিফল্ট)
                    </label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockAll" value="all" 
                           ${activeStock === 'all' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'all')">
                    <label class="form-check-label text-xs" for="stockAll">সকল প্রোডাক্ট (All Products)</label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockOut" value="out_of_stock" 
                           ${activeStock === 'out_of_stock' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'out_of_stock')">
                    <label class="form-check-label text-xs text-danger" for="stockOut">আউট অব স্টক (Stock Out)</label>
                  </div>
                </div>
              </div>

              <!-- Category Tree Filter (Requirement 6: Main > Sub > Child Tree) -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label text-xs fw-bold text-uppercase text-muted mb-0">ক্যাটাগরি ট্রি (Tree View)</label>
                  <a href="#/products?stock=${activeStock}" class="text-[11px] text-muted text-decoration-none">সব দেখুন</a>
                </div>
                
                <div class="category-tree-wrapper">
                  ${categoryTree.map((cat, idx) => {
                    const isMainActive = activeCategory.toLowerCase() === cat.mainCategory.toLowerCase();
                    return `
                      <div class="tree-main-item">
                        <div class="tree-header ${isMainActive ? 'border-emerald' : ''}" 
                             onclick="PAGES.toggleTreeNode('sub-tree-${idx}');">
                          <div class="d-flex align-items-center gap-2" onclick="event.stopPropagation(); window.location.hash='#/products?category=${encodeURIComponent(cat.mainCategory)}&stock=${activeStock}';">
                            <i class="bi bi-folder2${isMainActive ? '-open text-emerald' : ' text-warning'}"></i>
                            <span class="${isMainActive ? 'fw-bold text-emerald' : ''}">${cat.mainCategory}</span>
                          </div>
                          <i class="bi bi-chevron-down text-muted text-[10px]" id="arrow-sub-tree-${idx}"></i>
                        </div>

                        <!-- Sub Categories -->
                        <div class="tree-sub-list ${isMainActive ? '' : 'd-none'}" id="sub-tree-${idx}">
                          ${cat.subCategories.map((sub, sIdx) => {
                            const isSubActive = activeSub.toLowerCase() === sub.subCategory.toLowerCase();
                            return `
                              <div class="tree-sub-item">
                                <div class="tree-sub-header" onclick="PAGES.toggleTreeNode('child-tree-${idx}-${sIdx}');">
                                  <div class="d-flex align-items-center gap-1" onclick="event.stopPropagation(); window.location.hash='#/products?category=${encodeURIComponent(cat.mainCategory)}&subCategory=${encodeURIComponent(sub.subCategory)}&stock=${activeStock}';">
                                    <i class="bi bi-arrow-return-right text-muted me-1"></i>
                                    <span class="${isSubActive ? 'fw-bold text-emerald' : ''}">${sub.subCategory}</span>
                                  </div>
                                  ${sub.childCategories.length ? `<i class="bi bi-chevron-down text-muted text-[9px]"></i>` : ''}
                                </div>

                                <!-- Child Categories -->
                                ${sub.childCategories.length ? `
                                  <div class="tree-child-list ${isSubActive ? '' : 'd-none'}" id="child-tree-${idx}-${sIdx}">
                                    ${sub.childCategories.map(child => `
                                      <div class="tree-child-item ${activeChild.toLowerCase() === child.toLowerCase() ? 'fw-bold text-emerald' : 'text-muted'}" 
                                           onclick="window.location.hash='#/products?category=${encodeURIComponent(cat.mainCategory)}&subCategory=${encodeURIComponent(sub.subCategory)}&childCategory=${encodeURIComponent(child)}&stock=${activeStock}';">
                                        • ${child}
                                      </div>
                                    `).join('')}
                                  </div>
                                ` : ''}
                              </div>
                            `;
                          }).join('')}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Brand Filter -->
              <div class="mb-4">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">ব্রান্ড ফিল্টার</label>
                <div class="brand-filter-list space-y-1" style="max-height: 180px; overflow-y: auto;">
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="brandFilter" id="brdAll" value="all" 
                           ${activeBrand === 'all' ? 'checked' : ''} onchange="PAGES.applyFilter('brand', 'all')">
                    <label class="form-check-label text-xs" for="brdAll">সকল ব্রান্ড</label>
                  </div>
                  ${brandsList.map((b, bIdx) => `
                    <div class="form-check custom-radio">
                      <input class="form-check-input" type="radio" name="brandFilter" id="brd-${bIdx}" value="${b.name}" 
                             ${activeBrand.toLowerCase() === b.name.toLowerCase() ? 'checked' : ''} 
                             onchange="PAGES.applyFilter('brand', '${b.name}')">
                      <label class="form-check-label text-xs" for="brd-${bIdx}">${b.name}</label>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Price Filter -->
              <div class="mb-3">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">মূল্য সীমা (৳)</label>
                <div class="d-flex gap-2">
                  <input type="number" id="filter-min-price" class="form-control form-control-sm" placeholder="মিনিমাম" value="${minPrice}">
                  <input type="number" id="filter-max-price" class="form-control form-control-sm" placeholder="ম্যাক্সিমাম" value="${maxPrice}">
                </div>
                <button class="btn btn-sm btn-success w-100 mt-2" onclick="PAGES.applyPriceFilter()">ফিল্টার প্রয়োগ</button>
              </div>

            </div>
          </div>

          <!-- Right Column: Products Grid (120 products per page) & Pagination (Requirement 7) -->
          <div class="col-12 col-lg-9">
            
            <!-- Result Summary Header -->
            <div class="d-flex align-items-center justify-content-between mb-3 bg-slate-900 p-3 rounded-3 border border-slate-800">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-emerald">${toBengaliNumber(totalItems)} টি প্রোডাক্ট</span>
                <span class="text-xs text-muted d-none d-sm-inline">
                  (পেজ ${toBengaliNumber(currentPage)} / ${toBengaliNumber(totalPages)} — প্রতি পেজে সর্বোচ্চ ১২০টি)
                </span>
              </div>
              <div class="d-flex align-items-center gap-2 text-xs">
                <span class="text-muted d-none d-md-inline">সর্ট:</span>
                <select class="form-select form-select-sm w-auto" onchange="PAGES.applySort(this.value)">
                  <option value="featured">ফিচার্ড প্রোডাক্ট</option>
                  <option value="price_low">দাম: কম থেকে বেশি</option>
                  <option value="price_high">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

            <!-- 120 pcs Product Grid (Responsive Grid 6) -->
            ${paginatedItems.length === 0 ? `
              <div class="card p-5 text-center my-4 bg-slate-900 border border-slate-800 rounded-4">
                <i class="bi bi-search fs-1 text-muted mb-2"></i>
                <h5>কোনো প্রোডাক্ট পাওয়া যায়নি!</h5>
                <p class="text-xs text-muted">আপনার ফিল্টার পরিবর্তন করুন বা অন্য কোনো নাম দিয়ে সার্চ করুন।</p>
                <a href="#/products" class="btn btn-sm btn-outline-success mx-auto w-fit">সকল প্রোডাক্ট দেখুন</a>
              </div>
            ` : `
              <div class="grid-6-container">
                ${paginatedItems.map(p => COMPONENTS.renderProductCard(p)).join('')}
              </div>
            `}

            <!-- Pagination Bar: < ১, ২, ৩ ... ২০ > (Requirement 7) -->
            ${totalPages > 1 ? `
              <nav class="d-flex justify-content-center my-5">
                <ul class="pagination pagination-sm gap-1 flex-wrap">
                  
                  <!-- Prev Button -->
                  <li class="page-item ${currentPage <= 1 ? 'disabled' : ''}">
                    <a class="page-link rounded-2" href="#/products?page=${currentPage - 1}&category=${encodeURIComponent(activeCategory)}&stock=${activeStock}">
                      <i class="bi bi-chevron-left"></i> পূর্ববর্তী
                    </a>
                  </li>

                  <!-- Numbered Pages -->
                  ${Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => `
                    <li class="page-item ${pageNum === currentPage ? 'active' : ''}">
                      <a class="page-link rounded-2 ${pageNum === currentPage ? 'bg-success border-success text-white' : ''}" 
                         href="#/products?page=${pageNum}&category=${encodeURIComponent(activeCategory)}&stock=${activeStock}">
                        ${toBengaliNumber(pageNum)}
                      </a>
                    </li>
                  `).join('')}

                  <!-- Next Button -->
                  <li class="page-item ${currentPage >= totalPages ? 'disabled' : ''}">
                    <a class="page-link rounded-2" href="#/products?page=${currentPage + 1}&category=${encodeURIComponent(activeCategory)}&stock=${activeStock}">
                      পরবর্তী <i class="bi bi-chevron-right"></i>
                    </a>
                  </li>

                </ul>
              </nav>
            ` : ''}

          </div>

        </div>
      </div>
    `;
  },

  toggleTreeNode(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('d-none');
    }
  },

  // 3. PRODUCT DETAILS PAGE (Full Info, Gallery, Variant, Wholesale, Others, Reviews)
  async renderProductDetails(sku) {
    const rawSku = String(sku || '').trim();
    const decodedSku = decodeURIComponent(rawSku).trim();
    const res = await API.call('products/details', { id: decodedSku });
    if (!res.success || !res.data) {
      return `
        <div class="container py-5 text-center">
          <div class="p-5 rounded-4 bg-slate-900 border border-slate-800 max-w-lg mx-auto">
            <i class="bi bi-exclamation-circle text-warning fs-1 mb-3"></i>
            <h4 class="text-white fw-bold">প্রোডাক্টটি খুঁজে পাওয়া যায়নি</h4>
            <p class="text-muted text-sm mb-4">SKU: <span class="font-monospace text-slate-300">${decodedSku}</span></p>
            <a href="#/products" class="btn btn-primary px-4 fw-bold">সকল প্রোডাক্ট দেখুন</a>
          </div>
        </div>
      `;
    }
    const p = res.data;
    const isLoved = STORE.wishlist.has(p.sku);

    const relRes = await API.call('products/list', { category: p.category });
    const related = (relRes.data && relRes.data.items || []).filter(item => item.sku !== p.sku).slice(0, 6);

    // Clean images
    let rawImgs = [];
    if (Array.isArray(p.images) && p.images.length > 0) {
      rawImgs = p.images;
    } else if (p.primaryImage) {
      rawImgs = [p.primaryImage];
    }
    const cleanImgs = rawImgs.map(img => (API.cleanImageUrl ? API.cleanImageUrl(img) : String(img).replace(/\\_/g, '_').replace(/\_/g, '_'))).filter(Boolean);
    const mainImgUrl = cleanImgs[0] || (CONFIG && CONFIG.fallbackLogoUrl);

    return `
      <div class="product-details-container" data-sku="${p.sku}">
        
        <!-- Category Tree Breadcrumbs -->
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb text-xs">
            <li class="breadcrumb-item"><a href="#/">হোম</a></li>
            <li class="breadcrumb-item"><a href="#/products?category=${encodeURIComponent(p.category)}">${p.category}</a></li>
            ${p.subCategory ? `<li class="breadcrumb-item">${p.subCategory}</li>` : ''}
            ${p.childCategory ? `<li class="breadcrumb-item">${p.childCategory}</li>` : ''}
            <li class="breadcrumb-item active text-truncate max-w-xs" aria-current="page">${p.name}</li>
          </ol>
        </nav>

        <div class="row g-4 mb-5">
          
          <!-- Image Gallery / Slide View -->
          <div class="col-12 col-md-6">
            <div class="product-gallery-box p-3 rounded-4 bg-slate-900 border border-slate-800 text-center">
              <div class="main-image-wrap mb-3 position-relative">
                <img id="detail-main-img" src="${mainImgUrl}" alt="${p.name}" class="img-fluid rounded-3" 
                     style="max-height: 420px; width: 100%; object-fit: contain; background: #030712;" 
                     onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
              </div>
              <div class="thumbnail-strip d-flex gap-2 justify-content-center overflow-auto pb-2">
                ${cleanImgs.map((img, i) => `
                  <img src="${img}" class="thumb-img ${i === 0 ? 'active' : ''}" 
                       style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${i === 0 ? '#10b981' : '#334155'};"
                       onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';"
                       onclick="document.getElementById('detail-main-img').src='${img}'; document.querySelectorAll('.thumb-img').forEach(t=>t.style.borderColor='#334155'); this.style.borderColor='#10b981';" />
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Product Details & Actions -->
          <div class="col-12 col-md-6">
            <div class="product-info-panel">
              <div class="d-flex flex-wrap gap-2 mb-2">
                <span class="badge bg-emerald">${p.brand || 'China Brand'}</span>
                <span class="badge bg-secondary">${p.category}</span>
                ${p.subCategory ? `<span class="badge bg-slate-800 text-slate-300 border border-slate-700">${p.subCategory}</span>` : ''}
              </div>
              <div class="text-xs text-muted mb-2">
                SKU: <span class="text-slate-300 font-monospace fw-bold">${p.sku}</span>
                ${p.articleNo && p.articleNo !== p.sku ? ` | Article No: <span class="text-warning font-monospace">${p.articleNo}</span>` : ''}
              </div>
              
              <h1 class="h3 fw-bold mb-3 text-white leading-snug">${p.name}</h1>

              <!-- Price & Discount Box -->
              <div class="price-box-details p-3 rounded-3 mb-3 bg-slate-900/60 border border-slate-800">
                <div class="d-flex align-items-center gap-3">
                  <div class="display-6 fw-bold text-emerald">${CONFIG.currency}${(Number(p.sellingPrice) || 0).toLocaleString()}</div>
                  ${p.originalPrice > p.sellingPrice ? `
                    <div class="text-decoration-line-through text-muted fs-5">${CONFIG.currency}${(Number(p.originalPrice) || 0).toLocaleString()}</div>
                    <span class="badge bg-danger">-${p.discountPercent}% ছাড়</span>
                  ` : ''}
                </div>
                ${p.wholesalePrice ? `
                  <div class="mt-2 pt-2 border-top border-slate-800 d-flex flex-wrap align-items-center justify-content-between gap-2 text-xs">
                    <span class="text-warning fw-bold"><i class="bi bi-box-seam me-1"></i>হোলসেল রেট: ৳${(Number(p.wholesalePrice) || 0).toLocaleString()}</span>
                    <span class="text-slate-300">মিনিমাম অর্ডার কোয়ান্টিটি (MOQ): <strong>${p.minOrderQ || '৫ পিস'}</strong></span>
                  </div>
                ` : ''}
              </div>

              <!-- Special Offer Banner -->
              <div class="p-2 mb-3 rounded-3 bg-emerald/10 border border-emerald/30 text-xs text-emerald d-flex align-items-center gap-2">
                <i class="bi bi-tag-fill fs-5"></i>
                <div>
                  <strong>অফার:</strong> বিকাশ/নগদ/রকেটে অগ্রিম পে করলে <strong>৫% তাৎক্ষণিক ছাড়!</strong> ২০০০৳+ অর্ডারে ডেলিভারি ফ্রি।
                </div>
              </div>

              <!-- Stock & Variations -->
              <div class="mb-3 p-3 rounded-3 bg-slate-900/40 border border-slate-800">
                <div class="row g-2 text-xs">
                  <div class="col-4"><strong>স্টক:</strong> <span class="${p.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}">${p.stock > 0 ? `${p.stock} পিস স্টকে আছে` : 'স্টক আউট'}</span></div>
                  <div class="col-4"><strong>রং (Color):</strong> <span class="text-slate-200">${p.color || 'Default'}</span></div>
                  <div class="col-4"><strong>সাইজ (Size):</strong> <span class="text-slate-200">${p.size || 'Standard'}</span></div>
                </div>
              </div>

              <!-- Quantity Selector -->
              <div class="d-flex align-items-center gap-3 mb-4">
                <span class="fw-bold text-sm text-white">পরিমাণ:</span>
                <div class="qty-selector-group">
                  <button class="btn btn-sm btn-qty" onclick="PAGES.changeDetailQty(-1)">-</button>
                  <span id="detail-qty-val" class="qty-number">1</span>
                  <button class="btn btn-sm btn-qty" onclick="PAGES.changeDetailQty(1)">+</button>
                </div>
              </div>

              <!-- Action Buttons (Cart, Order, Both WhatsApp, Love) -->
              <div class="d-flex flex-wrap gap-2 mb-4">
                <button class="btn btn-primary flex-grow-1 py-2 fw-bold" 
                        onclick="PAGES.detailBuyNow('${p.sku}')">
                  <i class="bi bi-lightning-charge-fill me-1"></i> সরাসরি অর্ডার করুন (Buy Now)
                </button>

                <button class="btn btn-outline-emerald px-3" 
                        onclick="PAGES.detailAddToCart('${p.sku}')">
                  <i class="bi bi-cart-plus me-1"></i> কার্ট
                </button>

                <!-- WhatsApp 1 -->
                <a href="${CONFIG.whatsappUrl1}?text=${encodeURIComponent('Hello Dream Cart BD, I want to order ' + p.name + ' (SKU: ' + p.sku + ')')}" 
                   target="_blank" class="btn btn-success px-3" title="হোয়াটসঅ্যাপ ১ এ সরাসরি অর্ডার">
                  <i class="bi bi-whatsapp"></i> ১
                </a>

                <!-- WhatsApp 2 -->
                <a href="${CONFIG.whatsappUrl2}?text=${encodeURIComponent('Hello Dream Cart BD, I want to order ' + p.name + ' (SKU: ' + p.sku + ')')}" 
                   target="_blank" class="btn btn-success px-3" title="হোয়াটসঅ্যাপ ২ এ সরাসরি অর্ডার">
                  <i class="bi bi-whatsapp"></i> ২
                </a>

                <button class="btn btn-outline-danger px-3 ${isLoved ? 'active text-danger' : ''}" 
                        onclick="STORE.wishlist.toggle('${p.sku}'); this.classList.toggle('active'); this.classList.toggle('text-danger');" 
                        title="ফেভরিট">
                  <i class="bi ${isLoved ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
              </div>

              <!-- Accordions: Description, Specification & Others (Comprehensive Details) -->
              <div class="accordion mb-4" id="prodAccordion">
                
                <!-- 1. Description -->
                <div class="accordion-item bg-slate-900 border-slate-800">
                  <h2 class="accordion-header">
                    <button class="accordion-button bg-slate-900 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#descCollapse">
                      <i class="bi bi-info-circle me-2 text-info"></i> প্রোডাক্ট বিবরণ (Description)
                    </button>
                  </h2>
                  <div id="descCollapse" class="accordion-collapse collapse show">
                    <div class="accordion-body text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                      ${p.description || 'বিবরণ শিঘ্রই যুক্ত করা হবে।'}
                    </div>
                  </div>
                </div>

                <!-- 2. Specification -->
                <div class="accordion-item bg-slate-900 border-slate-800">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed bg-slate-900 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#specCollapse">
                      <i class="bi bi-card-checklist me-2 text-warning"></i> স্পেসিফিকেশন ও ফিচার (Specification)
                    </button>
                  </h2>
                  <div id="specCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                      ${p.specification || 'অরিজিনাল ব্র্যান্ড স্পেসিফিকেশন।'}
                    </div>
                  </div>
                </div>

                <!-- 3. Others / Quality Guarantee & Policy (Column P) -->
                ${p.others ? `
                  <div class="accordion-item bg-slate-900 border-slate-800">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed bg-slate-900 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#othersCollapse">
                        <i class="bi bi-shield-check me-2 text-emerald"></i> অন্যান্য তথ্য ও কোয়ালিটি নিশ্চয়তা (Others & Policy)
                      </button>
                    </h2>
                    <div id="othersCollapse" class="accordion-collapse collapse">
                      <div class="accordion-body text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                        ${p.others}
                      </div>
                    </div>
                  </div>
                ` : ''}

              </div>

            </div>
          </div>

        </div>

        <!-- Like, Comment & Review System -->
        <section class="reviews-section p-4 rounded-4 bg-slate-900/60 border border-slate-800 mb-5">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h4 class="fw-bold mb-0 text-white"><i class="bi bi-star-fill text-warning me-2"></i>গ্রাহক রিভিউ ও কমেন্ট</h4>
            <button class="btn btn-sm btn-outline-light" onclick="PAGES.openReviewModal('${p.sku}')">
              <i class="bi bi-pencil-square me-1"></i> রিভিউ দিন
            </button>
          </div>

          <div class="user-comments-list space-y-3">
            ${(await (async () => {
              const revRes = await API.call('reviews/list');
              const allRevs = (revRes.data && revRes.data.items) || [];
              const prodRevs = allRevs.filter(r => r.productSku === p.sku || r.status === 'Approved');
              const displayRevs = prodRevs.length > 0 ? prodRevs.slice(0, 5) : [
                { customerName: 'রাশেদুল ইসলাম (কুমিল্লা)', rating: 5, comment: 'প্রোডাক্টের কোয়ালিটি অসাধারণ। বিকাশ পেমেন্টে ৫% ছাড় পেয়েছি এবং দ্রুত ডেলিভারি হয়েছে।', date: '২ দিন আগে' }
              ];
              return displayRevs.map(r => `
                <div class="comment-card p-3 rounded-3 bg-slate-900 border border-slate-800">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="text-white">${r.customerName}</strong>
                    <div class="text-warning text-xs">${'★'.repeat(r.rating || 5)}${'☆'.repeat(Math.max(0, 5 - (r.rating || 5)))} (${r.rating || 5}/৫)</div>
                  </div>
                  <p class="text-xs text-slate-300 mb-1">${r.comment}</p>
                  <small class="text-muted text-[10px]"><i class="bi bi-patch-check-fill text-emerald me-1"></i>Verified Purchase | ${r.date || 'সম্প্রতি'}</small>
                </div>
              `).join('');
            })())}
          </div>
        </section>

        <!-- Related Products -->
        ${related.length > 0 ? `
          <section class="related-products-section">
            <h4 class="fw-bold mb-3 text-white"><i class="bi bi-grid-3x3-gap-fill text-emerald me-2"></i>সম্পর্কিত প্রোডাক্টস</h4>
            <div class="grid-6-container">
              ${related.map(item => COMPONENTS.renderProductCard(item)).join('')}
            </div>
          </section>
        ` : ''}

      </div>
    `;
  },

  changeDetailQty(delta) {
    const el = document.getElementById('detail-qty-val');
    if (el) {
      let q = parseInt(el.textContent, 10) || 1;
      q = Math.max(1, q + delta);
      el.textContent = q;
    }
  },

  async detailAddToCart(sku) {
    const res = await API.call('products/details', { id: sku });
    if (res.data) {
      const qEl = document.getElementById('detail-qty-val');
      const qty = parseInt(qEl ? qEl.textContent : '1', 10) || 1;
      STORE.cart.addItem(res.data, qty);
    }
  },

  async detailBuyNow(sku) {
    const res = await API.call('products/details', { id: sku });
    if (res.data) {
      const qEl = document.getElementById('detail-qty-val');
      const qty = parseInt(qEl ? qEl.textContent : '1', 10) || 1;
      STORE.cart.addItem(res.data, qty);
      window.location.hash = '#/checkout';
    }
  },

  async openReviewModal(sku) {
    const res = await API.call('products/details', { id: sku });
    const prod = res.data || { name: 'পণ্য', sku: sku };

    const modalHtml = `
      <div class="modal fade show" id="submitReviewModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.85);" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-slate-900 text-white border-slate-700 shadow-2xl rounded-4">
            <div class="modal-header border-slate-800">
              <h5 class="modal-title fw-bold text-emerald"><i class="bi bi-star-fill text-warning me-2"></i>প্রোডাক্ট রিভিউ দিন</h5>
              <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('submitReviewModal').remove()"></button>
            </div>
            <form onsubmit="PAGES.handleReviewSubmit(event, '${sku}', '${(prod.name || '').replace(/'/g, "\'")}')">
              <div class="modal-body p-4">
                <div class="mb-3">
                  <div class="text-xs text-muted">পণ্য:</div>
                  <strong class="text-white text-sm">${prod.name}</strong>
                </div>
                
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">রেটিং নির্বাচন করুন *</label>
                  <select id="rev-rating" class="form-select bg-slate-950 text-warning border-slate-700 font-bold" required>
                    <option value="5" selected>★★★★★ ৫ স্টার (অসাধারণ)</option>
                    <option value="4">★★★★☆ ৪ স্টার (খুব ভালো)</option>
                    <option value="3">★★★☆☆ ৩ স্টার (মোটামুটি)</option>
                    <option value="2">★★☆☆☆ ২ স্টার (খারাপ)</option>
                    <option value="1">★☆☆☆☆ ১ স্টার (খুব খারাপ)</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">আপনার পুরো নাম *</label>
                  <input type="text" id="rev-cust-name" class="form-control bg-slate-950 text-white border-slate-700" placeholder="যেমন: মো: সাইফুল ইসলাম" required />
                </div>

                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">আপনার মূল্যবান মতামত লিখুন *</label>
                  <textarea id="rev-comment" class="form-control bg-slate-950 text-white border-slate-700" rows="3" placeholder="পণ্যের মান, ডেলিভারি ও প্যাকেজিং নিয়ে আপনার অভিজ্ঞতা লিখুন..." required></textarea>
                </div>
              </div>
              <div class="modal-footer border-slate-800">
                <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('submitReviewModal').remove()">বাতিল</button>
                <button type="submit" class="btn btn-emerald btn-sm px-4 fw-bold">রিভিউ সাবমিট করুন</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.getElementById('submitReviewModal')?.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  async handleReviewSubmit(e, sku, prodName) {
    e.preventDefault();
    const rating = parseInt(document.getElementById('rev-rating')?.value, 10) || 5;
    const name = document.getElementById('rev-cust-name')?.value.trim();
    const comment = document.getElementById('rev-comment')?.value.trim();

    if (!name || !comment) return;

    await API.call('reviews/add', {
      customerName: name,
      productSku: sku,
      productName: prodName,
      rating: rating,
      comment: comment,
      status: 'Approved'
    });

    document.getElementById('submitReviewModal')?.remove();
    STORE.toast('success', 'রিভিউ যুক্ত হয়েছে!', 'ধন্যবাদ! আপনার রিভিউটি সাইটে এবং এডমিন প্যানেলে সফলভাবে যুক্ত হয়েছে।');
    
    // Refresh product details to show the new review
    const content = document.getElementById('main-content');
    if (content) content.innerHTML = await PAGES.renderProductDetails(sku);
  },

  // 4. ORDER TRACKING PAGE
  async renderTracking() {
    return `
      <div class="tracking-page-container max-w-2xl mx-auto py-4">
        
        <div class="text-center mb-4">
          <div class="inline-flex p-3 rounded-circle bg-emerald/20 text-emerald mb-2">
            <i class="bi bi-truck fs-1"></i>
          </div>
          <h2 class="fw-bold">অর্ডার ট্র্যাকিং সিস্টেম</h2>
          <p class="text-muted text-sm">আপনার মোবাইল নম্বর অথবা অর্ডার আইডি দিয়ে পার্সেল ট্র্যাক করুন</p>
        </div>

        <div class="card bg-slate-900 border-slate-800 shadow-xl rounded-4 p-4 mb-4">
          <form onsubmit="PAGES.handleTrackSearch(event)">
            <div class="mb-3">
              <label class="form-label text-sm fw-bold">অর্ডার আইডি বা মোবাইল নম্বর:</label>
              <div class="input-group">
                <input type="text" id="track-query-input" class="form-control form-control-lg bg-slate-950 border-slate-700 text-white" 
                       placeholder="যেমন: ORD-88241 অথবা 01815592089" required />
                <button type="submit" class="btn btn-primary px-4 fw-bold">
                  <i class="bi bi-search me-1"></i> ট্র্যাক করুন
                </button>
              </div>
            </div>
          </form>
        </div>

        <div id="tracking-result-mount"></div>

      </div>
    `;
  },

  async handleTrackSearch(e) {
    e.preventDefault();
    const q = document.getElementById('track-query-input').value.trim();
    const mount = document.getElementById('tracking-result-mount');
    if (!mount) return;

    mount.innerHTML = `<div class="text-center py-4"><div class="spinner-border text-emerald"></div><div class="mt-2 text-xs">সার্চ করা হচ্ছে...</div></div>`;
    const res = await API.call('orders/track', { query: q });
    const items = (res.data && res.data.items) || [];

    if (items.length === 0) {
      mount.innerHTML = `
        <div class="alert alert-warning text-center rounded-3">
          <i class="bi bi-exclamation-triangle-fill me-2"></i> "${q}" দিয়ে কোনো অর্ডার পাওয়া যায়নি। সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।
        </div>
      `;
      return;
    }

    mount.innerHTML = items.map(o => `
      <div class="card bg-slate-900 border-slate-800 shadow-lg rounded-4 p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center border-bottom border-slate-800 pb-3 mb-3">
          <div>
            <h5 class="fw-bold text-white mb-0">অর্ডার আইডি: <span class="text-emerald">${o.orderId}</span></h5>
            <small class="text-muted">তারিখ: ${o.date}</small>
          </div>
          <span class="badge bg-success fs-6 px-3 py-1">${o.status}</span>
        </div>

        <div class="tracking-timeline my-4">
          <div class="step-item ${o.status ? 'active' : ''}">
            <div class="step-icon"><i class="bi bi-check-lg"></i></div>
            <div class="step-text">অর্ডার প্লেসড</div>
          </div>
          <div class="step-item ${['Confirmed', 'Shipped', 'Delivered'].includes(o.status) ? 'active' : ''}">
            <div class="step-icon"><i class="bi bi-box-seam"></i></div>
            <div class="step-text">প্যাকিং ও প্রসেসিং</div>
          </div>
          <div class="step-item ${['Shipped', 'Delivered'].includes(o.status) ? 'active' : ''}">
            <div class="step-icon"><i class="bi bi-truck"></i></div>
            <div class="step-text">কুরিয়ারে হস্তান্তর</div>
          </div>
          <div class="step-item ${o.status === 'Delivered' ? 'active' : ''}">
            <div class="step-icon"><i class="bi bi-house-door"></i></div>
            <div class="step-text">ডেলিভার্ড</div>
          </div>
        </div>

        <div class="row g-2 text-sm bg-slate-950 p-3 rounded-3 mb-3">
          <div class="col-6"><span class="text-muted">গ্রাহকের নাম:</span> <strong>${o.customerName}</strong></div>
          <div class="col-6"><span class="text-muted">ফোন:</span> <strong>${o.phone}</strong></div>
          <div class="col-12"><span class="text-muted">ডেলিভারি ঠিকানা:</span> <strong>${o.address}</strong></div>
          <div class="col-12"><span class="text-muted">প্রোডাক্ট:</span> <strong>${o.products}</strong></div>
          <div class="col-6"><span class="text-muted">মোট প্রদেয়:</span> <strong class="text-emerald">${CONFIG.currency}${(Number(o.totalAmount) || 0).toLocaleString()}</strong></div>
          <div class="col-6"><span class="text-muted">পেমেন্ট মেথড:</span> <strong>${o.paymentMethod || 'ক্যাশ অন ডেলিভারি'}</strong></div>
        </div>

        <div class="text-end">
          <button class="btn btn-outline-light btn-sm" onclick="PAGES.printOrderVoucher('${o.orderId}')">
            <i class="bi bi-printer me-1"></i> A5 ভাউচার প্রিন্ট করুন
          </button>
        </div>
      </div>
    `).join('');
  },

  async printOrderVoucher(orderId) {
    const res = await API.call('orders/list');
    const order = (res.data && res.data.items || []).find(o => o.orderId === orderId);
    if (order) {
      const modalEl = document.getElementById('voucherModalContainer');
      if (modalEl) {
        modalEl.innerHTML = COMPONENTS.renderVoucherModal(order);
        const myModal = new bootstrap.Modal(document.getElementById('voucherModal'));
        myModal.show();
      }
    }
  },

  // 5. FAVORITES PAGE
  async renderFavorites() {
    const items = STORE.wishlist.items;
    return `
      <div class="favorites-page-container">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h2 class="fw-bold mb-0"><i class="bi bi-heart-fill text-danger me-2"></i>ফেভরিট প্রোডাক্ট লিস্ট</h2>
          <span class="text-muted">${items.length} টি আইটেম সংরক্ষিত</span>
        </div>

        ${items.length === 0 ? `
          <div class="text-center py-5 bg-slate-900/40 rounded-4 border border-slate-800">
            <i class="bi bi-heart fs-1 text-muted"></i>
            <h4 class="mt-3 text-slate-300">আপনার ফেভরিট তালিকা এখনও খালি</h4>
            <p class="text-muted text-sm">পছন্দের প্রোডাক্টের হার্ট আইকনে ক্লিক করে এখানে যুক্ত করুন।</p>
            <a href="#/products" class="btn btn-primary mt-2">শপিং শুরু করুন</a>
          </div>
        ` : `
          <div class="grid-6-container">
            ${items.map(p => COMPONENTS.renderProductCard(p)).join('')}
          </div>
        `}
      </div>
    `;
  },

  // 6. CART PAGE
  async renderCart() {
    const items = STORE.cart.items;
    const subtotal = STORE.cart.getSubtotal();
    const isFreeDel = subtotal >= CONFIG.freeDeliveryThreshold;
    const remainingForFree = Math.max(0, CONFIG.freeDeliveryThreshold - subtotal);

    return `
      <div class="cart-page-container max-w-4xl mx-auto py-4">
        <h2 class="fw-bold mb-3"><i class="bi bi-bag-check-fill text-emerald me-2"></i>আপনার শপিং কার্ট</h2>

        <!-- Free Delivery Meter Banner -->
        <div class="p-3 mb-4 rounded-4 ${isFreeDel ? 'bg-emerald/20 border-emerald/50' : 'bg-slate-900 border-slate-800'} border shadow-sm">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <strong class="text-xs ${isFreeDel ? 'text-emerald' : 'text-slate-300'}">
              ${isFreeDel ? '🎉 অভিনন্দন! আপনি সারা দেশে ফ্রি ডেলিভারি পাচ্ছেন!' : `🚚 আর মাত্র ৳${(Number(remainingForFree) || 0).toLocaleString()} শপিং করলেই ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!`}
            </strong>
            <span class="text-xs text-muted">টার্গেট: ৳${(Number(CONFIG.freeDeliveryThreshold) || 0).toLocaleString()}</span>
          </div>
          <div class="progress" style="height: 6px;">
            <div class="progress-bar bg-emerald" role="progressbar" 
                 style="width: ${Math.min(100, Math.round((subtotal / CONFIG.freeDeliveryThreshold) * 100))}%;"></div>
          </div>
        </div>

        ${items.length === 0 ? `
          <div class="text-center py-5 bg-slate-900/40 rounded-4 border border-slate-800">
            <i class="bi bi-bag-x fs-1 text-muted"></i>
            <h4 class="mt-3 text-slate-300">আপনার কার্ট খালি রয়েছে</h4>
            <a href="#/products" class="btn btn-primary mt-2">কেনাকাটা করুন</a>
          </div>
        ` : `
          <div class="row g-4">
            
            <div class="col-12 col-lg-8">
              <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-lg">
                <div class="table-responsive">
                  <table class="table table-dark table-borderless align-middle mb-0">
                    <thead>
                      <tr class="border-bottom border-slate-800 text-xs text-muted text-uppercase">
                        <th>প্রোডাক্ট</th>
                        <th>মূল্য</th>
                        <th class="text-center">পরিমাণ</th>
                        <th class="text-end">মোট</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items.map(it => `
                        <tr class="border-bottom border-slate-800/60">
                          <td>
                            <div class="d-flex align-items-center gap-2">
                              <img src="${it.image}" class="rounded-2" width="50" height="50" style="object-fit: cover;" />
                              <div>
                                <a href="#/product/${it.sku}" class="text-white text-decoration-none fw-bold text-sm text-truncate-1">${it.name}</a>
                                <div class="text-xs text-muted">${it.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td class="text-sm">${CONFIG.currency}${(Number(it.price) || 0).toLocaleString()}</td>
                          <td class="text-center">
                            <div class="qty-selector-group small">
                              <button class="btn btn-sm btn-qty" onclick="STORE.cart.updateQty('${it.sku}', -1)">-</button>
                              <span class="qty-number">${it.quantity}</span>
                              <button class="btn btn-sm btn-qty" onclick="STORE.cart.updateQty('${it.sku}', 1)">+</button>
                            </div>
                          </td>
                          <td class="text-end text-sm fw-bold text-emerald">${CONFIG.currency}${((Number(it.price) || 0) * (Math.max(1, Number(it.quantity) || 1))).toLocaleString()}</td>
                          <td class="text-end">
                            <button class="btn btn-link text-danger p-0" onclick="STORE.cart.removeItem('${it.sku}')">
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-3">
                <a href="#/products" class="btn btn-outline-light btn-sm">
                  <i class="bi bi-arrow-left me-1"></i> আরও শপিং করুন (More Shopping)
                </a>
                <button class="btn btn-sm btn-outline-danger" onclick="STORE.cart.clear()">কার্ট খালি করুন</button>
              </div>
            </div>

            <div class="col-12 col-lg-4">
              <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2">অর্ডার সামারি</h5>
                <div class="d-flex justify-content-between text-sm mb-2">
                  <span class="text-muted">সাবটোটাল:</span>
                  <strong>${CONFIG.currency}${(Number(subtotal) || 0).toLocaleString()}</strong>
                </div>
                <div class="d-flex justify-content-between text-sm mb-2">
                  <span class="text-muted">ডেলিভারি চার্জ:</span>
                  <span class="text-xs ${isFreeDel ? 'text-success fw-bold' : 'text-info'}">
                    ${isFreeDel ? 'ফ্রি (২০০০৳+ শপিং)' : 'চেকআউটে এলাকা অনুযায়ী অটো হিসাব'}
                  </span>
                </div>
                <div class="d-flex justify-content-between text-sm mb-2 text-warning">
                  <span class="text-muted">অনলাইন পেমেন্ট ছাড়:</span>
                  <span>৫% ক্যাশব্যাক</span>
                </div>
                <hr class="border-slate-800">
                <div class="d-flex justify-content-between text-base fw-bold mb-4">
                  <span>আনুমানিক মোট:</span>
                  <span class="text-emerald fs-5">${CONFIG.currency}${(Number(subtotal) || 0).toLocaleString()}</span>
                </div>

                <a href="#/checkout" class="btn btn-primary w-100 py-3 fw-bold shadow-lg">
                  অর্ডার সম্পন্ন করুন (Complete Order) →
                </a>
              </div>
            </div>

          </div>
        `}
      </div>
    `;
  },

  // 7. ORDER PROCESS & CHECKOUT (Smart Address AI Detection, 5% Discount & TrxID)
  async renderCheckout() {
    const items = STORE.cart.items;
    const subtotal = STORE.cart.getSubtotal();
    const isFreeDel = subtotal >= CONFIG.freeDeliveryThreshold;
    const customer = STORE.auth.customer || {};

    if (items.length === 0) {
      return `
        <div class="text-center py-5">
          <h4>আপনার কার্টে কোনো প্রোডাক্ট নেই</h4>
          <a href="#/products" class="btn btn-primary mt-3">প্রোডাক্ট পছন্দ করুন</a>
        </div>
      `;
    }

    return `
      <div class="checkout-page-container max-w-4xl mx-auto py-4">
        
        <h2 class="fw-bold mb-3"><i class="bi bi-shield-check text-emerald me-2"></i>অর্ডার প্রসেস ও অর্ডার ইনফো পেজ</h2>
        
        <!-- Online Payment 5% Discount Alert Banner -->
        <div class="alert alert-success d-flex align-items-center gap-2 p-3 rounded-4 mb-4 shadow-sm border-emerald/50 bg-emerald/10">
          <i class="bi bi-stars fs-3 text-emerald"></i>
          <div class="text-xs">
            <strong>বিশেষ সুবিধা:</strong> বিকাশ, নগদ, রকেট বা ব্যাংক পেমেন্টে অর্ডার করলে আপনি পাচ্ছেন <strong>তাৎক্ষণিক ৫% মূল্যছাড়!</strong> এবং ২০০০৳ বেশি কেনাকাটায় সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি!
          </div>
        </div>

        <div class="row g-4">
          
          <!-- Checkout Form -->
          <div class="col-12 col-lg-7">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
              <h5 class="fw-bold mb-3 text-white border-bottom border-slate-800 pb-2">কাস্টমার ডেলিভারি তথ্য</h5>
              
              <form id="checkout-order-form" onsubmit="PAGES.handleOrderSubmit(event)">
                
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">আপনার পুরো নাম *</label>
                  <input type="text" id="cust-name" class="form-control bg-slate-950 border-slate-700 text-white" 
                         value="${customer.name || ''}" placeholder="যেমন: মো: কামরুল হাসান" required 
                         oninput="PAGES.trackIncompleteOrder()" />
                </div>

                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর (১১ ডিজিট) *</label>
                  <input type="tel" id="cust-phone" class="form-control bg-slate-950 border-slate-700 text-white" 
                         value="${customer.phone || ''}" placeholder="যেমন: 018XXXXXXXX" pattern="[0-9]{11}" required 
                         oninput="PAGES.trackIncompleteOrder()" />
                </div>

                <!-- Address Input with Smart AI/Keyword Detection -->
                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label text-xs fw-bold">সম্পূর্ণ ডেলিভারি ঠিকানা *</label>
                    <span id="ai-detect-badge" class="badge bg-secondary text-[10px]">অটো লোকেশন ডিটেকশন সক্রিয়</span>
                  </div>
                  <textarea id="cust-address" class="form-control bg-slate-950 border-slate-700 text-white" rows="3" 
                            placeholder="গ্রাম/রোড, থানা, জেলা (যেমন: কান্দিরপাড়, কুমিল্লা অথবা মিরপুর, ঢাকা)" required 
                            oninput="PAGES.handleAddressAutoDetect(this.value); PAGES.trackIncompleteOrder();">${customer.address || ''}</textarea>
                  <small class="text-muted text-[11px]">ঠিকানা লেখার সাথে সাথে ডেলিভারি জোন স্বয়ংক্রিয়ভাবে নির্বাচিত হবে।</small>
                </div>

                <!-- Delivery Zone Selection -->
                <div class="mb-4">
                  <label class="form-label text-xs fw-bold">ডেলিভারি এরিয়া (অটো সিলেক্টেড)</label>
                  <div class="row g-2">
                    <div class="col-4">
                      <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950 zone-radio-card" id="card-zone-cumilla">
                        <input class="form-check-input" type="radio" name="deliveryZone" id="zoneCumilla" value="cumilla" onchange="PAGES.updateCheckoutCalculations()">
                        <label class="form-check-label text-xs fw-bold" for="zoneCumilla">
                          কুমিল্লার ভেতর<br><span class="text-emerald">৳${CONFIG.deliveryCumilla}</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950 zone-radio-card" id="card-zone-dhaka">
                        <input class="form-check-input" type="radio" name="deliveryZone" id="zoneDhaka" value="dhaka" onchange="PAGES.updateCheckoutCalculations()">
                        <label class="form-check-label text-xs fw-bold" for="zoneDhaka">
                          ঢাকার ভেতরে<br><span class="text-emerald">৳${CONFIG.deliveryDhaka}</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950 zone-radio-card" id="card-zone-outside">
                        <input class="form-check-input" type="radio" name="deliveryZone" id="zoneOutside" value="outside" checked onchange="PAGES.updateCheckoutCalculations()">
                        <label class="form-check-label text-xs fw-bold" for="zoneOutside">
                          উভয়ের বাইরে<br><span class="text-emerald">৳${CONFIG.deliveryOutside}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Payment Methods (COD, bKash, Nagad, Rocket, Bank) -->
                <div class="mb-4">
                  <label class="form-label text-xs fw-bold">পেমেন্ট মেথড নির্বাচন করুন *</label>
                  <div class="space-y-2">
                    
                    <!-- COD -->
                    <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="payCOD" value="COD" checked onchange="PAGES.handlePaymentMethodChange('COD')">
                      <label class="form-check-label text-xs fw-bold d-flex justify-content-between" for="payCOD">
                        <span><i class="bi bi-cash me-1 text-emerald"></i> ক্যাশ অন ডেলিভারি (Cash On Delivery)</span>
                        <span class="text-muted">পণ্য পেয়ে মূল্য দিন</span>
                      </label>
                    </div>

                    <!-- bKash -->
                    <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="payBkash" value="bKash" onchange="PAGES.handlePaymentMethodChange('bKash')">
                      <label class="form-check-label text-xs fw-bold d-flex justify-content-between text-pink-400" for="payBkash">
                        <span><i class="bi bi-wallet2 me-1"></i> বিকাশ পেমেন্ট (bKash)</span>
                        <span class="badge bg-success">ইনস্ট্যান্ট ৫% ছাড়</span>
                      </label>
                    </div>

                    <!-- Nagad -->
                    <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="payNagad" value="Nagad" onchange="PAGES.handlePaymentMethodChange('Nagad')">
                      <label class="form-check-label text-xs fw-bold d-flex justify-content-between text-warning" for="payNagad">
                        <span><i class="bi bi-wallet-fill me-1"></i> নগদ পেমেন্ট (Nagad)</span>
                        <span class="badge bg-success">ইনস্ট্যান্ট ৫% ছাড়</span>
                      </label>
                    </div>

                    <!-- Rocket -->
                    <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="payRocket" value="Rocket" onchange="PAGES.handlePaymentMethodChange('Rocket')">
                      <label class="form-check-label text-xs fw-bold d-flex justify-content-between text-purple-400" for="payRocket">
                        <span><i class="bi bi-phone-fill me-1"></i> রকেট পেমেন্ট (Rocket)</span>
                        <span class="badge bg-success">ইনস্ট্যান্ট ৫% ছাড়</span>
                      </label>
                    </div>

                    <!-- Bank -->
                    <div class="form-check p-2 rounded-3 border border-slate-700 bg-slate-950">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="payBank" value="Bank" onchange="PAGES.handlePaymentMethodChange('Bank')">
                      <label class="form-check-label text-xs fw-bold d-flex justify-content-between text-sky" for="payBank">
                        <span><i class="bi bi-bank me-1"></i> ব্যাংক পেমেন্ট (Islami Bank)</span>
                        <span class="badge bg-success">ইনস্ট্যান্ট ৫% ছাড়</span>
                      </label>
                    </div>

                  </div>
                </div>

                <!-- Dynamic Online Payment Details Panel (Shows if online payment selected) -->
                <div id="online-payment-details-panel" class="mb-4 d-none">
                  <div class="card bg-slate-950 border-emerald/50 p-3 rounded-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <strong class="text-xs text-emerald" id="online-gateway-title">পেমেন্ট নির্দেশনা</strong>
                      <span class="badge bg-success text-[10px]">৫% ডিসকাউন্ট সক্রিয়</span>
                    </div>
                    <div class="text-xs text-slate-300 mb-3" id="online-gateway-info"></div>
                    
                    <div>
                      <label class="form-label text-xs fw-bold text-white">ট্রানজেকশন আইডি (TrxID) / প্রেরক মোবাইল নম্বর *</label>
                      <input type="text" id="cust-trxid" class="form-control form-control-sm bg-slate-900 border-slate-700 text-white" 
                             placeholder="যেমন: 9K7A5X2L অথবা আপনার বিকাশ নম্বর" />
                      <small class="text-muted text-[10px]">অনলাইন পেমেন্ট ভেরিফিকেশনের জন্য TrxID আবশ্যক।</small>
                    </div>
                  </div>
                </div>

                <button type="submit" id="btn-submit-order" class="btn btn-primary w-100 py-3 fw-bold fs-6 shadow-xl">
                  <i class="bi bi-check2-circle me-1"></i> অর্ডার কনফার্ম করুন (Submit Order)
                </button>

              </form>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="col-12 col-lg-5">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
              <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2">অর্ডার সামারি</h5>
              
              <div class="checkout-items-list mb-3 space-y-2">
                ${items.map(it => `
                  <div class="d-flex align-items-center justify-content-between text-xs py-1 border-bottom border-slate-800/40">
                    <div class="d-flex align-items-center gap-2">
                      <img src="${it.image}" width="36" height="36" class="rounded" style="object-fit: cover;" />
                      <div>
                        <div class="fw-bold text-white text-truncate-1" style="max-width: 170px;">${it.name}</div>
                        <span class="text-muted">${it.quantity} × ${CONFIG.currency}${(Number(it.price) || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <strong class="text-emerald">${CONFIG.currency}${((Number(it.price) || 0) * (Math.max(1, Number(it.quantity) || 1))).toLocaleString()}</strong>
                  </div>
                `).join('')}
              </div>

              <div class="d-flex justify-content-between text-sm mb-2">
                <span class="text-muted">সাবটোটাল:</span>
                <strong>${CONFIG.currency}${(Number(subtotal) || 0).toLocaleString()}</strong>
              </div>

              <!-- Online 5% Discount Row -->
              <div class="d-flex justify-content-between text-sm mb-2 text-success d-none" id="summary-discount-row">
                <span>অনলাইন পেমেন্ট ৫% ছাড়:</span>
                <strong id="summary-discount-val">-৳০</strong>
              </div>
              
              <div class="d-flex justify-content-between text-sm mb-2">
                <span class="text-muted">ডেলিভারি চার্জ:</span>
                <strong id="summary-del-charge">${CONFIG.currency}${CONFIG.deliveryOutside}</strong>
              </div>

              <!-- Free Delivery Notice -->
              <div id="free-delivery-badge-wrap" class="mb-2 d-none">
                <span class="badge bg-success w-100 py-1 text-xs">🎉 ২০০০৳+ শপিং করায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
              </div>

              <hr class="border-slate-800">

              <div class="d-flex justify-content-between text-base fw-bold mb-3">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span id="summary-grand-total" class="text-emerald fs-4">${CONFIG.currency}${((Number(subtotal) || 0) + (isFreeDel ? 0 : CONFIG.deliveryOutside)).toLocaleString()}</span>
              </div>

              <div class="p-2 rounded bg-slate-950 text-xs text-muted text-center">
                <i class="bi bi-shield-lock text-emerald me-1"></i> ১০০% নিরাপদ ও ক্যাশ অন ডেলিভারি সুবিধা
              </div>

            </div>
          </div>

        </div>

      </div>
    `;
  },

  // Smart Address Keyword Detector
  handleAddressAutoDetect(addressText) {
    const text = addressText.toLowerCase();
    const badge = document.getElementById('ai-detect-badge');
    
    // Cumilla keywords
    const cumillaKeywords = ['কুমিল্লা', 'comilla', 'cumilla', 'কান্দিরপাড়', 'শাসনগাছা', 'চকবাজার', 'লাকসাম', 'চান্দিনা', 'দাউদকান্দি', 'বুড়িচং', 'বরুড়া', 'দেবীদ্বার', 'চৌদ্দগ্রাম'];
    // Dhaka keywords
    const dhakaKeywords = ['ঢাকা', 'dhaka', 'মিরপুর', 'উত্তরা', 'ধানমন্ডি', 'গুলশান', 'বনানী', 'মতিঝিল', 'মোহাম্মদপুর', 'যাত্রাবাড়ী', 'বাড্ডা', 'মহাখালী'];

    if (cumillaKeywords.some(k => text.includes(k))) {
      document.getElementById('zoneCumilla').checked = true;
      if (badge) { badge.textContent = 'শনাক্ত: কুমিল্লা (চার্জ ৯০৳)'; badge.className = 'badge bg-success text-[10px]'; }
    } else if (dhakaKeywords.some(k => text.includes(k))) {
      document.getElementById('zoneDhaka').checked = true;
      if (badge) { badge.textContent = 'শনাক্ত: ঢাকা (চার্জ ১১০৳)'; badge.className = 'badge bg-info text-[10px]'; }
    } else if (text.trim().length > 4) {
      document.getElementById('zoneOutside').checked = true;
      if (badge) { badge.textContent = 'শনাক্ত: ঢাকা ও কুমিল্লার বাইরে (চার্জ ১৩৫৳)'; badge.className = 'badge bg-secondary text-[10px]'; }
    }
    this.updateCheckoutCalculations();
  },

  handlePaymentMethodChange(method) {
    const panel = document.getElementById('online-payment-details-panel');
    const title = document.getElementById('online-gateway-title');
    const info = document.getElementById('online-gateway-info');
    const trxInput = document.getElementById('cust-trxid');

    if (method === 'COD') {
      panel?.classList.add('d-none');
      if (trxInput) trxInput.required = false;
    } else {
      panel?.classList.remove('d-none');
      if (trxInput) trxInput.required = true;

      if (method === 'bKash') {
        title.textContent = 'বিকাশ পেমেন্ট (৫% ছাড়)';
        info.innerHTML = `
          • পার্সোনাল বিকাশ: <strong>${CONFIG.paymentAccounts.bkashPersonal}</strong> (Send Money)<br>
          • বিকাশ পেমেন্ট (মার্চেন্ট): <strong>${CONFIG.paymentAccounts.bkashPayment}</strong> (Payment)<br>
          টাকা পাঠিয়ে নিচে আপনার TrxID অথবা বিকাশ নম্বর দিন।
        `;
      } else if (method === 'Nagad') {
        title.textContent = 'নগদ পেমেন্ট (৫% ছাড়)';
        info.innerHTML = `
          • নগদ পার্সোনাল: <strong>${CONFIG.paymentAccounts.nagadPersonal}</strong> (Send Money)<br>
          টাকা পাঠিয়ে নিচে TrxID অথবা নম্বর দিন।
        `;
      } else if (method === 'Rocket') {
        title.textContent = 'রকেট পেমেন্ট (৫% ছাড়)';
        info.innerHTML = `
          • রকেট পার্সোনাল: <strong>${CONFIG.paymentAccounts.rocketPersonal}</strong> (Send Money)<br>
          টাকা পাঠিয়ে নিচে TrxID দিন।
        `;
      } else if (method === 'Bank') {
        title.textContent = 'ইসলামী ব্যাংক পেমেন্ট (৫% ছাড়)';
        info.innerHTML = `
          • ব্যাংক: <strong>${CONFIG.paymentAccounts.bank.bankName}</strong><br>
          • একাউন্ট নাম: <strong>${CONFIG.paymentAccounts.bank.accountName}</strong><br>
          • একাউন্ট নম্বর: <strong>${CONFIG.paymentAccounts.bank.accountNumber}</strong><br>
          টাকা পাঠিয়ে ব্যাংক স্লিপ নম্বর বা রেফারেন্স দিন।
        `;
      }
    }

    this.updateCheckoutCalculations();
  },

  updateCheckoutCalculations() {
    const subtotal = STORE.cart.getSubtotal();
    
    // Determine delivery charge
    let deliveryCharge = CONFIG.deliveryOutside;
    if (document.getElementById('zoneCumilla')?.checked) deliveryCharge = CONFIG.deliveryCumilla;
    if (document.getElementById('zoneDhaka')?.checked) deliveryCharge = CONFIG.deliveryDhaka;

    // Free delivery check (> 2000 BDT)
    const isFreeDelivery = subtotal >= CONFIG.freeDeliveryThreshold;
    if (isFreeDelivery) deliveryCharge = 0;

    // Check payment method for 5% discount
    const isOnline = ['bKash', 'Nagad', 'Rocket', 'Bank'].some(m => document.getElementById(`pay${m}`)?.checked);
    const onlineDiscount = isOnline ? Math.round(subtotal * (CONFIG.onlineDiscountPercent / 100)) : 0;

    const grandTotal = Math.max(0, subtotal - onlineDiscount + deliveryCharge);

    // Update DOM
    const delEl = document.getElementById('summary-del-charge');
    const freeBadge = document.getElementById('free-delivery-badge-wrap');
    const discRow = document.getElementById('summary-discount-row');
    const discVal = document.getElementById('summary-discount-val');
    const grandEl = document.getElementById('summary-grand-total');

    // Requirement 8: Crossed-out delivery charge and explicit discount amount
    let normalFee = CONFIG.deliveryOutside;
    if (document.getElementById('zoneCumilla')?.checked) normalFee = CONFIG.deliveryCumilla;
    if (document.getElementById('zoneDhaka')?.checked) normalFee = CONFIG.deliveryDhaka;

    if (delEl) {
      if (isFreeDelivery) {
        delEl.innerHTML = `<del class="text-muted">${CONFIG.currency}${normalFee}</del> <span class="text-success fw-bold">${CONFIG.currency}০ (ফ্রি ডেলিভারি!)</span>`;
      } else {
        delEl.innerHTML = `<span>${CONFIG.currency}${deliveryCharge}</span>`;
      }
    }
    if (freeBadge) freeBadge.classList.toggle('d-none', !isFreeDelivery);

    if (discRow && discVal) {
      discRow.classList.toggle('d-none', !isOnline);
      discVal.innerHTML = `<span class="text-warning fw-bold">-${CONFIG.currency}${(Number(onlineDiscount) || 0).toLocaleString()}</span> <span class="badge bg-success text-[10px] ms-1">৫% ছাড়</span>`;
    }

    if (grandEl) grandEl.textContent = `${CONFIG.currency}${(Number(grandTotal) || 0).toLocaleString()}`;
  },

  trackIncompleteOrder() {
    clearTimeout(this._incTimer);
    this._incTimer = setTimeout(() => {
      const name = document.getElementById('cust-name')?.value;
      const phone = document.getElementById('cust-phone')?.value;
      const address = document.getElementById('cust-address')?.value;
      if (phone && phone.length >= 6) {
        API.call('orders/save_incomplete', {
          name, phone, address,
          items: STORE.cart.items,
          totalAmount: STORE.cart.getSubtotal()
        });
      }
    }, 1200);
  },

  async handleOrderSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-order');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>অর্ডার সংরক্ষণ হচ্ছে...`;
    }

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    
    let deliveryZone = 'outside';
    let deliveryCharge = CONFIG.deliveryOutside;
    if (document.getElementById('zoneCumilla')?.checked) { deliveryZone = 'cumilla'; deliveryCharge = CONFIG.deliveryCumilla; }
    if (document.getElementById('zoneDhaka')?.checked) { deliveryZone = 'dhaka'; deliveryCharge = CONFIG.deliveryDhaka; }

    const subtotal = STORE.cart.getSubtotal();
    if (subtotal >= CONFIG.freeDeliveryThreshold) deliveryCharge = 0;

    let paymentMethod = 'COD';
    ['bKash', 'Nagad', 'Rocket', 'Bank'].forEach(m => {
      if (document.getElementById(`pay${m}`)?.checked) paymentMethod = m;
    });

    const isOnline = paymentMethod !== 'COD';
    const onlineDiscount = isOnline ? Math.round(subtotal * (CONFIG.onlineDiscountPercent / 100)) : 0;
    const trxId = document.getElementById('cust-trxid')?.value.trim() || '';

    if (isOnline && !trxId) {
      alert('অনলাইন পেমেন্টের ক্ষেত্রে ট্রানজেকশন আইডি (TrxID) বা মোবাইল নম্বর আবশ্যক!');
      if (btn) { btn.disabled = false; btn.textContent = 'অর্ডার কনফার্ম করুন'; }
      return;
    }

    const totalAmount = subtotal - onlineDiscount + deliveryCharge;

    const payload = {
      name,
      phone,
      address,
      deliveryZone,
      deliveryCharge,
      paymentMethod,
      onlineDiscount,
      trxId,
      subtotal,
      totalAmount,
      items: STORE.cart.items
    };

    const res = await API.call('orders/create', payload);

    if (res.success && res.data) {
      STORE.cart.clear();
      STORE.toast('success', 'অর্ডার সফল হয়েছে!', `অর্ডার আইডি: ${res.data.orderId}`);
      PAGES.printOrderVoucher(res.data.orderId);
      window.location.hash = `#/track?orderId=${res.data.orderId}`;
    } else {
      STORE.toast('error', 'অর্ডার করতে ব্যর্থ হয়েছে', res.message || 'দয়া করে আবার চেষ্টা করুন।');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'অর্ডার কনফার্ম করুন';
      }
    }
  },

  // 8. CUSTOMER LOGIN & REGISTER
  // 8. CUSTOMER LOGIN & REGISTER (Requirement 10: Width 30%, Image upload, Optional email & photo)
  renderCustomerLogin() {
    return `
      <div class="auth-page-wrapper py-5">
        <div class="auth-card-30 card bg-slate-900 border border-slate-800 rounded-4 p-4 shadow-2xl">
          
          <div class="text-center mb-4">
            <img src="${CONFIG.logoUrl}" width="56" height="56" class="rounded-circle mb-2 shadow border border-emerald" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
            <h4 class="fw-bold mb-0">কাস্টমার পোর্টাল</h4>
            <p class="text-muted text-xs">${CONFIG.appName} — লগইন বা নতুন একাউন্ট</p>
          </div>

          <ul class="nav nav-pills nav-justified mb-4 p-1 bg-slate-950 rounded-3 border border-slate-800" id="custAuthTab" role="tablist">
            <li class="nav-item">
              <button class="nav-link active btn-sm fw-bold" data-bs-toggle="pill" data-bs-target="#custLoginPane">লগইন</button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn-sm fw-bold" data-bs-toggle="pill" data-bs-target="#custRegPane">রেজিস্টার</button>
            </li>
          </ul>

          <div class="tab-content" id="custAuthTabContent">
            
            <!-- Customer Login Tab -->
            <div class="tab-pane fade show active" id="custLoginPane">
              <form onsubmit="PAGES.handleCustomerLogin(event)">
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর / ইমেইল *</label>
                  <input type="text" id="cust-login-id" class="form-control" placeholder="018XXXXXXXX" required />
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <label class="form-label text-xs fw-bold mb-0">পাসওয়ার্ড *</label>
                    <a href="https://wa.me/8801581703822?text=I%20forgot%20my%20customer%20password" target="_blank" class="text-[11px] text-emerald text-decoration-none">পাসওয়ার্ড ভুলে গেছেন?</a>
                  </div>
                  <input type="password" id="cust-login-pwd" class="form-control" placeholder="******" required />
                </div>
                <button type="submit" class="btn btn-success w-100 py-2 fw-bold shadow">
                  <i class="bi bi-box-arrow-in-right me-1"></i> লগইন করুন
                </button>
              </form>
            </div>

            <!-- Customer Register Tab (Requirement 10: Name, Mobile, Email optional, Address, Photo optional) -->
            <div class="tab-pane fade" id="custRegPane">
              <form onsubmit="PAGES.handleCustomerRegister(event)">
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">আপনার পুরো নাম *</label>
                  <input type="text" id="cust-reg-name" class="form-control form-control-sm" placeholder="নাম লিখুন" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর (১১ ডিজিট) *</label>
                  <input type="tel" id="cust-reg-mobile" class="form-control form-control-sm" placeholder="018XXXXXXXX" pattern="[0-9]{11}" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">ইমেইল ঠিকানা <span class="badge bg-secondary text-[10px]">অপশনাল</span></label>
                  <input type="email" id="cust-reg-email" class="form-control form-control-sm" placeholder="user@gmail.com" />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">ডেলিভারি ঠিকানা</label>
                  <textarea id="cust-reg-address" class="form-control form-control-sm" rows="2" placeholder="রোড, থানা, জেলা"></textarea>
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">প্রোফাইল ছবি <span class="badge bg-secondary text-[10px]">অপশনাল - Google Drive</span></label>
                  <input type="file" id="cust-reg-photo" class="form-control form-control-sm" accept="image/*" onchange="PAGES.previewImage(this, 'cust-photo-preview')" />
                  <div id="cust-photo-preview" class="mt-1 d-none text-center">
                    <img src="" class="rounded-circle border border-emerald" style="width: 50px; height: 50px; object-fit: cover;" />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">নতুন পাসওয়ার্ড *</label>
                  <input type="password" id="cust-reg-pwd" class="form-control form-control-sm" placeholder="পাসওয়ার্ড দিন" required />
                </div>
                <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
                  <span class="text-emerald font-monospace fw-bold text-xs">ক্যাপচা: <strong>৮ + ৫ = ?</strong></span>
                  <input type="text" id="cust-reg-captcha" class="form-control form-control-sm w-25 text-center" placeholder="উত্তর" required />
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold shadow">
                  <i class="bi bi-person-check-fill me-1"></i> রেজিস্টার করুন
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  previewImage(input, previewContainerId) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const cont = document.getElementById(previewContainerId);
        if (cont) {
          cont.classList.remove('d-none');
          const img = cont.querySelector('img');
          if (img) img.src = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  },

  handleCustomerLogin(e) {
    e.preventDefault();
    const id = document.getElementById('cust-login-id').value.trim();
    const pwd = document.getElementById('cust-login-pwd').value.trim();
    
    // Authenticate customer
    STORE.auth.loginCustomer({
      userId: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
      name: id.includes('@') ? id.split('@')[0] : 'সম্মানিত কাস্টমার',
      phone: id,
      email: id.includes('@') ? id : '',
      address: 'কুমিল্লা / ঢাকা, বাংলাদেশ',
      status: 'verified',
      password: pwd
    });
    STORE.toast('success', 'স্বাগতম!', 'কাস্টমার একাউন্টে সফলভাবে লগইন হয়েছে।');
    window.location.hash = '#/customer/dashboard';
  },

  handleCustomerRegister(e) {
    e.preventDefault();
    const ans = document.getElementById('cust-reg-captcha').value.trim();
    if (ans !== '13') {
      alert('ভুল ক্যাপচা কোড! সঠিক উত্তর দিন (৮+৫=১৩)।');
      return;
    }
    const name = document.getElementById('cust-reg-name').value.trim();
    const phone = document.getElementById('cust-reg-mobile').value.trim();
    const email = document.getElementById('cust-reg-email')?.value.trim() || '';
    const address = document.getElementById('cust-reg-address')?.value.trim() || '';
    const pwd = document.getElementById('cust-reg-pwd').value.trim();

    STORE.auth.loginCustomer({
      userId: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
      name: name,
      phone: phone,
      email: email,
      address: address,
      status: 'verified',
      password: pwd
    });
    STORE.toast('success', 'অভিনন্দন!', 'আপনার কাস্টমার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
    window.location.hash = '#/customer/dashboard';
  },

  // 9. CUSTOMER DASHBOARD (Requirement 11: Top Counters, Sidebar Tabs: Orders, Wishlist, Cart with Order Process, Track, Settings with Old Password check, Forget password via WhatsApp)
  async renderCustomerDashboard() {
    const customer = STORE.auth.customer;
    if (!customer) { window.location.hash = '#/customer/login'; return ''; }

    const ordersRes = await API.call('orders/list');
    const myOrders = (ordersRes.data && ordersRes.data.items || []).filter(o => 
      o.phone === customer.phone || o.customerName === customer.name
    );

    const cartCount = STORE.cart.getCount();
    const favCount = STORE.wishlist.items.length;
    const totalSpent = myOrders.reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

    return `
      <div class="customer-dashboard-container py-4">
        
        <!-- Welcome Header Banner -->
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 mb-4 shadow-xl">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <img src="${customer.photo || CONFIG.logoUrl}" width="60" height="60" class="rounded-circle border-2 border-emerald shadow" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
              <div>
                <h3 class="fw-bold mb-0">${customer.name}</h3>
                <div class="text-xs text-muted">ID: ${customer.userId} | মোবাইল: ${customer.phone} ${customer.email ? `| ইমেইল: ${customer.email}` : ''}</div>
                <span class="badge bg-success text-xs mt-1">ভেরিফাইড কাস্টমার</span>
              </div>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="STORE.auth.logoutCustomer(); window.location.hash='#/';">
              <i class="bi bi-box-arrow-right me-1"></i> লগআউট
            </button>
          </div>
        </div>

        <!-- Requirement 11: Top Statistics Counters -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm">
              <div class="text-muted text-xs fw-bold">মোট অর্ডার</div>
              <div class="fs-3 fw-black text-emerald mt-1">${myOrders.length}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm">
              <div class="text-muted text-xs fw-bold">মোট ফেভরিট</div>
              <div class="fs-3 fw-black text-danger mt-1">${favCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm">
              <div class="text-muted text-xs fw-bold">কার্ট আইটেম</div>
              <div class="fs-3 fw-black text-warning mt-1">${cartCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm">
              <div class="text-muted text-xs fw-bold">মোট কেনাকাটা</div>
              <div class="fs-3 fw-black text-sky mt-1">৳${(Number(totalSpent) || 0).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Body with Sidebar Tabs -->
        <div class="row g-4">
          
          <!-- Sidebar Navigation -->
          <div class="col-12 col-lg-3">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-md">
              <div class="nav flex-column nav-pills gap-2 text-xs" id="custDashPills" role="tablist">
                <button class="nav-link active text-start py-2" data-bs-toggle="pill" data-bs-target="#custTabOrders">
                  <i class="bi bi-bag-check me-2 text-emerald"></i> মোট অর্ডার (${myOrders.length})
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#custTabFavs">
                  <i class="bi bi-heart me-2 text-danger"></i> মোট ফেভরিট (${favCount})
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#custTabCart">
                  <i class="bi bi-cart3 me-2 text-warning"></i> মোট কার্ট (${cartCount})
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#custTabTrack">
                  <i class="bi bi-truck me-2 text-info"></i> অর্ডার ট্র্যাক
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#custTabSettings">
                  <i class="bi bi-gear me-2 text-primary"></i> সেটিংস ও পাসওয়ার্ড
                </button>
                <hr class="my-1 border-slate-800">
                <a href="https://wa.me/8801581703822?text=Hello%20Dream%20Cart%20BD%20Admin,%20I%20need%20help%20with%20my%20customer%20account" target="_blank" class="nav-link text-start py-2 text-success">
                  <i class="bi bi-whatsapp me-2"></i> ফরগেট পাসওয়ার্ড (WhatsApp Help)
                </a>
              </div>
            </div>
          </div>

          <!-- Tab Contents -->
          <div class="col-12 col-lg-9">
            <div class="tab-content" id="custDashContent">
              
              <!-- Tab 1: Orders -->
              <div class="tab-pane fade show active" id="custTabOrders">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-bag-check text-emerald me-2"></i>আমার মোট অর্ডার তালিকা (${myOrders.length})</h5>
                  ${myOrders.length === 0 ? `
                    <div class="text-center py-4 text-muted">
                      <p>আপনার কোনো অর্ডার ইতিহাস পাওয়া যায়নি।</p>
                      <a href="#/products" class="btn btn-sm btn-success">পণ্য পছন্দ করুন</a>
                    </div>
                  ` : `
                    <div class="table-responsive">
                      <table class="table table-dark table-hover text-xs mb-0">
                        <thead><tr><th>অর্ডার নং</th><th>তারিখ</th><th>পণ্য বিবরণ</th><th>মোট টাকা</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead>
                        <tbody>
                          ${myOrders.map(o => `
                            <tr>
                              <td><strong>${o.orderId}</strong></td>
                              <td>${o.date}</td>
                              <td class="text-truncate-1" style="max-width: 140px;">${o.products}</td>
                              <td class="text-emerald fw-bold">৳${(Number(o.totalAmount) || 0).toLocaleString()}</td>
                              <td><span class="badge bg-secondary">${o.status}</span></td>
                              <td><button class="btn btn-xs btn-outline-light" onclick="PAGES.printOrderVoucher('${o.orderId}')">ভাউচার প্রিন্ট</button></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  `}
                </div>
              </div>

              <!-- Tab 2: Favorites -->
              <div class="tab-pane fade" id="custTabFavs">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-heart text-danger me-2"></i>আমার ফেভরিট তালিকা (${STORE.wishlist.items.length})</h5>
                  ${STORE.wishlist.items.length === 0 ? `
                    <div class="text-center py-4 text-muted">কোনো ফেভরিট আইটেম যুক্ত করা নেই।</div>
                  ` : `
                    <div class="row g-3">
                      ${STORE.wishlist.items.map(p => `
                        <div class="col-6 col-md-4">
                          <div class="card bg-slate-950 border border-slate-800 p-2 rounded-3 text-xs">
                            <img src="${p.primaryImage || p.image || CONFIG.fallbackLogoUrl}" class="rounded w-100 mb-2" style="height: 120px; object-fit: cover;" />
                            <div class="fw-bold text-truncate">${p.name}</div>
                            <div class="text-emerald fw-bold my-1">৳${(Number(p.price || p.sellingPrice) || 0).toLocaleString()}</div>
                            <button class="btn btn-xs btn-success w-100" onclick="STORE.cart.addBySku('${p.sku || p.id}');">কার্টে যোগ করুন</button>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  `}
                </div>
              </div>

              <!-- Tab 3: Cart with Order Process -->
              <div class="tab-pane fade" id="custTabCart">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                  <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-slate-800 pb-2">
                    <h5 class="fw-bold mb-0"><i class="bi bi-cart3 text-warning me-2"></i>আমার শপিং কার্ট (${STORE.cart.getCount()} টি পণ্য)</h5>
                    <a href="#/checkout" class="btn btn-sm btn-primary fw-bold shadow">
                      অর্ডার প্রসেস করুন <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                  </div>
                  ${STORE.cart.items.length === 0 ? `
                    <div class="text-center py-4 text-muted">আপনার কার্ট খালি রয়েছে।</div>
                  ` : `
                    <div class="table-responsive">
                      <table class="table table-dark text-xs mb-3">
                        <thead><tr><th>পণ্য</th><th>দাম</th><th>পরিমাণ</th><th>মোট</th><th>মুছুন</th></tr></thead>
                        <tbody>
                          ${STORE.cart.items.map(it => `
                            <tr>
                              <td>${it.name}</td>
                              <td>৳${(Number(it.price) || 0).toLocaleString()}</td>
                              <td>${it.quantity}</td>
                              <td class="text-emerald fw-bold">৳${((Number(it.price) || 0) * (Math.max(1, Number(it.quantity) || 1))).toLocaleString()}</td>
                              <td><button class="btn btn-xs btn-outline-danger" onclick="STORE.cart.removeItem('${it.sku}'); location.reload();">✕</button></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                      <div class="text-end">
                        <h6 class="fw-bold">সর্বমোট: <span class="text-emerald">৳${(Number(STORE.cart.getSubtotal()) || 0).toLocaleString()}</span></h6>
                        <a href="#/checkout" class="btn btn-success px-4 py-2 fw-bold mt-2">অর্ডার প্রসেস করুন →</a>
                      </div>
                    </div>
                  `}
                </div>
              </div>

              <!-- Tab 4: Order Track -->
              <div class="tab-pane fade" id="custTabTrack">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                  <h5 class="fw-bold mb-3"><i class="bi bi-truck text-info me-2"></i>অর্ডার লাইভ ট্র্যাকিং</h5>
                  <div class="input-group mb-4">
                    <input type="text" id="cust-track-input" class="form-control" placeholder="অর্ডার আইডি (যেমন: ORD-88241)" value="${myOrders[0] ? myOrders[0].orderId : ''}" />
                    <button class="btn btn-info" onclick="PAGES.handleTrackSearchInline()">অনুসন্ধান</button>
                  </div>
                  <div id="cust-track-result" class="p-3 bg-slate-950 rounded-3 border border-slate-800 text-xs">
                    ${myOrders[0] ? `
                      <div class="d-flex justify-content-between mb-2">
                        <strong>অর্ডার আইডি: ${myOrders[0].orderId}</strong>
                        <span class="badge bg-success">${myOrders[0].status}</span>
                      </div>
                      <p class="mb-1 text-muted">পণ্য: ${myOrders[0].products}</p>
                      <p class="mb-0 text-muted">ডেলিভারি ঠিকানা: ${myOrders[0].address}</p>
                    ` : 'অর্ডার আইডি লিখে সার্চ করুন।'}
                  </div>
                </div>
              </div>

              <!-- Tab 5: Settings with Old Password Requirement (Requirement 11) -->
              <div class="tab-pane fade" id="custTabSettings">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-gear text-primary me-2"></i>প্রোফাইল ও পাসওয়ার্ড পরিবর্তন</h5>
                  
                  <form onsubmit="PAGES.handleCustomerProfileUpdate(event)">
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">আপনার পুরো নাম</label>
                        <input type="text" id="cust-set-name" class="form-control form-control-sm" value="${customer.name}" required />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">মোবাইল নম্বর (অপরিবর্তনীয়)</label>
                        <input type="text" class="form-control form-control-sm" value="${customer.phone}" readonly disabled />
                      </div>
                      <div class="col-12">
                        <label class="form-label text-xs fw-bold">ডেলিভারি ঠিকানা</label>
                        <textarea id="cust-set-address" class="form-control form-control-sm" rows="2">${customer.address || ''}</textarea>
                      </div>

                      <hr class="my-2 border-slate-800">
                      <h6 class="fw-bold text-warning text-xs mb-0">পাসওয়ার্ড পরিবর্তন (পুরাতন পাসওয়ার্ড আবশ্যক)</h6>

                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">বর্তমান/পুরাতন পাসওয়ার্ড *</label>
                        <input type="password" id="cust-set-old-pwd" class="form-control form-control-sm" placeholder="বর্তমান পাসওয়ার্ড দিন" />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">নতুন পাসওয়ার্ড</label>
                        <input type="password" id="cust-set-new-pwd" class="form-control form-control-sm" placeholder="নতুন পাসওয়ার্ড দিন" />
                      </div>

                      <div class="col-12">
                        <button type="submit" class="btn btn-success btn-sm px-4 fw-bold shadow">
                          তথ্য ও পাসওয়ার্ড সংরক্ষণ করুন
                        </button>
                      </div>
                    </div>
                  </form>

                  <div class="mt-4 p-3 bg-slate-950 rounded-3 border border-slate-800 text-xs">
                    <strong>পাসওয়ার্ড ভুলে গেছেন?</strong><br>
                    এডমিনের সাথে হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করে একাউন্ট রিকভার করুন:
                    <a href="https://wa.me/8801581703822?text=Hello%20Admin,%20I%20forgot%20my%20customer%20password.%20My%20phone%20is%20${customer.phone}" target="_blank" class="btn btn-xs btn-outline-success ms-2 mt-1">
                      <i class="bi bi-whatsapp"></i> হোয়াটসঅ্যাপে যোগাযোগ
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    `;
  },

  async handleCustomerProfileUpdate(e) {
    e.preventDefault();
    const customer = STORE.auth.customer;
    const name = document.getElementById('cust-set-name').value.trim();
    const address = document.getElementById('cust-set-address').value.trim();
    const oldPwd = document.getElementById('cust-set-old-pwd').value.trim();
    const newPwd = document.getElementById('cust-set-new-pwd').value.trim();

    if (newPwd) {
      if (!oldPwd) {
        alert('পাসওয়ার্ড পরিবর্তন করতে অবশ্যই পুরাতন পাসওয়ার্ড দিতে হবে!');
        return;
      }
      const chkRes = await API.call('customers/change_password', {
        phone: customer.phone,
        oldPassword: oldPwd,
        newPassword: newPwd
      });
      if (!chkRes.success) {
        alert(chkRes.message || 'পুরাতন পাসওয়ার্ডটি সঠিক নয়!');
        return;
      }
      customer.password = newPwd;
    }

    customer.name = name;
    customer.address = address;
    STORE.auth.loginCustomer(customer);
    STORE.toast('success', 'সফল!', 'আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে।');
  },

  handleTrackSearchInline() {
    const q = document.getElementById('cust-track-input')?.value.trim();
    if (q) window.location.hash = `#/track?orderId=${encodeURIComponent(q)}`;
  },

  // 10. WHOLESALER LOGIN & REGISTER (Requirement 10: Width 30%, Shop Name, Owner, Logo, Photo, NID, Office Address Same Checkbox)
  renderWholesaleLogin() {
    return `
      <div class="auth-page-wrapper py-5">
        <div class="auth-card-30 card bg-slate-900 border-amber-900/50 rounded-4 p-4 shadow-2xl">
          
          <div class="text-center mb-4">
            <img src="${CONFIG.logoUrl}" width="56" height="56" class="rounded-circle mb-2 shadow border border-amber" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
            <h4 class="fw-bold mb-0 text-amber">As A WholeSaller</h4>
            <p class="text-muted text-xs">পাইকারি বিক্রেতাদের জন্য এক্সক্লুসিভ পোর্টাল</p>
          </div>

          <ul class="nav nav-pills nav-justified mb-4 p-1 bg-slate-950 rounded-3 border border-slate-800" id="wsAuthTab" role="tablist">
            <li class="nav-item">
              <button class="nav-link active btn-sm fw-bold text-amber" data-bs-toggle="pill" data-bs-target="#wsLoginPane">লগইন</button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn-sm fw-bold" data-bs-toggle="pill" data-bs-target="#wsRegPane">নতুন রেজিস্টার</button>
            </li>
          </ul>

          <div class="tab-content" id="wsAuthTabContent">
            
            <!-- Wholesale Login -->
            <div class="tab-pane fade show active" id="wsLoginPane">
              <form onsubmit="PAGES.handleWholesaleLogin(event)">
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">শপ নাম / হোলসেলার আইডি *</label>
                  <input type="text" id="ws-login-id" class="form-control" placeholder="দোকানের নাম বা আইডি" required />
                </div>
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর *</label>
                  <input type="tel" id="ws-login-phone" class="form-control" placeholder="018XXXXXXXX" required />
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <label class="form-label text-xs fw-bold mb-0">পাসওয়ার্ড *</label>
                    <a href="https://wa.me/8801581703822?text=I%20forgot%20my%20wholesale%20password" target="_blank" class="text-[11px] text-amber text-decoration-none">ভুলে গেছেন?</a>
                  </div>
                  <input type="password" id="ws-login-pwd" class="form-control" placeholder="******" required />
                </div>
                <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
                  <span class="text-amber font-monospace fw-bold text-xs">ক্যাপচা: <strong>৭ + ৯ = ?</strong></span>
                  <input type="text" id="ws-captcha" class="form-control form-control-sm w-25 text-center" placeholder="উত্তর" required />
                </div>
                <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark shadow">
                  <i class="bi bi-shop me-1"></i> হোলসেলার লগইন করুন →
                </button>
              </form>
            </div>

            <!-- Wholesale Register (Requirement 10: Shop name, Owner name, Shop logo, Owner photo, Mobile, Email, NID, Full address, Office address with same checkbox) -->
            <div class="tab-pane fade" id="wsRegPane">
              <form onsubmit="PAGES.handleWholesaleRegister(event)">
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">শপের নাম (Shop Name) *</label>
                  <input type="text" id="ws-reg-shop" class="form-control form-control-sm" placeholder="দোকানের নাম" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">শপের মালিকের নাম *</label>
                  <input type="text" id="ws-reg-owner" class="form-control form-control-sm" placeholder="মালিকের নাম" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">শপের লোগো (Google Drive ফোল্ডারে জমা)</label>
                  <input type="file" id="ws-reg-logo" class="form-control form-control-sm" accept="image/*" />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">মালিকের ছবি (Google Drive ফোল্ডারে জমা)</label>
                  <input type="file" id="ws-reg-photo" class="form-control form-control-sm" accept="image/*" />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর *</label>
                  <input type="tel" id="ws-reg-phone" class="form-control form-control-sm" placeholder="018XXXXXXXX" pattern="[0-9]{11}" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">অফিসিয়াল ইমেইল *</label>
                  <input type="email" id="ws-reg-email" class="form-control form-control-sm" placeholder="shop@gmail.com" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">এনআইডি নম্বর (NID) *</label>
                  <input type="text" id="ws-reg-nid" class="form-control form-control-sm" placeholder="NID Number" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">পূর্ণ ঠিকানা (Full Address) *</label>
                  <textarea id="ws-reg-address" class="form-control form-control-sm" rows="2" placeholder="মার্কেটের নাম, দোকান নং, রোড, থানা, জেলা" required oninput="PAGES.syncOfficeAddress()"></textarea>
                </div>
                
                <!-- Office Address Same Checkbox -->
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="ws-same-address-check" onchange="PAGES.syncOfficeAddress()" />
                  <label class="form-check-label text-xs" for="ws-same-address-check">
                    অফিস ঠিকানা একই হলে টিক দিন
                  </label>
                </div>

                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">অফিস ঠিকানা (Office Address)</label>
                  <textarea id="ws-reg-office" class="form-control form-control-sm" rows="2" placeholder="অফিস ঠিকানা"></textarea>
                </div>

                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">পাসওয়ার্ড *</label>
                  <input type="password" id="ws-reg-pwd" class="form-control form-control-sm" placeholder="পাসওয়ার্ড দিন" required />
                </div>

                <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
                  <span class="text-amber font-monospace fw-bold text-xs">ক্যাপচা: <strong>৬ + ৮ = ?</strong></span>
                  <input type="text" id="ws-reg-captcha" class="form-control form-control-sm w-25 text-center" placeholder="১৪" required />
                </div>

                <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark shadow">
                  <i class="bi bi-patch-check-fill me-1"></i> হোলসেলার আবেদন সম্পন্ন করুন
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  syncOfficeAddress() {
    const isSame = document.getElementById('ws-same-address-check')?.checked;
    const fullAddr = document.getElementById('ws-reg-address')?.value || '';
    const officeAddr = document.getElementById('ws-reg-office');
    if (isSame && officeAddr) {
      officeAddr.value = fullAddr;
    }
  },

  handleWholesaleLogin(e) {
    e.preventDefault();
    const ans = document.getElementById('ws-captcha').value.trim();
    if (ans !== '16') { alert('ভুল ক্যাপচা কোড!'); return; }
    const shop = document.getElementById('ws-login-id').value.trim();
    const phone = document.getElementById('ws-login-phone').value.trim();
    const pwd = document.getElementById('ws-login-pwd').value.trim();

    STORE.auth.loginWholesaler({
      userId: 'WS-' + Math.floor(100 + Math.random() * 900),
      shopName: shop,
      phone: phone,
      address: 'চকবাজার, চট্টগ্রাম / কান্দিরপাড়, কুমিল্লা',
      password: pwd,
      discountRate: '15-30%'
    });
    STORE.toast('success', 'হোলসেলার লগইন সফল!', 'হোলসেল রেট ক্যাটালগ ওপেন হয়েছে।');
    window.location.hash = '#/wholesale/dashboard';
  },

  handleWholesaleRegister(e) {
    e.preventDefault();
    const ans = document.getElementById('ws-reg-captcha').value.trim();
    if (ans !== '14') {
      alert('ভুল ক্যাপচা কোড! সঠিক উত্তর দিন (৬+৮=১৪)।');
      return;
    }
    const shop = document.getElementById('ws-reg-shop').value.trim();
    const owner = document.getElementById('ws-reg-owner').value.trim();
    const phone = document.getElementById('ws-reg-phone').value.trim();
    const email = document.getElementById('ws-reg-email').value.trim();
    const nid = document.getElementById('ws-reg-nid').value.trim();
    const address = document.getElementById('ws-reg-address').value.trim();
    const office = document.getElementById('ws-reg-office')?.value.trim() || address;
    const pwd = document.getElementById('ws-reg-pwd').value.trim();

    STORE.auth.loginWholesaler({
      userId: 'WS-' + Math.floor(100 + Math.random() * 900),
      shopName: shop,
      ownerName: owner,
      phone: phone,
      email: email,
      nid: nid,
      address: address,
      officeAddress: office,
      password: pwd,
      status: 'pending_approval'
    });
    STORE.toast('success', 'আবেদন জমা হয়েছে!', 'আপনার হোলসেলার আবেদন সফল হয়েছে।');
    window.location.hash = '#/wholesale/dashboard';
  },

  // 11. WHOLESALER DASHBOARD (Requirement 12: On-click Filter Counters: All, In-Stock, Out of Stock, Low Stock, Catalog with Order, WhatsApp, Wishlist, Cart with Order Process, Track, Settings with Old Password, Forget password via WhatsApp)
  async renderWholesaleDashboard() {
    const ws = STORE.auth.wholesaler;
    if (!ws) { window.location.hash = '#/wholesale/login'; return ''; }

    // Fetch all products directly from sheet / cache
    const prodsRes = await API.call('products/list');
    const allProds = (prodsRes.data && prodsRes.data.items) || [];

    const inStockCount = allProds.filter(p => (parseInt(p.stock, 10) || 0) > 0).length;
    const outStockCount = allProds.filter(p => (parseInt(p.stock, 10) || 0) <= 0).length;
    const lowStockCount = allProds.filter(p => {
      const s = parseInt(p.stock, 10) || 0;
      return s > 0 && s <= 5;
    }).length;

    const ordersRes = await API.call('orders/list');
    const myOrders = (ordersRes.data && ordersRes.data.items || []).filter(o => 
      o.phone === ws.phone || o.customerName === ws.shopName
    );

    return `
      <div class="wholesale-dashboard-container py-4">
        
        <!-- Wholesaler Header Banner -->
        <div class="card bg-slate-900 border-amber-900/50 rounded-4 p-4 mb-4 shadow-xl">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <img src="${CONFIG.logoUrl}" width="56" height="56" class="rounded-circle border-2 border-amber" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
              <div>
                <h3 class="fw-bold mb-0 text-amber">${ws.shopName}</h3>
                <div class="text-xs text-muted">মালিক: ${ws.ownerName || 'হোলসেল পার্টনার'} | আইডি: ${ws.userId} | মোবাইল: ${ws.phone}</div>
                <span class="badge bg-amber text-dark text-xs mt-1">অনুমোদিত পাইকারি ডিলার</span>
              </div>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="STORE.auth.logoutWholesaler(); window.location.hash='#/';">
              লগআউট (Logout)
            </button>
          </div>
        </div>

        <!-- Requirement 12: On-click Filter Card Counters -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm cursor-pointer" 
                 onclick="PAGES.filterWholesaleTable('all')" style="cursor: pointer;">
              <div class="text-muted text-xs fw-bold">সকল প্রোডাক্ট (All)</div>
              <div class="fs-3 fw-black text-white mt-1">${allProds.length}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm cursor-pointer" 
                 onclick="PAGES.filterWholesaleTable('in_stock')" style="cursor: pointer;">
              <div class="text-muted text-xs fw-bold text-success">ইন স্টক (In Stock)</div>
              <div class="fs-3 fw-black text-success mt-1">${inStockCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm cursor-pointer" 
                 onclick="PAGES.filterWholesaleTable('out_of_stock')" style="cursor: pointer;">
              <div class="text-muted text-xs fw-bold text-danger">আউট অব স্টক (Stock Out)</div>
              <div class="fs-3 fw-black text-danger mt-1">${outStockCount}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card p-3 rounded-4 bg-slate-900 border-slate-800 text-center shadow-sm cursor-pointer" 
                 onclick="PAGES.filterWholesaleTable('low_stock')" style="cursor: pointer;">
              <div class="text-muted text-xs fw-bold text-warning">লো স্টক (Low Stock <= 5)</div>
              <div class="fs-3 fw-black text-warning mt-1">${lowStockCount}</div>
            </div>
          </div>
        </div>

        <!-- Dashboard Tabs & Sidebar -->
        <div class="row g-4">
          
          <!-- Sidebar -->
          <div class="col-12 col-lg-3">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-3 shadow-md">
              <div class="nav flex-column nav-pills gap-2 text-xs" id="wsDashPills" role="tablist">
                <button class="nav-link active text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabCatalog">
                  <i class="bi bi-grid-3x3-gap me-2 text-amber"></i> ক্যাটালগ লিস্ট (${allProds.length})
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabOrders">
                  <i class="bi bi-bag-check me-2 text-emerald"></i> মোট অর্ডার (${myOrders.length})
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabFavs">
                  <i class="bi bi-heart me-2 text-danger"></i> মোট ফেভরিট
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabCart">
                  <i class="bi bi-cart3 me-2 text-warning"></i> মোট কার্ট (অর্ডার প্রসেস)
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabTrack">
                  <i class="bi bi-truck me-2 text-info"></i> অর্ডার ট্র্যাক
                </button>
                <button class="nav-link text-start py-2" data-bs-toggle="pill" data-bs-target="#wsTabSettings">
                  <i class="bi bi-gear me-2 text-primary"></i> সেটিংস ও পাসওয়ার্ড
                </button>
                <hr class="my-1 border-slate-800">
                <a href="https://wa.me/8801581703822?text=Hello%20Dream%20Cart%20BD%20Admin,%20I%20need%20help%20with%20my%20wholesale%20account" target="_blank" class="nav-link text-start py-2 text-success">
                  <i class="bi bi-whatsapp me-2"></i> ফরগেট পাসওয়ার্ড (WhatsApp Help)
                </a>
              </div>
            </div>
          </div>

          <!-- Tab Content Panes -->
          <div class="col-12 col-lg-9">
            <div class="tab-content" id="wsDashContent">
              
              <!-- Tab 1: Catalog List with Search, Filters, Wholesale Rate, WhatsApp Order & Cart -->
              <div class="tab-pane fade show active" id="wsTabCatalog">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  
                  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                    <div>
                      <h5 class="fw-bold mb-0 text-amber"><i class="bi bi-boxes me-2"></i>হোলসেল রেট প্রোডাক্ট ক্যাটালগ</h5>
                      <small class="text-muted">সকল তথ্য গুগল স্প্রেডশিট থেকে স্বয়ংক্রিয়ভাবে সিঙ্ক হচ্ছে</small>
                    </div>
                    <div class="input-group max-w-sm">
                      <input type="text" id="ws-catalog-search" class="form-control form-control-sm" 
                             placeholder="ক্যাটালগে পণ্য খুঁজুন..." oninput="PAGES.filterWholesaleCatalog(this.value)" />
                      <button class="btn btn-sm btn-warning"><i class="bi bi-search"></i></button>
                    </div>
                  </div>

                  <div class="table-responsive">
                    <table class="table table-dark table-hover align-middle text-xs mb-0" id="ws-catalog-table">
                      <thead>
                        <tr class="border-bottom border-slate-800 text-uppercase text-muted">
                          <th>ছবি ও নাম</th>
                          <th>ক্যাটাগরি</th>
                          <th>খুচরা মূল্য</th>
                          <th>হোলসেল রেট</th>
                          <th>MOQ</th>
                          <th>স্টক</th>
                          <th>অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${allProds.map(p => {
                          const stockNum = parseInt(p.stock, 10) || 0;
                          const inStock = stockNum > 0;
                          return `
                            <tr data-stock-status="${inStock ? (stockNum <= 5 ? 'low_stock' : 'in_stock') : 'out_of_stock'}">
                              <td>
                                <div class="d-flex align-items-center gap-2">
                                  <img src="${p.primaryImage}" width="40" height="40" class="rounded object-fit-cover" onerror="this.onerror=null; this.src='${CONFIG.fallbackLogoUrl}';" />
                                  <div>
                                    <a href="#/product/${p.sku}" class="text-white fw-bold text-decoration-none">${p.name}</a>
                                    <div class="text-muted text-[11px]">${p.sku}</div>
                                  </div>
                                </div>
                              </td>
                              <td><span class="badge bg-slate-800 text-muted">${p.category}</span></td>
                              <td class="text-muted"><del>৳${p.sellingPrice}</del></td>
                              <td class="text-amber fw-bold fs-6">৳${p.wholesalePrice || Math.round(p.sellingPrice * 0.85)}</td>
                              <td><span class="badge bg-secondary">${p.minOrderQ || '1 Pcs'}</span></td>
                              <td>
                                ${inStock ? `<span class="badge bg-success">${stockNum} Pcs</span>` : `<span class="badge bg-danger">স্টক আউট</span>`}
                              </td>
                              <td>
                                <div class="d-flex align-items-center gap-1">
                                  <button class="btn btn-xs btn-warning text-dark fw-bold" 
                                          onclick="STORE.cart.addBySku(\'${p.sku}\', 1, true);" title="কার্ট">
                                    <i class="bi bi-cart-plus"></i>
                                  </button>
                                  <a href="https://wa.me/8801581703822?text=I%20want%20to%20order%20wholesale:%20${encodeURIComponent(p.name)}%20(SKU:%20${p.sku})" 
                                     target="_blank" class="btn btn-xs btn-success" title="WhatsApp Order">
                                    <i class="bi bi-whatsapp"></i>
                                  </a>
                                  <a href="#/product/${p.sku}" class="btn btn-xs btn-outline-light" title="বিস্তারিত">
                                    <i class="bi bi-eye"></i>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              <!-- Tab 2: Orders -->
              <div class="tab-pane fade" id="wsTabOrders">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-bag-check text-emerald me-2"></i>আমার হোলসেল অর্ডার তালিকা (${myOrders.length})</h5>
                  ${myOrders.length === 0 ? `
                    <div class="text-center py-4 text-muted">কোনো অর্ডার ইতিহাস নেই।</div>
                  ` : `
                    <div class="table-responsive">
                      <table class="table table-dark table-hover text-xs mb-0">
                        <thead><tr><th>অর্ডার নং</th><th>তারিখ</th><th>পণ্য</th><th>মোট টাকা</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead>
                        <tbody>
                          ${myOrders.map(o => `
                            <tr>
                              <td><strong>${o.orderId}</strong></td>
                              <td>${o.date}</td>
                              <td>${o.products}</td>
                              <td class="text-amber fw-bold">৳${(Number(o.totalAmount) || 0).toLocaleString()}</td>
                              <td><span class="badge bg-secondary">${o.status}</span></td>
                              <td><button class="btn btn-xs btn-outline-light" onclick="PAGES.printOrderVoucher('${o.orderId}')">ভাউচার</button></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  `}
                </div>
              </div>

              <!-- Tab 3: Favorites -->
              <div class="tab-pane fade" id="wsTabFavs">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-heart text-danger me-2"></i>ফেভরিট তালিকা</h5>
                  <div class="text-muted text-xs">ক্যাটালগ থেকে যেকোনো পণ্য পছন্দের তালিকায় যোগ করতে পারেন।</div>
                </div>
              </div>

              <!-- Tab 4: Cart with Order Process -->
              <div class="tab-pane fade" id="wsTabCart">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-slate-800 pb-2">
                    <h5 class="fw-bold mb-0 text-warning"><i class="bi bi-cart3 me-2"></i>হোলসেল শপিং কার্ট (${STORE.cart.getCount()} টি)</h5>
                    <a href="#/checkout" class="btn btn-sm btn-warning fw-bold text-dark shadow">
                      অর্ডার প্রসেস করুন <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                  </div>
                  ${STORE.cart.items.length === 0 ? `
                    <div class="text-center py-4 text-muted">আপনার কার্ট খালি রয়েছে। ক্যাটালগ থেকে পণ্য যোগ করুন।</div>
                  ` : `
                    <div class="table-responsive">
                      <table class="table table-dark text-xs mb-3">
                        <thead><tr><th>পণ্য</th><th>হোলসেল রেট</th><th>পরিমাণ</th><th>মোট</th><th>মুছুন</th></tr></thead>
                        <tbody>
                          ${STORE.cart.items.map(it => `
                            <tr>
                              <td>${it.name}</td>
                              <td>৳${(Number(it.price) || 0).toLocaleString()}</td>
                              <td>${it.quantity}</td>
                              <td class="text-amber fw-bold">৳${((Number(it.price) || 0) * (Math.max(1, Number(it.quantity) || 1))).toLocaleString()}</td>
                              <td><button class="btn btn-xs btn-outline-danger" onclick="STORE.cart.removeItem('${it.sku}'); location.reload();">✕</button></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                      <div class="text-end">
                        <h6 class="fw-bold">সর্বমোট: <span class="text-amber">৳${(Number(STORE.cart.getSubtotal()) || 0).toLocaleString()}</span></h6>
                        <a href="#/checkout" class="btn btn-warning text-dark px-4 py-2 fw-bold mt-2">অর্ডার প্রসেস করুন →</a>
                      </div>
                    </div>
                  `}
                </div>
              </div>

              <!-- Tab 5: Track -->
              <div class="tab-pane fade" id="wsTabTrack">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  <h5 class="fw-bold mb-3"><i class="bi bi-truck text-info me-2"></i>হোলসেল অর্ডার ট্র্যাক</h5>
                  <div class="input-group mb-3">
                    <input type="text" id="ws-track-input" class="form-control" placeholder="অর্ডার নং লিখুন..." />
                    <button class="btn btn-info" onclick="const v=document.getElementById('ws-track-input').value; window.location.hash='#/track?orderId='+encodeURIComponent(v);">ট্র্যাক করুন</button>
                  </div>
                </div>
              </div>

              <!-- Tab 6: Settings with Old Password Requirement (Requirement 12) -->
              <div class="tab-pane fade" id="wsTabSettings">
                <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl">
                  <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-gear text-primary me-2"></i>শপ প্রোফাইল ও পাসওয়ার্ড পরিবর্তন</h5>
                  
                  <form onsubmit="PAGES.handleWholesaleProfileUpdate(event)">
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">শপের নাম</label>
                        <input type="text" id="ws-set-shop" class="form-control form-control-sm" value="${ws.shopName}" required />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">মালিকের নাম</label>
                        <input type="text" id="ws-set-owner" class="form-control form-control-sm" value="${ws.ownerName || ''}" />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">মোবাইল নম্বর (অপরিবর্তনীয়)</label>
                        <input type="text" class="form-control form-control-sm" value="${ws.phone}" readonly disabled />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">ঠিকানা</label>
                        <input type="text" id="ws-set-address" class="form-control form-control-sm" value="${ws.address || ''}" />
                      </div>

                      <hr class="my-2 border-slate-800">
                      <h6 class="fw-bold text-amber text-xs mb-0">পাসওয়ার্ড পরিবর্তন (পুরাতন পাসওয়ার্ড আবশ্যক)</h6>

                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">বর্তমান/পুরাতন পাসওয়ার্ড *</label>
                        <input type="password" id="ws-set-old-pwd" class="form-control form-control-sm" placeholder="বর্তমান পাসওয়ার্ড দিন" />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label text-xs fw-bold">নতুন পাসওয়ার্ড</label>
                        <input type="password" id="ws-set-new-pwd" class="form-control form-control-sm" placeholder="নতুন পাসওয়ার্ড দিন" />
                      </div>

                      <div class="col-12">
                        <button type="submit" class="btn btn-warning text-dark btn-sm px-4 fw-bold shadow">
                          তথ্য ও পাসওয়ার্ড আপডেট করুন
                        </button>
                      </div>
                    </div>
                  </form>

                  <div class="mt-4 p-3 bg-slate-950 rounded-3 border border-slate-800 text-xs">
                    <strong>পাসওয়ার্ড সংক্রান্ত সহায়তায়:</strong> এডমিনের সাথে হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করুন:
                    <a href="https://wa.me/8801581703822?text=Hello%20Admin,%20I%20forgot%20my%20wholesale%20password.%20My%20shop%20is%20${encodeURIComponent(ws.shopName)}" target="_blank" class="btn btn-xs btn-outline-success ms-2 mt-1">
                      <i class="bi bi-whatsapp"></i> হোয়াটসঅ্যাপে যোগাযোগ
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    `;
  },

  filterWholesaleTable(status) {
    const rows = document.querySelectorAll('#ws-catalog-table tbody tr');
    rows.forEach(r => {
      const rowStatus = r.getAttribute('data-stock-status');
      if (status === 'all') {
        r.style.display = '';
      } else if (status === 'in_stock') {
        r.style.display = (rowStatus === 'in_stock' || rowStatus === 'low_stock') ? '' : 'none';
      } else if (status === 'out_of_stock') {
        r.style.display = (rowStatus === 'out_of_stock') ? '' : 'none';
      } else if (status === 'low_stock') {
        r.style.display = (rowStatus === 'low_stock') ? '' : 'none';
      }
    });
  },

  async handleWholesaleProfileUpdate(e) {
    e.preventDefault();
    const ws = STORE.auth.wholesaler;
    const shop = document.getElementById('ws-set-shop').value.trim();
    const owner = document.getElementById('ws-set-owner').value.trim();
    const address = document.getElementById('ws-set-address').value.trim();
    const oldPwd = document.getElementById('ws-set-old-pwd').value.trim();
    const newPwd = document.getElementById('ws-set-new-pwd').value.trim();

    if (newPwd) {
      if (!oldPwd) {
        alert('পাসওয়ার্ড পরিবর্তন করতে অবশ্যই পুরাতন পাসওয়ার্ড দিতে হবে!');
        return;
      }
      const chkRes = await API.call('wholesalers/change_password', {
        phone: ws.phone,
        oldPassword: oldPwd,
        newPassword: newPwd
      });
      if (!chkRes.success) {
        alert(chkRes.message || 'পুরাতন পাসওয়ার্ডটি সঠিক নয়!');
        return;
      }
      ws.password = newPwd;
    }

    ws.shopName = shop;
    ws.ownerName = owner;
    ws.address = address;
    STORE.auth.loginWholesaler(ws);
    STORE.toast('success', 'সফল!', 'হোলসেলার প্রোফাইল তথ্য সংরক্ষিত হয়েছে।');
  },

  // 12. TERMS & PRIVACY (Requirement 18)
  renderTerms() {
    return `
      <div class="terms-page-container max-w-4xl mx-auto py-4">
        <div class="card p-4 rounded-4 mb-4 border-slate-800 shadow-lg" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%);">
          <h2 class="fw-bold mb-1"><i class="bi bi-shield-check text-emerald me-2"></i>ব্যবহারের শর্তাবলী (Terms & Conditions)</h2>
          <p class="text-xs text-muted mb-0">Dream Cart BD — খাঁটি পণ্য, সাশ্রয়ী দাম, দ্রুততম ডেলিভারি ও বিশ্বস্ত হোলসেল প্ল্যাটফর্ম</p>
        </div>
        <div class="row g-4">
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-file-earmark-check-fill"></i></div>
              <h5 class="fw-bold mb-2">১. সাধারণ নীতিমালা ও সেবার শর্ত</h5>
              <p class="text-xs text-muted leading-relaxed">
                Dream Cart BD-এর ওয়েবসাইট ব্যবহার বা কোনো অর্ডার সম্পন্ন করার মাধ্যমে আপনি আমাদের সকল শর্তাবলী মেনে নিচ্ছেন।
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-truck"></i></div>
              <h5 class="fw-bold mb-2">২. শিপিং ও ডেলিভারি পলিসি</h5>
              <p class="text-xs text-muted leading-relaxed">
                কুমিল্লা ৳৯০ | ঢাকা ৳১১০ | বাইরে ৳১৩৫। ২০০০ টাকার বেশি কেনাকাটায় সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি!
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-percent"></i></div>
              <h5 class="fw-bold mb-2">৩. ৫% অনলাইন ডিসকাউন্ট</h5>
              <p class="text-xs text-muted leading-relaxed">
                বিকাশ, নগদ, রকেট অথবা ব্যাংক পেমেন্টে অর্ডার করলে মোট মূল্য থেকে তাৎক্ষণিক ৫% নগদ ছাড় দেওয়া হয়।
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-arrow-repeat"></i></div>
              <h5 class="fw-bold mb-2">৪. ৭ দিনের রিটার্ন গ্যারান্টি</h5>
              <p class="text-xs text-muted leading-relaxed">
                পণ্য হাতে পেয়ে কোনো ক্রটি থাকলে ৭ দিনের মধ্যে হটলাইনে (01581703822 / 01818273838) যোগাযোগ করে দ্রুত রিটার্ন/রিপ্লেসমেন্ট সুবিধা পাবেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderPrivacy() {
    return `
      <div class="privacy-page-container max-w-4xl mx-auto py-4">
        <div class="card p-4 rounded-4 mb-4 border-slate-800 shadow-lg" style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%);">
          <h2 class="fw-bold mb-1"><i class="bi bi-lock-fill text-sky me-2"></i>গোপনীয়তা নীতি (Privacy Policy)</h2>
          <p class="text-xs text-muted mb-0">আপনার ব্যক্তিগত তথ্য ও লেনদেনের সর্বোচ্চ নিরাপত্তা নিশ্চিত করা আমাদের অঙ্গীকার।</p>
        </div>
        <div class="row g-4">
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-person-badge-fill"></i></div>
              <h5 class="fw-bold mb-2">১. তথ্য সংগ্রহ ও ব্যবহার</h5>
              <p class="text-xs text-muted leading-relaxed">
                ডেলিভারি সম্পন্ন করার জন্য আমরা নাম, ফোন নম্বর ও ঠিকানা সংগ্রহ করি। কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-cloud-arrow-up-fill"></i></div>
              <h5 class="fw-bold mb-2">২. গুগল ড্রাইভ স্টোরেজ</h5>
              <p class="text-xs text-muted leading-relaxed">
                সকল ছবি ও ফাইল আমাদের সিকিউর গুগল ড্রাইভে সুরক্ষিত থাকে।
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-shield-lock-fill"></i></div>
              <h5 class="fw-bold mb-2">৩. এডমিন সেশন সিকিউরিটি</h5>
              <p class="text-xs text-muted leading-relaxed">
                ব্রাউজার ট্যাব বন্ধ করার সাথে সাথে এডমিন অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে লগআউট হয়ে যায়।
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="legal-card h-100">
              <div class="legal-icon-box"><i class="bi bi-headset"></i></div>
              <h5 class="fw-bold mb-2">৪. হেল্পলাইন ও সাপোর্ট</h5>
              <p class="text-xs text-muted leading-relaxed">
                যোগাযোগ: 01581703822, 01818273838 | ইমেইল: jainal.dcitbd@gmail.com, saiful05333@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

window.PAGES = PAGES; 