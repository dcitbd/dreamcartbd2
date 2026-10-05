/**
 * ============================================================================
 * DREAM CART BD — GLOBAL SETTINGS & STORE PROFILE (Settings.js)
 * Shop Owners, Paduar Bazar Address, Payment Credentials, Delivery Zones,
 * and Developer Attribution.
 * ============================================================================
 */

import { Sidebar } from "../../components/Sidebar.js";
import { store } from "../../js/store.js";

if (typeof window !== "undefined") {
  window.saveGlobalSettings = () => {
    if (store && typeof store.showToast === "function") {
      store.showToast("গ্লোবাল সেটিংস ও স্টোর প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!", "success");
    } else {
      alert("গ্লোবাল সেটিংস ও স্টোর প্রোফাইল সফলভাবে সেভ হয়েছে!");
    }
  };
}

export const Settings = async () => {
  return `
    <div class="min-h-screen flex bg-slate-50 dark:bg-luxury-dark font-bengali">
      ${Sidebar?.render ? Sidebar.render("/admin/settings") : ""}

      <main class="flex-1 p-6 sm:p-10 max-w-5xl mx-auto overflow-y-auto space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <span class="badge-info text-xs mb-1">সিস্টেম কনফিগ</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">গ্লোবাল প্ল্যাটফর্ম সেটিংস</h1>
            <p class="text-xs text-slate-500 mt-1">দোকানের তথ্য, পেমেন্ট অ্যাকাউন্ট, ডেলিভারি রেট ও ডেভেলপার প্রোফাইল</p>
          </div>
          <button type="button" onclick="window.saveGlobalSettings && window.saveGlobalSettings()" class="btn-primary py-2.5 px-6 text-xs font-bold shadow-lg shadow-brand-500/25">
            সেটিংস সেভ করুন
          </button>
        </div>

        <div class="space-y-6">
          
          <!-- General Store Information -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <i data-lucide="store" class="w-5 h-5 text-brand-500"></i> সাধারণ দোকান তথ্য (Store Profile)
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">দোকানের নাম (Shop Name)</label>
                <input type="text" value="Dream Cart BD" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">অফিস সময় (Office Hours)</label>
                <input type="text" value="Every Day 8:00 AM to 10:00 PM" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">স্বত্বাধিকারী ১ (Shop Owner 1)</label>
                <input type="text" value="Jainal Abedin (জয়নাল আবেদীন)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white font-bold" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">স্বত্বাধিকারী ২ (Shop Owner 2)</label>
                <input type="text" value="MD. Saiful Islam (মো: সাইফুল ইসলাম)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white font-bold" />
              </div>
              <div class="md:col-span-2">
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">দোকানের পূর্ণ ঠিকানা (Store Address)</label>
                <textarea rows="2" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white">Chawdhury Plaza, ground floor, room#03, Paduar Bazar, Bishwa Road, Sadar Dakshin, Cumilla-3500.</textarea>
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">হটলাইন ১ (WhatsApp)</label>
                <input type="text" value="01581703822" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white font-mono" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">হটলাইন ২ (WhatsApp)</label>
                <input type="text" value="01818273838" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none text-slate-900 dark:text-white font-mono" />
              </div>
            </div>
          </div>

          <!-- Delivery Rates & Free Shipping Rule -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <i data-lucide="truck" class="w-5 h-5 text-emerald-500"></i> ডেলিভারি রেট ও পলিসি
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-slate-400 font-bold">In Cumilla</span>
                <div class="text-xl font-black text-brand-600 dark:text-brand-400">৳70</div>
                <p class="text-[11px] text-slate-500">কুমিল্লা সদর এলাকা</p>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-slate-400 font-bold">In Dhaka</span>
                <div class="text-xl font-black text-brand-600 dark:text-brand-400">৳90</div>
                <p class="text-[11px] text-slate-500">ঢাকা সিটির ভেতরে</p>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span class="text-slate-400 font-bold">Out of Dhaka</span>
                <div class="text-xl font-black text-brand-600 dark:text-brand-400">৳120</div>
                <p class="text-[11px] text-slate-500">সমগ্র বাংলাদেশ</p>
              </div>

              <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span class="text-emerald-700 dark:text-emerald-300 font-bold">Office Pickup</span>
                <div class="text-xl font-black text-emerald-600 dark:text-emerald-400">৳0 Free</div>
                <p class="text-[11px] text-emerald-600">পদুয়ার বাজার আউটলেট</p>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 font-bold">
              🎉 ফ্রি শিপিং অফার সক্রিয়: ২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)!
            </div>
          </div>

          <!-- Payment Accounts -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <i data-lucide="wallet" class="w-5 h-5 text-amber-500"></i> পেমেন্ট মেথড ও ব্যাংক অ্যাকাউন্ট
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-2xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/50 dark:bg-pink-950/20">
                <div class="font-bold text-pink-700 dark:text-pink-400">bKash Merchant Payment (Make Payment)</div>
                <div class="font-mono font-black text-slate-900 dark:text-white text-sm mt-1">01581703822</div>
                <div class="text-[11px] text-slate-500 mt-1">Link: https://shop.bkash.com/j-a-sagor-computer01581703822/paymentlink</div>
              </div>

              <div class="p-3.5 rounded-2xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/50 dark:bg-pink-950/20">
                <div class="font-bold text-pink-700 dark:text-pink-400">bKash Personal (Send Money)</div>
                <div class="font-mono font-black text-slate-900 dark:text-white text-sm mt-1">01879653143</div>
                <div class="text-[11px] text-slate-500 mt-1">Personal wallet for customer prepayment</div>
              </div>

              <div class="p-3.5 rounded-2xl border border-orange-200 dark:border-orange-900/60 bg-orange-50/50 dark:bg-orange-950/20">
                <div class="font-bold text-orange-700 dark:text-orange-400">Nagad Personal (Send Money)</div>
                <div class="font-mono font-black text-slate-900 dark:text-white text-sm mt-1">01879653143</div>
              </div>

              <div class="p-3.5 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20">
                <div class="font-bold text-purple-700 dark:text-purple-400">Rocket Personal (Send Money)</div>
                <div class="font-mono font-black text-slate-900 dark:text-white text-sm mt-1">01581703822</div>
              </div>

              <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 md:col-span-2 text-[11px] font-mono space-y-1">
                <div class="text-xs font-bold text-slate-900 dark:text-white font-sans">Bank Account (Islami Bank Bangladesh PLC)</div>
                <div>A/C Name: <strong>Jainal Abedin</strong></div>
                <div>A/C Number: <strong class="text-brand-600 dark:text-brand-400 text-xs">20508070200030208</strong></div>
                <div>Branch: <strong>Maheshkhali Sub branch</strong> (Routing: 125260525)</div>
                <div>SWIFT / Bank Code: <strong>IBBLBDDH</strong></div>
              </div>
            </div>

            <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-bold">
              ⚡ অনলাইন পেমেন্ট ইনসেন্টিভ: যেকোনো অনলাইন পেমেন্ট মেথডে অর্ডারে স্বয়ংক্রিয়ভাবে ৫% ডিসকাউন্ট সক্রিয়।
            </div>
          </div>

          <!-- Developer Profile Card -->
          <div class="bg-gradient-to-br from-slate-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm space-y-4">
            <h3 class="text-base font-bold pb-3 border-b border-slate-800 flex items-center gap-2">
              <i data-lucide="code-2" class="w-5 h-5 text-brand-400"></i> ডেভেলপার তথ্য (Developer & Tech Provider)
            </h3>

            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-xs">
              <img 
                src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.99422-6/748763443_1355179329312781_3762544494183960829_n.png?stp=dst-jpg_tt6&cstp=mx876x1414&ctp=s876x1414&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEgpskzgAVWN3ZiohXZA-RhiddumrjTx6WJ126auNPHpRbk_pIDiYLXfo5UR9FYrkKKGwNHxgicb8fdqAfCdAzm&_nc_ohc=ulolVsVxolUQ7kNvwFbbn_s&_nc_oc=Adqwy7DrnjEKjOAfZPttbAGnlBGmXslovULfm4dCZditFerwrSiULyvnQBwCwT-ctOY&_nc_zt=14&_nc_ht=scontent.fdac24-5.fna&_nc_gid=QjQg-WZiaHQGDcl9YGAVCA&_nc_ss=7b2a8&oh=00_AQOthzROIPmAhM-IMyLs5b5IxRzmoCsj5_Ucs02h26YSdw&oe=6AC34270" 
                alt="Jainal Abedin" 
                class="w-16 h-16 rounded-2xl object-cover border border-brand-500 shadow-md"
                onerror="this.style.display='none'"
              />
              <div class="space-y-1.5 flex-1 text-center sm:text-left">
                <div class="text-base font-black text-white">জয়নাল আবেদীন (Jainal Abedin)</div>
                <div class="text-brand-400 font-bold">CEO, Dream Career IT BD</div>
                <p class="text-slate-300 text-[11px] leading-relaxed">
                  Dream Cart BD ই-কমার্স প্ল্যাটফর্মের প্রধান সিস্টেম আর্কিটেক্ট ও সফটওয়্যার ইঞ্জিনিয়ার।
                </p>
                <div class="flex flex-wrap gap-4 pt-1 justify-center sm:justify-start">
                  <a href="https://dcitbd.github.io/Jainal-Abedin/" target="_blank" class="text-brand-400 hover:underline">
                    🌐 ডেভেলপার পোর্টফোলিও
                  </a>
                  <a href="https://dcitbd.github.io/dcitbd/" target="_blank" class="text-brand-400 hover:underline">
                    🏢 ড্রিম ক্যারিয়ার আইটি বিডি
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  `;
};

export default Settings;
