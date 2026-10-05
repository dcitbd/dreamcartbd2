/**
 * ============================================================================
 * DREAM CART BD — STOREFRONT HOME PAGE (HomePage.js)
 * High-conversion hero, live notice bar, trust badges, verified catalog,
 * and quick-cart triggers.
 * ============================================================================
 */

import { Header } from "../../components/Header.js";
import { Footer } from "../../components/Footer.js";
import { CartDrawer } from "../../components/CartDrawer.js";
import { ProductAPI } from "../../api/products.js";
import { store } from "../../js/store.js";

export const HomePage = async () => {
  let products = [];
  let categories = [];

  try {
    const prodRes = await ProductAPI.getAll();
    products = prodRes.items || (Array.isArray(prodRes) ? prodRes : []);
    const catRes = await ProductAPI.getCategoryTree();
    categories = Array.isArray(catRes) ? catRes : [];
  } catch (e) {
    console.error("Home data fetch error:", e);
  }

  // Window Cache for Safe Cart Lookup
  window._homeProducts = products;

  const flashDeals = products.slice(0, 4);
  const bestSellers = products.length > 0 ? products.slice(0, 8) : [];
  const featuredDeal = flashDeals[0] || {
    product_id: "PRD-FEATURED",
    product_name: "T900 Ultra Smartwatch With Wireless Charger",
    sku: "SW-T900-ULTRA",
    regular_price: 2500,
    selling_price: 1850,
    thumbnail: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg"
  };

  return `
    <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-luxury-dark font-bengali">
      ${Header.render()}

      <main class="flex-1 space-y-12 pb-16">
        
        <!-- Live Offers Alert Bar in Page -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div class="p-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-700 rounded-2xl text-white text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div class="flex items-center gap-2 text-center sm:text-left">
              <span class="text-base sm:text-lg">📢</span>
              <span><strong>নোটিশ:</strong> ৳২,০০০ বা তার বেশি অর্ডারে সারা দেশে ফ্রি শিপিং! অনলাইনে অর্ডার করুন, পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।</span>
            </div>
            <a href="/offers" class="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs transition whitespace-nowrap shadow-xs">
              ৫% ছাড় অফার দেখুন →
            </a>
          </div>
        </div>

        <!-- Hero Banner Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold tracking-wide uppercase">
                  <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> ড্রিম কার্ট বিডি প্রিমিয়াম স্টোর
                </div>
                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  সেরা পণ্য, সেরা দাম <br />
                  <span class="bg-gradient-to-r from-brand-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                    সরাসরি আপনার দরজায়
                  </span>
                </h1>
                <p class="text-slate-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                  Dream Cart BD-তে পাচ্ছেন ১০০% অরিজিনাল গ্যাজেট, স্মার্টওয়াচ, অর্গানিক হেলথ ফুড ও নিত্যপ্রয়োজনীয় ইলেকট্রনিক্স সামগ্রী। সারা দেশে হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি (COD) সুবিধা।
                </p>
                <div class="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                  <a href="/products" class="btn-primary px-8 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-500/30">
                    <span>শপ এক্সপ্লোর করুন</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </a>
                  <a href="/offers" class="btn-secondary px-6 py-3.5 text-sm font-bold text-amber-300 bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur">
                    🔥 স্পেশাল অফার
                  </a>
                  <a href="https://wa.me/8801581703822" target="_blank" class="btn-secondary px-6 py-3.5 text-sm font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/40 flex items-center gap-1.5">
                    <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i> WhatsApp অর্ডার
                  </a>
                </div>
              </div>

              <!-- Hero Floating Deal Card -->
              <div class="lg:col-span-5 flex justify-center">
                <div class="relative w-full max-w-sm">
                  <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500 to-amber-500 opacity-25 blur-xl animate-pulse"></div>
                  <div class="relative glass-panel p-6 rounded-3xl border border-slate-700 text-slate-900 dark:text-white shadow-2xl bg-white/95 dark:bg-slate-900/95 space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="badge-danger text-xs font-bold inline-block">হট ডিল!</span>
                      <span class="text-xs text-emerald-600 dark:text-emerald-400 font-bold">অনলাইনে ৫% ছাড়</span>
                    </div>
                    <img src="${featuredDeal.thumbnail || 'https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg'}" class="w-full h-48 object-contain rounded-2xl bg-slate-100 dark:bg-slate-800 p-2" />
                    <h3 class="text-sm sm:text-base font-bold truncate">${featuredDeal.product_name}</h3>
                    <div class="flex items-center justify-between pt-1">
                      <div>
                        ${featuredDeal.regular_price > featuredDeal.selling_price ? `
                          <span class="text-xs text-slate-400 line-through">৳${featuredDeal.regular_price}</span>
                        ` : ''}
                        <h4 class="text-2xl font-black text-brand-600 dark:text-brand-400">৳${featuredDeal.selling_price || featuredDeal.regular_price}</h4>
                      </div>
                      <button onclick="window.quickAddToCart('${featuredDeal.product_id}')" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md">
                        কার্টে নিন
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Trust Badges Bar -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">
                🚚
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">সারা বাংলাদেশে ডেলিভারি</h4>
                <p class="text-[11px] text-slate-500">৳২,০০০+ অর্ডারে ফ্রি ডেলিভারি</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg shrink-0">
                💵
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">ক্যাশ অন ডেলিভারি</h4>
                <p class="text-[11px] text-slate-500">পণ্য হাতে পেয়ে মূল্য পরিশোধ</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
                💳
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">৫% অনলাইন ছাড়</h4>
                <p class="text-[11px] text-slate-500">বিকাশ, নগদ, রকেট ও ব্যাংকে</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg shrink-0">
                📍
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">কুমিল্লা প্রধান আউটলেট</h4>
                <p class="text-[11px] text-slate-500">পদুয়ার বাজার বিশ্বরোড</p>
              </div>
            </div>

          </div>
        </section>

        <!-- Featured Categories Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">ফিচার্ড ক্যাটাগরি</h2>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">আপনার প্রয়োজনীয় ক্যাটাগরি বাছাই করুন</p>
            </div>
            <a href="/categories" class="text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              সব দেখুন <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            ${(categories.length > 0 ? categories.slice(0, 6) : [
              { category_name: "স্মার্ট ওয়াচ", icon: "watch", category_id: "smartwatch" },
              { category_name: "ইলেকট্রনিক্স ও গ্যাজেট", icon: "laptop", category_id: "electronics" },
              { category_name: "অর্গানিক ও স্বাস্থ্য", icon: "apple", category_id: "organic" },
              { category_name: "হেডফোন ও অডিও", icon: "headphones", category_id: "audio" },
              { category_name: "টুলস ও এলইডি লাইট", icon: "lightbulb", category_id: "lighting" },
              { category_name: "ফ্যাশন ও এক্সেসরিজ", icon: "shirt", category_id: "fashion" }
            ]).map(cat => `
              <a href="/products?category=${cat.category_id || ''}" class="glass-panel p-5 rounded-2xl text-center flex flex-col items-center justify-center gap-3 hover:border-brand-500 hover:shadow-lg transition-all group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div class="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i data-lucide="${cat.icon || 'tag'}" class="w-7 h-7"></i>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full">${cat.category_name}</span>
              </a>
            `).join("")}
          </div>
        </section>

        <!-- Best Selling Products Grid -->
        <section class="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <span class="badge-success mb-2 text-xs font-bold">টপ ট্রেন্ডিং</span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">জনপ্রিয় প্রোডাক্টসমূহ</h2>
              </div>
              <a href="/products" class="btn-secondary text-xs px-4 py-2 flex items-center gap-1 font-bold">
                সকল প্রোডাক্ট <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              ${(bestSellers.length > 0 ? bestSellers : products.slice(0, 4)).map(product => `
                <div class="glass-panel rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div>
                    <div class="relative bg-white p-4 flex items-center justify-center overflow-hidden h-48">
                      <img src="${product.thumbnail || 'https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg'}" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                      ${product.regular_price > product.selling_price ? `
                        <span class="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                          -${Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100)}% ছাড়
                        </span>
                      ` : ''}
                    </div>

                    <div class="p-4 space-y-1">
                      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${product.sku || 'DCBD'}</span>
                      <a href="/product/${product.product_id}">
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-brand-500 transition-colors">
                          ${product.product_name}
                        </h3>
                      </a>
                    </div>
                  </div>

                  <div class="p-4 pt-0">
                    <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        ${product.regular_price > product.selling_price ? `
                          <span class="text-[11px] text-slate-400 line-through">৳${product.regular_price}</span>
                        ` : ''}
                        <h4 class="text-base font-extrabold text-slate-900 dark:text-white">৳${product.selling_price || product.regular_price}</h4>
                      </div>
                      <button onclick="window.quickAddToCart('${product.product_id}')" class="p-2.5 rounded-xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm">
                        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

      </main>

      <div id="cart-drawer-root">${CartDrawer.render()}</div>
      ${Footer.render()}
    </div>
  `;
};

// Safe Quick Add Handler
if (typeof window !== "undefined") {
  window.quickAddToCart = (productId) => {
    const items = window._homeProducts || [];
    const prod = items.find(p => p.product_id === productId);
    if (prod) {
      store.addToCart(prod, 1);
    } else {
      store.addToCart({ product_id: productId, product_name: "পণ্য", selling_price: 1000 }, 1);
    }
  };
}

export default HomePage;
