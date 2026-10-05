/**
 * ============================================================================
 * DREAM CART BD — REACTIVE GLOBAL STORE & STATE MANAGER (store.js)
 * Delivery Zones: Cumilla ৳70, Dhaka ৳90, Outside ৳120, Pickup ৳0
 * Free Shipping Threshold: ৳2,000
 * Online Payment Discount: 5% (bKash, Nagad, Rocket, Bank)
 * ============================================================================
 */

import { Toast } from "../components/Toast.js";

const getStorageItem = (key, fallback = null) => {
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
};

const setStorageItem = (key, value) => {
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    try {
      localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch (e) {}
  }
};

const removeStorageItem = (key) => {
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
};

class GlobalStore {
  constructor() {
    this.listeners = new Map();

    const savedUser = getStorageItem("dcbd_user");
    const savedCart = getStorageItem("dcbd_cart");
    const savedTheme = getStorageItem("dcbd_theme", "light");
    const savedZone = getStorageItem("dcbd_delivery_zone", "Dhaka");
    const savedPayment = getStorageItem("dcbd_payment_method", "COD");

    let parsedUser = null;
    try {
      parsedUser = savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      parsedUser = null;
    }

    let parsedCart = { 
      items: [], 
      subtotal: 0, 
      discount: 0, 
      onlineDiscount: 0,
      couponDiscount: 0,
      shipping: 90, 
      deliveryZone: savedZone,
      paymentMethod: savedPayment,
      total: 0 
    };

    try {
      if (savedCart) {
        parsedCart = { ...parsedCart, ...JSON.parse(savedCart) };
      }
    } catch (e) {}

    this.state = {
      user: parsedUser,
      token: getStorageItem("dcbd_token"),
      cart: parsedCart,
      theme: savedTheme,
      currency: "৳",
      isCartDrawerOpen: false,
      isSidebarOpen: false
    };

    this.applyTheme(this.state.theme);
    this.recalculateCart();
  }

