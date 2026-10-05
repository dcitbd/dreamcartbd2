/**
 * ============================================================================
 * DREAM CART BD — SMART CART DRAWER (CartDrawer.js)
 * Free delivery progress bar (৳2,000 threshold), live quantity updater,
 * and 1-click checkout transition.
 * ============================================================================
 */

import { store } from "../js/store.js";
import { router } from "../js/router.js";

export const CartDrawer = {
  render: () => {
    const cart = store?.state?.cart || { items: [], subtotal: 0, total: 0 };
    const items = Array.isArray(cart.items) ? cart.items : [];
    const subtotal = Number(cart.subtotal || 0);

    const freeThreshold = 2000;
    const amountNeeded = Math.max(0, freeThreshold - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

    return `
    <div id="cart-drawer-backdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 hidden opacity-0">
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div id="cart-drawer-panel" class="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col font-bengali transform translate-x-full transition-transform duration-300">
          
          <!-- Header -->
          <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-xs">
                <i data-lucide="shopping-bag" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">আপনার শপিং কার্ট</h3>
                <p class="text-[11px] text-slate-400">মোট ${items.length} টি আইটেম যোগ করা হয়েছে</p>
              </div>
            </div>
            <button id="close-cart-drawer" type="button" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Free Delivery Progress Bar (৳২,০০০ থ্রেশহোল্ড) -->
          <div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-800/60 text-xs">
            <div class="flex justify-between items-center text-emerald-800 dark:text-emerald-300 font-semibold mb-1.5">
              <span>${amountNeeded > 0 ? `৳${amountNeeded} আরও যোগ করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!` : "🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!"}</span>
              <span>${progressPercent}%</span>
            </div>
            <div class="w-full bg-emerald-200/60 dark:bg-emerald-900/60 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
            </div>
            <div class="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 flex justify-between font-medium">
              <span>২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ ফ্রি</span>
              <span class="font-bold">টার্গেট: ৳২,০০০</span>
            </div>
          </div>

          <!-- Items List -->
          <div class="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-custom">
            ${items.length === 0 ? `
              <div class="text-center py-20 text-slate-400 space-y-3">
                <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400">
                  <i data-lucide="shopping-cart" class="w-8 h-8"></i>
                </div>
                <h4 class="text-base font-bold text-slate-800 dark:text-slate-200">আপনার কার্ট খালি আছে!</h4>
                <p class="text-xs text-slate-500">আমাদের স্মার্টওয়াচ, গ্যাজেট ও অর্গানিক ফুড কালেকশন দেখুন।</p>
                <a href="/products" id="drawer-browse-btn" class="btn-primary text-xs px-5 py-2.5 inline-block font-bold mt-2">
                  শপিং শুরু করুন →
                </a>
              </div>
            ` : items.map(item => `
              <div class="flex gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <img src="${item.image || 'https://placehold.co/80x80'}" alt="${item.name || 'Product'}" class="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-slate-200 dark:border-slate-700" />
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate pr-2">${item.name || 'পণ্য'}</h4>
                    <button type="button" class="cart-remove-btn text-slate-400 hover:text-rose-500 transition-colors p-1" data-id="${item.cartItemId}">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                  ${item.variantName ? `<p class="text-[11px] text-slate-400">${item.variantName}</p>` : ''}
                  <p class="text-xs font-black text-brand-600 dark:text-brand-400 mt-1">৳${item.unitPrice || 0}</p>
                  
                  <div class="flex items-center justify-between mt-2.5">
                    <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                      <button type="button" class="cart-qty-btn px-2.5 py-0.5 text-slate-500 hover:text-brand-600 font-bold text-xs" data-id="${item.cartItemId}" data-qty="${(Number(item.quantity) || 1) - 1}">-</button>
                      <span class="px-2 text-xs font-bold text-slate-800 dark:text-slate-200">${item.quantity || 1}</span>
                      <button type="button" class="cart-qty-btn px-2.5 py-0.5 text-slate-500 hover:text-brand-600 font-bold text-xs" data-id="${item.cartItemId}" data-qty="${(Number(item.quantity) || 1) + 1}">+</button>
                    </div>
                    <span class="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      ৳${(item.unitPrice || 0) * (item.quantity || 1)}
                    </span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Bottom Checkout Summary -->
          ${items.length > 0 ? `
            <div class="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 space-y-2.5">
              <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>পণ্যের মূল্য (Subtotal):</span>
                <span class="font-bold text-slate-900 dark:text-white">৳${cart.subtotal || 0}</span>
              </div>
              <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>ডেলিভারি ফি:</span>
                <span class="font-bold ${cart.shipping === 0 ? 'text-emerald-600 font-bold' : 'text-slate-900 dark:text-white'}">
                  ${cart.shipping === 0 ? '<span class="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded text-[10px]">ফ্রি (৳০)</span>' : '৳' + cart.shipping}
                </span>
              </div>
              ${cart.onlineDiscount > 0 ? `
                <div class="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>অনলাইন ছাড় (৫% OFF):</span>
                  <span>-৳${cart.onlineDiscount}</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>সর্বমোট বিল:</span>
                <span class="text-brand-600 dark:text-brand-400 text-lg">৳${cart.total || 0}</span>
              </div>
              
              <button id="drawer-checkout-btn" type="button" class="w-full btn-primary py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 mt-2">
                <span>অর্ডার কনফার্ম করুন (চেকআউট)</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
              
              <p class="text-[10px] text-center text-slate-400 dark:text-slate-500 pt-1">
                🔒 ক্যাশ অন ডেলিভারি (COD) ও অনলাইন পেমেন্ট সুবিধা সারা দেশে
              </p>
            </div>
          ` : ''}

        </div>
      </div>
    </div>
    `;
  },

  initEvents: () => {
    if (typeof document === "undefined") return;

    const backdrop = document.getElementById("cart-drawer-backdrop");
    const panel = document.getElementById("cart-drawer-panel");
    const closeBtn = document.getElementById("close-cart-drawer");
    const checkoutBtn = document.getElementById("drawer-checkout-btn");
    const browseBtn = document.getElementById("drawer-browse-btn");

    const openDrawer = () => {
      if (backdrop && panel) {
        backdrop.classList.remove("hidden");
        requestAnimationFrame(() => {
          backdrop.classList.remove("opacity-0");
          panel.classList.remove("translate-x-full");
        });
      }
    };

    const closeDrawer = () => {
      if (backdrop && panel) {
        backdrop.classList.add("opacity-0");
        panel.classList.add("translate-x-full");
        setTimeout(() => {
          if (backdrop) backdrop.classList.add("hidden");
        }, 300);
      }
    };

    if (closeBtn) closeBtn.onclick = closeDrawer;
    if (browseBtn) browseBtn.onclick = closeDrawer;
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) closeDrawer();
      };
    }

    // Quantity update delegation
    document.querySelectorAll(".cart-qty-btn").forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const qty = parseInt(e.currentTarget.getAttribute("data-qty"), 10);
        if (store) store.updateCartQty(id, Math.max(1, qty));
      };
    });

    // Remove item delegation
    document.querySelectorAll(".cart-remove-btn").forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        if (store) store.removeFromCart(id);
      };
    });

    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        closeDrawer();
        if (window.router && typeof window.router.navigate === "function") {
          window.router.navigate("/checkout");
        } else if (typeof window !== "undefined") {
          window.location.href = "/checkout";
        }
      };
    }

    // Store Event Listeners (Prevent duplicate binding checks)
    if (store && typeof store.on === "function" && !store._cartEventsInitialized) {
      store._cartEventsInitialized = true;

      store.on("toggle_cart_drawer", (open) => {
        if (open) openDrawer(); else closeDrawer();
      });

      store.on("cart_updated", () => {
        const drawerContainer = document.getElementById("cart-drawer-root");
        if (drawerContainer) {
          const isOpen = backdrop && !backdrop.classList.contains("hidden");
          drawerContainer.innerHTML = CartDrawer.render();
          CartDrawer.initEvents();
          if (isOpen) {
            const newBackdrop = document.getElementById("cart-drawer-backdrop");
            const newPanel = document.getElementById("cart-drawer-panel");
            if (newBackdrop && newPanel) {
              newBackdrop.classList.remove("hidden", "opacity-0");
              newPanel.classList.remove("translate-x-full");
            }
          }
          if (typeof window !== "undefined" && window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
          }
        }
      });
    }
  }
};

if (typeof window !== "undefined") {
  window.CartDrawer = CartDrawer;
}

export default CartDrawer;
