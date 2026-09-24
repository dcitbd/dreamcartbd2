/**
 * DREAM CART BD — STOREFRONT & CUSTOMER PAGES (UPDATED)
 * Full Implementation: Category 1-8 (12 pcs Grid-6), Smart Address Detection (Cumilla 90, Dhaka 110, Outside 135),
 * Free Delivery (>2000 BDT), 5% Online Payment Discount & TrxID verification.
 */
const PAGES = {

  // 1. HOME PAGE
  async renderHome() {
    const bannersRes = await API.call('banners/list');
    const banners = bannersRes.data || [];
    
    // Group products by category
    const catRes = await API.call('products/get_by_category');
    const categoryGroups = (catRes.data && catRes.data.groups) || [];

    return `
      <div class="home-page-container">
        
        <!-- Slogan & Highlights Header Banner -->
        <div class="promo-highlight-banner p-3 rounded-4 mb-4 text-white d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-lg">
          <div class="d-flex align-items-center gap-3">
            <img src="${CONFIG.logoUrl}" width="54" height="54" class="rounded-circle border-2 border-emerald shadow" />
            <div>
              <h4 class="mb-0 fw-bold text-white">${CONFIG.appName}</h4>
              <div class="text-xs text-emerald fw-bold">${CONFIG.slogan}</div>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 text-xs">
            <span class="badge bg-emerald/20 text-emerald border border-emerald/40 p-2"><i class="bi bi-truck me-1"></i> ২০০০৳+ শপিংয়ে ডেলিভারি ফ্রি</span>
            <span class="badge bg-amber/20 text-amber border border-amber/40 p-2"><i class="bi bi-credit-card me-1"></i> অনলাইন পেমেন্টে ৫% ছাড়</span>
            <span class="badge bg-sky/20 text-sky border border-sky/40 p-2"><i class="bi bi-telephone me-1"></i> ${CONFIG.phone1} / ${CONFIG.phone2}</span>
          </div>
        </div>

        <!-- 10+ Slide Animated Hero Banner -->
        <section class="banner-carousel-section mb-5">
          <div id="homeHeroCarousel" class="carousel slide carousel-fade shadow-2xl rounded-4 overflow-hidden border border-slate-800" data-bs-ride="carousel" data-bs-interval="4500">
            
            <div class="carousel-indicators">
              ${banners.map((b, i) => `
                <button type="button" data-bs-target="#homeHeroCarousel" data-bs-slide-to="${i}" 
                        class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i + 1}"></button>
              `).join('')}
            </div>

            <div class="carousel-inner">
              ${banners.map((b, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}" style="background: ${b.bg}; min-height: 380px;">
                  <div class="container py-4 py-md-5">
                    <div class="row align-items-center g-4">
                      <div class="col-12 col-md-7 text-white z-2">
                        <span class="badge bg-emerald px-3 py-1 text-uppercase fw-bold mb-2">${b.badge || 'স্পেশাল কালেকশন'}</span>
                        <h1 class="display-6 fw-black mb-3 slide-title">${b.title}</h1>
                        <p class="lead text-slate-300 fs-6 mb-4 slide-desc">${b.subtitle}</p>
                        <div class="d-flex flex-wrap gap-2">
                          <a href="${b.link || '#/products'}" class="btn btn-primary px-4 py-2 fw-bold shadow">
                            অর্ডার করুন →
                          </a>
                          <a href="#/products" class="btn btn-outline-light px-4 py-2">
                            সকল অফার দেখুন
                          </a>
                        </div>
                      </div>
                      <div class="col-12 col-md-5 text-center z-2">
                        <img src="${b.img}" alt="${b.title}" class="img-fluid rounded-3 shadow-lg banner-featured-img" style="max-height: 280px; object-fit: cover;" />
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
              <div class="feature-badge-card bg-slate-900 border-slate-800">
                <i class="bi bi-gift-fill text-emerald fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">ফ্রি ডেলিভারি অফার</div>
                  <small class="text-muted">২০০০ টাকার বেশি অর্ডারে ফ্রি</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border-slate-800">
                <i class="bi bi-percent text-warning fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">৫% অনলাইন ডিসকাউন্ট</div>
                  <small class="text-muted">বিকাশ/নগদ/রকেট/ব্যাংক পেমেন্টে</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border-slate-800">
                <i class="bi bi-patch-check-fill text-info fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">১০০% খাঁটি পণ্য</div>
                  <small class="text-muted">৭ দিনের সহজ রিটার্ন সুবিধা</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="feature-badge-card bg-slate-900 border-slate-800">
                <i class="bi bi-headset text-success fs-2"></i>
                <div>
                  <div class="fw-bold fs-6">সার্বক্ষণিক হেল্পলাইন</div>
                  <small class="text-muted">${CONFIG.phone1}, ${CONFIG.phone2}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Category-Wise Product View (Exact Layout: Category 1-8, 12 pcs Grid-6, See All) -->
        <section class="category-sections-wrapper space-y-5">
          ${categoryGroups.map((group, idx) => `
            <div class="category-block mb-5">
              
              <!-- Category Header with Line and See all Button (ক্যাটাগরি ১----------- See all) -->
              <div class="category-header-line d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-slate-800">
                <div class="d-flex align-items-center gap-3 flex-grow-1 me-3">
                  <span class="category-badge-number">${idx + 1}</span>
                  <div>
                    <h3 class="category-heading mb-0 text-white fw-bold">ক্যাটাগরি ${idx + 1}: ${group.categoryName}</h3>
                    <div class="text-xs text-emerald fw-semibold">${group.totalCount} টি প্রিমিয়াম প্রোডাক্ট</div>
                  </div>
                  <div class="cat-divider-line flex-grow-1 ms-3 d-none d-md-block" style="border-bottom: 2px dashed #334155; height: 1px;"></div>
                </div>
                <a href="#/products?category=${encodeURIComponent(group.categoryName)}" class="btn btn-sm btn-see-all text-nowrap shadow-sm">
                  See all (${group.totalCount}) <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>

              <!-- 12 pcs Product View by Grid 6 -->
              <div class="grid-6-container">
                ${group.products.map(p => COMPONENTS.renderProductCard(p)).join('')}
              </div>

            </div>
          `).join('')}
        </section>

        <!-- Wholesale Call to Action Banner -->
        <section class="wholesale-cta-box mt-5 p-4 p-md-5 rounded-4 text-white">
          <div class="row align-items-center">
            <div class="col-12 col-md-8">
              <span class="badge bg-amber text-dark fw-bold mb-2">হোলসেলার ও বাল্ক পার্টনারশিপ</span>
              <h2 class="fw-black mb-2">আপনি কি পাইকারি মূল্যে পণ্য কিনতে চান?</h2>
              <p class="text-slate-300 mb-0">ড্রিম কার্ট বিডি-এর স্পেশাল হোলসেল রেট এবং মিনিমাম অর্ডার কোয়ান্টিটি (MOQ) সুবিধা পেতে আজই যুক্ত হোন।</p>
            </div>
            <div class="col-12 col-md-4 text-md-end mt-3 mt-md-0">
              <a href="#/wholesale/login" class="btn btn-warning btn-lg px-4 py-2 fw-bold text-dark shadow">
                <i class="bi bi-shop me-1"></i> হোলসেলার হিসেবে লগইন করুন
              </a>
            </div>
          </div>
        </section>

      </div>
    `;
  },

  // 2. PRODUCTS PAGE (Left Sidebar + Grid 6 view + 120 pcs pagination)
  async renderProducts(queryParams = {}) {
    const activeCategory = queryParams.category || 'all';
    const activeStock = queryParams.stock || 'in_stock';
    const minPrice = queryParams.minPrice || '';
    const maxPrice = queryParams.maxPrice || '';
    const search = queryParams.search || '';

    const res = await API.call('products/list', {
      category: activeCategory,
      stockStatus: activeStock,
      minPrice,
      maxPrice,
      search
    });
    const products = (res.data && res.data.items) || [];

    const allProdsRes = await API.call('products/list', {});
    const allProds = (allProdsRes.data && allProdsRes.data.items) || [];
    const categories = [...new Set(allProds.map(p => p.category))];

    return `
      <div class="products-page-container">
        
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb text-xs">
            <li class="breadcrumb-item"><a href="#/">হোম</a></li>
            <li class="breadcrumb-item active" aria-current="page">সকল প্রোডাক্টস</li>
          </ol>
        </nav>

        <div class="row g-4">
          
          <!-- Left Sidebar Filters -->
          <div class="col-12 col-lg-3">
            <div class="filter-sidebar p-3 rounded-4 shadow-sm bg-slate-900 border border-slate-800">
              <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-slate-800 pb-2">
                <h6 class="mb-0 fw-bold"><i class="bi bi-sliders me-1 text-emerald"></i> ফিল্টার</h6>
                <a href="#/products" class="text-xs text-danger text-decoration-none">রিসেট</a>
              </div>

              <!-- Stock Filter (All, In Stock selected, Out of stock) -->
              <div class="mb-4">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">স্টক ফিল্টার</label>
                <div class="stock-filter-options space-y-2">
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockAll" value="all" 
                           ${activeStock === 'all' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'all')">
                    <label class="form-check-label text-xs" for="stockAll">All Product (সকল)</label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockIn" value="in_stock" 
                           ${activeStock === 'in_stock' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'in_stock')">
                    <label class="form-check-label text-xs text-success fw-bold" for="stockIn">In Stock (স্টকে আছে - ডিফল্ট)</label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" name="stockFilter" id="stockOut" value="out_of_stock" 
                           ${activeStock === 'out_of_stock' ? 'checked' : ''} onchange="PAGES.applyFilter('stock', 'out_of_stock')">
                    <label class="form-check-label text-xs text-danger" for="stockOut">Out of Stock</label>
                  </div>
                </div>
              </div>

              <!-- Category List -->
              <div class="mb-4">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">ক্যাটাগরি সমূহ</label>
                <div class="category-filter-list space-y-1">
                  <a href="#/products" class="cat-filter-item ${activeCategory === 'all' ? 'active' : ''}">
                    <span>সকল ক্যাটাগরি</span>
                    <span class="badge bg-secondary rounded-pill">${allProds.length}</span>
                  </a>
                  ${categories.map(cat => {
                    const count = allProds.filter(p => p.category === cat).length;
                    return `
                      <a href="#/products?category=${encodeURIComponent(cat)}&stock=${activeStock}" 
                         class="cat-filter-item ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}">
                        <span>${cat}</span>
                        <span class="badge bg-secondary rounded-pill">${count}</span>
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Filter by Price Range -->
              <div class="mb-3">
                <label class="form-label text-xs fw-bold text-uppercase text-muted">মূল্য সীমা (৳)</label>
                <div class="d-flex gap-2">
                  <input type="number" id="filter-min-price" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" placeholder="মিনিমাম" value="${minPrice}">
                  <input type="number" id="filter-max-price" class="form-control form-control-sm bg-slate-950 text-white border-slate-700" placeholder="ম্যাক্সিমাম" value="${maxPrice}">
                </div>
                <button class="btn btn-sm btn-primary w-100 mt-2" onclick="PAGES.applyPriceFilter()">ফিল্টার করুন</button>
              </div>

            </div>
          </div>

          <!-- Right Grid 6 Product View (120 pcs per page) -->
          <div class="col-12 col-lg-9">
            <div class="d-flex align-items-center justify-content-between mb-3 bg-slate-900/60 p-3 rounded-3 border border-slate-800">
              <div>
                <span class="text-xs text-muted">মোট ফলাফল:</span> 
                <strong class="text-emerald">${products.length} টি প্রোডাক্ট</strong>
                ${search ? `<span class="badge bg-dark ms-2">অনুসন্ধান: "${search}"</span>` : ''}
              </div>
              <div class="text-xs text-muted">১ম পেজ (১২০ টি ভিউ)</div>
            </div>

            ${products.length === 0 ? `
              <div class="text-center py-5 bg-slate-900/40 rounded-4 border border-slate-800">
                <i class="bi bi-box-seam fs-1 text-muted"></i>
                <h5 class="mt-3 text-slate-300">কোনো প্রোডাক্ট পাওয়া যায়নি</h5>
                <a href="#/products" class="btn btn-sm btn-outline-emerald mt-2">সকল প্রোডাক্ট দেখুন</a>
              </div>
            ` : `
              <div class="grid-6-container">
                ${products.slice(0, 120).map(p => COMPONENTS.renderProductCard(p)).join('')}
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  },

  applyFilter(key, val) {
    const hash = window.location.hash;
    const url = new URL('http://dummy.com' + hash.replace('#', ''));
    url.searchParams.set(key, val);
    window.location.hash = '#' + url.pathname + '?' + url.searchParams.toString();
  },

  applyPriceFilter() {
    const min = document.getElementById('filter-min-price').value;
    const max = document.getElementById('filter-max-price').value;
    const hash = window.location.hash;
    const url = new URL('http://dummy.com' + hash.replace('#', ''));
    if (min) url.searchParams.set('minPrice', min); else url.searchParams.delete('minPrice');
    if (max) url.searchParams.set('maxPrice', max); else url.searchParams.delete('maxPrice');
    window.location.hash = '#' + url.pathname + '?' + url.searchParams.toString();
  },

  // 3. PRODUCT DETAILS PAGE
  async renderProductDetails(sku) {
    const res = await API.call('products/details', { id: sku });
    if (!res.success || !res.data) {
      return `<div class="container py-5 text-center"><h4>প্রোডাক্টটি খুঁজে পাওয়া যায়নি</h4><a href="#/products" class="btn btn-primary mt-3">ক্যাটালগ দেখুন</a></div>`;
    }
    const p = res.data;
    const isLoved = STORE.wishlist.has(p.sku);

    const relRes = await API.call('products/list', { category: p.category });
    const related = (relRes.data && relRes.data.items || []).filter(item => item.sku !== p.sku).slice(0, 6);

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
              <div class="main-image-wrap mb-3">
                <img id="detail-main-img" src="${p.primaryImage}" alt="${p.name}" class="img-fluid rounded-3" style="max-height: 420px; object-fit: contain;" />
              </div>
              <div class="thumbnail-strip d-flex gap-2 justify-content-center overflow-auto pb-2">
                ${(p.images || [p.primaryImage]).map((img, i) => `
                  <img src="${img}" class="thumb-img ${i === 0 ? 'active' : ''}" 
                       onclick="document.getElementById('detail-main-img').src='${img}'; document.querySelectorAll('.thumb-img').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Product Details & Actions -->
          <div class="col-12 col-md-6">
            <div class="product-info-panel">
              <span class="badge bg-emerald mb-2">${p.brand}</span>
              <span class="badge bg-secondary mb-2">${p.category}</span>
              <div class="text-xs text-muted mb-1">SKU: <span class="text-slate-300 font-monospace">${p.sku}</span></div>
              
              <h1 class="h3 fw-bold mb-3">${p.name}</h1>

              <!-- Price & Discount Box -->
              <div class="price-box-details p-3 rounded-3 mb-3 bg-slate-900/60 border border-slate-800 d-flex align-items-center gap-3">
                <div class="display-6 fw-bold text-emerald">${CONFIG.currency}${p.sellingPrice.toLocaleString()}</div>
                ${p.originalPrice > p.sellingPrice ? `
                  <div class="text-decoration-line-through text-muted fs-5">${CONFIG.currency}${p.originalPrice.toLocaleString()}</div>
                  <span class="badge bg-danger">-${p.discountPercent}% ছাড়</span>
                ` : ''}
              </div>

              <!-- Special Offer Banner -->
              <div class="p-2 mb-3 rounded-3 bg-emerald/10 border border-emerald/30 text-xs text-emerald d-flex align-items-center gap-2">
                <i class="bi bi-tag-fill fs-5"></i>
                <div>
                  <strong>অফার:</strong> বিকাশ/নগদ/রকেটে পে করলে <strong>৫% ক্যাশব্যাক/ছাড়!</strong> ২০০০৳+ অর্ডারে ডেলিভারি ফ্রি।
                </div>
              </div>

              <!-- Stock & Variations -->
              <div class="mb-3">
                <div class="d-flex gap-3 text-xs mb-2">
                  <div><strong>স্টক:</strong> <span class="${p.stock > 0 ? 'text-success fw-bold' : 'text-danger'}">${p.stock > 0 ? `${p.stock} পিস স্টকে আছে` : 'স্টক আউট'}</span></div>
                  <div><strong>রং (Color):</strong> <span>${p.color}</span></div>
                  <div><strong>সাইজ (Size):</strong> <span>${p.size}</span></div>
                </div>
              </div>

              <!-- Quantity Selector -->
              <div class="d-flex align-items-center gap-3 mb-4">
                <span class="fw-bold text-sm">পরিমাণ:</span>
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
                  <i class="bi bi-cart-plus me-1"></i> কার্টে যোগ করুন
                </button>

                <!-- WhatsApp 1 -->
                <a href="${CONFIG.whatsappUrl1}?text=${encodeURIComponent('Hello Dream Cart BD, I want to order ' + p.name + ' (SKU: ' + p.sku + ')')}" 
                   target="_blank" class="btn btn-success px-3" title="হোয়াটসঅ্যাপ ১ এ অর্ডার">
                  <i class="bi bi-whatsapp"></i> ১
                </a>

                <!-- WhatsApp 2 -->
                <a href="${CONFIG.whatsappUrl2}?text=${encodeURIComponent('Hello Dream Cart BD, I want to order ' + p.name + ' (SKU: ' + p.sku + ')')}" 
                   target="_blank" class="btn btn-success px-3" title="হোয়াটসঅ্যাপ ২ এ অর্ডার">
                  <i class="bi bi-whatsapp"></i> ২
                </a>

                <button class="btn btn-outline-danger px-3 ${isLoved ? 'active' : ''}" 
                        onclick="STORE.wishlist.toggle(${JSON.stringify(p).replace(/"/g, '&quot;')}); this.classList.toggle('active');" 
                        title="ফেভরিট">
                  <i class="bi ${isLoved ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
              </div>

              <!-- Accordions: Description & Specification -->
              <div class="accordion mb-4" id="prodAccordion">
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

                <div class="accordion-item bg-slate-900 border-slate-800">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed bg-slate-900 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#specCollapse">
                      <i class="bi bi-card-checklist me-2 text-warning"></i> স্পেসিফিকেশন (Specification)
                    </button>
                  </h2>
                  <div id="specCollapse" class="accordion-collapse collapse">
                    <div class="accordion-body text-slate-300 text-sm whitespace-pre-line">
                      ${p.specification || 'অরিজিনাল ব্র্যান্ড স্পেসিফিকেশন।'}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Like, Comment & Review System -->
        <section class="reviews-section p-4 rounded-4 bg-slate-900/60 border border-slate-800 mb-5">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h4 class="fw-bold mb-0"><i class="bi bi-star-fill text-warning me-2"></i>গ্রাহক রিভিউ ও কমেন্ট</h4>
            <button class="btn btn-sm btn-outline-light" onclick="PAGES.openReviewModal('${p.sku}')">
              <i class="bi bi-pencil-square me-1"></i> রিভিউ দিন
            </button>
          </div>

          <div class="user-comments-list space-y-3">
            <div class="comment-card p-3 rounded-3 bg-slate-900 border border-slate-800">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong class="text-white">রাশেদুল ইসলাম (কুমিল্লা)</strong>
                <div class="text-warning text-xs">★★★★★ (৫/৫)</div>
              </div>
              <p class="text-xs text-slate-300 mb-1">প্রোডাক্টের কোয়ালিটি অসাধারণ। বিকাশ পেমেন্টে ৫% ছাড় পেয়েছি এবং ২ দিনের মধ্যেই ডেলিভারি হয়েছে।</p>
              <small class="text-muted text-[10px]">Verified Purchase | ২ দিন আগে</small>
            </div>
          </div>
        </section>

        <!-- Related Products -->
        ${related.length > 0 ? `
          <section class="related-products-section">
            <h4 class="fw-bold mb-3"><i class="bi bi-grid-3x3-gap-fill text-emerald me-2"></i>সম্পর্কিত প্রোডাক্টস</h4>
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

  openReviewModal(sku) {
    const name = prompt('আপনার নাম লিখুন:');
    if (!name) return;
    const comment = prompt('আপনার মূল্যবান রিভিউ লিখুন:');
    if (comment) {
      STORE.toast('success', 'রিভিউ সফলভাবে জমা হয়েছে!', 'ধন্যবাদ আপনার মতামতের জন্য।');
    }
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
          <div class="col-6"><span class="text-muted">মোট প্রদেয়:</span> <strong class="text-emerald">${CONFIG.currency}${o.totalAmount.toLocaleString()}</strong></div>
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
              ${isFreeDel ? '🎉 অভিনন্দন! আপনি সারা দেশে ফ্রি ডেলিভারি পাচ্ছেন!' : `🚚 আর মাত্র ৳${remainingForFree.toLocaleString()} শপিং করলেই ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!`}
            </strong>
            <span class="text-xs text-muted">টার্গেট: ৳${CONFIG.freeDeliveryThreshold.toLocaleString()}</span>
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
                          <td class="text-sm">${CONFIG.currency}${it.price.toLocaleString()}</td>
                          <td class="text-center">
                            <div class="qty-selector-group small">
                              <button class="btn btn-sm btn-qty" onclick="STORE.cart.updateQty('${it.sku}', -1)">-</button>
                              <span class="qty-number">${it.quantity}</span>
                              <button class="btn btn-sm btn-qty" onclick="STORE.cart.updateQty('${it.sku}', 1)">+</button>
                            </div>
                          </td>
                          <td class="text-end text-sm fw-bold text-emerald">${CONFIG.currency}${(it.price * it.quantity).toLocaleString()}</td>
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
                  <strong>${CONFIG.currency}${subtotal.toLocaleString()}</strong>
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
                  <span class="text-emerald fs-5">${CONFIG.currency}${subtotal.toLocaleString()}</span>
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
                        <span class="text-muted">${it.quantity} × ${CONFIG.currency}${it.price}</span>
                      </div>
                    </div>
                    <strong class="text-emerald">${CONFIG.currency}${(it.price * it.quantity).toLocaleString()}</strong>
                  </div>
                `).join('')}
              </div>

              <div class="d-flex justify-content-between text-sm mb-2">
                <span class="text-muted">সাবটোটাল:</span>
                <strong>${CONFIG.currency}${subtotal.toLocaleString()}</strong>
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
                <span id="summary-grand-total" class="text-emerald fs-4">${CONFIG.currency}${(subtotal + CONFIG.deliveryOutside).toLocaleString()}</span>
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

    if (delEl) {
      delEl.textContent = isFreeDelivery ? 'ফ্রি (০৳)' : `${CONFIG.currency}${deliveryCharge}`;
      delEl.className = isFreeDelivery ? 'text-success fw-bold' : '';
    }
    if (freeBadge) freeBadge.classList.toggle('d-none', !isFreeDelivery);

    if (discRow && discVal) {
      discRow.classList.toggle('d-none', !isOnline);
      discVal.textContent = `-${CONFIG.currency}${onlineDiscount.toLocaleString()}`;
    }

    if (grandEl) grandEl.textContent = `${CONFIG.currency}${grandTotal.toLocaleString()}`;
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
  renderCustomerLogin() {
    return `
      <div class="auth-container max-w-md mx-auto py-5">
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-2xl">
          <div class="text-center mb-4">
            <img src="${CONFIG.logoUrl}" width="54" height="54" class="rounded-circle mb-2 shadow" />
            <h3 class="fw-bold">কাস্টমার লগইন / রেজিস্টার</h3>
            <p class="text-muted text-xs">${CONFIG.slogan}</p>
          </div>

          <ul class="nav nav-pills nav-justified mb-4 p-1 bg-slate-950 rounded-3" id="authTab" role="tablist">
            <li class="nav-item">
              <button class="nav-link active btn-sm" data-bs-toggle="pill" data-bs-target="#loginTab">লগইন</button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn-sm" data-bs-toggle="pill" data-bs-target="#regTab">নতুন রেজিস্টার</button>
            </li>
          </ul>

          <div class="tab-content" id="authTabContent">
            <div class="tab-pane fade show active" id="loginTab">
              <form onsubmit="PAGES.handleCustomerLogin(event)">
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর / ইমেইল</label>
                  <input type="text" id="cust-login-id" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="018XXXXXXXX" required />
                </div>
                <div class="mb-3">
                  <label class="form-label text-xs fw-bold">পাসওয়ার্ড</label>
                  <input type="password" id="cust-login-pwd" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="******" required />
                </div>
                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">লগইন করুন</button>
              </form>
            </div>

            <div class="tab-pane fade" id="regTab">
              <form onsubmit="PAGES.handleCustomerRegister(event)">
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">আপনার নাম *</label>
                  <input type="text" id="cust-reg-name" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="নাম লিখুন" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">মোবাইল নম্বর *</label>
                  <input type="tel" id="cust-reg-mobile" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="018XXXXXXXX" required />
                </div>
                <div class="mb-2">
                  <label class="form-label text-xs fw-bold">পাসওয়ার্ড *</label>
                  <input type="password" id="cust-reg-pwd" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="পাসওয়ার্ড" required />
                </div>
                <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
                  <span class="text-emerald font-monospace fw-bold text-xs">ক্যাপচা কোড: <strong>৮ + ৫ = ?</strong></span>
                  <input type="text" id="cust-reg-captcha" class="form-control form-control-sm w-25 text-center text-white" placeholder="উত্তর" required />
                </div>
                <button type="submit" class="btn btn-success w-100 py-2 fw-bold">রেজিস্টার ও OTP পাঠান</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  handleCustomerLogin(e) {
    e.preventDefault();
    const id = document.getElementById('cust-login-id').value.trim();
    STORE.auth.loginCustomer({
      userId: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
      name: id.split('@')[0] || 'সম্মানিত কাস্টমার',
      phone: id,
      address: 'কুমিল্লা / ঢাকা, বাংলাদেশ',
      status: 'verified'
    });
    STORE.toast('success', 'স্বাগতম!', 'কাস্টমার একাউন্টে সফলভাবে লগইন হয়েছে।');
    window.location.hash = '#/customer/dashboard';
  },

  handleCustomerRegister(e) {
    e.preventDefault();
    const ans = document.getElementById('cust-reg-captcha').value.trim();
    if (ans !== '13') {
      alert('ভুল ক্যাপচা কোড! ৮ + ৫ = ১৩');
      return;
    }
    const name = document.getElementById('cust-reg-name').value.trim();
    const mobile = document.getElementById('cust-reg-mobile').value.trim();
    STORE.auth.loginCustomer({
      userId: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
      name,
      phone: mobile,
      address: 'কুমিল্লা, বাংলাদেশ',
      status: 'verified'
    });
    STORE.toast('success', 'রেজিস্ট্রেশন সফল!', 'আপনার একাউন্ট তৈরি করা হয়েছে।');
    window.location.hash = '#/customer/dashboard';
  },

  // 9. CUSTOMER DASHBOARD
  async renderCustomerDashboard() {
    const customer = STORE.auth.customer;
    if (!customer) { window.location.hash = '#/customer/login'; return ''; }

    const ordersRes = await API.call('orders/list');
    const myOrders = (ordersRes.data && ordersRes.data.items || []).filter(o => 
      o.phone === customer.phone || o.customerName === customer.name
    );

    return `
      <div class="customer-dashboard-container py-4">
        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 mb-4 shadow-xl">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <img src="${CONFIG.logoUrl}" width="56" height="56" class="rounded-circle border-2 border-emerald" />
              <div>
                <h3 class="fw-bold mb-0">${customer.name}</h3>
                <div class="text-xs text-muted">ID: ${customer.userId} | ফোন: ${customer.phone}</div>
                <span class="badge bg-success text-xs mt-1">ভেরিফাইড গ্রাহক</span>
              </div>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="STORE.auth.logoutCustomer(); window.location.hash='#/';">
              <i class="bi bi-box-arrow-right me-1"></i> লগআউট (Logout)
            </button>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-12 col-lg-8">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
              <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-clock-history text-emerald me-2"></i>আমার অর্ডার হিস্ট্রি (${myOrders.length})</h5>
              ${myOrders.length === 0 ? `<div class="text-center py-4 text-muted"><p>আপনার কোনো অর্ডার হিস্ট্রি নেই।</p><a href="#/products" class="btn btn-sm btn-primary">এখনই অর্ডার করুন</a></div>` : `
                <div class="table-responsive">
                  <table class="table table-dark table-hover text-xs mb-0">
                    <thead><tr><th>অর্ডার নং</th><th>তারিখ</th><th>প্রোডাক্ট</th><th>মোট টাকা</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead>
                    <tbody>
                      ${myOrders.map(o => `
                        <tr>
                          <td><strong>${o.orderId}</strong></td>
                          <td>${o.date}</td>
                          <td class="text-truncate-1" style="max-width: 140px;">${o.products}</td>
                          <td class="text-emerald fw-bold">${CONFIG.currency}${o.totalAmount.toLocaleString()}</td>
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

          <div class="col-12 col-lg-4">
            <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-lg">
              <h5 class="fw-bold mb-3 border-bottom border-slate-800 pb-2"><i class="bi bi-gear text-info me-2"></i>প্রোফাইল সেটিংস</h5>
              <form onsubmit="alert('প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!'); return false;">
                <div class="mb-2"><label class="form-label text-xs">আপনার নাম</label><input type="text" class="form-control form-control-sm bg-slate-950 border-slate-700 text-white" value="${customer.name}" /></div>
                <div class="mb-2"><label class="form-label text-xs">ফোন নম্বর</label><input type="text" class="form-control form-control-sm bg-slate-950 border-slate-700 text-white" value="${customer.phone}" /></div>
                <div class="mb-3"><label class="form-label text-xs">ডেলিভারি ঠিকানা</label><textarea class="form-control form-control-sm bg-slate-950 border-slate-700 text-white" rows="2">${customer.address || ''}</textarea></div>
                <button type="submit" class="btn btn-primary btn-sm w-100">পরিবর্তন সেভ করুন</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 10 & 11. WHOLESALER LOGIN & DASHBOARD
  renderWholesaleLogin() {
    return `
      <div class="auth-container max-w-md mx-auto py-5">
        <div class="card bg-slate-900 border-amber-900/50 rounded-4 p-4 shadow-2xl">
          <div class="text-center mb-4">
            <img src="${CONFIG.logoUrl}" width="54" height="54" class="rounded-circle mb-2 shadow" />
            <h3 class="fw-bold text-amber">As A WholeSeller</h3>
            <p class="text-muted text-xs">পাইকারি বিক্রেতাদের এক্সক্লুসিভ পোর্টাল</p>
          </div>

          <form onsubmit="PAGES.handleWholesaleLogin(event)">
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">শপ নাম / হোলসেলার আইডি</label>
              <input type="text" id="ws-login-id" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="দোকানের নাম বা আইডি" required />
            </div>
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">মোবাইল নম্বর</label>
              <input type="tel" id="ws-login-phone" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="018XXXXXXXX" required />
            </div>
            <div class="mb-3">
              <label class="form-label text-xs fw-bold">পাসওয়ার্ড</label>
              <input type="password" id="ws-login-pwd" class="form-control bg-slate-950 border-slate-700 text-white" placeholder="******" required />
            </div>
            <div class="p-2 mb-3 bg-slate-950 rounded-3 border border-slate-800 d-flex align-items-center justify-content-between">
              <span class="text-amber font-monospace fw-bold text-xs">ক্যাপচা কোড: <strong>৭ + ৯ = ?</strong></span>
              <input type="text" id="ws-captcha" class="form-control form-control-sm w-25 text-center text-white" placeholder="উত্তর" required />
            </div>
            <button type="submit" class="btn btn-warning w-100 py-2 fw-bold text-dark">হোলসেলার লগইন করুন →</button>
          </form>
        </div>
      </div>
    `;
  },

  handleWholesaleLogin(e) {
    e.preventDefault();
    const ans = document.getElementById('ws-captcha').value.trim();
    if (ans !== '16') { alert('ভুল ক্যাপচা কোড!'); return; }
    const shop = document.getElementById('ws-login-id').value.trim();
    const phone = document.getElementById('ws-login-phone').value.trim();
    STORE.auth.loginWholesaler({
      userId: 'WS-' + Math.floor(100 + Math.random() * 900),
      shopName: shop,
      phone: phone,
      address: 'চকবাজার, চট্টগ্রাম / কান্দিরপাড়, কুমিল্লা',
      discountRate: '15-30%'
    });
    STORE.toast('success', 'হোলসেলার লগইন সফল!', 'হোলসেল রেট ক্যাটালগ ওপেন হয়েছে।');
    window.location.hash = '#/wholesale/dashboard';
  },

  async renderWholesaleDashboard() {
    const ws = STORE.auth.wholesaler;
    if (!ws) { window.location.hash = '#/wholesale/login'; return ''; }

    const prodsRes = await API.call('products/list');
    const prods = (prodsRes.data && prodsRes.data.items) || [];

    return `
      <div class="wholesale-dashboard-container py-4">
        <div class="card bg-slate-900 border-amber-900/50 rounded-4 p-4 mb-4 shadow-xl">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <img src="${CONFIG.logoUrl}" width="56" height="56" class="rounded-circle border-2 border-amber" />
              <div>
                <h3 class="fw-bold mb-0 text-amber">${ws.shopName}</h3>
                <div class="text-xs text-muted">হোলসেলার আইডি: ${ws.userId} | মোবাইল: ${ws.phone}</div>
                <span class="badge bg-amber text-dark text-xs mt-1">অনুমোদিত পাইকারি ডিলার</span>
              </div>
            </div>
            <button class="btn btn-outline-danger btn-sm" onclick="STORE.auth.logoutWholesaler(); window.location.hash='#/';">
              লগআউট (Logout)
            </button>
          </div>
        </div>

        <div class="card bg-slate-900 border-slate-800 rounded-4 p-4 shadow-xl mb-4">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h4 class="fw-bold mb-0"><i class="bi bi-box-seam text-amber me-2"></i>হোলসেল রেট প্রোডাক্ট ক্যাটালগ</h4>
              <p class="text-xs text-muted mb-0">বিশেষ পাইকারি মূল্য এবং ন্যূনতম অর্ডার পরিমাণ (MOQ)</p>
            </div>
            <div class="input-group max-w-sm">
              <input type="text" class="form-control form-control-sm bg-slate-950 border-slate-700 text-white" 
                     placeholder="হোলসেল পণ্য খুঁজুন..." oninput="PAGES.filterWholesaleCatalog(this.value)" />
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
                  <th>মিনিমাম অর্ডার (MOQ)</th>
                  <th>স্টক</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                ${prods.map(p => `
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <img src="${p.primaryImage}" width="40" height="40" class="rounded" style="object-fit: cover;" />
                        <div>
                          <a href="#/product/${p.sku}" class="text-white fw-bold text-decoration-none">${p.name}</a>
                          <div class="text-muted text-[11px]">${p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td>${p.category}</td>
                    <td class="text-decoration-line-through text-muted">${CONFIG.currency}${p.sellingPrice.toLocaleString()}</td>
                    <td class="text-amber fw-black fs-6">${CONFIG.currency}${p.wholesalePrice.toLocaleString()}</td>
                    <td><span class="badge bg-slate-800">${p.minOrderQ}</span></td>
                    <td><span class="text-success">${p.stock} পিস</span></td>
                    <td>
                      <button class="btn btn-sm btn-warning text-dark fw-bold px-3" 
                              onclick="STORE.cart.addItem(${JSON.stringify(p).replace(/"/g, '&quot;')}, ${p.minOrderQ || 5}, true)">
                        <i class="bi bi-cart-plus me-1"></i> বাল্ক অর্ডার
                      </button>
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

  filterWholesaleCatalog(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#ws-catalog-table tbody tr');
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  }

};

window.PAGES = PAGES;