  // ==================== EVENT BUS ====================
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const callbacks = this.listeners.get(event);
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
    }
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    }
  }

  emit(event, data = {}) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in event listener for ${event}:`, err);
        }
      });
    }
  }

  // ==================== CART ACTIONS ====================
  addToCart(product, quantity = 1, selectedVariant = null) {
    if (!product) return;
    const cart = this.state.cart;
    const cartItemId = selectedVariant ? `${product.product_id}_${selectedVariant.variant_id}` : product.product_id;
    const existingIndex = cart.items.findIndex(item => item.cartItemId === cartItemId);

    const unitPrice = selectedVariant 
      ? Number(selectedVariant.selling_price) 
      : Number(product.selling_price || product.regular_price || 0);

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        cartItemId: cartItemId,
        productId: product.product_id,
        variantId: selectedVariant ? selectedVariant.variant_id : null,
        name: product.product_name || product.name || "পণ্য",
        variantName: selectedVariant ? selectedVariant.variant_name : null,
        image: product.thumbnail || product.image || (product.images && product.images[0]?.image_url) || "",
        unitPrice: unitPrice,
        quantity: Number(quantity)
      });
    }

    this.recalculateCart();
    this.showToast(`${product.product_name || product.name || "পণ্য"} কার্টে যুক্ত হয়েছে!`, "success");
    this.emit("cart_updated", this.state.cart);
  }

  addToCartById(productId, quantity = 1) {
    if (typeof window !== "undefined" && window._homeProducts) {
      const prod = window._homeProducts.find(p => p.product_id === productId);
      if (prod) {
        this.addToCart(prod, quantity);
        return;
      }
    }
    this.addToCart({ product_id: productId, product_name: "পণ্য", selling_price: 1000 }, quantity);
  }

  removeFromCart(cartItemId) {
    this.state.cart.items = this.state.cart.items.filter(item => item.cartItemId !== cartItemId);
    this.recalculateCart();
    this.showToast("পণ্যটি কার্ট থেকে মুছে ফেলা হয়েছে", "info");
    this.emit("cart_updated", this.state.cart);
  }

  updateCartQty(cartItemId, newQty) {
    const item = this.state.cart.items.find(i => i.cartItemId === cartItemId);
    if (item) {
      item.quantity = Math.max(1, Number(newQty));
      this.recalculateCart();
      this.emit("cart_updated", this.state.cart);
    }
  }

  clearCart() {
    this.state.cart.items = [];
    this.recalculateCart();
    this.emit("cart_updated", this.state.cart);
  }

  setDeliveryZone(zone) {
    this.state.cart.deliveryZone = zone;
    setStorageItem("dcbd_delivery_zone", zone);
    this.recalculateCart();
    this.emit("cart_updated", this.state.cart);
  }

  setPaymentMethod(method) {
    this.state.cart.paymentMethod = method;
    setStorageItem("dcbd_payment_method", method);
    this.recalculateCart();
    this.emit("cart_updated", this.state.cart);
  }

  // Delivery calculation rules
  getDeliveryCharge(zone = this.state.cart.deliveryZone, subtotal = this.state.cart.subtotal) {
    if (zone === "Pickup" || zone === "pickup") return 0;
    if (subtotal >= 2000) return 0; // ২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ ফ্রি!
    if (zone === "Cumilla" || zone === "cumilla") return 70;
    if (zone === "Dhaka" || zone === "dhaka") return 90;
    if (zone === "Outside" || zone === "outside") return 120;
    return 90;
  }

  isOnlinePayment(method = this.state.cart.paymentMethod) {
    const onlineMethods = ["BKASH_MERCHANT", "BKASH_PERSONAL", "NAGAD_PERSONAL", "ROCKET_PERSONAL", "BANK"];
    return onlineMethods.includes((method || "").toUpperCase());
  }

  getOnlineDiscount(subtotal = this.state.cart.subtotal, method = this.state.cart.paymentMethod) {
    if (this.isOnlinePayment(method)) {
      return Math.round(subtotal * 0.05); // অনলাইনে পেমেন্ট করলে ৫% ডিসকাউন্ট
    }
    return 0;
  }

  recalculateCart() {
    let subtotal = 0;
    this.state.cart.items.forEach(item => {
      subtotal += (Number(item.unitPrice || 0) * Number(item.quantity || 1));
    });

    const zone = this.state.cart.deliveryZone || "Dhaka";
    const payment = this.state.cart.paymentMethod || "COD";
    const shipping = this.getDeliveryCharge(zone, subtotal);
    const onlineDiscount = this.getOnlineDiscount(subtotal, payment);
    const couponDiscount = Number(this.state.cart.couponDiscount || 0);
    const totalDiscount = onlineDiscount + couponDiscount;

    this.state.cart.subtotal = subtotal;
    this.state.cart.shipping = shipping;
    this.state.cart.onlineDiscount = onlineDiscount;
    this.state.cart.discount = totalDiscount;
    this.state.cart.total = Math.max(0, subtotal + shipping - totalDiscount);

    this.saveCart();
  }

  saveCart() {
    setStorageItem("dcbd_cart", this.state.cart);
  }

  // ==================== AUTH ACTIONS ====================
  setAuth(user, token) {
    this.state.user = user;
    this.state.token = token;
    setStorageItem("dcbd_user", user);
    setStorageItem("dcbd_token", token || "");
    this.emit("auth_changed", this.state.user);
  }

  logout() {
    this.state.user = null;
    this.state.token = null;
    removeStorageItem("dcbd_user");
    removeStorageItem("dcbd_token");
    this.emit("auth_changed", null);
    this.showToast("সফলভাবে লগআউট হয়েছেন।", "info");
  }

  isAuthenticated() {
    return !!this.state.token && !!this.state.user;
  }

  hasRole(allowedRoles = []) {
    if (!this.isAuthenticated() || !this.state.user) return false;
    return allowedRoles.includes(this.state.user.role);
  }

  // ==================== THEME CONTROLLER ====================
  toggleTheme() {
    const nextTheme = this.state.theme === "dark" ? "light" : "dark";
    this.setTheme(nextTheme);
  }

  setTheme(theme) {
    this.state.theme = theme;
    setStorageItem("dcbd_theme", theme);
    this.applyTheme(theme);
    this.emit("theme_changed", theme);
  }

  applyTheme(theme) {
    if (typeof document !== "undefined" && document.documentElement) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  // ==================== TOAST NOTIFICATIONS ====================
  showToast(message, type = "success", duration = 3500) {
    if (typeof window !== "undefined" && window.Toast && typeof window.Toast.show === "function") {
      window.Toast.show(message, type, duration);
    } else if (Toast && typeof Toast.show === "function") {
      Toast.show(message, type, duration);
    } else {
      console.log(`[Toast ${type}]:`, message);
    }
  }
}

export const store = new GlobalStore();

if (typeof window !== "undefined") {
  window.store = store;
}

export default store;
