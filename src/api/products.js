/**
 * ============================================================================
 * DREAM CART BD — PRODUCT SDK WITH RICH FALLBACK (products.js)
 * Guarantees zero empty screens by serving curated real product inventory
 * with instant fallback when API is offline or responding slowly.
 * ============================================================================
 */

import { api } from "./client.js";

const FALLBACK_PRODUCTS = [
  {
    product_id: "PRD-SW-01",
    product_name: "T900 Ultra 2 Big 2.19 inch Smartwatch with Wireless Charging",
    sku: "SW-T900-ULTRA2",
    category_id: "smartwatch",
    regular_price: 2450,
    selling_price: 1850,
    stock: 25,
    thumbnail: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg",
    images: [
      { image_url: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg" }
    ],
    variants: [
      { variant_id: "V-1", variant_name: "Black Edition", selling_price: 1850 },
      { variant_id: "V-2", variant_name: "Orange Sports Strap", selling_price: 1850 }
    ],
    short_description: "প্রিমিয়াম এইচডি ডিসপ্লে, কলিং ফিচার, হার্ট রেট ও ব্লুটুথ ৫.০ কানেক্টিভিটি সহ বেস্ট কোয়ালিটি স্মার্টওয়াচ।"
  },
  {
    product_id: "PRD-SW-02",
    product_name: "HK9 Pro Plus AMOLED Smartwatch With ChatGPT Support",
    sku: "SW-HK9-PRO-PLUS",
    category_id: "smartwatch",
    regular_price: 4500,
    selling_price: 3750,
    stock: 18,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10",
    images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10" }
    ],
    variants: [
      { variant_id: "V-3", variant_name: "Titanium Grey", selling_price: 3750 },
      { variant_id: "V-4", variant_name: "Jet Black", selling_price: 3750 }
    ],
    short_description: "আসল অ্যামোলেড ডিসপ্লে এবং হাই-স্পিড ডুয়াল কোর প্রসেসর সমৃদ্ধ আধুনিক জেনারেশন স্মার্টওয়াচ।"
  },
  {
    product_id: "PRD-ORG-01",
    product_name: "প্রিমিয়াম অর্গানিক শিমুল মূল ও তালমাখনা ন্যাচারাল পাউডার (৫০০ গ্রাম)",
    sku: "ORG-SHIMUL-500G",
    category_id: "organic",
    regular_price: 1200,
    selling_price: 950,
    stock: 40,
    thumbnail: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg",
    images: [
      { image_url: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg" }
    ],
    short_description: "১০০% খাঁটি ও প্রাকৃতিক উপাদানে তৈরি হেলথ সাপ্লিমেন্ট যা শারীরিক শক্তি ও প্রতিরোধ ক্ষমতা বৃদ্ধি করে।"
  },
  {
    product_id: "PRD-ELEC-01",
    product_name: "Multi-functional COB Rechargeable Keychain Emergency Light (Waterproof)",
    sku: "LED-COB-KEYCHAIN",
    category_id: "lighting",
    regular_price: 550,
    selling_price: 380,
    stock: 65,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10",
    images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10" }
    ],
    short_description: "টাইপ-সি ফাস্ট চার্জিং ও স্ট্রং ম্যাগনেট সহ শক্তিশালী ৫০০ লুমেন আউটডোর ও ইমার্জেন্সি লাইট।"
  },
  {
    product_id: "PRD-AUD-01",
    product_name: "M90 Pro TWS Gaming Earbuds with Digital Power Display & Low Latency",
    sku: "AUD-M90-PRO",
    category_id: "audio",
    regular_price: 1450,
    selling_price: 990,
    stock: 30,
    thumbnail: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg",
    images: [
      { image_url: "https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg" }
    ],
    short_description: "হাইফাই স্টেরিও বেজ ও গেমিং এনভায়রনমেন্টাল নয়েজ ক্যানসেলিং ইয়ারবাডস।"
  },
  {
    product_id: "PRD-TOOL-01",
    product_name: "Professional 25-in-1 Precision Screwdriver Set For Mobile & Watch Repair",
    sku: "TOOL-25IN1-PRECISION",
    category_id: "electronics",
    regular_price: 850,
    selling_price: 650,
    stock: 22,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10",
    images: [
      { image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IMYDMkNYleCqUCLvSDtcioP1MAENEONLcelVu_7byA&s=10" }
    ],
    short_description: "ম্যাগনেটিক হেড ও অ্যালুমিনিয়াম অ্যালয় কেসিং সহ যেকোনো ইলেকট্রনিক্স গ্যাজেট সার্ভিসিং টুল কিট।"
  }
];

export const ProductAPI = {
  getAll: async (params = {}) => {
    try {
      if (api && typeof api.get === "function") {
        const res = await api.get("products.list", params);
        if (res && res.items && res.items.length > 0) return res;
        if (Array.isArray(res) && res.length > 0) return { items: res };
      }
    } catch (e) {
      console.warn("ProductAPI online fetch failed, using curated store catalog:", e);
    }
    return { items: FALLBACK_PRODUCTS };
  },

  getById: async (productId) => {
    try {
      if (api && typeof api.get === "function") {
        const res = await api.get("products.get", { productId });
        if (res && res.product_id) return res;
      }
    } catch (e) {
      console.warn("ProductAPI getById failed, checking fallback:", e);
    }
    const found = FALLBACK_PRODUCTS.find(p => p.product_id === productId || p.sku === productId);
    return found || FALLBACK_PRODUCTS[0];
  },

  create: async (productData) => {
    if (api && typeof api.post === "function") {
      return await api.post("products.create", productData);
    }
    throw new Error("API Client not available");
  },

  update: async (productData) => {
    if (api && typeof api.post === "function") {
      return await api.post("products.update", productData);
    }
    throw new Error("API Client not available");
  },

  updatePrice: async (productId, newPrice, priceType = "selling_price", reason = "Admin Inline Quick Edit") => {
    if (api && typeof api.post === "function") {
      return await api.post("products.inlineUpdatePrice", {
        productId,
        newPrice: Number(newPrice) || 0,
        priceType,
        reason,
        userId: "ADMIN"
      });
    }
    throw new Error("API Client not available");
  },

  updateStock: async (productId, newStock, reason = "Admin Stock Adjustment") => {
    if (api && typeof api.post === "function") {
      return await api.post("products.inlineUpdateStock", {
        productId,
        newStock: Number(newStock) || 0,
        reason,
        userId: "ADMIN"
      });
    }
    throw new Error("API Client not available");
  },

  getCategoryTree: async () => {
    try {
      if (api && typeof api.get === "function") {
        const res = await api.get("categories.getTree");
        if (Array.isArray(res) && res.length > 0) return res;
      }
    } catch (e) {
      console.warn("Category tree fetch failed, using default categories:", e);
    }
    return [
      { category_id: "smartwatch", category_name: "স্মার্ট ওয়াচ", icon: "watch" },
      { category_id: "organic", category_name: "অর্গানিক ও স্বাস্থ্য", icon: "apple" },
      { category_id: "electronics", category_name: "ইলেকট্রনিক্স ও টুলস", icon: "laptop" },
      { category_id: "lighting", category_name: "এলইডি ও ইমার্জেন্সি লাইট", icon: "lightbulb" },
      { category_id: "audio", category_name: "ইয়ারবাডস ও হেডফোন", icon: "headphones" },
      { category_id: "fashion", category_name: "ফ্যাশন ও লাইফস্টাইল", icon: "shirt" }
    ];
  }
};

if (typeof window !== "undefined") {
  window.ProductAPI = ProductAPI;
  window._fallbackProducts = FALLBACK_PRODUCTS;
}

export default ProductAPI;
