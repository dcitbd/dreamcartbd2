/**
 * ============================================================================
 * DREAM CART BD — GLOBAL LUXURY HEADER (Header.js)
 * Official Shop Identity, Notice Bar, WhatsApp Hotline, and Cart Counter
 * ============================================================================
 */

import { store } from "../js/store.js";
import { ProductAPI } from "../api/products.js";

export const Header = {
  render: () => {
    const user = store?.state?.user || null;
    const cartItems = store?.state?.cart?.items || [];
    const cartCount = Array.isArray(cartItems) 
      ? cartItems.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0) 
      : 0;

    const isAdmin = user && user.role && String(user.role).toLowerCase().includes("admin");
    const accountUrl = isAdmin ? "/admin/dashboard" : "/customer/account";
    const currentTheme = store?.state?.theme || "light";

    return `
    <!-- Top Notice & Offers Announcement Bar -->
    <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 font-bengali">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
          <span class="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">নোটিশ</span>
          <span class="font-medium text-slate-200">
            ৳২,০০০ বা তার বেশি অর্ডারে <strong class="text-amber-300 font-bold">ফ্রি শিপিং!</strong> | অনলাইনে পেমেন্ট করলে <strong class="text-emerald-400 font-bold">৫% ডিসকাউন্ট</strong> | ক্যাশ অন ডেলিভারি (COD)
          </span>
        </div>
        <div class="flex items-center gap-4 text-xs shrink-0">
          <a href="https://wa.me/8801581703822" target="_blank" class="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> 01581703822 (WhatsApp)
          </a>
          <span class="hidden md:inline text-slate-600">|</span>
          <a href="/offers" class="hover:text-amber-300 text-amber-400 font-semibold transition-colors flex items-center gap-1">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> অফারসমূহ
          </a>
          <span class="hidden md:inline text-slate-600">|</span>
          <a href="/contact" class="hover:text-white transition-colors flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> যোগাযোগ
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="sticky top-0 z-40 w-full glass-panel shadow-sm transition-all duration-300 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 gap-4">
          
          <!-- Logo & Mobile Drawer Toggle -->
          <div class="flex items-center gap-3 shrink-0">
            <button id="mobile-menu-toggle" type="button" class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
            <a href="/" class="flex items-center gap-3 group">
              <div class="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 dark:border-slate-700 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                <img 
                  src="https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg" 
                  alt="Dream Cart BD Logo" 
                  class="w-full h-full object-contain rounded-xl"
                  onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10';"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  Dream Cart <span class="text-brand-600 dark:text-brand-400">BD</span>
                </span>
                <span class="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 -mt-1">
                  Smart Digital Commerce
                </span>
              </div>
            </a>
          </div>

          <!-- Live Search Bar with Instant Results Dropdown -->
          <div class="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <div class="relative w-full">
              <input 
                type="text" 
                id="global-search-input" 
                placeholder="স্মার্টওয়াচ, অর্গানিক পাউডার, গ্যাজেট বা SKU দিয়ে খুঁজুন..." 
                class="w-full pl-11 pr-24 py-2.5 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-bengali text-slate-900 dark:text-white"
              />
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i data-lucide="search" class="w-4 h-4"></i>
              </div>
              <button id="search-btn" type="button" class="absolute inset-y-1 right-1 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors font-bengali">
                সার্চ
              </button>
            </div>
            <!-- Search Results Dropdown -->
            <div id="search-results-dropdown" class="hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 max-h-96 overflow-y-auto"></div>
          </div>

          <!-- Action Icons (Offers, Contact, Theme Toggle, Cart) -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Quick Link: Offers -->
            <a href="/offers" class="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all">
              <i data-lucide="percent" class="w-3.5 h-3.5"></i>
              <span>অফার</span>
            </a>

            <!-- Quick Link: Contact -->
            <a href="/contact" class="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span>যোগাযোগ</span>
            </a>

            <!-- Quick Link: Track Order -->
            <a href="/track-order" class="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all">
              <i data-lucide="truck" class="w-3.5 h-3.5"></i>
              <span>ট্র্যাকিং</span>
            </a>

            <!-- Dark / Light Theme Toggle -->
            <button id="theme-toggle-btn" type="button" class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Toggle Theme">
              <i data-lucide="${currentTheme === 'dark' ? 'sun' : 'moon'}" class="w-5 h-5"></i>
            </button>

            <!-- Cart Drawer Trigger Button -->
            <button id="cart-drawer-toggle" type="button" class="relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 hover:bg-brand-100 transition-all">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span class="hidden sm:inline font-semibold text-xs font-bengali">কার্ট</span>
              <span id="header-cart-badge" class="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-brand-600 text-white rounded-full">
                ${cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      <!-- Categories & Subnav Bar -->
      <nav class="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 hidden sm:block">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto py-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <a href="/products" class="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors text-brand-600 dark:text-brand-400 font-bold">
            <i data-lucide="grid" class="w-3.5 h-3.5"></i> সমস্ত প্রোডাক্ট
          </a>
          <a href="/products?category=smartwatch" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">স্মার্ট ওয়াচ</a>
          <a href="/products?category=organic" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">অর্গানিক ও স্বাস্থ্য</a>
          <a href="/products?category=electronics" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">টুলস ও এলইডি লাইট</a>
          <a href="/offers" class="hover:text-amber-500 text-amber-600 dark:text-amber-400 font-bold transition-colors flex items-center gap-1">
            <i data-lucide="flame" class="w-3.5 h-3.5"></i> স্পেশাল ডিল ও অফার
          </a>
          <a href="/partner/seller" class="hover:text-brand-600 dark:hover:text-brand-400 text-indigo-600 dark:text-indigo-400 font-bold transition-colors">সেলার হাব</a>
          <a href="/partner/reseller" class="hover:text-brand-600 dark:hover:text-brand-400 text-purple-600 dark:text-purple-400 font-bold transition-colors">রিসেলার পোর্টাল</a>
          <a href="/partner/wholesale" class="hover:text-brand-600 dark:hover:text-brand-400 text-emerald-600 dark:text-emerald-400 font-bold transition-colors">হোলসেল বিটুবি</a>
          <a href="/contact" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors ml-auto flex items-center gap-1 text-slate-500">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> পদুয়ার বাজার আউটলেট
          </a>
        </div>
      </nav>
    </header>
    `;
  },

  initEvents: () => {
    if (typeof document === "undefined") return;

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn && store && typeof store.toggleTheme === "function") {
      themeBtn.onclick = () => store.toggleTheme();
    }

    // Cart Drawer Toggle
    const cartBtn = document.getElementById("cart-drawer-toggle");
    if (cartBtn && store && typeof store.emit === "function") {
      cartBtn.onclick = () => {
        store.emit("toggle_cart_drawer", true);
      };
    }

    // Search Engine
    const searchInput = document.getElementById("global-search-input");
    const searchBtn = document.getElementById("search-btn");
    const dropdown = document.getElementById("search-results-dropdown");
    let debounceTimer;

    const executeSearch = () => {
      const q = searchInput?.value.trim();
      if (q && window.router && typeof window.router.navigate === "function") {
        dropdown?.classList.add("hidden");
        window.router.navigate(`/products?search=${encodeURIComponent(q)}`);
      }
    };

    if (searchBtn) searchBtn.onclick = executeSearch;
    if (searchInput) {
      searchInput.onkeydown = (e) => {
        if (e.key === "Enter") executeSearch();
      };

      searchInput.oninput = (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
          if (dropdown) {
            dropdown.classList.add("hidden");
            dropdown.innerHTML = "";
          }
          return;
        }

        debounceTimer = setTimeout(async () => {
          try {
            if (ProductAPI && typeof ProductAPI.getAll === "function") {
              const result = await ProductAPI.getAll();
              const products = Array.isArray(result) ? result : (result?.items || []);
              const matches = products.filter(p => 
                (p.product_name && p.product_name.toLowerCase().includes(query)) ||
                (p.sku && p.sku.toLowerCase().includes(query))
              ).slice(0, 5);

              if (dropdown) {
                if (matches.length === 0) {
                  dropdown.innerHTML = `<div class="p-4 text-center text-sm text-slate-500 font-bengali">কোনো প্রোডাক্ট পাওয়া যায়নি।</div>`;
                } else {
                  dropdown.innerHTML = matches.map(p => `
                    <a href="/product/${p.product_id}" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                      <img src="${p.thumbnail || 'https://placehold.co/80x80'}" alt="${p.product_name || 'Product'}" class="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-semibold text-slate-900 dark:text-white truncate">${p.product_name || ""}</h4>
                        <p class="text-xs text-brand-600 dark:text-brand-400 font-bold">৳${p.selling_price || p.regular_price || 0}</p>
                      </div>
                      <span class="badge-success text-[10px]">ইন স্টক</span>
                    </a>
                  `).join("");
                }
                dropdown.classList.remove("hidden");
              }
            }
          } catch (err) {
            console.error("Search failed:", err);
          }
        }, 300);
      };
    }

    document.onclick = (e) => {
      if (searchInput && dropdown && !searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    };
  }
};

if (typeof window !== "undefined") {
  window.Header = Header;
}

export default Header;
