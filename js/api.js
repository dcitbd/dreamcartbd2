/**
 * DREAM CART BD — API SERVICE
 * Connects Frontend to Google Apps Script & provides offline persistent store
 */
const API = {
  // Local storage cache keys
  STORAGE_KEYS: {
    PRODUCTS: 'dcbd_products_cache',
    CATEGORIES: 'dcbd_categories_cache',
    ORDERS: 'dcbd_orders_cache',
    INCOMPLETE: 'dcbd_incomplete_orders',
    CUSTOMERS: 'dcbd_customers_cache',
    WHOLESALERS: 'dcbd_wholesalers_cache',
    WORKERS: 'dcbd_workers_cache',
    BUYING: 'dcbd_buying_cache',
    INVEST: 'dcbd_invest_cache',
    COSTS: 'dcbd_costs_cache',
    BRANDS: 'dcbd_brands_cache',
    BANNERS: 'dcbd_banners_cache',
    REVIEWS: 'dcbd_reviews_cache'
  },

  async call(action, payload = {}) {
    const url = CONFIG.apiBaseUrl;
    if (url && !url.includes('YOUR_DEPLOYMENT_ID')) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action, payload })
        });
        const result = await response.json();
        if (result && result.success !== undefined) {
          return result;
        }
      } catch (e) {
        console.warn('Google Apps Script live connection failed, using local sheet cache:', e);
      }
    }
    // Fallback to local high-speed sheet cache simulation
    return this.mockEngine(action, payload);
  },

  // Map sheet raw row array to Product Object using A-R mapping
  rowToProduct(row, index = 0) {
    if (!row || row.length === 0) return null;
    const c = CONFIG.productColumns;
    const imagesRaw = row[c.M_images] || '';
    const imageList = imagesRaw.split(',').map(s => s.trim()).filter(Boolean);
    const primaryImage = imageList[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
    
    const originalPrice = parseFloat(row[c.J_originalPrice]) || parseFloat(row[c.H_sellingPrice]) * 1.25 || 0;
    const sellingPrice = parseFloat(row[c.H_sellingPrice]) || 0;
    const buyingPrice = parseFloat(row[c.G_buyingPrice]) || 0;
    const wholesalePrice = parseFloat(row[c.K_wholesalePrice]) || (sellingPrice * 0.85);
    const stock = parseInt(row[c.I_stock], 10) || 0;
    const minOrderQ = parseInt(row[c.L_minOrderQ], 10) || 1;
    
    const discountPercent = originalPrice > sellingPrice 
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) 
      : 0;

    return {
      id: row[c.A_sku] || ('PRD-' + (1000 + index)),
      sku: row[c.A_sku] || ('PRD-' + (1000 + index)),
      name: row[c.B_name] || 'Unnamed Product',
      category: row[c.C_category] || 'General',
      subCategory: row[c.D_subCategory] || '',
      childCategory: row[c.E_childCategory] || '',
      brand: row[c.F_brand] || 'Dream Cart BD',
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      stock: stock,
      originalPrice: originalPrice,
      wholesalePrice: wholesalePrice,
      minOrderQ: minOrderQ,
      images: imageList.length ? imageList : [primaryImage],
      primaryImage: primaryImage,
      description: row[c.N_description] || '',
      specification: row[c.O_specification] || '',
      others: row[c.P_others] || '',
      color: row[c.Q_color] || 'Default',
      size: row[c.R_size] || 'Standard',
      discountPercent: discountPercent,
      inStock: stock > 0
    };
  },

  // Initialize seed data matching Dream Cart BD real sheet if empty
  initSeedData() {
    if (!localStorage.getItem(this.STORAGE_KEYS.PRODUCTS)) {
      const demoRawRows = [
        // A=SKU, B=Name, C=Category, D=Sub_Cat, E=Child_Cat, F=Brand, G=Buy, H=Sell, I=Stock, J=Orig, K=Whole, L=MinQ, M=Images, N=Desc, O=Spec, P=Others, Q=Color, R=Size
        ['Chi-Ali-000001', 'Smart Stainless Steel Temperature Ring', 'Watches Sunglasses Jewellery', 'Jewellery', 'Rings', 'China Brand', '98', '194', '15', '1845', '123', '10 Pcs', 'https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg_720x720q80.jpg', 'উচ্চমানের স্টেইনলেস স্টিল ওয়াটারপ্রুফ মুড টেম্পারেচার সেনসিটিভ ইন্টেলিজেন্ট রিং।', 'Material: Stainless Steel, Waterproof', '100% Original', 'Silver', '6cm'],
        ['HWT-GT4-01', 'Huawei Watch GT 4 Pro Smartwatch (Dubai Edition)', 'Smartwatches', 'Smart Wearables', 'Bluetooth Calling', 'Huawei', '18500', '24500', '28', '28500', '21500', '5 Pcs', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80', 'দুবাই থেকে সরাসরি আমদানিকৃত অরিজিনাল হুয়াওয়ে ওয়াচ জিটি ৪। অ্যামোলেড ডিসপ্লে ও ২ সপ্তাহের ব্যাটারি।', 'AMOLED 1.43", Bluetooth Calls, SpO2, Heart Rate', 'Official Warranty', 'Black', '46mm'],
        ['OPW-02-BLK', 'OnePlus Watch 2 Dual-Engine Smartwatch', 'Smartwatches', 'Smart Wearables', 'Wear OS', 'OnePlus', '22500', '29500', '18', '34000', '26500', '5 Pcs', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', 'ডুয়াল ইঞ্জিন আর্কিটেকচার, ১০০ ঘন্টা ব্যাটারি ব্যাকআপ এবং সুপার ফাস্ট চার্জিং।', 'Snapdragon W5 + BES2700, 100hr Battery', 'Original Global Version', 'Dark Meteor', '46mm'],
        ['AMZ-GTS4-03', 'Amazfit GTS 4 Smartwatch Ultra Slim', 'Smartwatches', 'Smart Wearables', 'AMOLED Fitness', 'Amazfit', '14500', '18900', '22', '22500', '16800', '5 Pcs', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', 'সুপার স্লিম মেটাল বডি, ১৫০+ স্পোর্টস মোড ও অত্যন্ত নির্ভুল জিপিএস ট্র্যাকিং।', '1.75" AMOLED, BioTracker 4.0, Dual-band GPS', '1 Year Replacement', 'Infinite Black', 'Standard'],
        ['HAY-SOLAR-04', 'Haylou Solar Ultra BT Calling Smart Watch', 'Smartwatches', 'Smart Wearables', 'Budget Watch', 'Haylou', '2800', '3850', '35', '4800', '3200', '10 Pcs', 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=80', 'অরিজিনাল হেইলু সোলার আল্ট্রা মেটালিক বেজেল সহ দুর্দান্ত সাউন্ডে ব্লুটুথ কলিং সুবিধা।', 'HD Retina Display, Bluetooth Calling, 100+ Sports', 'Official Global', 'Silver Grey', 'Standard'],
        ['HW-BND10-05', 'Huawei Band 10 Smart Watch Black', 'Smartwatches', 'Fitness Trackers', 'Smart Band', 'Huawei', '3800', '4950', '40', '5900', '4200', '10 Pcs', 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&auto=format&fit=crop&q=80', 'নতুন হুয়াওয়ে ব্যান্ড ১০ স্লিম স্টাইলিশ ট্র্যাকার, সাইন্টিফিক স্লিপ ও হার্ট রেট মনিটরিং।', 'Ultra Thin AMOLED, 14 Days Battery, Fast Charge', 'Brand Warranty', 'Graphite Black', 'Slim'],
        ['QCY-GT-06', 'QCY Watch GT Retina AMOLED HD Display', 'Smartwatches', 'Smart Wearables', 'Budget AMOLED', 'QCY', '2600', '3650', '30', '4500', '3100', '10 Pcs', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', 'প্রিমিয়াম রেটিনা অ্যামোলেড এইচডি ডিসপ্লে এবং টেকসই মেটাল ফ্রেম।', '1.43" AMOLED, IP68 Waterproof, 60Hz Refresh', 'Original', 'Space Grey', 'Standard'],
        ['RLM-S2-07', 'Realme Watch S2 Stainless Steel Smartwatch', 'Smartwatches', 'Smart Wearables', 'Fashion Watch', 'Realme', '4800', '6500', '25', '7900', '5700', '5 Pcs', 'https://images.unsplash.com/photo-1509741102003-ca64bfe5f099?w=600&auto=format&fit=crop&q=80', 'রিয়েলমি ওয়াচ এস ২ প্রিমিয়াম স্টেইনলেস স্টিল ডিজাইন ও স্মার্ট এআই পার্সোনাল ট্রেইনার।', 'Stainless Steel, AI Voice Engine, 20 Days Battery', 'Official Boxed', 'Ocean Silver', 'Standard'],
        
        // Torch & Rechargeable Electronics
        ['TOR-5000LM-01', 'High-Power Long-Range Tactical Rechargeable LED Torch (5000LM)', 'Torch & Tactical Light', 'Lighting', 'Searchlight', 'PowerBeam', '1250', '1850', '50', '2400', '1450', '10 Pcs', 'https://images.unsplash.com/photo-1550524514-96369dd83fae?w=600&auto=format&fit=crop&q=80', 'মিলিটারি গ্রেড অ্যালুমিনিয়াম হাই-পাওয়ার লং রেঞ্জ এলইডি টর্চলাইট। ১০০০ মিটার ফোকাস।', '5000LM, Type-C Charging, 1000m Beam', 'Heavy Duty', 'Matte Black', 'Large'],
        ['TOR-MINI-02', 'Mini Zoomable Tactical EDC Pocket Flashlight', 'Torch & Tactical Light', 'Lighting', 'Pocket Torch', 'PowerBeam', '420', '690', '80', '950', '520', '20 Pcs', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', 'পকেট সাইজ মিনি রিচার্জেবল জুম টর্চ, ব্যাকপ্যাক ও দৈনন্দিন ব্যবহারের জন্য সেরা।', 'COB Side Light, Magnetic Base, USB Rechargeable', 'Standard Box', 'Black', 'Mini'],
        ['TOR-SOLAR-03', 'Emergency Solar Powered Multi-Function Camp Lantern', 'Torch & Tactical Light', 'Emergency Light', 'Lantern', 'SolarGlow', '850', '1290', '45', '1650', '980', '12 Pcs', 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80', 'সৌর বিদ্যুৎ চালিত ইমার্জেন্সি রিচার্জেবল লণ্ঠন ও পাওয়ার ব্যাংক সুবিধা।', 'Solar Panel + USB Charging, Powerbank output', 'Guaranteed Quality', 'Army Green', 'Medium'],
        ['SPK-MINI-04', 'Portable Wireless Multimedia Mini Speaker with Deep Bass', 'Audio & Speakers', 'Audio', 'Bluetooth Speakers', 'SoundPro', '680', '990', '60', '1450', '780', '15 Pcs', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', 'ডিপ বেজ ও আরজিবি ডাইনামিক লাইট সহ ব্লুটুথ ৫.৩ মিনি ওয়্যারলেস স্পিকার।', 'Bluetooth 5.3, RGB Light, TF Card, FM Radio', 'Box Pack', 'Black RGB', 'Compact'],

        // Organic Health Supplements
        ['SUP-MACA-01', 'Pure Organic Peruvian Maca Root Powder (250g)', 'Organic Supplements', 'Health & Vitality', 'Herbal Powder', 'Dream Pure', '950', '1350', '45', '1750', '1050', '10 Pcs', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', 'পেরুর পাহাড়ি অঞ্চল থেকে সংগৃহীত ১০০% নির্ভেজাল অর্গানিক মাকা রুট পাউডার। শক্তি ও স্ট্যামিনা বৃদ্ধি করে।', '100% Raw Gelatinized Maca Powder (Grade A)', 'GMP Certified Organic', 'Natural Brown', '250g'],
        ['SUP-MACA-02', 'Organic Black Maca Premium Energy Booster (500g)', 'Organic Supplements', 'Health & Vitality', 'Black Maca', 'Dream Pure', '1650', '2350', '30', '2950', '1850', '10 Pcs', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', 'প্রিমিয়াম গ্রেড ব্ল্যাক মাকা পাউডার, মানসিক চাপ দূর করে কর্মক্ষমতা কয়েকগুণ বৃদ্ধি করে।', 'Organic Black Maca 500g Jar', 'Laboratory Tested', 'Dark Roast', '500g'],
        ['SUP-CHIA-03', 'Organic Mexican Chia Seeds (Omega-3 Rich, 500g)', 'Organic Supplements', 'Superfood', 'Chia Seeds', 'Dream Pure', '420', '650', '100', '850', '490', '20 Pcs', 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&auto=format&fit=crop&q=80', 'ওমেগা-৩, ফাইবার ও অ্যান্টিঅক্সিডেন্টে ভরপুর মেক্সিকান সুপারফুড চিয়া সিডস। ওজন নিয়ন্ত্রণে আদর্শ।', '100% Cleaned Organic Chia Seeds', 'Purity Guaranteed', 'Grey/Black', '500g'],

        // Office & Desk Organizer
        ['LM-DCB-00130', 'Good Luck Single File Holder Document Organizer Box', 'Office & Desk Supplies', 'Office Storage', 'File Holder', 'Good Luck', '125', '185', '120', '260', '140', '24 Pcs', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80', 'ম্যাগাজিন, অফিস ফাইল ও গুরুত্বপূর্ণ কাগজপত্র গুছিয়ে রাখার জন্য সেরা ফাইল হোল্ডার র্যাক।', 'Durable Polypropylene plastic, Moisture-proof', 'Heavy Duty', 'Royal Blue', 'A4/Legal'],
        ['LM-DCB-00131', 'Mesh Metal Desktop Magazine & File Rack 3-Tier', 'Office & Desk Supplies', 'Office Storage', 'Desk Rack', 'Good Luck', '450', '690', '50', '950', '520', '12 Pcs', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', '৩ টিয়ার বিশিষ্ট মেটাল মেশ ডেস্ক অর্গানাইজার ও ফাইল ডকুমেন্ট ট্রে। মজবুত ও মার্জিত লুক।', 'Rust-proof Coated Mesh Metal, 3-Layers', 'Premium Finish', 'Matte Black', '3-Tier'],

        // Accessories & Jewelry
        ['ACC-WLT-01', 'Genuine Leather Accordion RFID Card Wallet', 'Fashion & Accessories', 'Leather Goods', 'Card Wallet', 'LeatherCraft', '380', '590', '65', '850', '440', '15 Pcs', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80', 'অরিজিনাল জেনুইন লেদার অ্যাকর্ডিয়ন মাল্টি-স্লট আরএফআইডি সিকিউর কার্ড হোল্ডার ওয়ালেট।', '100% Genuine Cowhide Leather, RFID Blocking', 'Boxed Packaging', 'Vintage Brown', 'Compact'],
        ['ACC-EAR-02', 'Gold-Colored Vintage Geometry Pearl Earrings Set', 'Fashion & Accessories', 'Jewellery', 'Earrings', 'Vintage Glam', '180', '320', '90', '550', '220', '20 Pcs', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80', 'ক্লাসিক গোল্ড ফিনিশ ভিন্টেজ জ্যামিতিক মুক্তা ড্রপ কানের দুল। যেকোনো পার্টি ওয়্যারে অনবদ্য।', 'Alloy with Imitation Pearl, Hypoallergenic', 'Gift Boxed', 'Gold & Pearl', 'Standard'],

        // Kitchen & Safety
        ['KIT-GAS-01', 'Heavy-Duty Gas Stove Safety Energy Saver & Wind Shield', 'Home & Kitchen', 'Kitchen Safety', 'Energy Saver', 'SafeGas', '260', '420', '150', '650', '310', '20 Pcs', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', '৪০% গ্যাস সাশ্রয়ী হেভি ডিউটি উইন্ডশিল্ড ফায়ার সেভার রিং। সকল চুলায় সহজে ব্যবহারযোগ্য।', 'Stainless Steel Heat Resistant, 4/5/8 claw fit', 'Quality Tested', 'Silver Metallic', 'Universal'],
        ['KIT-SCR-02', 'Multifunctional Vegetable Cutter & Rotary Cheese Grater', 'Home & Kitchen', 'Kitchen Gadgets', 'Choppers', 'KitchenPro', '490', '790', '40', '1150', '570', '12 Pcs', 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80', 'দ্রুত সালাদ, আলু ও সবজি গ্রেট ও কাটার জন্য ৩ ব্লেড রোটেশনাল হ্যান্ড কাটার।', 'Food-grade ABS + 430 Stainless Steel Drums', 'Box Pack', 'Nordic Green', 'Standard'],

        // Gadgets & Tools
        ['GAD-SCW-01', '24-in-1 Precision Magnetic Screwdriver Set for Electronics', 'Tools & Electronics', 'Hardware Tools', 'Screwdriver Set', 'ProFix', '320', '490', '70', '750', '370', '20 Pcs', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', 'স্মার্টফোন, ঘড়ি ও ল্যাপটপ মেরামতের জন্য এস২ স্টিল প্রিসিশন ম্যাগনেটিক স্ক্রু ড্রাইভার কিট।', 'S2 Alloy Steel, 24 Bit Profiles, Aluminum Alloy Box', 'Magnetic Case', 'Space Grey', 'Pocket Box']
      ];
      
      const prods = demoRawRows.map((r, i) => this.rowToProduct(r, i));
      localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
    }

    // Demo Orders seed
    if (!localStorage.getItem(this.STORAGE_KEYS.ORDERS)) {
      const demoOrders = [
        {
          orderId: 'ORD-88241',
          date: '2026-09-23 14:30',
          customerName: 'আব্দুল করিম',
          phone: '01815592089',
          address: 'চকরিয়া, কক্সবাজার',
          products: 'Huawei Watch GT 4 Pro Smartwatch',
          quantity: 1,
          totalAmount: 24560,
          deliveryType: 'Home Delivery',
          status: 'Pending',
          source: 'Customer View',
          items: [{ sku: 'HWT-GT4-01', name: 'Huawei Watch GT 4 Pro', price: 24500, qty: 1 }]
        },
        {
          orderId: 'ORD-88240',
          date: '2026-09-23 11:15',
          customerName: 'কামাল হোসেন',
          phone: '01715879111',
          address: 'ধানমন্ডি, ঢাকা',
          products: 'Pure Organic Peruvian Maca Root Powder',
          quantity: 2,
          totalAmount: 2760,
          deliveryType: 'Home Delivery',
          status: 'Confirmed',
          source: 'Customer View',
          items: [{ sku: 'SUP-MACA-01', name: 'Peruvian Maca Root Powder', price: 1350, qty: 2 }]
        },
        {
          orderId: 'ORD-88239',
          date: '2026-09-22 18:00',
          customerName: 'শাহেদ আহমদ',
          phone: '01914471255',
          address: 'জিইসি মোড়, চট্টগ্রাম',
          products: 'High-Power Tactical LED Torch (5000LM)',
          quantity: 1,
          totalAmount: 1970,
          deliveryType: 'Home Delivery',
          status: 'Delivered',
          source: 'Customer View',
          items: [{ sku: 'TOR-5000LM-01', name: 'Tactical LED Torch', price: 1850, qty: 1 }]
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(demoOrders));
    }

    // Demo Incomplete Orders seed
    if (!localStorage.getItem(this.STORAGE_KEYS.INCOMPLETE)) {
      const demoIncomplete = [
        {
          orderId: 'INC-1002',
          date: '2026-09-23 16:20',
          customerName: 'মাহবুব আলম',
          phone: '01860575880',
          address: 'মহেশখালী বাজার',
          products: 'OnePlus Watch 2 Dual-Engine',
          quantity: 1,
          totalAmount: 29560,
          status: 'Abandoned at checkout',
          items: [{ sku: 'OPW-02-BLK', name: 'OnePlus Watch 2', price: 29500, qty: 1 }]
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.INCOMPLETE, JSON.stringify(demoIncomplete));
    }

    // Demo Banners (10+ slides as requested)
    if (!localStorage.getItem(this.STORAGE_KEYS.BANNERS)) {
      const banners = [
        { id: 1, title: 'দুবাই ও গ্লোবাল অরিজিনাল গ্যাজেট মেগা সেল', subtitle: 'Huawei, OnePlus, Amazfit স্মার্টওয়াচ শতভাগ অরিজিনাল ও দ্রুত ডেলিভারি', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', badge: 'স্মার্ট গ্যাজেট', link: '#/products?category=Smartwatches', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&auto=format&fit=crop&q=80' },
        { id: 2, title: '১০০% পিওর পেরুভিয়ান অর্গানিক মাকা পাউডার', subtitle: 'স্ট্যামিনা ও প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে সেরা প্রিমিয়াম গ্রেড', bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', badge: 'অর্গানিক হেলথ', link: '#/products?category=Organic%20Supplements', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&auto=format&fit=crop&q=80' },
        { id: 3, title: 'মিলিটারি গ্রেড ৫০০০ এলএম লং-রেঞ্জ রিচার্জেবল টর্চ', subtitle: '১০০০ মিটার দীর্ঘ আলো, শক্তিশালী ব্যাটারি ও টাইপ-সি ফাস্ট চার্জিং', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', badge: 'ট্যাকটিক্যাল লাইটিং', link: '#/products?category=Torch%20%26%20Tactical%20Light', img: 'https://images.unsplash.com/photo-1550524514-96369dd83fae?w=1200&auto=format&fit=crop&q=80' },
        { id: 4, title: 'পাইকারি বিক্রেতাদের জন্য বিশেষ হোলসেল রেট', subtitle: 'সরাসরি কারখানা ও আমদানিকারকের রেটে পণ্য কিনুন, দ্রুত কুরিয়ার ডেলিভারি', bg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', badge: 'হোলসেলার অফার', link: '#/wholesale/dashboard', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=80' },
        { id: 5, title: '৪০% গ্যাস সাশ্রয়ী ইউনিভার্সাল ফায়ার সেভার রিং', subtitle: 'উচ্চমানের স্টেইনলেস স্টিল, নিরাপদ রান্না ও গ্যাসের অপচয় রোধ', bg: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', badge: 'কিচেন গ্যাজেট', link: '#/products?category=Home%20%26%20Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80' },
        { id: 6, title: 'অফিস ও স্টাডি টেবিল ফাইল অর্গানাইজার কালেকশন', subtitle: 'আপনার গুরুত্বপূর্ণ কাগজপত্র ও ফাইল সহজে গুছিয়ে রাখুন', bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', badge: 'ডেস্ক অর্গানাইজার', link: '#/products?category=Office%20%26%20Desk%20Supplies', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=80' },
        { id: 7, title: 'জেনুইন লেদার ভিন্টেজ আরএফআইডি কার্ড ওয়ালেট', subtitle: 'হাতে তৈরি খাঁটি চামড়ার কম্প্যাক্ট কার্ড ওয়ালেট ও অ্যাকর্ডিয়ন স্লট', bg: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)', badge: 'ফ্যাশন এক্সেসরিজ', link: '#/products?category=Fashion%20%26%20Accessories', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&auto=format&fit=crop&q=80' },
        { id: 8, title: 'স্মার্ট মুড টেম্পারেচার সেনসিটিভ ইন্টেলিজেন্ট রিং', subtitle: 'ওয়াটারপ্রুফ স্টেইনলেস স্টিল কাপল রিং কালেকশন', bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)', badge: 'ট্রেন্ডিং জুয়েলারি', link: '#/products?category=Watches%20Sunglasses%20Jewellery', img: 'https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg_720x720q80.jpg' },
        { id: 9, title: 'ডিপ বেস পোর্টেবল ওয়্যারলেস ব্লুটুথ স্পিকার', subtitle: 'ডাইনামিক আরজিবি লাইট, এফএম রেডিও ও মেমোরি কার্ড সাপোর্ট', bg: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)', badge: 'অডিও সাউন্ড', link: '#/products?category=Audio%20%26%20Speakers', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&auto=format&fit=crop&q=80' },
        { id: 10, title: '২৪-ইন-১ প্রিসিশন ম্যাগনেটিক স্ক্রু ড্রাইভার কিট', subtitle: 'মোবাইল, ল্যাপটপ ও ইলেকট্রনিক্স মেরামতের জন্য এস২ স্টিল কিট', bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', badge: 'টুলস ও গ্যাজেট', link: '#/products?category=Tools%20%26%20Electronics', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80' }
      ];
      localStorage.setItem(this.STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    }
  },

  // Mock Engine for local persistence and offline operations
  async mockEngine(action, payload) {
    this.initSeedData();
    await new Promise(r => setTimeout(r, 60)); // Fast snappy response

    switch (action) {
      case 'products/list': {
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        let filtered = [...products];
        if (payload.category && payload.category !== 'all') {
          filtered = filtered.filter(p => p.category.toLowerCase() === payload.category.toLowerCase());
        }
        if (payload.stockStatus === 'in_stock') {
          filtered = filtered.filter(p => p.stock > 0);
        } else if (payload.stockStatus === 'out_of_stock') {
          filtered = filtered.filter(p => p.stock <= 0);
        }
        if (payload.minPrice) {
          filtered = filtered.filter(p => p.sellingPrice >= parseFloat(payload.minPrice));
        }
        if (payload.maxPrice) {
          filtered = filtered.filter(p => p.sellingPrice <= parseFloat(payload.maxPrice));
        }
        if (payload.search) {
          const q = payload.search.toLowerCase();
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.sku.toLowerCase().includes(q) || 
            p.category.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
          );
        }
        return { success: true, data: { items: filtered, total: filtered.length } };
      }

      case 'products/get_by_category': {
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        const categories = [...new Set(products.map(p => p.category))];
        const categoryGroups = categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat);
          return {
            categoryName: cat,
            products: catProducts.slice(0, 12), // Up to 12 products per category for home grid
            totalCount: catProducts.length
          };
        });
        return { success: true, data: { groups: categoryGroups } };
      }

      case 'products/details': {
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        const p = products.find(it => it.id === payload.id || it.sku === payload.id);
        if (p) return { success: true, data: p };
        return { success: false, message: 'প্রোডাক্টটি খুঁজে পাওয়া যায়নি।' };
      }

      case 'products/update_inline': {
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        const index = products.findIndex(p => p.sku === payload.sku || p.id === payload.sku);
        if (index !== -1) {
          if (payload.sellingPrice !== undefined) products[index].sellingPrice = parseFloat(payload.sellingPrice);
          if (payload.originalPrice !== undefined) products[index].originalPrice = parseFloat(payload.originalPrice);
          if (payload.buyingPrice !== undefined) products[index].buyingPrice = parseFloat(payload.buyingPrice);
          if (payload.stock !== undefined) {
            products[index].stock = parseInt(payload.stock, 10);
            products[index].inStock = products[index].stock > 0;
          }
          localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
          return { success: true, message: 'সফলভাবে আপডেট করা হয়েছে!', data: products[index] };
        }
        return { success: false, message: 'Product not found' };
      }

      case 'products/add': {
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        const newProduct = {
          id: payload.sku || ('PRD-' + Date.now().toString().slice(-6)),
          sku: payload.sku || ('PRD-' + Date.now().toString().slice(-6)),
          name: payload.name,
          category: payload.category || 'General',
          subCategory: payload.subCategory || '',
          childCategory: payload.childCategory || '',
          brand: payload.brand || 'Dream Cart BD',
          buyingPrice: parseFloat(payload.buyingPrice) || 0,
          sellingPrice: parseFloat(payload.sellingPrice) || 0,
          stock: parseInt(payload.stock, 10) || 0,
          originalPrice: parseFloat(payload.originalPrice) || (parseFloat(payload.sellingPrice) * 1.2),
          wholesalePrice: parseFloat(payload.wholesalePrice) || (parseFloat(payload.sellingPrice) * 0.85),
          minOrderQ: parseInt(payload.minOrderQ, 10) || 1,
          images: payload.images && payload.images.length ? payload.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
          primaryImage: payload.primaryImage || (payload.images && payload.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          description: payload.description || '',
          specification: payload.specification || '',
          others: payload.others || '',
          color: payload.color || 'Default',
          size: payload.size || 'Standard',
          discountPercent: 15,
          inStock: (parseInt(payload.stock, 10) || 0) > 0
        };
        products.unshift(newProduct);
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return { success: true, message: 'নতুন প্রোডাক্ট যুক্ত হয়েছে!', data: newProduct };
      }

      case 'products/delete': {
        let products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        products = products.filter(p => p.sku !== payload.sku && p.id !== payload.sku);
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return { success: true, message: 'প্রোডাক্ট ডিলিট করা হয়েছে।' };
      }

      case 'orders/create': {
        const orders = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ORDERS) || '[]');
        const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
        const newOrder = {
          orderId: orderId,
          date: new Date().toLocaleString('bn-BD'),
          customerName: payload.name,
          phone: payload.phone,
          address: payload.address,
          products: payload.items.map(i => i.name).join(', '),
          quantity: payload.items.reduce((s, i) => s + (i.quantity || 1), 0),
          totalAmount: payload.totalAmount,
          deliveryType: payload.deliveryZone === 'dhaka' ? 'ইনসাইড ঢাকা (৬০৳)' : 'আউটসাইড ঢাকা (১২০৳)',
          deliveryCharge: payload.deliveryCharge || 60,
          status: 'Pending',
          source: payload.source || 'Customer Web',
          items: payload.items,
          discount: payload.discount || 0
        };
        orders.unshift(newOrder);
        localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(orders));

        // Decrement product stock
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        payload.items.forEach(it => {
          const p = products.find(prod => prod.sku === it.sku || prod.id === it.id);
          if (p) {
            p.stock = Math.max(0, p.stock - (it.quantity || 1));
            p.inStock = p.stock > 0;
          }
        });
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

        return { success: true, message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে!', data: newOrder };
      }

      case 'orders/save_incomplete': {
        const inc = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.INCOMPLETE) || '[]');
        const incId = 'INC-' + Math.floor(1000 + Math.random() * 9000);
        const item = {
          orderId: incId,
          date: new Date().toLocaleString('bn-BD'),
          customerName: payload.name || 'Unknown',
          phone: payload.phone || '',
          address: payload.address || '',
          products: payload.items ? payload.items.map(i => i.name).join(', ') : '',
          quantity: payload.items ? payload.items.reduce((s, i) => s + (i.quantity || 1), 0) : 0,
          totalAmount: payload.totalAmount || 0,
          status: 'Incomplete / Abandoned',
          items: payload.items || []
        };
        inc.unshift(item);
        localStorage.setItem(this.STORAGE_KEYS.INCOMPLETE, JSON.stringify(inc));
        return { success: true, data: item };
      }

      case 'orders/list': {
        const orders = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ORDERS) || '[]');
        return { success: true, data: { items: orders, total: orders.length } };
      }

      case 'orders/incomplete_list': {
        const inc = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.INCOMPLETE) || '[]');
        return { success: true, data: { items: inc, total: inc.length } };
      }

      case 'orders/track': {
        const orders = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ORDERS) || '[]');
        const q = (payload.query || '').trim();
        const found = orders.filter(o => 
          o.orderId.toLowerCase() === q.toLowerCase() || 
          o.phone.includes(q)
        );
        return { success: true, data: { items: found } };
      }

      case 'admin/stats': {
        const orders = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ORDERS) || '[]');
        const products = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        const incomplete = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.INCOMPLETE) || '[]');
        
        const totalSales = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
        const totalBuying = products.reduce((s, p) => s + (p.buyingPrice * p.stock), 0);
        const totalCost = 14500;
        const totalInvest = 250000;
        
        return {
          success: true,
          data: {
            totalSelling: totalSales,
            totalBuying: totalBuying,
            totalCost: totalCost,
            totalInvest: totalInvest,
            totalOrders: orders.length,
            pendingOrders: orders.filter(o => o.status === 'Pending').length,
            successOrders: orders.filter(o => o.status === 'Delivered').length,
            cancelOrders: orders.filter(o => o.status === 'Cancelled').length,
            incompleteOrders: incomplete.length,
            totalProducts: products.length,
            inStockProducts: products.filter(p => p.stock > 0).length,
            outOfStockProducts: products.filter(p => p.stock <= 0).length,
            totalCustomers: 85,
            totalWholesalers: 14,
            totalWorkers: 6,
            totalBrands: 12,
            totalCategories: 8,
            totalReviews: 48,
            liveViewers: Math.floor(18 + Math.random() * 12)
          }
        };
      }

      case 'banners/list': {
        const banners = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.BANNERS) || '[]');
        return { success: true, data: banners };
      }

      default:
        return { success: true, message: 'Action executed successfully', data: {} };
    }
  }
};

window.API = API;
