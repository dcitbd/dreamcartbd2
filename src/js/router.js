/**
 * ============================================================================
 * DREAM CART BD — HYBRID SPA ROUTER (router.js)
 * Supports both standard path routing and static GitHub Pages hash routing (#/...)
 * Auto-initializes Header & CartDrawer event listeners on every navigation.
 * ============================================================================
 */

import { Header } from "../components/Header.js";
import { CartDrawer } from "../components/CartDrawer.js";

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", () => this.handleRoute());
      window.addEventListener("hashchange", () => this.handleRoute());
    }
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(targetPath) {
    if (typeof window === "undefined") return;

    // Normalize path
    let cleanPath = targetPath.startsWith("#") ? targetPath.substring(1) : targetPath;
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

    // Use pushState or hash depending on environment
    if (window.location.protocol === "file:" || window.location.hash) {
      window.location.hash = cleanPath;
    } else {
      window.history.pushState({}, "", cleanPath);
    }
    this.handleRoute();
  }

  getCurrentPath() {
    if (typeof window === "undefined") return "/";

    // If hash is present (e.g. #/checkout or #checkout)
    if (window.location.hash && window.location.hash.length > 1) {
      let h = window.location.hash.substring(1);
      if (h.startsWith("/")) return h.split("?")[0];
      return "/" + h.split("?")[0];
    }

    return (window.location.pathname || "/").split("?")[0];
  }

  async handleRoute() {
    const path = this.getCurrentPath() || "/";
    let handler = null;
    let params = {};

    // 1. Exact match
    if (this.routes[path]) {
      handler = this.routes[path];
    } else {
      // 2. Dynamic route matching (e.g. /product/:id or /order-success/:id)
      const matchedRoute = Object.keys(this.routes).find(route => {
        if (!route.includes(":")) return false;
        const routeRegex = new RegExp("^" + route.replace(/:\w+/g, "([^/]+)") + "$");
        return routeRegex.test(path);
      });

      if (matchedRoute) {
        handler = this.routes[matchedRoute];
        const routeSegments = matchedRoute.split("/");
        const pathSegments = path.split("/");
        
        routeSegments.forEach((seg, idx) => {
          if (seg.startsWith(":")) {
            const paramName = seg.substring(1);
            params[paramName] = pathSegments[idx];
          }
        });
      } else if (this.routes["*"]) {
        handler = this.routes["*"];
      } else {
        handler = () => `
          <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center font-bengali bg-slate-50 dark:bg-luxury-dark">
            <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md">
              <h2 class="text-3xl font-black text-brand-600 mb-2">৪০৪</h2>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">পেজটি পাওয়া যায়নি</h3>
              <p class="text-xs text-slate-500 mb-6">আপনি যে লিঙ্কটি খুঁজছেন তা স্থানান্তরিত বা রিমুভ করা হয়েছে।</p>
              <a href="/" class="btn-primary text-xs py-2.5 px-6 inline-block font-bold">হোম পেজে ফিরে যান</a>
            </div>
          </div>
        `;
      }
    }

    const appContainer = document.getElementById("app");
    if (!appContainer) {
      console.error("Root element #app not found in DOM!");
      return;
    }

    try {
      let htmlContent = "";
      if (typeof handler === "function") {
        htmlContent = await handler(params);
      }

      appContainer.innerHTML = htmlContent;

      // Re-initialize Header and CartDrawer events on newly mounted view
      if (Header && typeof Header.initEvents === "function") {
        Header.initEvents();
      }
      if (CartDrawer && typeof CartDrawer.initEvents === "function") {
        CartDrawer.initEvents();
      }

      // Re-render Lucide Icons
      if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons();
      }

      window.scrollTo(0, 0);
    } catch (err) {
      console.error(`[Router Error] Failed to render path '${path}':`, err);
      appContainer.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center font-bengali bg-slate-50 dark:bg-luxury-dark">
          <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md">
            <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-white">রেন্ডারিং ত্রুটি</h3>
            <p class="text-xs text-slate-500 mb-4">${err.message || 'একটি অপ্রত্যাশিত সমস্যা ঘটেছে।'}</p>
            <a href="/" class="btn-primary text-xs py-2 px-5 inline-block font-bold">হোম পেজে ফিরে যান</a>
          </div>
        </div>
      `;
    }
  }
}

export const router = new Router();
export default router;
