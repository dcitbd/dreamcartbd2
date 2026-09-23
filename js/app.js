/**
 * DREAM CART BD — MASTER CLIENT ROUTER & EVENT MANAGER
 */
const APP = {
  async init() {
    // 1. Initialize Theme (Dark mode default)
    STORE.theme.init();

    // 2. Render Page Preloader with Logo
    const loaderMount = document.getElementById('loader-mount');
    if (loaderMount) {
      loaderMount.innerHTML = COMPONENTS.renderLoader();
    }

    // 3. Render Navbar & Footer
    this.updateNavbar();
    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = COMPONENTS.renderFooter();

    // 4. Attach Event Delegates
    this.attachEvents();

    // 5. Subscribe to Store updates
    STORE.on('cart_updated', () => this.updateNavbar());
    STORE.on('wishlist_updated', () => this.updateNavbar());
    STORE.on('auth_changed', () => this.updateNavbar());
    STORE.on('theme_changed', () => this.updateNavbar());

    // 6. Setup Hash Routing
    window.addEventListener('hashchange', () => this.route());
    await this.route();

    // Dismiss Preloader smoothly
    setTimeout(() => {
      const loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
      }
    }, 600);
  },

  updateNavbar() {
    const navMount = document.getElementById('navbar-mount');
    if (navMount) {
      navMount.innerHTML = COMPONENTS.renderNavbar();
      this.wireNavbarActions();
    }
  },

  wireNavbarActions() {
    // Dark mode buttons
    const btnTheme = document.getElementById('btn-toggle-theme');
    const btnThemeMobile = document.getElementById('btn-toggle-theme-mobile');
    if (btnTheme) btnTheme.onclick = () => STORE.theme.toggle();
    if (btnThemeMobile) btnThemeMobile.onclick = () => STORE.theme.toggle();

    // Mobile drawer toggle
    const btnOpenDrawer = document.getElementById('btn-open-mobile-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-mobile-drawer');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const drawer = document.getElementById('mobile-drawer');

    const openDrawer = () => {
      drawer?.classList.add('active');
      drawerOverlay?.classList.add('active');
    };
    const closeDrawer = () => {
      drawer?.classList.remove('active');
      drawerOverlay?.classList.remove('active');
    };

    if (btnOpenDrawer) btnOpenDrawer.onclick = openDrawer;
    if (btnCloseDrawer) btnCloseDrawer.onclick = closeDrawer;
    if (drawerOverlay) drawerOverlay.onclick = closeDrawer;

    // Desktop search
    const dtSearchInput = document.getElementById('desktop-search-input');
    const btnDtSearch = document.getElementById('btn-desktop-search');
    const doSearch = (val) => {
      if (val && val.trim()) {
        window.location.hash = `#/products?search=${encodeURIComponent(val.trim())}`;
      }
    };
    if (btnDtSearch && dtSearchInput) {
      btnDtSearch.onclick = () => doSearch(dtSearchInput.value);
      dtSearchInput.onkeypress = (e) => { if (e.key === 'Enter') doSearch(dtSearchInput.value); };
    }

    // Mobile search
    const mobSearchInput = document.getElementById('mobile-search-input');
    const btnMobSearch = document.getElementById('btn-mobile-search');
    if (btnMobSearch && mobSearchInput) {
      btnMobSearch.onclick = () => doSearch(mobSearchInput.value);
      mobSearchInput.onkeypress = (e) => { if (e.key === 'Enter') doSearch(mobSearchInput.value); };
    }
  },

  attachEvents() {
    // Global link interceptor to close mobile drawer
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-menu-link')) {
        document.getElementById('mobile-drawer')?.classList.remove('active');
        document.getElementById('mobile-drawer-overlay')?.classList.remove('active');
      }
    });
  },

  // Client-side Hash Router
  async route() {
    const content = document.getElementById('main-content');
    if (!content) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const rawHash = window.location.hash || '#/';
    const [path, queryString] = rawHash.split('?');
    const params = new URLSearchParams(queryString || '');
    const queryObj = Object.fromEntries(params.entries());

    // Show small content loader
    content.innerHTML = `
      <div class="d-flex justify-content-center align-items-center py-5" style="min-height: 50vh;">
        <div class="spinner-border text-emerald" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    try {
      // 1. Home
      if (path === '#/' || path === '#' || path === '') {
        content.innerHTML = await PAGES.renderHome();
        // Initialize carousel
        const carEl = document.getElementById('homeHeroCarousel');
        if (carEl && window.bootstrap) {
          new bootstrap.Carousel(carEl, { interval: 4000, wrap: true });
        }
      }
      // 2. Products
      else if (path === '#/products') {
        content.innerHTML = await PAGES.renderProducts(queryObj);
      }
      // 3. Product Details (#/product/:sku)
      else if (path.startsWith('#/product/')) {
        const sku = path.replace('#/product/', '');
        content.innerHTML = await PAGES.renderProductDetails(decodeURIComponent(sku));
      }
      // 4. Order Tracking (#/track)
      else if (path === '#/track') {
        content.innerHTML = await PAGES.renderTracking();
        if (queryObj.orderId) {
          const input = document.getElementById('track-query-input');
          if (input) {
            input.value = queryObj.orderId;
            PAGES.handleTrackSearch(new Event('submit'));
          }
        }
      }
      // 5. Favorites (#/favorites)
      else if (path === '#/favorites') {
        content.innerHTML = await PAGES.renderFavorites();
      }
      // 6. Cart (#/cart)
      else if (path === '#/cart') {
        content.innerHTML = await PAGES.renderCart();
      }
      // 7. Checkout & Order Process (#/checkout)
      else if (path === '#/checkout') {
        content.innerHTML = await PAGES.renderCheckout();
      }
      // 8. Customer Login
      else if (path === '#/customer/login') {
        content.innerHTML = PAGES.renderCustomerLogin();
      }
      // 9. Customer Dashboard
      else if (path === '#/customer/dashboard') {
        content.innerHTML = await PAGES.renderCustomerDashboard();
      }
      // 10. As a Wholesaler Login
      else if (path === '#/wholesale/login') {
        content.innerHTML = PAGES.renderWholesaleLogin();
      }
      // 11. Wholesaler Dashboard
      else if (path === '#/wholesale/dashboard') {
        content.innerHTML = await PAGES.renderWholesaleDashboard();
      }
      // 12. Admin Login
      else if (path === '#/admin/login') {
        content.innerHTML = ADMIN.renderLogin();
      }
      // 13. Admin Dashboard
      else if (path === '#/admin/dashboard') {
        content.innerHTML = await ADMIN.renderPortal();
      }
      else {
        content.innerHTML = `
          <div class="text-center py-5">
            <h1 class="display-1 text-emerald fw-black">404</h1>
            <h4 class="mb-3">পেজটি খুঁজে পাওয়া যায়নি</h4>
            <a href="#/" class="btn btn-primary">হোমে ফিরে যান</a>
          </div>
        `;
      }
    } catch (err) {
      console.error('Routing Error:', err);
      content.innerHTML = `
        <div class="alert alert-danger my-5 text-center">
          <h5>কিছু ভুল হয়েছে!</h5>
          <p class="text-xs mb-0">${err.message}</p>
          <button onclick="location.reload()" class="btn btn-sm btn-outline-danger mt-3">Reload</button>
        </div>
      `;
    }
  }
};

window.APP = APP;

// Boot on DOM Ready
document.addEventListener('DOMContentLoaded', () => APP.init());
