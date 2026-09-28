// Dream Cart BD - Core Application Logic
// Cart, Wishlist, Theme Toggle, Delivery Area Auto-Detection, Orders, and UI Utilities

const App = {
  cart: [],
  favorites: [],
  currentUser: null,

  init() {
    this.initTheme();
    this.loadState();
    this.renderFloatingButtons();
    this.setupGlobalListeners();
    this.removePreloader();
  },

  initTheme() {
    const savedTheme = localStorage.getItem('dcbd_theme') || 'dark'; // Default dark mode as requested
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dcbd_theme', next);
    this.showToast(`থিম পরিবর্তন করা হয়েছে: ${next === 'dark' ? 'ডার্ক মোড' : 'লাইট মোড'}`, 'info');
  },

  removePreloader() {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const preloader = document.getElementById('page-preloader');
        if (preloader) preloader.classList.add('fade-out');
      }, 350);
    });
  },

  loadState() {
    this.cart = JSON.parse(localStorage.getItem('dcbd_cart') || '[]');
    this.favorites = JSON.parse(localStorage.getItem('dcbd_favs') || '[]');
    this.currentUser = JSON.parse(sessionStorage.getItem('dcbd_user') || 'null');
    this.updateCartBadges();
  },

  saveCart() {
    localStorage.setItem('dcbd_cart', JSON.stringify(this.cart));
    this.updateCartBadges();
  },

  saveFavorites() {
    localStorage.setItem('dcbd_favs', JSON.stringify(this.favorites));
  },

  // Role Price Resolution
  getProductPrice(product) {
    if (!this.currentUser) return product.selling_price;
    if (this.currentUser.role === 'wholesaler') return product.wholesale_price;
    if (this.currentUser.role === 'reseller') return product.reseller_price;
    return product.selling_price;
  },

  addToCart(productId, qty = 1, color = '', size = '') {
    const product = API.getProductById(productId);
    if (!product) return;

    if (product.stock <= 0) {
      this.showToast('দুঃখিত, এই প্রোডাক্টটি বর্তমানে স্টকে নেই!', 'error');
      return;
    }

    // Wholesaler MOQ check
    if (this.currentUser && this.currentUser.role === 'wholesaler') {
      const minQ = product.min_order_q || 1;
      if (qty < minQ) {
        qty = minQ;
        this.showToast(`হোলসেলের জন্য ন্যূনতম অর্ডার পরিমাণ ${minQ} পিস প্রযোজ্য করা হলো।`, 'warning');
      }
    }

    const price = this.getProductPrice(product);
    const existing = this.cart.find(item => item.id === productId && item.selectedColor === color && item.selectedSize === size);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: price,
        originalPrice: product.original_price,
        image: Array.isArray(product.images) ? product.images[0] : product.images,
        quantity: qty,
        selectedColor: color || (product.color && product.color[0]) || '',
        selectedSize: size || (product.size && product.size[0]) || '',
        brand: product.brand,
        stock: product.stock
      });
    }

    this.saveCart();
    this.showToast('প্রোডাক্টটি সফলভাবে কার্টে যোগ করা হয়েছে!', 'success');
  },

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.showToast('আইটেমটি কার্ট থেকে সরানো হয়েছে।', 'info');
  },

  updateCartQty(index, newQty) {
    if (newQty <= 0) {
      this.removeFromCart(index);
      return;
    }
    const item = this.cart[index];
    if (item) {
      item.quantity = newQty;
      this.saveCart();
    }
  },

  toggleFavorite(productId) {
    const idx = this.favorites.indexOf(productId);
    if (idx !== -1) {
      this.favorites.splice(idx, 1);
      this.showToast('ফেভারিট থেকে সরানো হয়েছে।', 'info');
    } else {
      this.favorites.push(productId);
      this.showToast('ফেভারিটে যুক্ত করা হয়েছে!', 'success');
    }
    this.saveFavorites();
    return this.favorites.includes(productId);
  },

  isFavorite(productId) {
    return this.favorites.includes(productId);
  },

  updateCartBadges() {
    const totalCount = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });
  },

  // Floating Action Buttons on Bottom-Right
  renderFloatingButtons() {
    if (document.getElementById('floating-widgets')) return;
    const div = document.createElement('div');
    div.id = 'floating-widgets';
    div.className = 'floating-actions-container';
    div.innerHTML = `
      <a href="https://wa.me/8801581703822?text=Hello%20Dream%20Cart%20BD,%20I%20want%20to%20know%20more%20about%20your%20products." 
         target="_blank" class="float-btn float-whatsapp" title="WhatsApp Chat">
        <i class="fab fa-whatsapp"></i>
      </a>
      <a href="tel:01581703822" class="float-btn float-call" title="Direct Call">
        <i class="fas fa-phone-alt"></i>
      </a>
      <a href="cart.html" class="float-btn float-cart" title="View Cart">
        <i class="fas fa-shopping-cart"></i>
        <span class="float-badge cart-badge-count">0</span>
      </a>
    `;
    document.body.appendChild(div);
  },

  // Automated Delivery Area and Cost Detection from Address
  detectDeliveryArea(addressText) {
    const text = (addressText || '').toLowerCase();
    const settings = API.getSettings();
    const rates = settings.delivery_rates || { cumilla: 90, dhaka: 110, outside: 135 };

    if (text.includes('কুমিল্লা') || text.includes('cumilla') || text.includes('comilla')) {
      return { area: 'কুমিল্লার ভিতর', fee: rates.cumilla };
    } else if (text.includes('ঢাকা') || text.includes('dhaka') || text.includes('মিরপুর') || text.includes('ধানমন্ডি') || text.includes('গুলশান') || text.includes('উত্তরা')) {
      return { area: 'ঢাকার ভিতরে', fee: rates.dhaka };
    } else {
      return { area: 'কুমিল্লা ও ঢাকার বাইরে', fee: rates.outside };
    }
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  setupGlobalListeners() {
    // Top-level event delegation if needed
  }
};

// Initialize App
App.init();
