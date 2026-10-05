/**
 * ============================================================================
 * DREAM CART BD — ORDER SUCCESS CONFIRMATION PAGE (OrderSuccessPage.js)
 * Verified Order Voucher, Pickup / Courier Info, Store Contact, & WhatsApp Confirmation
 * ============================================================================
 */

import { Header } from "../../components/Header.js";
import { Footer } from "../../components/Footer.js";

export const OrderSuccessPage = async (params = {}) => {
  const orderId = params.id || "DCBD-" + Math.floor(100000 + Math.random() * 900000);

  let lastOrder = null;
  try {
    const stored = localStorage.getItem("dcbd_last_order");
    if (stored) lastOrder = JSON.parse(stored);
  } catch (e) {}

  const customerName = lastOrder?.customer_name || "সম্মানিত গ্রাহক";
  const customerPhone = lastOrder?.phone || "";
  const paymentMethod = lastOrder?.payment_method || "Cash On Delivery (COD)";
  const totalAmount = lastOrder?.total || "";
  const shippingAddress = lastOrder?.shipping_address || "আপনার প্রদত্ত ঠিকানা";

  const waText = encodeURIComponent(`হ্যালো Dream Cart BD, আমি একটি নতুন অর্ডার প্লেস করেছি।\nঅর্ডার নম্বর: ${orderId}\nনাম: ${customerName}\nফোন: ${customerPhone}`);

  return `
    <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-luxury-dark font-bengali">
      ${Header.render()}

      <main class="flex-1 max-w-2xl mx-auto px-4 py-12 sm:py-16 w-full text-center space-y-8">
        
        <!-- Animated Success Badge -->
        <div class="space-y-4">
          <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl shadow-emerald-500/20 border-4 border-emerald-500/30 animate-bounce">
            ✓
          </div>
          <span class="badge-success text-xs font-bold uppercase tracking-wider">অর্ডার সফলভাবে গৃহীত হয়েছে</span>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            ধন্যবাদ! আপনার অর্ডার কনফার্ম হয়েছে
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            আমাদের কাস্টমার কেয়ার টিম শীঘ্রই আপনার সাথে যোগাযোগ করে পার্সেলটি দ্রুত ডেলিভারির ব্যবস্থা করবে।
          </p>
        </div>

        <!-- Order Receipt Voucher -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-left space-y-4 bg-white dark:bg-slate-900">
          <div class="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-[11px] text-slate-400 uppercase font-semibold">অর্ডার রেফারেন্স নম্বর</span>
              <h3 class="text-lg font-black text-brand-600 dark:text-brand-400 font-mono tracking-wider">${orderId}</h3>
            </div>
            <span class="badge-info text-xs font-bold">প্রসেসিং চলছে</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 py-1">
            <div>
              <span class="text-slate-400 block text-[11px]">গ্রাহকের নাম:</span>
              <strong class="text-slate-900 dark:text-white text-sm">${customerName}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">মোবাইল নম্বর:</span>
              <strong class="text-slate-900 dark:text-white font-mono text-sm">${customerPhone || "N/A"}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">পেমেন্ট মেথড:</span>
              <strong class="text-slate-900 dark:text-white">${paymentMethod}</strong>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">সর্বমোট প্রদেয়:</span>
              <strong class="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">${totalAmount ? `৳${totalAmount}` : "কনফার্মেশনের অপেক্ষায়"}</strong>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p><strong>ডেলিভারি ঠিকানা:</strong> ${shippingAddress}</p>
            <p><strong>আনুমানিক সময়:</strong> ২ - ৩ কার্যদিবস (কুরিয়ার ট্র্যাকিং সহ)</p>
          </div>

          <!-- Store Outlet Information -->
          <div class="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div class="text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5">
              <span>📍</span> <strong>Dream Cart BD আউটলেট:</strong>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              চৌধুরী প্লাজা, নিচতলা, রুম #০৩, পদুয়ার বাজার বিশ্বরোড, সদর দক্ষিণ, কুমিল্লা-৩৫০০।
            </p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              📞 হটলাইন: <strong>01581703822</strong> (WhatsApp) | <strong>01818273838</strong>
            </p>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a href="https://wa.me/8801581703822?text=${waText}" target="_blank" class="btn-primary py-3.5 px-6 text-xs font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>হোয়াটসঅ্যাপে দ্রুত কনফার্ম করুন</span>
          </a>
          <a href="/track-order" class="btn-secondary py-3.5 px-6 text-xs font-bold flex items-center justify-center gap-2">
            <i data-lucide="truck" class="w-4 h-4"></i>
            <span>অর্ডার ট্র্যাকিং দেখুন</span>
          </a>
          <a href="/products" class="btn-secondary py-3.5 px-6 text-xs font-bold flex items-center justify-center gap-2">
            <span>আরও শপিং করুন</span>
          </a>
        </div>

      </main>

      ${Footer.render()}
    </div>
  `;
};

export default OrderSuccessPage;
