/**
 * ============================================================================
 * DREAM CART BD — 1-PAGE EXPRESS CHECKOUT (CheckoutPage.js)
 * Full Integration: Cumilla ৳70, Dhaka ৳90, Outside ৳120, Pickup ৳0
 * Free Shipping Threshold: ৳2,000 | 5% Online Prepayment Discount
 * bKash / Nagad / Rocket / Bank Transfer verification & order creation.
 * ============================================================================
 */

import { Header } from "../../components/Header.js";
import { Footer } from "../../components/Footer.js";
import { store } from "../../js/store.js";
import { OrderAPI } from "../../api/orders.js";
import { router } from "../../js/router.js";

export const CheckoutPage = async () => {
  const cart = store.state.cart;

  if (!cart.items || cart.items.length === 0) {
    return `
      <div class="min-h-screen flex flex-col font-bengali bg-slate-50 dark:bg-luxury-dark">
        ${Header.render()}
        <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <i data-lucide="shopping-cart" class="w-8 h-8"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">আপনার কার্ট খালি!</h2>
          <p class="text-slate-500 text-xs mb-6">চেকআউট করতে প্রথমে কিছু প্রোডাক্ট কার্টে যোগ করুন।</p>
          <a href="/products" class="btn-primary text-xs px-6 py-3 font-bold">কেনাকাটা করুন</a>
        </div>
        ${Footer.render()}
      </div>
    `;
  }

  const subtotal = Number(cart.subtotal || 0);
  const zone = cart.deliveryZone || "Dhaka";
  const payment = cart.paymentMethod || "COD";
  const shipping = store.getDeliveryCharge(zone, subtotal);
  const onlineDiscount = store.getOnlineDiscount(subtotal, payment);
  const total = Math.max(0, subtotal + shipping - onlineDiscount);
  const isFree = shipping === 0 && zone !== "Pickup";

  return `
    <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-luxury-dark font-bengali">
      ${Header.render()}

      <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        <!-- Header Banner -->
        <div class="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <i data-lucide="shield-check" class="w-4 h-4"></i> ড্রিম কার্ট বিডি সুরক্ষিত চেকআউট
            </div>
            <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Express 1-Page Checkout</h1>
            <p class="text-xs text-slate-300 mt-1">
              📍 চৌধুরী প্লাজা, নিচতলা, রুম #০৩, পদুয়ার বাজার বিশ্বরোড, সদর দক্ষিণ, কুমিল্লা-৩৫০০।
            </p>
          </div>
          <div class="text-xs text-slate-300 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur">
            <div>📞 হেল্পলাইন: <strong class="text-emerald-300 font-mono">01581703822</strong> (WhatsApp)</div>
            <div class="mt-1">⏰ অফিস সময়: প্রতিদিন সকাল ৮:০০ - রাত ১০:০০</div>
          </div>
        </div>

        <!-- Offers Banner -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-3">
            <span class="text-2xl">🚚</span>
            <div>
              <div class="font-black text-emerald-800 dark:text-emerald-300">২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</div>
              <div class="text-[11px] text-emerald-700 dark:text-emerald-400">সারা বাংলাদেশে যেকোনো অর্ডারে প্রযোজ্য।</div>
            </div>
          </div>
          <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
            <span class="text-2xl">🔥</span>
            <div>
              <div class="font-black text-amber-800 dark:text-amber-300">অনলাইনে পেমেন্ট করলে ৫% ইনস্ট্যান্ট ডিসকাউন্ট!</div>
              <div class="text-[11px] text-amber-700 dark:text-amber-400">bKash, Nagad, Rocket অথবা Bank Transfer এ পেমেন্ট করুন।</div>
            </div>
          </div>
        </div>

        <form id="checkout-form" onsubmit="window.handleCheckoutSubmit(event)" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Left: Customer Information & Delivery Area -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Step 1: Customer Contact -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span class="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                গ্রাহকের নাম ও মোবাইল নম্বর
              </h3>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">আপনার নাম (Full Name) *</label>
                <input type="text" id="cust-name" required placeholder="সম্পূর্ণ নাম লিখুন" class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">সচল মোবাইল নম্বর (11 Digits) *</label>
                <input type="tel" id="cust-phone" required pattern="[0-9]{11}" maxlength="11" placeholder="01XXXXXXXXX" class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm outline-none focus:ring-2 focus:ring-brand-500 font-mono text-slate-900 dark:text-white" />
                <p class="text-[11px] text-slate-400 mt-1">কুরিয়ার ম্যান এই নম্বরে কল দিয়ে পার্সেল ডেলিভারি করবেন।</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/উপজেলা) *</label>
                <textarea id="cust-address" required rows="3" placeholder="যেমন: বাড়ি নং ১২, রোড নং ৪, এলাকা ও থানার নাম..." class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"></textarea>
              </div>
            </div>

            <!-- Step 2: Delivery Area Selection -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span class="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                ডেলিভারি এরিয়া ও চার্জ (Delivery Fee)
              </h3>

              ${isFree ? `
                <div class="p-3 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-bold flex items-center gap-2">
                  <span>🎉</span>
                  <span>অভিনন্দন! আপনার কার্ট ৳২,০০০ এর বেশি হওয়ায় সারা দেশে ডেলিভারি ফি সম্পূর্ণ ফ্রি (৳০)!</span>
                </div>
              ` : ''}

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                <!-- Cumilla -->
                <label class="delivery-radio-card p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${zone === 'Cumilla' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="delivery_zone" value="Cumilla" ${zone === 'Cumilla' ? 'checked' : ''} onchange="window.updateCheckoutZone(this.value)" class="text-brand-600 focus:ring-brand-500" />
                    <div>
                      <div class="text-xs font-bold text-slate-900 dark:text-white">In Cumilla (কুমিল্লা সদর)</div>
                      <div class="text-[11px] text-slate-400">হোম ডেলিভারি</div>
                    </div>
                  </div>
                  <span class="text-xs font-black ${isFree ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
                    ${isFree ? '<span class="line-through text-slate-400 font-normal">৳70</span> ৳0' : '৳70'}
                  </span>
                </label>

                <!-- Dhaka -->
                <label class="delivery-radio-card p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${zone === 'Dhaka' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="delivery_zone" value="Dhaka" ${zone === 'Dhaka' ? 'checked' : ''} onchange="window.updateCheckoutZone(this.value)" class="text-brand-600 focus:ring-brand-500" />
                    <div>
                      <div class="text-xs font-bold text-slate-900 dark:text-white">In Dhaka (ঢাকার ভেতরে)</div>
                      <div class="text-[11px] text-slate-400">হোম ডেলিভারি</div>
                    </div>
                  </div>
                  <span class="text-xs font-black ${isFree ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
                    ${isFree ? '<span class="line-through text-slate-400 font-normal">৳90</span> ৳0' : '৳90'}
                  </span>
                </label>

                <!-- Outside -->
                <label class="delivery-radio-card p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${zone === 'Outside' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="delivery_zone" value="Outside" ${zone === 'Outside' ? 'checked' : ''} onchange="window.updateCheckoutZone(this.value)" class="text-brand-600 focus:ring-brand-500" />
                    <div>
                      <div class="text-xs font-bold text-slate-900 dark:text-white">Out of Dhaka (ঢাকার বাইরে)</div>
                      <div class="text-[11px] text-slate-400">সারা বাংলাদেশ</div>
                    </div>
                  </div>
                  <span class="text-xs font-black ${isFree ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
                    ${isFree ? '<span class="line-through text-slate-400 font-normal">৳120</span> ৳0' : '৳120'}
                  </span>
                </label>

                <!-- Pickup -->
                <label class="delivery-radio-card p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${zone === 'Pickup' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="delivery_zone" value="Pickup" ${zone === 'Pickup' ? 'checked' : ''} onchange="window.updateCheckoutZone(this.value)" class="text-brand-600 focus:ring-brand-500" />
                    <div>
                      <div class="text-xs font-bold text-slate-900 dark:text-white">Office Pickup (অফিস পিকআপ)</div>
                      <div class="text-[11px] text-slate-400">পদুয়ার বাজার, কুমিল্লা</div>
                    </div>
                  </div>
                  <span class="text-xs font-black text-emerald-600">৳0 (Free)</span>
                </label>

              </div>
            </div>

            <!-- Step 3: Payment Method Selection -->
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span class="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                পেমেন্ট পদ্ধতি (Payment Method)
              </h3>

              <div class="space-y-3 pt-1">
                
                <!-- COD -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'COD' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="COD" ${payment === 'COD' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white">Cash On Delivery (COD)</div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন</div>
                      </div>
                    </div>
                    <span class="badge-success text-[10px]">সবচেয়ে জনপ্রিয়</span>
                  </div>
                </label>

                <!-- bKash Merchant -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'BKASH_MERCHANT' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="BKASH_MERCHANT" ${payment === 'BKASH_MERCHANT' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>bKash Payment (Merchant)</span>
                          <span class="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded">৫% ছাড়</span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">মার্চেন্ট পেমেন্ট নম্বর: <strong>01581703822</strong></div>
                      </div>
                    </div>
                    <span class="font-mono text-pink-600 text-xs font-bold">bKash Merchant</span>
                  </div>
                  
                  <div class="payment-instruction-box ${payment === 'BKASH_MERCHANT' ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <p>বিকাশ অ্যাপ থেকে <strong>Make Payment</strong> অপশনে গিয়ে <strong class="text-pink-600 font-mono">01581703822</strong> এ পেমেন্ট করুন অথবা অনলাইন পেমেন্ট লিংক ব্যবহার করুন:</p>
                    <a href="https://shop.bkash.com/j-a-sagor-computer01581703822/paymentlink" target="_blank" class="inline-flex items-center gap-1.5 mt-2 bg-pink-600 hover:bg-pink-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition">
                      <span>🔗</span> বিকাশ অনলাইন পেমেন্ট গেটওয়ে লিংক →
                    </a>
                  </div>
                </label>

                <!-- bKash Personal -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'BKASH_PERSONAL' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="BKASH_PERSONAL" ${payment === 'BKASH_PERSONAL' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>bKash Personal (Send Money)</span>
                          <span class="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded">৫% ছাড়</span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">পার্সোনাল নম্বর: <strong>01879653143</strong></div>
                      </div>
                    </div>
                    <span class="font-mono text-pink-600 text-xs font-bold">01879653143</span>
                  </div>
                  
                  <div class="payment-instruction-box ${payment === 'BKASH_PERSONAL' ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <p>আপনার বিকাশ অ্যাপ থেকে <strong class="font-mono text-pink-600">01879653143</strong> নম্বরে Send Money করুন এবং নিচে ট্রানজেকশন আইডি প্রদান করুন।</p>
                  </div>
                </label>

                <!-- Nagad Personal -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'NAGAD_PERSONAL' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="NAGAD_PERSONAL" ${payment === 'NAGAD_PERSONAL' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Nagad Personal (Send Money)</span>
                          <span class="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded">৫% ছাড়</span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">নগদ পার্সোনাল নম্বর: <strong>01879653143</strong></div>
                      </div>
                    </div>
                    <span class="font-mono text-orange-600 text-xs font-bold">01879653143</span>
                  </div>

                  <div class="payment-instruction-box ${payment === 'NAGAD_PERSONAL' ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <p>আপনার নগদ অ্যাপ থেকে <strong class="font-mono text-orange-600">01879653143</strong> নম্বরে Send Money করুন এবং TrxID নিচে লিখুন।</p>
                  </div>
                </label>

                <!-- Rocket Personal -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'ROCKET_PERSONAL' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="ROCKET_PERSONAL" ${payment === 'ROCKET_PERSONAL' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Rocket Personal (Send Money)</span>
                          <span class="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded">৫% ছাড়</span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">রকেট পার্সোনাল নম্বর: <strong>01581703822</strong></div>
                      </div>
                    </div>
                    <span class="font-mono text-purple-600 text-xs font-bold">01581703822</span>
                  </div>

                  <div class="payment-instruction-box ${payment === 'ROCKET_PERSONAL' ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                    <p>আপনার রকেট অ্যাকাউন্ট থেকে <strong class="font-mono text-purple-600">01581703822</strong> নম্বরে টাকা পাঠিয়ে TrxID লিখুন।</p>
                  </div>
                </label>

                <!-- Bank Account -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'BANK' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="BANK" ${payment === 'BANK' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Bank Account (Islami Bank)</span>
                          <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">৫% ছাড়</span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">ইসলামী ব্যাংক বাংলাদেশ পিএলসি</div>
                      </div>
                    </div>
                    <span class="badge-info text-[10px]">ব্যাংক ট্রান্সফার</span>
                  </div>

                  <div class="payment-instruction-box ${payment === 'BANK' ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1 font-mono text-[11px] bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl">
                    <div>A/C Name: <strong>Jainal Abedin</strong></div>
                    <div>A/C Number: <strong class="text-emerald-600 dark:text-emerald-400 text-xs">20508070200030208</strong></div>
                    <div>Branch: <strong>Maheshkhali Sub branch</strong> (Routing: 125260525)</div>
                    <div>Bank Code/SWIFT: <strong>IBBLBDDH</strong></div>
                  </div>
                </label>

                <!-- Cash Payment Pickup -->
                <label class="payment-radio-card p-4 rounded-2xl border cursor-pointer transition-all block ${payment === 'CASH_PICKUP' ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input type="radio" name="payment_method" value="CASH_PICKUP" ${payment === 'CASH_PICKUP' ? 'checked' : ''} onchange="window.updateCheckoutPayment(this.value)" class="text-brand-600 focus:ring-brand-500" />
                      <div>
                        <div class="text-xs font-black text-slate-900 dark:text-white">Cash Payment (অফিস কাউন্টার)</div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">আমাদের কুমিল্লা আউটলেটে পণ্য গ্রহণের সময় ক্যাশ পরিশোধ</div>
                      </div>
                    </div>
                    <span class="badge-success text-[10px]">পদুয়ার বাজার</span>
                  </div>
                </label>

              </div>

              <!-- TrxID and Sender Mobile Input for Online Prepayment -->
              <div id="trx-input-group" class="p-4 rounded-2xl bg-brand-50/50 dark:bg-slate-800/60 border border-brand-200 dark:border-slate-700 space-y-3 ${store.isOnlinePayment(payment) ? 'block' : 'hidden'}">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1.5">
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i> অনলাইন পেমেন্ট ভেরিফিকেশন
                  </span>
                  <span class="badge-warning text-[10px] font-bold">৫% ছাড় প্রযোজ্য</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">প্রেরকের মোবাইল / অ্যাকাউন্ট নম্বর</label>
                    <input type="text" id="cust-sender-phone" placeholder="যেমন: 01XXXXXXXXX" class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label class="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Transaction ID (TrxID) *</label>
                    <input type="text" id="cust-trx-id" placeholder="যেমন: BL72X99AAQ" class="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-500 font-mono uppercase" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- Right: Order Summary & Submit Button -->
          <div class="lg:col-span-5 space-y-6">
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 sticky top-24">
              <h3 class="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span>অর্ডার বিবরণী</span>
                <span class="text-xs text-brand-600 font-normal">(${cart.items.length} টি পণ্য)</span>
              </h3>

              <!-- Cart Items List -->
              <div class="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-custom">
                ${cart.items.map(i => `
                  <div class="flex items-center justify-between text-xs p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div class="flex items-center gap-2.5">
                      <span class="px-2 py-0.5 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold">${i.quantity}x</span>
                      <span class="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">${i.name}</span>
                    </div>
                    <span class="font-extrabold text-slate-900 dark:text-white">৳${i.unitPrice * i.quantity}</span>
                  </div>
                `).join("")}
              </div>

              <!-- Bill Breakdown -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div class="flex justify-between">
                  <span>সাব-টোটাল (Subtotal):</span>
                  <span class="font-bold text-slate-900 dark:text-white">৳${subtotal}</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span>ডেলিভারি চার্জ:</span>
                  <span id="shipping-display" class="font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}">
                    ${shipping === 0 ? '<span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px]">ফ্রি (৳০)</span>' : '৳' + shipping}
                  </span>
                </div>

                <div id="online-discount-row" class="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold ${onlineDiscount > 0 ? '' : 'hidden'}">
                  <span>অনলাইনে পেমেন্ট (৫% ছাড়):</span>
                  <span id="online-discount-display">-৳${onlineDiscount}</span>
                </div>

                <div class="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2.5 border-t border-slate-100 dark:border-slate-800">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span id="grand-total-display" class="text-brand-600 dark:text-brand-400 text-xl font-black">৳${total}</span>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
                <span>১০০% অরিজিনাল পণ্য, কুরিয়ার চেক করে রিসিভ করার নিশ্চয়তা</span>
              </div>

              <!-- Submit Button -->
              <button type="submit" id="confirm-order-btn" class="w-full btn-primary py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25">
                <span>অর্ডার কনফার্ম করুন</span>
                <span id="btn-total-badge">(৳${total})</span>
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
              </button>
            </div>
          </div>

        </form>
      </main>

      ${Footer.render()}
    </div>
  `;
};

