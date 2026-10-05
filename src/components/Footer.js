/**
 * ============================================================================
 * DREAM CART BD — GLOBAL LUXURY FOOTER (Footer.js)
 * Full Store Details, Owners, Paduar Bazar Cumilla Address, Delivery Zones,
 * Payment Accounts (bKash/Nagad/Rocket/Bank), and Developer Attribution.
 * ============================================================================
 */

export const Footer = {
  render: () => {
    const currentYear = new Date().getFullYear();

    return `
    <footer class="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 font-bengali">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Trust Badges Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800 text-center sm:text-left">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">১০০% অরিজিনাল পণ্য</h4>
              <p class="text-xs text-slate-500">গ্যারান্টিযুক্ত সেরা কোয়ালিটি</p>
            </div>
          </div>

          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <i data-lucide="truck" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">দ্রুত ডেলিভারি</h4>
              <p class="text-xs text-slate-500">৳২,০০০+ অর্ডারে সম্পূর্ণ ফ্রি</p>
            </div>
          </div>

          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <i data-lucide="wallet" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">৫% অনলাইন ছাড়</h4>
              <p class="text-xs text-slate-500">বিকাশ, নগদ, রকেট ও ব্যাংকে</p>
            </div>
          </div>

          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <i data-lucide="headphones" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">হোয়াটসঅ্যাপ সাপোর্ট</h4>
              <p class="text-xs text-slate-500">01581703822 (প্রতিদিন)</p>
            </div>
          </div>
        </div>

        <!-- 4-Column Main Information Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          
          <!-- Col 1: Brand & Contact Info -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center overflow-hidden border border-slate-700 shadow-md">
                <img 
                  src="https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg" 
                  alt="Dream Cart BD" 
                  class="w-full h-full object-contain rounded-xl"
                  onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10';"
                />
              </div>
              <div>
                <span class="text-xl font-black text-white tracking-tight">Dream Cart <span class="text-brand-400">BD</span></span>
                <p class="text-[11px] text-emerald-400 font-semibold">Smart Digital Commerce</p>
              </div>
            </div>

            <div class="text-xs text-slate-300 space-y-2 border-t border-slate-800/80 pt-3">
              <p class="flex items-start gap-2">
                <span class="text-emerald-400 shrink-0">👑</span>
                <span><strong>স্বত্বাধিকারী:</strong> জয়নাল আবেদীন ও মো: সাইফুল ইসলাম</span>
              </p>
              <p class="flex items-start gap-2">
                <span class="text-emerald-400 shrink-0">📍</span>
                <span><strong>ঠিকানা:</strong> চৌধুরী প্লাজা, নিচতলা, রুম #০৩, পদুয়ার বাজার বিশ্বরোড, সদর দক্ষিণ, কুমিল্লা-৩৫০০।</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-emerald-400 shrink-0">📞</span>
                <span><strong>হটলাইন ১:</strong> <a href="tel:01581703822" class="hover:text-emerald-400 font-mono">01581703822</a> (<a href="https://wa.me/8801581703822" target="_blank" class="text-emerald-400 underline font-semibold">WhatsApp</a>)</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-emerald-400 shrink-0">📞</span>
                <span><strong>হটলাইন ২:</strong> <a href="tel:01818273838" class="hover:text-emerald-400 font-mono">01818273838</a> (<a href="https://wa.me/8801818273838" target="_blank" class="text-emerald-400 underline font-semibold">WhatsApp</a>)</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-emerald-400 shrink-0">⏰</span>
                <span><strong>অফিস সময়:</strong> প্রতিদিন সকাল ৮:০০ - রাত ১০:০০</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-emerald-400 shrink-0">🚚</span>
                <span><strong>ডেলিভারি এরিয়া:</strong> সারা বাংলাদেশ (Whole BD)</span>
              </p>
            </div>
          </div>

          <!-- Col 2: Quick Links & Policies -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">কুইক লিঙ্কস ও পলিসি</h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li><a href="/" class="hover:text-white transition-colors">হোম পেজ</a></li>
              <li><a href="/products" class="hover:text-white transition-colors">সমস্ত প্রোডাক্টসমূহ</a></li>
              <li><a href="/offers" class="hover:text-amber-300 text-amber-400 font-semibold transition-colors">স্পেশাল অফার ও নোটিশ</a></li>
              <li><a href="/contact" class="hover:text-white transition-colors">দোকানের অবস্থান ও যোগাযোগ</a></li>
              <li><a href="/track-order" class="hover:text-white transition-colors">অর্ডার ট্র্যাকিং</a></li>
              <li><a href="/partner/seller" class="hover:text-white transition-colors">সেলার পোর্টাল</a></li>
              <li><a href="/partner/reseller" class="hover:text-white transition-colors">রিসেলার হাব</a></li>
              <li><a href="/partner/wholesale" class="hover:text-white transition-colors">হোলসেল বিটুবি</a></li>
            </ul>
          </div>

          <!-- Col 3: Delivery Zones & Offers -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">ডেলিভারি চার্জ তালিকা</h4>
            <div class="space-y-2 text-xs text-slate-300 mb-4">
              <div class="flex justify-between items-center py-1 border-b border-slate-800">
                <span>In Cumilla (কুমিল্লা সদর):</span>
                <span class="font-bold text-emerald-400 font-mono">৳70</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-800">
                <span>In Dhaka (ঢাকার ভেতরে):</span>
                <span class="font-bold text-emerald-400 font-mono">৳90</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Out of Dhaka (ঢাকার বাইরে):</span>
                <span class="font-bold text-emerald-400 font-mono">৳120</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Office Pickup (পদুয়ার বাজার):</span>
                <span class="font-bold text-emerald-400">৳0 (Free)</span>
              </div>
            </div>

            <div class="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 text-xs text-emerald-300 space-y-1">
              <p class="font-bold">🎉 বিশেষ ফ্রি ডেলিভারি অফার:</p>
              <p class="leading-relaxed">২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</p>
            </div>
            <div class="mt-2 p-2.5 bg-amber-950/40 rounded-xl border border-amber-700/50 text-[11px] text-amber-200">
              ⚡ অনলাইনে পেমেন্ট করলে ৫% তাৎক্ষণিক ডিসকাউন্ট!
            </div>
          </div>

          <!-- Col 4: Payment Accounts & Bank Info -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-pink-500 pl-2">পেমেন্ট মেথড ও অ্যাকাউন্ট</h4>
            
            <div class="space-y-2 text-xs text-slate-300">
              <div class="bg-slate-900 p-2 rounded-xl border border-slate-800">
                <div class="text-pink-400 font-bold flex justify-between">
                  <span>bKash Merchant</span>
                  <span class="font-mono">01581703822</span>
                </div>
                <a href="https://shop.bkash.com/j-a-sagor-computer01581703822/paymentlink" target="_blank" class="text-[11px] text-pink-300 hover:underline block mt-0.5">
                  অনলাইন পেমেন্ট গেটওয়ে লিংক →
                </a>
              </div>

              <div class="bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <div class="text-pink-300 font-bold">bKash Personal</div>
                  <div class="text-[11px] text-slate-500">Send Money</div>
                </div>
                <div class="font-mono text-pink-300 font-bold">01879653143</div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <div class="text-orange-400 font-bold text-[11px]">Nagad Personal</div>
                  <div class="font-mono text-[11px] text-slate-300">01879653143</div>
                </div>
                <div class="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <div class="text-purple-400 font-bold text-[11px]">Rocket Personal</div>
                  <div class="font-mono text-[11px] text-slate-300">01581703822</div>
                </div>
              </div>

              <div class="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-0.5">
                <div class="text-emerald-400 font-bold">Bank Account (Islami Bank PLC):</div>
                <div>A/C Name: <strong>Jainal Abedin</strong></div>
                <div class="font-mono">A/C: <strong class="text-emerald-300">20508070200030208</strong></div>
                <div class="text-slate-400 text-[10px]">Maheshkhali Sub branch | Routing: 125260525 | IBBLBDDH</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Developer Credentials & Attribution Card -->
        <div class="mt-8 pt-8 border-t border-slate-800/80">
          <div class="bg-slate-900/80 rounded-3xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4 text-center sm:text-left">
              <img 
                src="https://scontent.fdac24-5.fna.fbcdn.net/v/t39.99422-6/748763443_1355179329312781_3762544494183960829_n.png?stp=dst-jpg_tt6&cstp=mx876x1414&ctp=s876x1414&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEgpskzgAVWN3ZiohXZA-RhiddumrjTx6WJ126auNPHpRbk_pIDiYLXfo5UR9FYrkKKGwNHxgicb8fdqAfCdAzm&_nc_ohc=ulolVsVxolUQ7kNvwFbbn_s&_nc_oc=Adqwy7DrnjEKjOAfZPttbAGnlBGmXslovULfm4dCZditFerwrSiULyvnQBwCwT-ctOY&_nc_zt=14&_nc_ht=scontent.fdac24-5.fna&_nc_gid=QjQg-WZiaHQGDcl9YGAVCA&_nc_ss=7b2a8&oh=00_AQOthzROIPmAhM-IMyLs5b5IxRzmoCsj5_Ucs02h26YSdw&oe=6AC34270" 
                alt="Jainal Abedin" 
                class="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0 mx-auto sm:mx-0"
                onerror="this.style.display='none'"
              />
              <div>
                <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">সিস্টেম আর্কিটেক্ট ও লিড ডেভেলপার</div>
                <div class="text-sm font-bold text-white flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <span>জয়নাল আবেদীন (Jainal Abedin)</span>
                  <span class="text-xs text-emerald-400 font-semibold">— CEO, Dream Career IT BD</span>
                </div>
                <div class="text-xs text-slate-400 mt-1 flex flex-wrap gap-4 justify-center sm:justify-start">
                  <a href="https://dcitbd.github.io/Jainal-Abedin/" target="_blank" class="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                    <i data-lucide="globe" class="w-3.5 h-3.5"></i> ডেভেলপার পোর্টফোলিও
                  </a>
                  <span>•</span>
                  <a href="https://dcitbd.github.io/dcitbd/" target="_blank" class="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                    <i data-lucide="external-link" class="w-3.5 h-3.5"></i> ড্রিম ক্যারিয়ার আইটি বিডি
                  </a>
                </div>
              </div>
            </div>

            <div class="text-xs text-slate-400 text-center sm:text-right shrink-0">
              <div class="font-semibold text-white">Dream Cart BD Platform v2.5.0</div>
              <div class="text-[11px] text-slate-500">Connected to Google Workspace Engine</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 mt-6">
            <p>© ${currentYear} Dream Cart BD. সর্বস্বত্ব সংরক্ষিত। চৌধুরী প্লাজা, পদুয়ার বাজার বিশ্বরোড, কুমিল্লা-৩৫০০।</p>
            <div class="flex gap-4">
              <a href="/privacy-policy" class="hover:text-slate-400">প্রাইভেসি পলিসি</a>
              <a href="/terms" class="hover:text-slate-400">ব্যবহারের শর্তাবলী</a>
              <a href="/contact" class="hover:text-slate-400">যোগাযোগ</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
    `;
  }
};

if (typeof window !== "undefined") {
  window.Footer = Footer;
}

export default Footer;
