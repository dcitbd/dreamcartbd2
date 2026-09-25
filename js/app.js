/**
 * DREAM CART BD — MASTER CLIENT ROUTER & EVENT MANAGER
 * Features:
 * - Admin Session Route Guarding (Requirement 17: Auto logout on tab close)
 * - Scroll-Reveal IntersectionObserver Animations (Requirement 18)
 * - Dual Route Mount (Terms, Privacy, Categories, Products, Dashboards)
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
    STORE.on('cart_updated', () => {
      this.updateNavbar();
      const hash = window.location.hash || '';
      if (hash.startsWith('#/cart')) {
        this.route();
      }
    });
    STORE.on('wishlist_updated', () => this.updateNavbar());
    STORE.on('auth_changed', () => this.updateNavbar());
    STORE.on('theme_changed', () => this.updateNavbar());

    // Auto re-render when live products are loaded from Google Sheet
    window.addEventListener('dcbd_products_synced', () => {
      const hash = window.location.hash || '';
      if (!hash || hash === '#/' || hash.startsWith('#/products') || hash.startsWith('#/admin')) {
        console.log('[App Router] Live Google Sheet products updated, refreshing current view...');
        this.route();
      }
    });

    // Proactively fetch live sheet products
    if (typeof API !== 'undefined' && API.fetchLiveSheetData) {
      API.fetchLiveSheetData().catch(() => {});
    }

    // 6. Setup Hash Routing
    window.addEventListener('hashchange', () => this.route());
    await this.route();

    // 7. Dismiss Preloader smoothly
    setTimeout(() => {
      const loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
      }
    }, 500);
  },

  updateNavbar() {
    const navMount = document.getElementById('navbar-mount') || document.getElementById('header-container');
    if (!navMount) return;

    const hash = window.location.hash || '';
    if (hash.startsWith('#/admin')) {
      // Hide public shopping navbar in Admin Panel to prevent duplicate headers
      navMount.innerHTML = '';
      return;
    }

    navMount.innerHTML = COMPONENTS.renderNavbar();
    this.wireNavbarActions();
  },

  wireNavbarActions() {
    // Theme toggle
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
      drawer?.classList.add('open');
      drawerOverlay?.classList.add('open');
    };
    const closeDrawer = () => {
      drawer?.classList.remove('open');
      drawerOverlay?.classList.remove('open');
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
        document.getElementById('mobile-drawer')?.classList.remove('open');
        document.getElementById('mobile-drawer-overlay')?.classList.remove('open');
      }
    });
  },

  // Setup Scroll Reveal Animations (Requirement 18)
  initScrollAnimations() {
    setTimeout(() => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        }, { threshold: 0.08 });
        reveals.forEach(el => observer.observe(el));
      } else {
        reveals.forEach(el => el.classList.add('revealed'));
      }
    }, 150);
  },

  // Client-side Hash Router
  async route() {
    const content = document.getElementById('main-content');
    if (!content) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateNavbar();

    let rawHash = window.location.hash;
    if (!rawHash || rawHash === '#/' || rawHash === '#') {
      const pName = (window.location.pathname || '').toLowerCase();
      if (pName.includes('cart.html')) rawHash = '#/cart';
      else if (pName.includes('checkout.html')) rawHash = '#/checkout';
      else if (pName.includes('track') || pName.includes('order.html')) rawHash = '#/track';
      else if (pName.includes('terms.html')) rawHash = '#/terms';
      else if (pName.includes('privacy') || pName.includes('privecy')) rawHash = '#/privacy';
      else if (pName.includes('customer')) rawHash = '#/customer/dashboard';
      else if (pName.includes('wholesale')) rawHash = '#/wholesale/dashboard';
      else if (pName.includes('login.html')) rawHash = '#/customer/login';
      else if (pName.includes('admin') || pName.includes('product-management') || pName.includes('product management') || pName.includes('order-management') || pName.includes('brand') || pName.includes('categor')) rawHash = '#/admin/dashboard';
      else rawHash = '#/';
    }
    const [path, queryString] = rawHash.split('?');
    const params = new URLSearchParams(queryString || '');
    const queryObj = Object.fromEntries(params.entries());

    // Show loading state
    content.innerHTML = `
      <div class="d-flex justify-content-center align-items-center py-5" style="min-height: 50vh;">
        <div class="spinner-border text-emerald" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    try {
      // 1. Home Page
      if (path === '#/' || path === '#' || path === '') {
        content.innerHTML = await PAGES.renderHome();
        const carEl = document.getElementById('homeHeroCarousel');
        if (carEl && window.bootstrap) {
          new bootstrap.Carousel(carEl, { interval: 4000, wrap: true });
        }
      }
      // 2. Products Page (Grid-6, 120 per page, tree filter)
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
      // 8. Customer Login / Register (Width 30%)
      else if (path === '#/customer/login') {
        content.innerHTML = PAGES.renderCustomerLogin();
      }
      // 9. Customer Dashboard
      else if (path === '#/customer/dashboard') {
        content.innerHTML = await PAGES.renderCustomerDashboard();
      }
      // 10. As a Wholesaler Login / Register (Width 30%)
      else if (path === '#/wholesale/login') {
        content.innerHTML = PAGES.renderWholesaleLogin();
      }
      // 11. Wholesaler Dashboard
      else if (path === '#/wholesale/dashboard') {
        content.innerHTML = await PAGES.renderWholesaleDashboard();
      }
      // 12. Terms & Conditions (Requirement 18)
      else if (path === '#/terms') {
        content.innerHTML = PAGES.renderTerms();
      }
      // 13. Privacy Policy (Requirement 18)
      else if (path === '#/privacy' || path === '#/privecy') {
        content.innerHTML = PAGES.renderPrivacy();
      }
      // 14. Admin Login (Developer background, eye toggle, captcha)
      else if (path === '#/admin/login') {
        content.innerHTML = ADMIN.renderLogin();
      }
      // 15. Admin Dashboard (Route guarded by sessionStorage)
      else if (path === '#/admin/dashboard' || path.startsWith('#/admin')) {
        // Requirement 17: Cannot enter without login
        if (!STORE.auth.isLoggedInAdmin()) {
          STORE.toast('error', 'লগইন আবশ্যক!', 'এডমিন প্যানেলে প্রবেশ করতে প্রথমে লগইন করুন।');
          window.location.hash = '#/admin/login';
          return;
        }
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

      // Initialize animations after rendering view
      this.initScrollAnimations();

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
