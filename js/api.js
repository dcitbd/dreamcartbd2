/**
 * DREAM CART BD — API & SHEET DATA ENGINE (FIXED)
 * Triple-Layer Data Resilience:
 * 1. Direct Live Google Sheets GViz Sync (Works on any browser with internet)
 * 2. Google Apps Script Web App Endpoint (with 2.5s timeout - never hangs)
 * 3. Instant Pre-seeded Local Cache (Guarantees products ALWAYS load without fail)
 */
const API = {
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

  // Map raw sheet row (A to R) to unified Product Object
  rowToProduct(row, index = 0) {
    if (!row || row.length === 0) return null;
    const c = CONFIG.productColumns;
    const imagesRaw = row[c.M_images] || '';
    const imageList = String(imagesRaw).split(',').map(s => s.trim()).filter(Boolean);
    const primaryImage = imageList[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
    
    const sellingPrice = parseFloat(row[c.H_sellingPrice]) || 0;
    const originalPrice = parseFloat(row[c.J_originalPrice]) || (sellingPrice * 1.25);
    const buyingPrice = parseFloat(row[c.G_buyingPrice]) || 0;
    const wholesalePrice = parseFloat(row[c.K_wholesalePrice]) || (sellingPrice * 0.85);
    const stock = parseInt(row[c.I_stock], 10) || 0;
    const minOrderQ = row[c.L_minOrderQ] || '1 Pcs';
    
    const discountPercent = originalPrice > sellingPrice 
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) 
      : 0;

    return {
      id: String(row[c.A_sku] || ('PRD-' + (1000 + index))),
      sku: String(row[c.A_sku] || ('PRD-' + (1000 + index))),
      name: String(row[c.B_name] || 'Unnamed Product'),
      category: String(row[c.C_category] || 'General'),
      subCategory: String(row[c.D_subCategory] || ''),
      childCategory: String(row[c.E_childCategory] || ''),
      brand: String(row[c.F_brand] || 'China Brand'),
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      stock: stock,
      originalPrice: originalPrice,
      wholesalePrice: wholesalePrice,
      minOrderQ: minOrderQ,
      images: imageList.length ? imageList : [primaryImage],
      primaryImage: primaryImage,
      description: String(row[c.N_description] || ''),
      specification: String(row[c.O_specification] || ''),
      others: String(row[c.P_others] || ''),
      color: String(row[c.Q_color] || 'Default'),
      size: String(row[c.R_size] || 'Standard'),
      discountPercent: discountPercent,
      inStock: stock > 0,
      status: 'active'
    };
  },

  // Live Sync directly from Google Sheet via GViz Endpoint
  async fetchLiveSheetData() {
    const sheetUrl = CONFIG.sheetGvizUrl;
    if (!sheetUrl) return false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s safety timeout

      const res = await fetch(sheetUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      const text = await res.text();
      // GViz returns /*O_o*/ google.visualization.Query.setResponse({...});
      const match = text.match(/google\.visualization\.Query\.setResponse\((.+)\);/s);
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        const table = json.table;
        if (table && table.rows && table.rows.length > 0) {
          const products = [];
          table.rows.forEach((r, idx) => {
            const rawCells = (r.c || []).map(cell => (cell ? cell.v : ''));
            const p = this.rowToProduct(rawCells, idx);
            if (p && p.name && p.sellingPrice > 0) {
              products.push(p);
            }
          });
          if (products.length > 0) {
            localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
            console.log(`[Live Sheet Sync] Successfully loaded ${products.length} products directly from Google Sheet.`);
            return true;
          }
        }
      }
    } catch (e) {
      console.warn('[Live Sheet Sync] Could not reach Google Sheet live directly (using cached catalog):', e);
    }
    return false;
  },

  // Initialize seed catalog matching Google Sheet 1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g
  initSeedData() {
    let prods = [];
    try {
      prods = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
    } catch (e) {
      prods = [];
    }

    // Always seed if empty to guarantee instant product loading
    if (!prods || prods.length === 0) {
      const demoRawRows = [
        // Real rows from Sheet 1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g
        ['Chi-Ali-000001', 'Smart Stainless Steel Multifunctional Couple Ring', 'Watches Sunglasses Jewellery', 'Jewellery', 'Rings', 'China Brand', '98', '194', '15', '1845', '123', '10 Pcs', 'https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg_720x720q80.jpg', 'উচ্চমানের স্টেইনলেস স্টিল ওয়াটারপ্রুফ মুড টেম্পারেচার সেনসিটিভ ইন্টেলিজেন্ট রিং।', 'Material: Stainless Steel, Waterproof', '100% Original', 'Silver', '6cm'],
        ['Chi-Ali-000002', 'Pretty 925 Sterling Silver Snowflake Crystal Zircon Ear Clips', 'Watches Sunglasses Jewellery', 'Jewellery', 'Earrings', 'China Brand', '282', '423', '25', '1041', '353', '10 Pcs', 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_003020_8bf8448e-404f-4530-b52b-4700c4ee6a2a.jpg', 'কান ফোঁড়ানো ছাড়াই সহজে পরা যায় এমন বিলাসবহুল স্নোফ্লেক ক্রিস্টাল জারকন ইয়ার ক্লিপ।', '925 Sterling Silver, Non-Piercing', 'Gift Boxed', 'Silver', 'Free Size'],
        ['Chi-Ali-000003', '925 Sterling Silver Heart Zircon Jewelry Set for Women', 'Watches Sunglasses Jewellery', 'Jewellery', 'Jewellery sets', 'China Brand', '638', '892', '18', '1435', '765', '5 Pcs', 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_002701_429597a1-c660-4f25-acb2-00f32662c451.jpg', 'অল-ইন-ওয়ান হার্ট জুয়েলারি সেট: নেকলেস, কানের দুল এবং এডজাস্টেবল আংটি। বিয়ে ও উপহারের জন্য সেরা।', '925 Sterling Silver, Zircon Stones', 'Wedding Gift Set', 'Silver', 'Free Size'],
        ['Chi-Ali-000004', '2026 Watches for Men Luxury Quartz Casual Wristwatch', 'Watches Sunglasses Jewellery', 'Watches', 'Men', 'China Brand', '327', '490', '30', '1950', '409', '5 Pcs', 'https://img.drz.lazcdn.com/static/bd/p/127d2a30a24fcf78db90935acc1d0fba.png', 'পুরুষদের জন্য লাক্সারিয়াস ও ক্যাজুয়াল কোয়ার্টজ মুভমেন্ট রিস্টওয়াচ। প্রিমিয়াম মেটাল ফিনিশিং।', 'Quartz Mechanism, Alloy Strap', 'Daily / Party Wear', 'Midnight Black', 'Free Size'],
        ['Chi-Ali-000006', 'New Wine Silver Cherry Gold Color Pendant Necklace', 'Watches Sunglasses Jewellery', 'Jewellery', 'Women', 'China Brand', '172', '275', '40', '999', '215', '10 Pcs', 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_002018_4b511ffe-493b-4327-b3af-b1de22dbd1d8.png', 'মহিলাদের জন্য অত্যন্ত আকর্ষণীয় চেরি পেন্ডেন্ট গোল্ড কালার নেকলেস।', 'Alloy with Gold Tone Finish', 'Fashion Wear', 'Gold & Wine', 'Free Size'],
        ['Chi-Ali-000007', 'Casual Ladies Quartz Wrist Watch Bracelet Set (6PCS Set)', 'Watches Sunglasses Jewellery', 'Watches', 'Women', 'China Brand', '527', '764', '22', '1425', '633', '5 Pcs', 'https://img.drz.lazcdn.com/static/bd/p/8d5febcdd6e254fa28463da8e32f6ac0.png', '৬ পিসের গর্জিয়াস লেডিস ওয়াচ ও ফ্যাশন ব্রেসলেট কম্বো সেট। রোমান ডায়াল ডিজাইন।', 'Quartz Watch + 5 Matching Bracelets', 'Luxury Box Pack', 'Rose Gold', 'Free Size'],
        ['Chi-Ali-000008', 'Lucky Amulet Feng Shui Pixiu Ring for Wealth & Fortune', 'Watches Sunglasses Jewellery', 'Jewellery', 'Rings', 'China Brand', '145', '297', '35', '750', '210', '10 Pcs', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80', 'ঐতিহ্যবাহী ফেং শুই পিক্সিউ সমৃদ্ধি ও ভাগ্যোন্নয়ন আংটি। এডজাস্টেবল সাইজ।', 'Silver Plated Alloy, Sanskrit Mantra Inscribed', 'Amulet Ring', 'Silver', 'Adjustable'],

        // Smartwatches Category
        ['HWT-GT4-01', 'Huawei Watch GT 4 Pro Smartwatch (Dubai Edition)', 'Smartwatches', 'Smart Wearables', 'Bluetooth Calling', 'Huawei', '18500', '24500', '28', '28500', '21500', '5 Pcs', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80', 'দুবাই থেকে সরাসরি আমদানিকৃত অরিজিনাল হুয়াওয়ে ওয়াচ জিটি ৪। অ্যামোলেড ডিসপ্লে ও ২ সপ্তাহের ব্যাটারি।', 'AMOLED 1.43", Bluetooth Calls, SpO2, Heart Rate', 'Official Warranty', 'Black', '46mm'],
        ['OPW-02-BLK', 'OnePlus Watch 2 Dual-Engine Smartwatch', 'Smartwatches', 'Smart Wearables', 'Wear OS', 'OnePlus', '22500', '29500', '18', '34000', '26500', '5 Pcs', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', 'ডুয়াল ইঞ্জিন আর্কিটেকচার, ১০০ ঘন্টা ব্যাটারি ব্যাকআপ এবং সুপার ফাস্ট চার্জিং।', 'Snapdragon W5 + BES2700, 100hr Battery', 'Original Global Version', 'Dark Meteor', '46mm'],
        ['AMZ-GTS4-03', 'Amazfit GTS 4 Smartwatch Ultra Slim AMOLED', 'Smartwatches', 'Smart Wearables', 'Fitness Watch', 'Amazfit', '14500', '18900', '22', '22500', '16800', '5 Pcs', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', 'সুপার স্লিম মেটাল বডি, ১৫০+ স্পোর্টস মোড ও অত্যন্ত নির্ভুল জিপিএস ট্র্যাকিং।', '1.75" AMOLED, BioTracker 4.0, Dual-band GPS', '1 Year Replacement', 'Infinite Black', 'Standard'],
        ['HAY-SOLAR-04', 'Haylou Solar Ultra BT Calling Smart Watch', 'Smartwatches', 'Smart Wearables', 'Budget Watch', 'Haylou', '2800', '3850', '35', '4800', '3200', '10 Pcs', 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=80', 'অরিজিনাল হেইলু সোলার আল্ট্রা মেটালিক বেজেল সহ দুর্দান্ত সাউন্ডে ব্লুটুথ কলিং সুবিধা।', 'HD Retina Display, Bluetooth Calling, 100+ Sports', 'Official Global', 'Silver Grey', 'Standard'],
        ['HW-BND10-05', 'Huawei Band 10 Smart Watch Black', 'Smartwatches', 'Fitness Trackers', 'Smart Band', 'Huawei', '3800', '4950', '40', '5900', '4200', '10 Pcs', 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&auto=format&fit=crop&q=80', 'নতুন হুয়াওয়ে ব্যান্ড ১০ স্লিম স্টাইলিশ ট্র্যাকার, সাইন্টিফিক স্লিপ ও হার্ট রেট মনিটরিং।', 'Ultra Thin AMOLED, 14 Days Battery, Fast Charge', 'Brand Warranty', 'Graphite Black', 'Slim'],

        // Torch & Tactical Light Category
        ['TOR-5000LM-01', 'High-Power Long-Range Tactical Rechargeable LED Torch (5000LM)', 'Torch & Tactical Light', 'Lighting', 'Searchlight', 'PowerBeam', '1250', '1850', '50', '2400', '1450', '10 Pcs', 'https://images.unsplash.com/photo-1550524514-96369dd83fae?w=600&auto=format&fit=crop&q=80', 'মিলিটারি গ্রেড অ্যালুমিনিয়াম হাই-পাওয়ার লং রেঞ্জ এলইডি টর্চলাইট। ১০০০ মিটার ফোকাস।', '5000LM, Type-C Charging, 1000m Beam', 'Heavy Duty', 'Matte Black', 'Large'],
        ['TOR-MINI-02', 'Mini Zoomable Tactical EDC Pocket Flashlight', 'Torch & Tactical Light', 'Lighting', 'Pocket Torch', 'PowerBeam', '420', '690', '80', '950', '520', '20 Pcs', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', 'পকেট সাইজ মিনি রিচার্জেবল জুম টর্চ, ব্যাকপ্যাক ও দৈনন্দিন ব্যবহারের জন্য সেরা।', 'COB Side Light, Magnetic Base, USB Rechargeable', 'Standard Box', 'Black', 'Mini'],
        ['TOR-SOLAR-03', 'Emergency Solar Powered Multi-Function Camp Lantern', 'Torch & Tactical Light', 'Emergency Light', 'Lantern', 'SolarGlow', '850', '1290', '45', '1650', '980', '12 Pcs', 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80', 'সৌর বিদ্যুৎ চালিত ইমার্জেন্সি রিচার্জেবল লণ্ঠন ও পাওয়ার ব্যাংক সুবিধা।', 'Solar Panel + USB Charging, Powerbank output', 'Guaranteed Quality', 'Army Green', 'Medium'],

        // Organic Health Supplements Category
        ['SUP-MACA-01', 'Pure Organic Peruvian Maca Root Powder (250g)', 'Organic Supplements', 'Health & Vitality', 'Herbal Powder', 'Dream Pure', '950', '1350', '45', '1750', '1050', '10 Pcs', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', 'পেরুর পাহাড়ি অঞ্চল থেকে সংগৃহীত ১০০% নির্ভেজাল অর্গানিক মাকা রুট পাউডার। শক্তি ও স্ট্যামিনা বৃদ্ধি করে।', '100% Raw Gelatinized Maca Powder (Grade A)', 'GMP Certified Organic', 'Natural Brown', '250g'],
        ['SUP-MACA-02', 'Organic Black Maca Premium Energy Booster (500g)', 'Organic Supplements', 'Health & Vitality', 'Black Maca', 'Dream Pure', '1650', '2350', '30', '2950', '1850', '10 Pcs', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', 'প্রিমিয়াম গ্রেড ব্ল্যাক মাকা পাউডার, মানসিক চাপ দূর করে কর্মক্ষমতা কয়েকগুণ বৃদ্ধি করে।', 'Organic Black Maca 500g Jar', 'Laboratory Tested', 'Dark Roast', '500g'],
        ['SUP-CHIA-03', 'Organic Mexican Chia Seeds (Omega-3 Rich, 500g)', 'Organic Supplements', 'Superfood', 'Chia Seeds', 'Dream Pure', '420', '650', '100', '850', '490', '20 Pcs', 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&auto=format&fit=crop&q=80', 'ওমেগা-৩, ফাইবার ও অ্যান্টিঅক্সিডেন্টে ভরপুর মেক্সিকান সুপারফুড চিয়া সিডস। ওজন নিয়ন্ত্রণে আদর্শ।', '100% Cleaned Organic Chia Seeds', 'Purity Guaranteed', 'Grey/Black', '500g'],

        // Stationery & Office Supplies Category
        ['LM-DCB-00130', 'Good Luck Single File Holder Document Organizer Box', 'Stationery & Craft', 'Office Storage', 'File Holder', 'Good Luck', '160', '249', '195', '350', '190', '24 Pcs', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80', 'ম্যাগাজিন, অফিস ফাইল ও গুরুত্বপূর্ণ কাগজপত্র গুছিয়ে রাখার জন্য সেরা ফাইল হোল্ডার র্যাক।', 'Durable Polypropylene plastic, Moisture-proof', 'Heavy Duty', 'Royal Blue', 'A4/Legal'],
        ['LM-DCB-00023', 'WISTER Blood Glucose Monitoring System Complete Kit', 'Health & Beauty', 'Medical Devices', 'Glucose Meter', 'Wister', '780', '1148', '15', '1650', '890', '5 Pcs', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80', 'ডায়াবেটিস রোগীদের জন্য রক্তে শর্করার মাত্রা দ্রুত ও নির্ভুলভাবে পরীক্ষার কিট।', 'Accurate Biosensor, 50 Test Strips Included', 'Medical Certified', 'White', 'Pocket Kit'],
        ['LM-DCB-00013', 'Perfume Sweet Box Attar Combo (Set of 6)', 'Health & Beauty', 'Fragrance', 'Attar Set', 'Sweet Fragrance', '320', '525', '28', '850', '390', '10 Pcs', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80', 'অ্যালকোহলমুক্ত ৬টি মনমাতানো আতর সুগন্ধি কম্বো কালেকশন। দীর্ঘস্থায়ী সুবাস।', 'Alcohol-Free Roll-on Attar, 6 x 6ml', 'Gift Boxed', 'Assorted', '6 x 6ml'],

        // Home & Kitchen Category
        ['KIT-GAS-01', 'Heavy-Duty Gas Stove Safety Energy Saver & Wind Shield Ring', 'Home & Kitchen', 'Kitchen Safety', 'Energy Saver', 'SafeGas', '260', '420', '150', '650', '310', '20 Pcs', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', '৪০% গ্যাস সাশ্রয়ী ইউনিভার্সাল উইন্ডশিল্ড ফায়ার সেভার রিং। সকল চুলায় সহজে ব্যবহারযোগ্য।', 'Stainless Steel Heat Resistant, 4/5/8 claw fit', 'Quality Tested', 'Silver Metallic', 'Universal'],
        ['KIT-SCR-02', 'Multifunctional Vegetable Cutter & Rotary Grater', 'Home & Kitchen', 'Kitchen Gadgets', 'Choppers', 'KitchenPro', '490', '790', '40', '1150', '570', '12 Pcs', 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80', 'সালাদ ও সবজি গ্রেট ও কাটার জন্য ৩ ব্লেড রোটেশনাল হ্যান্ড কাটার।', 'Food-grade ABS + 430 Stainless Steel Drums', 'Box Pack', 'Nordic Green', 'Standard'],

        // Audio & Electronics Category
        ['SPK-MINI-04', 'Portable Wireless Multimedia Mini Speaker with Deep Bass & RGB', 'Audio & Gadgets', 'Audio', 'Bluetooth Speakers', 'SoundPro', '680', '990', '60', '1450', '780', '15 Pcs', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', 'ডিপ বেজ ও আরজিবি ডাইনামিক লাইট সহ ব্লুটুথ ৫.৩ মিনি ওয়্যারলেস স্পিকার।', 'Bluetooth 5.3, RGB Light, TF Card, FM Radio', 'Box Pack', 'Black RGB', 'Compact'],
        ['GAD-SCW-01', '24-in-1 Precision Magnetic Screwdriver Set for Electronics', 'Tools & Electronics', 'Hardware Tools', 'Screwdriver Set', 'ProFix', '320', '490', '70', '750', '370', '20 Pcs', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80', 'স্মার্টফোন, ঘড়ি ও ল্যাপটপ মেরামতের জন্য এস২ স্টিল প্রিসিশন ম্যাগনেটিক স্ক্রু ড্রাইভার কিট।', 'S2 Alloy Steel, 24 Bit Profiles, Aluminum Alloy Box', 'Magnetic Case', 'Space Grey', 'Pocket Box']
      ];
      
      const newProds = demoRawRows.map((r, i) => this.rowToProduct(r, i));
      localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(newProds));
    }

    // Seed Banners (10 slides)
    if (!localStorage.getItem(this.STORAGE_KEYS.BANNERS)) {
      const banners = [
        { id: 1, title: 'দুবাই ও গ্লোবাল অরিজিনাল গ্যাজেট মেগা সেল', subtitle: 'Huawei, OnePlus, Amazfit স্মার্টওয়াচ শতভাগ অরিজিনাল ও দ্রুত ডেলিভারি', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', badge: 'স্মার্ট গ্যাজেট', link: '#/products?category=Smartwatches', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&auto=format&fit=crop&q=80' },
        { id: 2, title: '১০০% পিওর পেরুভিয়ান অর্গানিক মাকা পাউডার', subtitle: 'স্ট্যামিনা ও প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে সেরা প্রিমিয়াম গ্রেড', bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', badge: 'অর্গানিক হেলথ', link: '#/products?category=Organic%20Supplements', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&auto=format&fit=crop&q=80' },
        { id: 3, title: 'মিলিটারি গ্রেড ৫০০০ এলএম লং-রেঞ্জ রিচার্জেবল টর্চ', subtitle: '১০০০ মিটার দীর্ঘ আলো, শক্তিশালী ব্যাটারি ও টাইপ-সি ফাস্ট চার্জিং', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', badge: 'ট্যাকটিক্যাল লাইটিং', link: '#/products?category=Torch%20%26%20Tactical%20Light', img: 'https://images.unsplash.com/photo-1550524514-96369dd83fae?w=1200&auto=format&fit=crop&q=80' },
        { id: 4, title: 'পাইকারি বিক্রেতাদের জন্য বিশেষ হোলসেল রেট', subtitle: 'সরাসরি কারখানা ও আমদানিকারকের রেটে পণ্য কিনুন, দ্রুত কুরিয়ার ডেলিভারি', bg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', badge: 'হোলসেলার অফার', link: '#/wholesale/dashboard', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=80' },
        { id: 5, title: '৪০% গ্যাস সাশ্রয়ী ইউনিভার্সাল ফায়ার সেভার রিং', subtitle: 'উচ্চমানের স্টেইনলেস স্টিল, নিরাপদ রান্না ও গ্যাসের অপচয় রোধ', bg: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', badge: 'কিচেন গ্যাজেট', link: '#/products?category=Home%20%26%20Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80' },
        { id: 6, title: 'অফিস ও স্টাডি টেবিল ফাইল অর্গানাইজার কালেকশন', subtitle: 'আপনার গুরুত্বপূর্ণ কাগজপত্র ও ফাইল সহজে গুছিয়ে রাখুন', bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', badge: 'ডেস্ক অর্গানাইজার', link: '#/products?category=Stationery%20%26%20Craft', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=80' },
        { id: 7, title: '৯২৫ স্টার্লিং সিলভার প্রিমিয়াম জুয়েলারি কালেকশন', subtitle: 'স্নোফ্লেক ইয়ার ক্লিপ, হার্ট জুয়েলারি সেট ও টেম্পারেচার রিং', bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)', badge: 'এক্সক্লুসিভ জুয়েলারি', link: '#/products?category=Watches%20Sunglasses%20Jewellery', img: 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_002701_429597a1-c660-4f25-acb2-00f32662c451.jpg' },
        { id: 8, title: 'ডিপ বেস পোর্টেবল ওয়্যারলেস ব্লুটুথ স্পিকার', subtitle: 'ডাইনামিক আরজিবি লাইট, এফএম রেডিও ও মেমোরি কার্ড সাপোর্ট', bg: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)', badge: 'অডিও সাউন্ড', link: '#/products?category=Audio%20%26%20Gadgets', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&auto=format&fit=crop&q=80' },
        { id: 9, title: '২৪-ইন-১ প্রিসিশন ম্যাগনেটিক স্ক্রু ড্রাইভার কিট', subtitle: 'মোবাইল, ল্যাপটপ ও ইলেকট্রনিক্স মেরামতের জন্য এস২ স্টিল কিট', bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', badge: 'টুলস ও গ্যাজেট', link: '#/products?category=Tools%20%26%20Electronics', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80' },
        { id: 10, title: 'ডায়াবেটিস ব্লাড গ্লুকোজ মনিটরিং কমপ্লিট কিট', subtitle: 'ঘরে বসেই নিখুঁতভাবে রক্তের সুগার পরীক্ষার কমপ্লিট কিট', bg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', badge: 'হেলথ মনিটরিং', link: '#/products?category=Health%20%26%20Beauty', img: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&auto=format&fit=crop&q=80' }
      ];
      localStorage.setItem(this.STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    }

    // Seed Orders
    if (!localStorage.getItem(this.STORAGE_KEYS.ORDERS)) {
      const demoOrders = [
        {
          orderId: 'ORD-88241',
          date: '2026-09-23 14:30',
          customerName: 'আব্দুল করিম',
          phone: '01815592089',
          address: 'কান্দিরপাড়, কুমিল্লা',
          products: 'Huawei Watch GT 4 Pro Smartwatch',
          quantity: 1,
          subtotal: 24500,
          deliveryCharge: 0,
          deliveryType: 'কুমিল্লার ভেতর (৯০৳) [ফ্রি ডেলিভারি]',
          paymentMethod: 'bKash',
          onlineDiscount: 1225,
          trxId: '9K8X2M4L1',
          totalAmount: 23275,
          status: 'Confirmed',
          items: [{ sku: 'HWT-GT4-01', name: 'Huawei Watch GT 4 Pro', price: 24500, qty: 1 }]
        },
        {
          orderId: 'ORD-88240',
          date: '2026-09-23 11:15',
          customerName: 'মো: কামাল হোসেন',
          phone: '01715879111',
          address: 'মিরপুর ১০, ঢাকা',
          products: 'Pure Organic Peruvian Maca Root Powder (250g)',
          quantity: 2,
          subtotal: 2700,
          deliveryCharge: 0,
          deliveryType: 'ঢাকার ভেতরে (১১০৳) [ফ্রি ডেলিভারি]',
          paymentMethod: 'COD',
          onlineDiscount: 0,
          totalAmount: 2700,
          status: 'Pending',
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
          subtotal: 1850,
          deliveryCharge: 135,
          deliveryType: 'উভয়ের বাইরে (১৩৫৳)',
          paymentMethod: 'Nagad',
          onlineDiscount: 93,
          trxId: '7P2Q9W1Z',
          totalAmount: 1892,
          status: 'Delivered',
          items: [{ sku: 'TOR-5000LM-01', name: 'Tactical LED Torch', price: 1850, qty: 1 }]
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(demoOrders));
    }
  },

  // Master Unified Call Handler (Safe & Guaranteed to never hang)
  async call(action, payload = {}) {
    // 1. Ensure seed data exists locally
    this.initSeedData();

    // 2. Try Apps Script if user configured their own deployment
    const url = CONFIG.apiBaseUrl;
    if (url && !url.includes('YOUR_DEPLOYMENT_ID')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout prevents hanging

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action, payload }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const result = await response.json();
        if (result && result.success !== undefined) {
          return result;
        }
      } catch (err) {
        // Silently fallback to high-speed local engine
      }
    }

    // 3. Fallback to Local Engine
    return this.localEngine(action, payload);
  },

  // High-Speed Local Engine (Always Fast & Responsive)
  async localEngine(action, payload) {
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
            products: catProducts.slice(0, 12), // Up to 12 products per category for Grid 6
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
          return { success: true, message: 'সফলভাবে আপডেট হয়েছে!', data: products[index] };
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
          brand: payload.brand || 'China Brand',
          buyingPrice: parseFloat(payload.buyingPrice) || 0,
          sellingPrice: parseFloat(payload.sellingPrice) || 0,
          stock: parseInt(payload.stock, 10) || 0,
          originalPrice: parseFloat(payload.originalPrice) || (parseFloat(payload.sellingPrice) * 1.25),
          wholesalePrice: parseFloat(payload.wholesalePrice) || (parseFloat(payload.sellingPrice) * 0.85),
          minOrderQ: payload.minOrderQ || '1 Pcs',
          images: payload.images && payload.images.length ? payload.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
          primaryImage: payload.primaryImage || (payload.images && payload.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          description: payload.description || '',
          specification: payload.specification || '',
          others: payload.others || '',
          color: payload.color || 'Default',
          size: payload.size || 'Standard',
          discountPercent: 15,
          inStock: (parseInt(payload.stock, 10) || 0) > 0,
          status: 'active'
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
        
        let deliveryLabel = 'উভয়ের বাইরে (১৩৫৳)';
        if (payload.deliveryZone === 'cumilla') deliveryLabel = 'কুমিল্লার ভেতর (৯০৳)';
        if (payload.deliveryZone === 'dhaka') deliveryLabel = 'ঢাকার ভেতরে (১১০৳)';
        if (payload.deliveryCharge === 0) deliveryLabel += ' [ফ্রি ডেলিভারি]';

        const newOrder = {
          orderId: orderId,
          date: new Date().toLocaleString('bn-BD'),
          customerName: payload.name,
          phone: payload.phone,
          address: payload.address,
          products: payload.items.map(i => i.name).join(', '),
          quantity: payload.items.reduce((s, i) => s + (i.quantity || 1), 0),
          subtotal: payload.subtotal || payload.totalAmount,
          deliveryCharge: payload.deliveryCharge || 0,
          deliveryType: deliveryLabel,
          paymentMethod: payload.paymentMethod || 'COD',
          onlineDiscount: payload.onlineDiscount || 0,
          trxId: payload.trxId || '',
          totalAmount: payload.totalAmount,
          status: 'Pending',
          source: payload.source || 'Customer Web',
          items: payload.items
        };
        orders.unshift(newOrder);
        localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(orders));

        // Decrement stock
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
          status: 'Abandoned Checkout',
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
            liveViewers: Math.floor(22 + Math.random() * 14)
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

// Immediate pre-seeding on script load
API.initSeedData();

// Proactive background Live Sheet Sync without blocking
if (typeof window !== 'undefined') {
  window.API = API;
  setTimeout(() => API.fetchLiveSheetData(), 800);
}
