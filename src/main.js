/**
 * ============================================================================
 * DREAM CART BD — MASTER APPLICATION BOOTSTRAPPER (main.js)
 * Clean Modular Routing, Zero 404s, Auto Event Binding, and Hybrid Navigation
 * ============================================================================
 */

import { store } from "./js/store.js";
import { router } from "./js/router.js";
import { SyncEngine } from "./api/sync.js";

// ==================== STOREFRONT & CUSTOMER PAGES ====================
import { HomePage } from "./pages/storefront/HomePage.js";
import { ProductListPage } from "./pages/storefront/ProductListPage.js";
import { ProductDetailPage } from "./pages/storefront/ProductDetailPage.js";
import { CategoryPage } from "./pages/storefront/CategoryPage.js";
import { CheckoutPage } from "./pages/storefront/CheckoutPage.js";
import { OrderSuccessPage } from "./pages/storefront/OrderSuccessPage.js";
import { TrackOrderPage } from "./pages/storefront/TrackOrderPage.js";
import { ContactPage } from "./pages/storefront/ContactPage.js";
import { OffersPage } from "./pages/storefront/OffersPage.js";
import { 
  PrivacyPolicyPage, 
  TermsPage, 
  RefundPolicyPage, 
  ShippingPolicyPage, 
  FAQPage 
} from "./pages/storefront/PolicyPages.js";

import { CustomerPortal } from "./pages/customer/CustomerPortal.js";

// ==================== PARTNER PORTALS ====================
import SellerPortal from "./pages/partner/SellerPortal.js";
import ResellerPortal from "./pages/partner/ResellerPortal.js";
import WholesalePortal from "./pages/partner/WholesalePortal.js";

// ==================== ADMIN CATALOG & INVENTORY ====================
import ProductList from "./admin/catalog/ProductList.js";
import VariantGenerator from "./admin/catalog/VariantGenerator.js";
import CategoryManager from "./admin/catalog/CategoryManager.js";
import ProductWizard from "./admin/catalog/ProductWizard.js";
import ImageUploader from "./admin/catalog/ImageUploader.js";

import StockLedger from "./admin/inventory/StockLedger.js";
import StockMovements from "./admin/inventory/StockMovements.js";
import SupplierManager from "./admin/inventory/SupplierManager.js";
import PurchaseOrders from "./admin/inventory/PurchaseOrders.js";
import LowStockAlerts from "./admin/inventory/LowStockAlerts.js";

// ==================== ADMIN ORDERS & SYSTEM ====================
import OrderList from "./admin/orders/OrderList.js";
import OrderDetail from "./admin/orders/OrderDetail.js";
import BulkShipment from "./admin/orders/BulkShipment.js";
import CourierHub from "./admin/orders/CourierHub.js";
import ReturnRTO from "./admin/orders/ReturnRTO.js";
import Payments from "./admin/orders/Payments.js";
import BulkExcelTool from "./admin/system/BulkExcelTool.js";
import AuditTrail from "./admin/system/AuditTrail.js";
import Settings from "./admin/system/Settings.js";
import Reports from "./admin/system/Reports.js";

/**
 * সেফ মডিউল র‍্যাপার (ক্র্যাশ প্রতিরোধে)
 */
const wrap = (fn) => async (params) => {
  try {
    if (typeof fn === "function") return await fn(params);
    if (fn && typeof fn.default === "function") return await fn.default(params);
    throw new Error("Render function not found");
  } catch (err) {
    console.error("Render error:", err);
    return `
      <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center font-bengali bg-slate-50 dark:bg-luxury-dark">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md">
          <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">পেজটি লোড হতে সমস্যা হয়েছে</h3>
          <p class="text-xs text-slate-500 mb-4">${err.message || 'অনুগ্রহ করে পুনরায় চেষ্টা করুন।'}</p>
          <a href="/" class="px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl inline-block">হোম পেজে ফিরে যান</a>
        </div>
      </div>
    `;
  }
};

// ==================== REGISTER ALL ROUTES ====================
// Storefront Routes
router.addRoute("/", wrap(HomePage));
router.addRoute("/products", wrap(ProductListPage));
router.addRoute("/product/:id", wrap(ProductDetailPage));
router.addRoute("/categories", wrap(CategoryPage));
router.addRoute("/checkout", wrap(CheckoutPage));
router.addRoute("/order-success/:id", wrap(OrderSuccessPage));
router.addRoute("/track-order", wrap(TrackOrderPage));
router.addRoute("/contact", wrap(ContactPage));
router.addRoute("/offers", wrap(OffersPage));

// Policy & Info Routes
router.addRoute("/privacy-policy", wrap(PrivacyPolicyPage));
router.addRoute("/terms", wrap(TermsPage));
router.addRoute("/refund-policy", wrap(RefundPolicyPage));
router.addRoute("/shipping-policy", wrap(ShippingPolicyPage));
router.addRoute("/faq", wrap(FAQPage));

// Customer & Partner Portals
router.addRoute("/customer/account", wrap(CustomerPortal));
router.addRoute("/partner/seller", wrap(SellerPortal));
router.addRoute("/partner/reseller", wrap(ResellerPortal));
router.addRoute("/partner/wholesale", wrap(WholesalePortal));

// Admin Catalog & Inventory Routes
router.addRoute("/admin/dashboard", wrap(Reports));
router.addRoute("/admin/products", wrap(ProductList));
router.addRoute("/admin/products/create", wrap(ProductWizard));
router.addRoute("/admin/products/edit/:id", wrap(ProductWizard));
router.addRoute("/admin/categories", wrap(CategoryManager));
router.addRoute("/admin/inventory", wrap(StockLedger));
router.addRoute("/admin/inventory/movements", wrap(StockMovements));
router.addRoute("/admin/inventory/low-stock", wrap(LowStockAlerts));
router.addRoute("/admin/suppliers", wrap(SupplierManager));
router.addRoute("/admin/inventory/purchase-orders", wrap(PurchaseOrders));

// Admin Orders & Logistics Routes
router.addRoute("/admin/orders", wrap(OrderList));
router.addRoute("/admin/orders/detail/:id", wrap(OrderDetail));
router.addRoute("/admin/orders/bulk-shipment", wrap(BulkShipment));
router.addRoute("/admin/couriers", wrap(CourierHub));
router.addRoute("/admin/orders/returns", wrap(ReturnRTO));
router.addRoute("/admin/orders/payments", wrap(Payments));

// Admin System Routes
router.addRoute("/admin/system/bulk", wrap(BulkExcelTool));
router.addRoute("/admin/audit", wrap(AuditTrail));
router.addRoute("/admin/settings", wrap(Settings));

// ==================== INITIALIZE APPLICATION ====================
document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (typeof SyncEngine !== "undefined" && SyncEngine.startPolling) {
      SyncEngine.startPolling(60000);
    }
    window.SyncEngine = SyncEngine;
    window.store = store;
    window.router = router;

    // Global Link Click Handler (Smooth SPA transition for all internal links)
    document.body.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external or protocol links
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return;
      }

      // Handle internal relative paths
      if (href.startsWith("/") || href.startsWith("#")) {
        e.preventDefault();
        router.navigate(href);
      }
    });

    if (router && typeof router.handleRoute === "function") {
      await router.handleRoute();
    }
  } catch (err) {
    console.error("[App Init Error]:", err);
  } finally {
    const loader = document.getElementById("global-loader");
    if (loader) {
      loader.classList.add("opacity-0");
      setTimeout(() => loader.remove(), 300);
    } else {
      document.querySelectorAll(".global-loading, #loading-screen").forEach(el => el.remove());
    }
  }
});