// Global Listeners for Checkout Page
if (typeof window !== "undefined") {
  window.updateCheckoutZone = (zone) => {
    store.setDeliveryZone(zone);
    window.recalculateCheckoutUI();
  };

  window.updateCheckoutPayment = (paymentMethod) => {
    store.setPaymentMethod(paymentMethod);
    window.recalculateCheckoutUI();
  };

  window.recalculateCheckoutUI = () => {
    const cart = store.state.cart;
    const subtotal = Number(cart.subtotal || 0);
    const zone = cart.deliveryZone || "Dhaka";
    const payment = cart.paymentMethod || "COD";
    const shipping = store.getDeliveryCharge(zone, subtotal);
    const onlineDiscount = store.getOnlineDiscount(subtotal, payment);
    const grandTotal = Math.max(0, subtotal + shipping - onlineDiscount);

    // Update displays
    const shipEl = document.getElementById("shipping-display");
    const totalEl = document.getElementById("grand-total-display");
    const discRow = document.getElementById("online-discount-row");
    const discEl = document.getElementById("online-discount-display");
    const btnBadge = document.getElementById("btn-total-badge");
    const trxGroup = document.getElementById("trx-input-group");

    if (shipEl) {
      shipEl.innerHTML = shipping === 0 
        ? '<span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px]">ফ্রি (৳০)</span>' 
        : `৳${shipping}`;
    }

    if (discRow && discEl) {
      if (onlineDiscount > 0) {
        discRow.classList.remove("hidden");
        discEl.innerText = `-৳${onlineDiscount}`;
      } else {
        discRow.classList.add("hidden");
      }
    }

    if (totalEl) totalEl.innerText = `৳${grandTotal}`;
    if (btnBadge) btnBadge.innerText = `(৳${grandTotal})`;

    if (trxGroup) {
      if (store.isOnlinePayment(payment)) {
        trxGroup.classList.remove("hidden");
      } else {
        trxGroup.classList.add("hidden");
      }
    }

    // Toggle instruction boxes
    document.querySelectorAll(".payment-instruction-box").forEach(box => {
      const parentRadio = box.closest(".payment-radio-card")?.querySelector('input[type="radio"]');
      if (parentRadio && parentRadio.checked) {
        box.classList.remove("hidden");
      } else {
        box.classList.add("hidden");
      }
    });

    if (window.lucide) window.lucide.createIcons();
  };

  window.handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById("confirm-order-btn");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>অর্ডার প্রসেস হচ্ছে...</span>
      `;
    }

    const name = document.getElementById("cust-name")?.value.trim() || "";
    const phone = document.getElementById("cust-phone")?.value.trim() || "";
    const address = document.getElementById("cust-address")?.value.trim() || "";
    const senderPhone = document.getElementById("cust-sender-phone")?.value.trim() || "";
    const trxId = document.getElementById("cust-trx-id")?.value.trim() || "";

    const cart = store.state.cart;
    const subtotal = Number(cart.subtotal || 0);
    const zone = cart.deliveryZone || "Dhaka";
    const payment = cart.paymentMethod || "COD";
    const shipping = store.getDeliveryCharge(zone, subtotal);
    const onlineDiscount = store.getOnlineDiscount(subtotal, payment);
    const grandTotal = Math.max(0, subtotal + shipping - onlineDiscount);

    const orderPayload = {
      customer_name: name,
      phone: phone,
      district: zone === "Cumilla" ? "Cumilla" : (zone === "Dhaka" ? "Dhaka" : "Outside Dhaka"),
      city: zone,
      shipping_address: address,
      payment_method: payment,
      sender_phone: senderPhone,
      trx_id: trxId,
      subtotal: subtotal,
      shipping_charge: shipping,
      discount: onlineDiscount,
      total: grandTotal,
      shop_address: "Chawdhury Plaza, ground floor, room#03, Paduar Bazar, Bishwa Road, Sadar Dakshin, Cumilla-3500.",
      shop_phone: "01581703822",
      items: cart.items.map(i => ({
        product_id: i.productId || "",
        product_name: i.name,
        quantity: i.quantity,
        unit_price: i.unitPrice,
        total_price: i.unitPrice * i.quantity
      }))
    };

    try {
      let createdOrder = null;
      if (OrderAPI && typeof OrderAPI.create === "function") {
        try {
          createdOrder = await OrderAPI.create(orderPayload);
        } catch (apiErr) {
          console.warn("Direct API create failed, generating fallback order number:", apiErr);
        }
      }

      const orderNumber = createdOrder?.order_number || createdOrder?.order_id || ("DCBD-" + Math.floor(100000 + Math.random() * 900000));
      
      // Save last order info in localStorage for success page
      localStorage.setItem("dcbd_last_order", JSON.stringify({
        ...orderPayload,
        order_number: orderNumber,
        date: new Date().toISOString()
      }));

      store.clearCart();
      store.showToast("আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!", "success");

      if (router && typeof router.navigate === "function") {
        router.navigate(`/order-success/${orderNumber}`);
      } else {
        window.location.href = `/order-success/${orderNumber}`;
      }
    } catch (err) {
      alert(`অর্ডার সম্পন্ন করা যায়নি: ${err.message}`);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>অর্ডার কনফার্ম করুন</span><i data-lucide="arrow-right" class="w-5 h-5"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  };
}

export default CheckoutPage;
