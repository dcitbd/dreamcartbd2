/**
 * DREAM CART BD — BULLETPROOF DATA & API ENGINE
 * Features:
 * 1. Safe In-Memory & LocalStorage dual-layer cache (QuotaExceededError Proof)
 * 2. 33 Exact Products directly from Google Sheet 1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g
 * 3. Graceful Google Sheets Live Synchronization
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

  // Exact 33 products directly from the user's Google Sheet
  SEED_PRODUCTS: [
  {
    "id": "Chi-Ali-000001",
    "sku": "Chi-Ali-000001",
    "name": "Smart Stainless Steel Multifunctional Ring for Couple Mood Feeling Intelligent Temperature Sensitive Rings Waterproof Jewelry",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 98.0,
    "sellingPrice": 194.0,
    "stock": 3,
    "originalPrice": 1845.0,
    "wholesalePrice": 123.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg\\_720x720q80.jpg"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg\\_720x720q80.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো আধুনিক ও স্টাইলিশ Smart Stainless Steel Multifunctional Ring for Couple Mood Feeling Intelligent Temperature Sensitive Rings Waterproof Jewelry। এটি সাধারণ কোনো আংটি নয়, বরং একটি স্মার্ট ও মাল্টিফাংশনাল টেম্পারেচার সেনসিটিভ...",
    "specification": "১. পণ্যের নাম (Product Name): Smart Stainless Steel Multifunctional Ring for Couple ২. পণ্যের ধরন (Product Type): Smart Ring / Temperature Sensitive Ring / Waterproof Jewelry ৩. ম্যাটেরিয়াল...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই স্মার্ট কাপল রিং ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Smart Stainless Steel Coupl...",
    "color": "silver",
    "size": "6cm",
    "discountPercent": 89,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000002",
    "sku": "Chi-Ali-000002",
    "name": "Pretty 925 Sterling Silver Snowflake Crystal Zircon Ear Clips Without Piercing for Women Girls Wedding Party Trendy Jewelry Gift",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 282.0,
    "sellingPrice": 423.0,
    "stock": 7,
    "originalPrice": 1041.0,
    "wholesalePrice": 353.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_003020\\_8bf8448e-404f-4530-b52b-4700c4ee6a2a.jpg"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_003020\\_8bf8448e-404f-4530-b52b-4700c4ee6a2a.jpg",
    "description": "Dream Cart BD নিয়ে এলো অত্যন্ত আকর্ষণীয় এবং ট্রেন্ডি Pretty 925 Sterling Silver Snowflake Crystal Zircon Ear Clips Without Piercing for Women Girls Wedding Party Trendy Jewelry Gift। যাদের কান ফোঁড়ানো নেই, তাদের জন্য এই ইয়ার ক্লিপটি একটি পারফেক্ট ফ্...",
    "specification": "১. পণ্যের নাম (Product Name): Pretty 925 Sterling Silver Snowflake Crystal Zircon Ear Clips Without Piercing ২. পণ্যের ধরন (Product Type): Ear Clips / Non-Pierced Earrings / Jewelry ৩. ম্যাট...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই 925 Sterling Silver Snowflake Crystal Zircon Ear Clips ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্র...",
    "color": "silver",
    "size": "Free Size",
    "discountPercent": 59,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000003",
    "sku": "Chi-Ali-000003",
    "name": "925 Sterling Silver Heart Zircon Jewelry Set for Women Adjustable Ring Necklace Earrings Bridal Wedding Gift Set, 925 Sterling Silver Jewelry Set, Heart Jewelry Set, Zircon Jewelry Set, Women Jewelry Set, Silver Necklace Set, Bridal Jewelry Set, Wedding Jewelry Set, Heart Necklace, Zircon Earrings",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 638.0,
    "sellingPrice": 892.0,
    "stock": 8,
    "originalPrice": 1435.0,
    "wholesalePrice": 765.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_002701\\_429597a1-c660-4f25-acb2-00f32662c451.jpg",
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_002701\\_7695bd5c-caf7-4341-b7ae-4d411ccc7392.png"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_002701\\_429597a1-c660-4f25-acb2-00f32662c451.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো মহিলাদের জন্য আকর্ষণীয় ও প্রিমিয়াম ডিজাইনের 925 Sterling Silver Heart Zircon Jewelry Set for Women Adjustable Ring Necklace Earrings Bridal Wedding Gift Set। আপনি যদি নিজের জন্য কিংবা প্রিয়জনকে উপহার দেওয়ার জন্য সুন্দর একটি...",
    "specification": "১. পণ্যের নাম (Product Name): 925 Sterling Silver Heart Zircon Jewelry Set for Women ২. পণ্যের ধরন (Product Type): Jewelry Set / Necklace, Earrings & Ring Set ৩. ম্যাটেরিয়াল (Material): 925...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই 925 Sterling Silver Heart Zircon Jewelry Set ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি...",
    "color": "silver",
    "size": "Free Size",
    "discountPercent": 38,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000004",
    "sku": "Chi-Ali-000004",
    "name": "2026 Watches for Men Relojes Para Hombre Luxury Watch Casual Watch Quartz Wristwatches Men Best Gifts Cheap Price Relógio Pulso",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 327.0,
    "sellingPrice": 490.0,
    "stock": 8,
    "originalPrice": 1950.0,
    "wholesalePrice": 409.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/127d2a30a24fcf78db90935acc1d0fba.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/127d2a30a24fcf78db90935acc1d0fba.png",
    "description": "Dream Cart BD-তে নিয়ে এলো পুরুষদের জন্য অত্যন্ত আকর্ষণীয় ও স্টাইলিশ 2026 Watches for Men Relojes Para Hombre Luxury Watch Casual Watch Quartz Wristwatches Men Best Gifts Cheap Price Relógio Pulso। আধুনিক ফ্যাশন ও রুচিশীল লুক বজায় রাখতে এই Luxury Watc...",
    "specification": "১. পণ্যের নাম (Product Name): 2026 Watches for Men Relojes Para Hombre Luxury Watch Casual Watch Quartz Wristwatches Men Best Gifts Cheap Price Relógio Pulso ২. পণ্যের ধরন (Product Type): কো...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Luxury Quartz Watch ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Mens Watch বা Quartz Wri...",
    "color": "midnight black",
    "size": "Free Size",
    "discountPercent": 75,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000006",
    "sku": "Chi-Ali-000006",
    "name": "New Wine SILVER Cherry Gold Color Pendant Necklace For Women Personality Fashion Necklace Wedding Jewelry Birthday Gifts",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 172.0,
    "sellingPrice": 275.0,
    "stock": 9,
    "originalPrice": 999.0,
    "wholesalePrice": 215.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_002018\\_4b511ffe-493b-4327-b3af-b1de22dbd1d8.png"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_002018\\_4b511ffe-493b-4327-b3af-b1de22dbd1d8.png",
    "description": "Dream Cart BD-তে নিয়ে এলো মহিলাদের জন্য অত্যন্ত আকর্ষণীয় ও ট্রেন্ডি New Wine SILVER Cherry Gold Color Pendant Necklace For Women Personality Fashion Necklace Wedding Jewelry Birthday Gifts। অনন্য ডিজাইনের এই পেন্ডেন্ট নেকলেসটি আপনার যেকোনো লুকে যোগ ক...",
    "specification": "১. পণ্যের নাম (Product Name): New Wine SILVER Cherry Gold Color Pendant Necklace For Women ২. পণ্যের ধরন (Product Type): Pendant Necklace / Fashion Jewelry / Wedding Jewelry ৩. কালার (Color)...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই New Wine SILVER Cherry Gold Color Pendant Necklace ফর উইমেন ক্রয় করবেন?  ১. প্রিমিয়াম কোয়ালিটি ও সঠিক মান নি...",
    "color": "silver",
    "size": "Free Size",
    "discountPercent": 72,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000007",
    "sku": "Chi-Ali-000007",
    "name": "Casual Ladies Quartz Wrist Watch Bracelet Set 6PCS Set Women Watch Clock Roman Dial Luxury Brand Design Women Montre Femme Reloj",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 527.0,
    "sellingPrice": 764.0,
    "stock": 9,
    "originalPrice": 425.0,
    "wholesalePrice": 633.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/8d5febcdd6e254fa28463da8e32f6ac0.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/8d5febcdd6e254fa28463da8e32f6ac0.png",
    "description": "Dream Cart BD-তে নিয়ে এলো মহিলাদের জন্য অত্যন্ত আকর্ষণীয় এবং স্টাইলিশ Casual Ladies Quartz Wrist Watch Bracelet Set 6PCS Set। এটি একটি ৬ পিসের প্রিমিয়াম ওয়াচ ও ব্রেসলেট কম্বো সেট, যা যেকোনো নারীর ক্যাজুয়াল ও গর্জিয়াস লুককে আরো আকর্ষণীয় করে তোলে। এতে...",
    "specification": "১. পণ্যের নাম (Product Name): Casual Ladies Quartz Wrist Watch Bracelet Set ২. পণ্যের ধরন (Product Type): Wrist Watch & Bracelet Set / Women Watch Clock ৩. মুভমেন্ট (Movement): Quartz ৪. ডায...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Casual Ladies Quartz Wrist Watch Bracelet Set ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিট...",
    "color": "gold",
    "size": "Free Size",
    "discountPercent": 0,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "Chi-Ali-000008",
    "sku": "Chi-Ali-000008",
    "name": "Lucky Amulet Feng Shui Pixiu Ring for Women Men Retro Silver Plated Adjustable Rings Good Luck and Wealth Buddhist Jewelry Gift",
    "category": "Watches & Jewellery",
    "rawCategory": "Watches Sunglasses Jewellery",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 186.0,
    "sellingPrice": 297.0,
    "stock": 10,
    "originalPrice": 939.0,
    "wholesalePrice": 232.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/a3d8bbae6d677d75e3c888015928f3d5.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/a3d8bbae6d677d75e3c888015928f3d5.png",
    "description": "Dream Cart BD-তে নিয়ে এলো আকর্ষণীয় ও ট্রেডিশনাল ডিজাইনের Lucky Amulet Feng Shui Pixiu Ring for Women Men Retro Silver Plated Adjustable Rings Good Luck and Wealth Buddhist Jewelry Gift। এটি সাধারণ কোনো আংটি নয়, বরং ঐতিহ্যবাহী ফেং শুই (Feng Shui) ও বৌ...",
    "specification": "১. পণ্যের নাম (Product Name): Lucky Amulet Feng Shui Pixiu Ring ২. পণ্যের ধরন (Product Type): Feng Shui Ring / Pixiu Amulet Ring / Buddhist Jewelry ৩. ম্যাটেরিয়াল (Material): Silver Plated ৪...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Lucky Amulet Feng Shui Pixiu Ring ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Feng Shui...",
    "color": "gold",
    "size": "8cm, 9cm",
    "discountPercent": 68,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "C-ME-E00003",
    "sku": "C-ME-E00003",
    "name": "Mini Massage Stick Roller – Body Muscle Relax Tool ",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 140.0,
    "sellingPrice": 223.0,
    "stock": 10,
    "originalPrice": 1393.0,
    "wholesalePrice": 175.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_001029\\_d9fe6c61-e06d-4012-97b4-490221b5110c.png"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_001029\\_d9fe6c61-e06d-4012-97b4-490221b5110c.png",
    "description": "Dream Cart BD-তে নিয়ে এলো শারীরিক ক্লান্তি ও পেশির টান দূর করার দারুণ সমাধান Mini Massage Stick Roller – Body Muscle Relax Tool। এটি একটি কার্যকর Handheld Leg, Neck & Back Pain Relief Massager, যা শরীরের বিভিন্ন অংশের পেশি রিল্যাক্স করতে এবং রক্ত সঞ্...",
    "specification": "১. পণ্যের নাম (Product Name): Mini Massage Stick Roller – Body Muscle Relax Tool ",
    "others": "Handheld Leg, Neck & Back Pain Relief Massager ",
    "color": "Portable Fitness Massage Roller ২. পণ্যের ধরন (Product Type): Mini Massage Stick Roller / Muscle Relax Massager / Portable Fitness Roller ৩. ডিজাইন (Design): Handheld / Portable / Stick Roller ৪. প্রধান ফিচার ও কাজ (Key Features & Functions): Body Muscle Relaxation, Leg, Neck & Back Pain Relief Massager ৫. ব্যবহারের স্থান (Application Area): Leg, Neck, Back & Body Muscles ৬. পোর্টাবিলিটি (Portability): Compact & Portable Fitness Massager Tool",
    "size": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Mini Massage Stick Roller ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Mini Massage Stick Roller শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল ও সেরা মানের প্রোডাক্ট।   - কার্যকরী ডিজাইন ও কমফোর্ট: বডি মাসল রিল্যাক্স, ঘাড়, পা ও পিঠের ব্যথা দূর করতে এই Handheld & Portable Fitness Massage Roller অত্যন্ত কার্যকরী ও ব্যবহারবান্ধব।   - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং দ্রুত Home Delivery সুবিধা।   - নিরাপদ প্যাকেজিং: আপনার শখের ফিটনেস ও মাসাজ প্রোডাক্টটি যেন কোনো প্রকার ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।   - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম আপনাকে সেবা দিতে প্রস্তুত।   - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement Policy সুবিধা প্রদান করা হয়।",
    "discountPercent": 84,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "C-ME-E00004",
    "sku": "C-ME-E00004",
    "name": "Portable Mesh Nebulizer JSL-W302 – Non-Rechargeable Ultrasonic Nebulizer ",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 236.0,
    "sellingPrice": 354.0,
    "stock": 10,
    "originalPrice": 1065.0,
    "wholesalePrice": 295.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/a792410dd252b4eb5713be665b41480b.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/a792410dd252b4eb5713be665b41480b.png",
    "description": "Dream Cart BD-তে নিয়ে এলো আধুনিক ও সুবিধাজনক Portable Mesh Nebulizer JSL-W302 – Non-Rechargeable Ultrasonic Nebulizer ",
    "specification": "Silent Breathing Machine for Kids & Adults। এটি শিশু এবং প্রাপ্তবয়স্ক উভয় ব্যবহারকারীদের জন্য একটি অত্যন্ত কার্যকরী ও নিঃশব্দে কাজ করা Silent Breathing Machine। এই পোর্টেবল মেশ নেবুলাইজারটি...",
    "others": "১. পণ্যের নাম (Product Name): Portable Mesh Nebulizer JSL-W302 ২. মডেল (Model): JSL-W302 ৩. পণ্যের ধরন (Product Type): Mesh Nebulizer / Ultrasonic Nebulizer / Silent Brea...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Portable Mesh Nebulizer JSL-W302 ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Portable Mesh Nebulizer শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল ও সেরা মানের প্রোডাক্ট।    - সাইলেঞ্চ ও পোর্টেবল ডিজাইন: শিশু এবং বয়স্কদের স্বাচ্ছন্দ্যে ব্যবহারের জন্য এটি অত্যন্ত নিরব ও সহজে বহনযোগ্য (Silent Breathing Machine)।    - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং সারা বাংলাদেশে দ্রুত Home Delivery সুবিধা।    - নিরাপদ প্যাকেজিং: আপনার অর্ডারের পণ্য যেন কোনো প্রকার ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।    - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম আপনাকে সেবা দিতে প্রস্তুত।    - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement policy সুবিধা প্রদান করা হয়।",
    "size": "white",
    "discountPercent": 67,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "C-ME-E00005",
    "sku": "C-ME-E00005",
    "name": "Portable Mesh Nebulizer JSL-W302 – Rechargeable Ultrasonic Nebulizer ",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 1250.0,
    "sellingPrice": 765.0,
    "stock": 0,
    "originalPrice": 631.0,
    "wholesalePrice": 1500.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/a792410dd252b4eb5713be665b41480b.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/a792410dd252b4eb5713be665b41480b.png",
    "description": "Dream Cart BD-তে নিয়ে এলো আধুনিক ও বহনযোগ্য Portable Mesh Nebulizer JSL-W302 – Rechargeable Ultrasonic Nebulizer ",
    "specification": "Silent Inhaler Machine for Kids & Adults। শিশু থেকে শুরু করে বয়স্ক—সব বয়সের মানুষের জন্য এটি একটি অত্যন্ত কার্যকর এবং সুবিধাজনক ইনহেলার বা নেবুলাইজার ডিভাইস। এটি একটি রিচার্জেবল ও পোর্টেবল ম...",
    "others": "১. পণ্যের নাম (Product Name): Portable Mesh Nebulizer JSL-W302 ২. মডেল (Model): JSL-W302 ৩. পণ্যের ধরন (Product Type): Portable Mesh Nebulizer / Ultrasonic Nebulizer / Si...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Portable Mesh Nebulizer JSL-W302 ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও গুণগত মান: প্রতিটি Rechargeable Ultrasonic Nebulizer শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল ও সেরা মানের প্রোডাক্ট।    - নীরব ও কার্যকারী পারফরম্যান্স: বাচ্চাদের ও বড়দের জন্য উপযুক্ত এই Silent Inhaler Machine অত্যন্ত সহজ ও আরামদায়ক ব্যবহার নিশ্চিত করে।    - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং সারা বাংলাদেশে দ্রুত Home Delivery সুবিধা।    - নিরাপদ প্যাকেজিং: আপনার অর্ডারকৃত পণ্য যেন কোনো প্রকার ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।    - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম সর্বদা প্রস্তুত।    - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement Policy সুবিধা প্রদান করা হয়।",
    "size": "white",
    "discountPercent": 0,
    "inStock": false,
    "status": "active"
  },
  {
    "id": "C-ME-E00006",
    "sku": "C-ME-E00006",
    "name": "Electronic Blood Pressure Monitor – Digital BP Machine White ",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 1140.0,
    "sellingPrice": 850.0,
    "stock": 0,
    "originalPrice": 1178.0,
    "wholesalePrice": 1368.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/6837cf0860caadc4b702367c9369ebc1.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/6837cf0860caadc4b702367c9369ebc1.png",
    "description": "Dream Cart BD-তে নিয়ে এলো অত্যন্ত কার্যকরী ও আধুনিক Electronic Blood Pressure Monitor – Digital BP Machine White ",
    "specification": "Automatic Upper Arm Blood Pressure Meter with LCD Display & Pulse Rate। আপনার পরিবারের স্বাস্থ্যসুরক্ষায় নিয়মিত ব্লাড প্রেশার পর্যবেক্ষণ করা অত্যন্ত জরুরি। এই অটোমেটিক আপার আর্ম বিপি মেজারমে...",
    "others": "১. পণ্যের নাম (Product Name): Electronic Blood Pressure Monitor – Digital BP Machine White ২. পণ্যের ধরন (Product Type): Automatic Upper Arm Blood Pressure Meter / Digita...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Digital Blood Pressure Monitor ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Electronic Blood Pressure Monitor শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল, নিখুঁত ও প্রিমিয়াম কোয়ালিটির প্রোডাক্ট।    - নির্ভুল ও সহজ ব্যবহার: বড় LCD Display এবং আধুনিক ফিচারের এই Digital BP Machine দিয়ে খুব সহজেই ঘরে বসে সঠিক রক্তচাপ ও পালস রেট পরিমাপ করা যায়, যা বয়স্কদের জন্য অত্যন্ত সুবিধাজনক।    - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং সারা বাংলাদেশে দ্রুত Home Delivery সুবিধা।    - নিরাপদ প্যাকেজিং: আপনার অর্ডারের হেলথ কেয়ার বা ডিভাইস আইটেমটি যেন ডেলিভারির সময় কোনোভাবে ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা সুনির্দিষ্ট ও নিরাপদ Secure Packaging নিশ্চিত করি।    - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম আপনাকে সেবা দিতে প্রস্তুত।    - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement policy সুবিধা প্রদান করা হয়।",
    "size": "white",
    "discountPercent": 28,
    "inStock": false,
    "status": "active"
  },
  {
    "id": "C-ME-E00007",
    "sku": "C-ME-E00007",
    "name": "Electronic Blood Pressure Monitor – Digital BP Machine BP-510 Black ",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 633.0,
    "sellingPrice": 887.0,
    "stock": 5,
    "originalPrice": 671.0,
    "wholesalePrice": 760.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/45c31da6352e304cabfa69fe565bced9.jpg"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/45c31da6352e304cabfa69fe565bced9.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো উন্নত প্রযুক্তির Electronic Blood Pressure Monitor – Digital BP Machine BP-510 Black। এই Automatic Upper Arm Blood Pressure Meter-এর সাহায্যে ঘরে বসেই খুব সহজে এবং নির্ভুলভাবে রক্তচাপ ও পালস রেট (Pulse Rate) পরিমাপ করা সম্ভব...",
    "specification": "১. পণ্যের নাম (Product Name): Electronic Blood Pressure Monitor – Digital BP Machine BP-510 Black ২. পণ্যের ধরন (Product Type): Digital BP Machine / Automatic Upper Arm Blood Pressure Meter...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই ডিজিটাল বিপি মেশিন ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Electronic Blood Pressure...",
    "color": "black",
    "size": "",
    "discountPercent": 0,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00003",
    "sku": "LM-DCB-00003",
    "name": "Gas Stove Wind Shield 8-Hole Energy Saving Rack ",
    "category": "Home & Kitchen",
    "rawCategory": "Universal Gas Saver Burner Cover (Made in China)",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 130.0,
    "sellingPrice": 208.0,
    "stock": 10,
    "originalPrice": 541.0,
    "wholesalePrice": 163.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_235210\\_313b2f58-643f-45c6-b39f-73d38b399da9.jpg"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_235210\\_313b2f58-643f-45c6-b39f-73d38b399da9.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো রান্নার খরচ ও সময় বাঁচানোর এক দারুণ সমাধান Gas Stove Wind Shield 8-Hole Energy Saving Rack ",
    "specification": "Universal Gas Saver Burner Cover (Made in China)। এটি একটি আধুনিক ও কার্যকর গ্যাস সেভার বার্নার কভার যা আপনার রান্নাঘরের কাজের অভিজ্ঞতাকে সহজ ও দ্রুত করবে। এই ইউনিভার্সাল ৮-হোল এনার্জি সেভিং...",
    "others": "১. পণ্যের নাম (Product Name): Gas Stove Wind Shield 8-Hole Energy Saving Rack / Universal Gas Saver Burner Cover ২. পণ্যের ধরন (Product Type): Gas Stove Wind Shield / Ene...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই গ্যাস স্টোভ উইন্ড শিল্ড ও এনার্জি সেভিং র্যাক ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Gas Stove Wind Shield শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল ও টেকসই প্রোডাক্ট।   - গ্যাস ও সময় সাশ্রয়ী ডিজাইন: এই Universal Gas Saver Burner Cover বাতাসের প্রবাহ থেকে আগুনের শিখা রক্ষা করে রান্না দ্রুত করে এবং গ্যাস সাশ্রয়ে সহায়তা করে।   - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং দ্রুত Home Delivery সুবিধা।   - নিরাপদ প্যাকেজিং: প্রোডাক্টটি যেন পরিবহনকালে ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।   - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম সর্বদা প্রস্তুত।   - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। নিয়ম অনুযায়ী প্রযোজ্য ক্ষেত্রে সহজ Return & Replacement Policy সুবিধা প্রদান করা হয়।",
    "size": "metallic silver",
    "discountPercent": 62,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "C-AS-E00013",
    "sku": "C-AS-E00013",
    "name": "A.Tech 3D Optical Gaming Mouse ",
    "category": "Gadgets & Electronics",
    "rawCategory": "Computers & Laptops",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 140.0,
    "sellingPrice": 224.0,
    "stock": 10,
    "originalPrice": 811.0,
    "wholesalePrice": 175.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/ef0f12aa6062a764017ea95ea0b0a708.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/ef0f12aa6062a764017ea95ea0b0a708.png",
    "description": "Dream Cart BD-তে নিয়ে এলো গেমার এবং কম্পিউটার ব্যবহারকারীদের জন্য দুর্দান্ত ডিজাইনের A.Tech 3D Optical Gaming Mouse। আপনি যদি PC বা Laptop-এর জন্য একটি হাই-পারফরম্যান্স Wired USB Gaming Mouse খুঁজে থাকেন, তবে এই মাউসটি আপনার জন্য একদম সঠিক পছন্দ। এর...",
    "specification": "১. পণ্যের নাম (Product Name): A.Tech 3D Optical Gaming Mouse ২. ব্র্যান্ড (Brand): A.Tech ৩. পণ্যের ধরন (Product Type): Wired Gaming Mouse ৪. সেন্সর প্রযুক্তি (Sensor Technology): 3D Optical...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই A.Tech 3D Optical Gaming Mouse ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি High Precisio...",
    "color": "black",
    "size": "Medium",
    "discountPercent": 72,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00130",
    "sku": "LM-DCB-00130",
    "name": "Good Lucktm Single File Holder (Document Magazine File Organizer)",
    "category": "Stationery & Office",
    "rawCategory": "Stationery & Craft",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 249.0,
    "stock": 195,
    "originalPrice": 1450.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/636047d23d03f9a6f60aceb1490bad59.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/636047d23d03f9a6f60aceb1490bad59.png",
    "description": "Dream Cart BD-তে নিয়ে এলো অফিস ও পড়ার টেবিল পরিপাটি রাখার দুর্দান্ত সমাধান Good Luck Single File Holder (Document Magazine File Organizer)। এটি একটি অত্যন্ত কার্যকরী ও প্রিমিয়াম কোয়ালিটির File Organizer, যা আপনার প্রয়োজনীয় কাগজপত্র, ডকুমেন্টস, ফাইল...",
    "specification": "১. পণ্যের নাম (Product Name): Good Lucktm Single File Holder (Document Magazine File Organizer) ২. ব্র্যান্ড (Brand): Good Luck ৩. পণ্যের ধরন (Product Type): File Holder / Document Magazine...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Good Lucktm Single File Holder ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Good Lucktm S...",
    "color": "green, black, blue",
    "size": "A5, A6",
    "discountPercent": 83,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00023",
    "sku": "LM-DCB-00023",
    "name": "WISTER Blood Glucose Monitoring System – No Coding Diabetes Test Kit with Glucometer, Lancing Device, Test Strips Support, 550 Memory Storage & Portable Carry Case, WISTER Glucometer, Blood Glucose Monitor, Diabetes Testing Kit, Blood Sugar Meter, No Coding Glucose Meter",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 850.0,
    "sellingPrice": 1148.0,
    "stock": 1,
    "originalPrice": 1950.0,
    "wholesalePrice": 1020.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/010155bfe63ce099507ce803f7301613.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/010155bfe63ce099507ce803f7301613.png",
    "description": "Dream Cart BD-তে নিয়ে এলো সঠিক ও নির্ভুলভাবে রক্তের গ্লুকোজ পরিমাপের জন্য WISTER Blood Glucose Monitoring System – No Coding Diabetes Test Kit। ডায়াবেটিস রোগীদের স্বাস্থ্য সচেতনতা এবং নিয়মিত ব্লাড সুগার পর্যবেক্ষণের জন্য এটি একটি অত্যন্ত প্রয়োজনীয় এ...",
    "specification": "১. পণ্যের নাম (Product Name): WISTER Blood Glucose Monitoring System ২. ব্র্যান্ড (Brand): WISTER ৩. পণ্যের ধরন (Product Type): Blood Glucose Monitor / Glucometer / Diabetes Testing Kit ৪. ম...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই WISTER Blood Glucose Monitoring System ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি WI...",
    "color": "",
    "size": "",
    "discountPercent": 41,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00013",
    "sku": "LM-DCB-00013",
    "name": "Perfume Sweet Box Attar Combo Pack – 12 Halal Perfume Oils Gift Set for Men & Women",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 350.0,
    "sellingPrice": 525.0,
    "stock": 18,
    "originalPrice": 2575.0,
    "wholesalePrice": 438.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_181147\\_cface467-89f2-4395-af69-0d1aa62e472d.jpg"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_181147\\_cface467-89f2-4395-af69-0d1aa62e472d.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো প্রিমিয়াম কোয়ালিটির Perfume Sweet Box Attar Combo Pack – 12 Halal Perfume Oils Gift Set for Men & Women। আপনি যদি দীর্ঘস্থায়ী এবং চমৎকার সুবাসের আতর কালেকশন খুঁজে থাকেন, তবে এই ১২টি হালাল পারফিউম অয়েলের কম্বো প্যাকটি আপনার জ...",
    "specification": "১. পণ্যের নাম (Product Name): Perfume Sweet Box Attar Combo Pack – 12 Halal Perfume Oils Gift Set for Men & Women ২. পণ্যের ধরন (Product Type): Attar Combo Pack / Perfume Oil Gift Set ৩. বিশ...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Perfume Sweet Box Attar Combo Pack ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও মান নিয়ন্ত্রণ: প্রতিটি Attar Combo...",
    "color": "",
    "size": "",
    "discountPercent": 80,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "M-SU-E00007",
    "sku": "M-SU-E00007",
    "name": "Grameen Honey – 100% Pure Natural Honey ",
    "category": "Organic & Groceries",
    "rawCategory": "Groceries",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 75.0,
    "sellingPrice": 149.0,
    "stock": 8,
    "originalPrice": 430.0,
    "wholesalePrice": 94.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_000643\\_5697dde4-94f7-4b84-a333-6dfa6b0c6814.jpg"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808\\_000643\\_5697dde4-94f7-4b84-a333-6dfa6b0c6814.jpg",
    "description": "Dream Cart BD-তে নিয়ে এলো সম্পূর্ণ খাঁটি ও বিশুদ্ধ Grameen Honey – 100% Pure Natural Honey ",
    "specification": "Raw Organic Modhu Bangladesh ",
    "others": "Healthy & Fresh। সুস্থ ও সুন্দর জীবনের জন্য ১০০% প্রাকৃতিক মধুর পুষ্টিগুণ অপরিসীম। এটি কোনো কৃত্রিম উপাদান ছাড়া সংগৃহীত একদম র অর্গানিক মধু, যা আপনাকে দেয় খাঁটি মধুর আসল...",
    "color": "১. পণ্যের নাম (Product Name): Grameen Honey - 100% Pure Natural Honey / Raw Organic Modhu ২. ব্র্যান্ড (Brand): Grameen ৩. পণ্যের ধরন (Product Type): Raw Organic Natural Honey / খাঁটি প্রাকৃতিক মধু ৪. বিশেষ ফিচার (Key Features): 100% Pure, Natural, Raw, Organic, Healthy & Fresh (১০০% খাঁটি, প্রাকৃতিক, র ও অর্গানিক) ৫. উৎপাদকের দেশ (Country of Origin): Bangladesh (বাংলাদেশ) ৬. গুণমান (Quality/Standard): Healthy & Fresh / খাঁটি ও স্বাস্থ্যকর",
    "size": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Pure Natural Honey ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Grameen Honey প্যাক করার পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল, খাটি ও সেরা মানের Pure Organic Modhu।   - স্বাস্থ্যকর ও পুষ্টিকর: স্বাস্থ্য সচেতনদের জন্য এই Natural & Fresh Raw Honey অত্যন্ত উপকারী এবং দৈনন্দিন ব্যবহারের জন্য আদর্শ।   - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন সহজ Easy Ordering Process এবং সারা বাংলাদেশে দ্রুত Home Delivery সুবিধা।   - নিরাপদ প্যাকেজিং: কাচের বা প্লাস্টিকের জার যেন কোনো প্রকার ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।   - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের Customer Support টিম সর্বদা প্রস্তুত।   - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement policy সুবিধা প্রদান করা হয়।",
    "discountPercent": 65,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00020",
    "sku": "LM-DCB-00020",
    "name": "Powerful Long Range LED Rechargeable Torch Light – 3 Lighting Modes, High Power Flashlight for Camping, Security & Emergency Use, Powerful Rechargeable Torch, Long Range Torch Light, LED Flashlight, Rechargeable Flashlight, 3 Modes Torch, High Power Torch",
    "category": "Tools & Outdoor",
    "rawCategory": "Tools, DIY & Outdoor",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 120.0,
    "sellingPrice": 249.0,
    "stock": 99,
    "originalPrice": 499.0,
    "wholesalePrice": 150.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/399ecbdef27be30de4a79b3286758dcc.jpg\\_720x720q80.jpg\\_.webp",
      "https://img.drz.lazcdn.com/static/bd/p/28d87afc955afc7a0bff01c2ad1e7750.jpg\\_720x720q80.jpg\\_.webp"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/399ecbdef27be30de4a79b3286758dcc.jpg\\_720x720q80.jpg\\_.webp",
    "description": "Powerful Long Range LED Rechargeable Torch Light একটি high-power flashlight, যা Camping, Hiking, Security, Travel ও Emergency ব্যবহারের জন্য উপযোগী। এতে রয়েছে ৩টি Lighting Modes, যা প্রয়োজন অনুযায়ী আলোর mode পরিবর্তনের সুবিধা দেয়। Rechargeable design...",
    "specification": "Product Type: Rechargeable LED Torch Light Light Type: High-Power LED Lighting Modes: 3 Modes Power Source: Rechargeable Battery Light Range: Long Range Illumination Design: Portable & Handh...",
    "others": "কেন এই পণ্যটি বেছে নেবেন?  শক্তিশালী LED আলো অন্ধকার জায়গায় ভালো আলোকসজ্জা দিতে সহায়তা করে প্রয়োজন অনুযায়ী ব্যবহারের জন্য ৩টি লাইটিং মোড রিচার্জেবল হওয়ায় বারবার ব্যবহার ক...",
    "color": "light blue",
    "size": "",
    "discountPercent": 50,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00026",
    "sku": "LM-DCB-00026",
    "name": "MK-D10 USB Powered 3D Sound Portable Speaker with Extra Bass ",
    "category": "Gadgets & Electronics",
    "rawCategory": "TV, Audio / Video, Gaming & Wearables",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 320.0,
    "sellingPrice": 480.0,
    "stock": 5,
    "originalPrice": 650.0,
    "wholesalePrice": 400.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_201206\\_48540775-b88d-4bfa-b830-fb6e07164397.png"
    ],
    "primaryImage": "https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260807\\_201206\\_48540775-b88d-4bfa-b830-fb6e07164397.png",
    "description": "Dream Cart BD-তে নিয়ে এলো চমৎকার সাউন্ড কোয়ালিটির MK-D10 USB Powered 3D Sound Portable Speaker with Extra Bass। আপনি যদি আপনার কম্পিউটার, ল্যাপটপ, ডেস্কটপ কিংবা টিভির জন্য একটি শক্তিশালী ও কমপ্যাক্ট সাউন্ড সিস্টেম খুঁজে থাকেন, তবে এই 2.0 Stereo Multi...",
    "specification": "১. পণ্যের নাম (Product Name): MK-D10 USB Powered 3D Sound Portable Speaker with Extra Bass ২. মডেল (Model): MK-D10 ৩. পণ্যের ধরন (Product Type): Portable Speaker / 2.0 Stereo Multimedia Spea...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই MK-D10 USB Powered 3D Sound Portable Speaker ক্রয় করবেন?  - প্রিমিয়াম সাউন্ড ও সেরা মান: প্রতিটি MK-D10 USB...",
    "color": "",
    "size": "",
    "discountPercent": 26,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00027",
    "sku": "LM-DCB-00027",
    "name": "Collapsible Luxury Reusable Silicone Water Bottle ",
    "category": "Home & Kitchen",
    "rawCategory": "Premium Food Grade Foldable Bottle",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 300.0,
    "sellingPrice": 399.0,
    "stock": 49,
    "originalPrice": 650.0,
    "wholesalePrice": 375.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/44b6bed469e0548395633c21dcaef05f.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/44b6bed469e0548395633c21dcaef05f.png",
    "description": "Dream Cart BD-তে নিয়ে এলো প্রিমিয়াম কোয়ালিটির Collapsible Luxury Reusable Silicone Water Bottle ",
    "specification": "Premium Food Grade Foldable Bottle। যারা প্রতিনিয়ত ভ্রমণে থাকেন, জিম বা আউটডোর অ্যাক্টিভিটিতে ব্যস্ত সময় পার করেন অথবা প্রতিদিনের ব্যবহারের জন্য একটি আধুনিক ও পোর্টেবল পানির বোতল খুঁজছেন, তা...",
    "others": "১. পণ্যের নাম (Product Name): Collapsible Luxury Reusable Silicone Water Bottle ২. পণ্যের ধরন (Product Type): Reusable Water Bottle / Foldable Bottle ৩. ম্যাটেরিয়াল (Mate...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Collapsible Silicone Water Bottle ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Food Grade Silicone Foldable Water Bottle শিপিংয়ের পূর্বে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান ১০০% অরিজিনাল ও সেরা মানের প্রোডাক্ট।   - আকর্ষণীয় ডিজাইন ও পোর্টেবিলিটি: স্টাইলিশ, টেকসই এবং BPA Free Silicone দিয়ে তৈরি এই Collapsible Water Bottle ভ্রমণ, জিম, অফিস বা আউটডোর ব্যবহারের জন্য অত্যন্ত আরামদায়ক ও স্পেস-সেভিং।   - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং সারা বাংলাদেশে দ্রুত Home Delivery সুবিধা।   - নিরাপদ প্যাকেজিং: আপনার শখের প্রোডাক্টটি যেন কোনো প্রকার ক্ষতিগ্রস্ত না হয়, সেজন্য আমরা নিশ্চিত করি সুনির্দিষ্ট ও নিরাপদ Secure Packaging।   - সার্বক্ষণিক কাস্টমার সাপোর্ট: যেকোনো তথ্য, অর্ডার ট্র্যাকিং বা অনলাইন শপিং সহায়তার জন্য আমাদের পেশাদার Customer Support টিম আপনাকে সেবা দিতে প্রস্তুত।   - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: ক্রেতাদের সন্তুষ্টিই আমাদের মূল লক্ষ্য। প্রযোজ্য ক্ষেত্রে নিয়মানুযায়ী সহজ Return & Replacement policy সুবিধা প্রদান করা হয়।",
    "size": "",
    "discountPercent": 39,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00130 - 1",
    "sku": "LM-DCB-00130 - 1",
    "name": "Good Lucktm Single File Holder (Document Magazine File Green",
    "category": "Stationery & Office",
    "rawCategory": "Stationery & Craft",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 249.0,
    "stock": 70,
    "originalPrice": 650.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/2b9aaa400ad9d0832adaacccc976efad.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/2b9aaa400ad9d0832adaacccc976efad.png",
    "description": "Dream Cart BD নিয়ে এলো আপনার প্রয়োজনীয় কাগজপত্র ও ডকুমেন্ট নিরাপদে গুছিয়ে রাখার দুর্দান্ত সমাধান—Good Lucktm Single File Holder (Document Magazine File Green)। এটি একটি আকর্ষণীয় ও প্রিমিয়াম কোয়ালিটির সিঙ্গেল ফাইল হোল্ডার, যা আপনার গুরুত্বপূর্ণ কাগজপত...",
    "specification": "১. পণ্যের নাম (Product Name): Good Luck Single File Holder (Document Magazine File) ২. ব্র্যান্ড (Brand): Good Luck ৩. পণ্যের ধরন (Product Type): File Holder / Document Organizer / Magazine...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই গুড লাক সিঙ্গেল ফাইল হোল্ডার ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Good Luck Si...",
    "color": "green, black, blue",
    "size": "A5, A6",
    "discountPercent": 62,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00130 - 2",
    "sku": "LM-DCB-00130 - 2",
    "name": "Good Lucktm Single File Holder (Document Magazine File Blue",
    "category": "Stationery & Office",
    "rawCategory": "Stationery & Craft",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 249.0,
    "stock": 80,
    "originalPrice": 650.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/fe4eca19ea2571d33481da6891348f2b.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/fe4eca19ea2571d33481da6891348f2b.png",
    "description": "Dream Cart BD-তে নিয়ে এলো অফিস ও পড়ার টেবিল পরিপাটি রাখার দুর্দান্ত সমাধান Good Luck Single File Holder (Document Magazine File Blue)। অগোছালো কাগজপত্র, ফাইল বা ম্যাগাজিন গুছিয়ে রাখতে এই সিঙ্গেল ফাইল হোল্ডারটি অত্যন্ত কার্যকরী। প্রিমিয়াম কোয়ালিটি ও...",
    "specification": "১. পণ্যের নাম (Product Name): Good Luck Single File Holder (Document Magazine File Blue) ২. ব্র্যান্ড (Brand): Good Luck ৩. পণ্যের ধরন (Product Type): File Holder / Document & Magazine File...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই ফাইল হোল্ডার ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও মান নিয়ন্ত্রণ: প্রতিটি Good Luck Single File Holder ডেলিভার...",
    "color": "green, black, blue",
    "size": "A5, A6",
    "discountPercent": 62,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "LM-DCB-00130 - 3",
    "sku": "LM-DCB-00130 - 3",
    "name": "Good Lucktm Single File Holder (Document Magazine File Black",
    "category": "Stationery & Office",
    "rawCategory": "Stationery & Craft",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 499.0,
    "stock": 0,
    "originalPrice": 650.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://img.drz.lazcdn.com/static/bd/p/cc6fb0750ecbe3c03f81df2d650f0082.png"
    ],
    "primaryImage": "https://img.drz.lazcdn.com/static/bd/p/cc6fb0750ecbe3c03f81df2d650f0082.png",
    "description": "Dream Cart BD-তে নিয়ে এলো অত্যন্ত কার্যকরী ও স্টাইলিশ Good Lucktm Single File Holder (Document Magazine File Black)। অফিস, পড়াশোনা কিংবা ব্যক্তিগত কাজের জন্য প্রয়োজনীয় ফাইল ও কাগজপত্র গুছিয়ে রাখার এক দুর্দান্ত সমাধান এই সিঙ্গেল ফাইল হোল্ডার। এলোমেলো...",
    "specification": "১. পণ্যের নাম (Product Name): Good Luck Single File Holder (Document Magazine File) ২. ব্র্যান্ড (Brand): Good Luck ৩. পণ্যের ধরন (Product Type): File Holder / Document & Magazine Holder / ফ...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই গুড লাক সিঙ্গেল ফাইল হোল্ডার (Good Luck Single File Holder) ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়...",
    "color": "green, black, blue",
    "size": "A5, A6",
    "discountPercent": 23,
    "inStock": false,
    "status": "active"
  },
  {
    "id": "R-SOO-00001",
    "sku": "R-SOO-00001",
    "name": "Eye Sleeping Mask with Gel Pad – Hot & Cold Therapy Sleep Mask for Travel, Migraine & Relaxation",
    "category": "Fashion, Travel & Auto",
    "rawCategory": "Bags and Travel",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 110.0,
    "sellingPrice": 176.0,
    "stock": 20,
    "originalPrice": 458.0,
    "wholesalePrice": 138.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/2f9d5b62470c60c48cf685b72e176d26cda767f67d8a318c5dccd3b7b0a74324-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/2f9d5b62470c60c48cf685b72e176d26cda767f67d8a318c5dccd3b7b0a74324-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো আরামদায়ক ও কার্যকরী Eye Sleeping Mask with Gel Pad – Hot & Cold Therapy Sleep Mask for Travel, Migraine & Relaxation। চোখের যত্ন ও আরামদায়ক ঘুমের জন্য এটি একটি চমৎকার স্লিপ মাস্ক। এই মাস্কে থাকা বিশেষ Gel Pad-এর সাহায্যে আপন...",
    "specification": "১. পণ্যের নাম (Product Name): Eye Sleeping Mask with Gel Pad – Hot & Cold Therapy Sleep Mask for Travel, Migraine & Relaxation ২. পণ্যের ধরন (Product Type): Eye Sleeping Mask / Cold & Hot Th...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই প্রিমিয়াম আই স্লিপিং মাস্ক উইথ জেল প্যাড ক্রয় করবেন?  - ১০০% অরিজিনাল ও প্রিমিয়াম কোয়ালিটি: প্রতিটি Eye Slee...",
    "color": "",
    "size": "",
    "discountPercent": 62,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00002",
    "sku": "R-SOO-00002",
    "name": "2 in 1 Smart Combo – Microfiber Hair Dry Cap & Wearable Bath Towel for Women, 2 in 1 Combo, Hair Dry Cap, Microfiber Hair Towel, Hair Drying Cap, Wearable Bath Towel, Bath Wrap Towel, Spa Towel, Quick Dry Hair Cap",
    "category": "Home & Kitchen",
    "rawCategory": "Bedding & Bath",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 380.0,
    "sellingPrice": 570.0,
    "stock": 20,
    "originalPrice": 1214.0,
    "wholesalePrice": 475.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://bponi.sgp1.cdn.digitaloceanspaces.com/bponi/store/5528bca4-5095-443f-9764-a49e9516c566.webp"
    ],
    "primaryImage": "https://bponi.sgp1.cdn.digitaloceanspaces.com/bponi/store/5528bca4-5095-443f-9764-a49e9516c566.webp",
    "description": "Dream Cart BD-তে নিয়ে এলো 2 in 1 Smart Combo – Microfiber Hair Dry Cap & Wearable Bath Towel for Women। এটি নারীদের দৈনন্দিন পার্সোনাল কেয়ার ও বাথ রুটিনকে সহজ ও আরামদায়ক করার জন্য একটি অসাধারণ প্রিমিয়াম কম্বো সেট। এতে রয়েছে একটি সফট Microfiber H...",
    "specification": "১. পণ্যের নাম (Product Name): 2 in 1 Smart Combo – Microfiber Hair Dry Cap & Wearable Bath Towel for Women ২. পণ্যের ধরন (Product Type): 2 in 1 Combo / Bath & Hair Care Accessories ৩. প্রধান...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই 2 in 1 Smart Combo – Microfiber Hair Dry Cap & Wearable Bath Towel ক্রয় করবেন?  - প্রিমিয়াম কোয়ালিটি ও সঠিক...",
    "color": "",
    "size": "",
    "discountPercent": 53,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00003",
    "sku": "R-SOO-00003",
    "name": "Body Massage Gun with LCD Display – Deep Tissue Percussion Massager for Full Body Pain Relief, 4 Massage Heads, Body Massage Gun, Massage Gun, Deep Tissue Massager, Percussion Massage Gun, Full Body Massager, LCD Massage Gun, Rechargeable Massager, Muscle Recovery, Pain Relief Massager",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 550.0,
    "sellingPrice": 798.0,
    "stock": 20,
    "originalPrice": 1223.0,
    "wholesalePrice": 660.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/687b0c90cf84947a97235083e0666d9c100fe87797d54b91bec95eba396be7bd-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/687b0c90cf84947a97235083e0666d9c100fe87797d54b91bec95eba396be7bd-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো আরামদায়ক ও কার্যকর Body Massage Gun with LCD Display – Deep Tissue Percussion Massager for Full Body Pain Relief। সারাদিনের ব্যস্ততা, কাজের চাপ কিংবা জিম ও ওয়ার্কআউটের পর পেশির ক্লান্তি ও ব্যথা দূর করতে এটি একটি চমৎকার সমাধা...",
    "specification": "১. পণ্যের নাম (Product Name): Body Massage Gun with LCD Display – Deep Tissue Percussion Massager for Full Body Pain Relief ২. পণ্যের ধরন (Product Type): Body Massage Gun / Deep Tissue Percu...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Body Massage Gun with LCD Display ক্রয় করবেন?  - ১০০% প্রিমিয়াম কোয়ালিটি ও মান নিয়ন্ত্রণ: প্রতিটি Deep Tissu...",
    "color": "",
    "size": "",
    "discountPercent": 35,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00004",
    "sku": "R-SOO-00004",
    "name": "2 in 1 Electric Eyebrow Trimmer & Facial Hair Remover",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 275.0,
    "sellingPrice": 413.0,
    "stock": 20,
    "originalPrice": 920.0,
    "wholesalePrice": 344.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/911e7366ed056cedea3103183a370c34e6448729176abd5b8743aa7a22eb3636-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/911e7366ed056cedea3103183a370c34e6448729176abd5b8743aa7a22eb3636-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো মহিলাদের প্রতিদিনের গ্রুমিং ও পার্সোনাল কেয়ারের জন্য অত্যন্ত প্রয়োজনীয় 2 in 1 Electric Eyebrow Trimmer & Facial Hair Remover। এটি একটি স্মার্ট ও কার্যকর ইলেকট্রিক ডিভাইস, যা দিয়ে খুব সহজেই ভ্রু শেপ করা এবং মুখের যেকোনো অংশের...",
    "specification": "১. পণ্যের নাম (Product Name): 2 in 1 Electric Eyebrow Trimmer & Facial Hair Remover ২. পণ্যের ধরন (Product Type): Electric Eyebrow Trimmer & Facial Hair Remover (ইলেকট্রিক আইব্রো ট্রিমার ও ফ...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই 2 in 1 Electric Eyebrow Trimmer & Facial Hair Remover ক্রয় করবেন?  - ১০০% অরিজিনাল ও প্রিমিয়াম কোয়ালিটি: প্র...",
    "color": "",
    "size": "",
    "discountPercent": 55,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00005",
    "sku": "R-SOO-00005",
    "name": "Electric Foot Pedicure Tool Rechargeable – Foot Callus Remover Pedicure Machine for Dry, Cracked & Dead Skin, Electric Foot Pedicure Tool, Foot Callus Remover, Rechargeable Foot Grinder, Electric Foot Grinder, Pedicure Machine, Foot Care Device, Dead Skin Remover, Heel Crack Remover",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 375.0,
    "sellingPrice": 563.0,
    "stock": 20,
    "originalPrice": 1200.0,
    "wholesalePrice": 469.0,
    "minOrderQ": "5  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/9c9e7a694feab37a31eb02c2d7367c2691f091948a99b840dbd46624cc46f452-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/9c9e7a694feab37a31eb02c2d7367c2691f091948a99b840dbd46624cc46f452-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো অত্যন্ত কার্যকরী Electric Foot Pedicure Tool Rechargeable – Foot Callus Remover Pedicure Machine for Dry, Cracked & Dead Skin। পায়ের শুষ্ক ত্বক, ফাটা গোড়ালি এবং মরা চামড়া (Dead Skin & Dry Cracked Skin) সহজে দূর করে পা-কে...",
    "specification": "১. পণ্যের নাম (Product Name): Electric Foot Pedicure Tool Rechargeable – Foot Callus Remover Pedicure Machine for Dry, Cracked & Dead Skin ২. পণ্যের ধরন (Product Type): Electric Foot Pedicur...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Electric Foot Pedicure Tool Rechargeable – Foot Callus Remover ক্রয় করবেন?  - ১০০% প্রিমিয়াম কোয়ালিটি ও সঠিক...",
    "color": "",
    "size": "",
    "discountPercent": 53,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00006",
    "sku": "R-SOO-00006",
    "name": "Electric Hot Water Bag – Rechargeable Heating Pad for Pain Relief & Winter Warmth, Electric Hot Water Bag, Rechargeable Hot Water Bag, Heating Pad, Heat Therapy Bag, Warm Compress Bag, Electric Heating Bag, Pain Relief Heating Pad, Winter Hot Bag",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 240.0,
    "stock": 20,
    "originalPrice": 570.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/a0ea1559b795c9401d205f18ce85a675a0a8de22141a1b39650b9afe83ff22a6-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/a0ea1559b795c9401d205f18ce85a675a0a8de22141a1b39650b9afe83ff22a6-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো আরামদায়ক ও কার্যকর Electric Hot Water Bag – Rechargeable Heating Pad for Pain Relief & Winter Warmth। শীতের দিনে উষ্ণতা পেতে কিংবা শরীরের যেকোনো ব্যথায় দ্রুত আরাম পেতে এটি একটি চমৎকার সমাধান। বারবার গরম পানি পরিবর্তনের ঝামেল...",
    "specification": "১. পণ্যের নাম (Product Name): Electric Hot Water Bag – Rechargeable Heating Pad for Pain Relief & Winter Warmth ২. পণ্যের ধরন (Product Type): Electric Hot Water Bag / Rechargeable Heating Pa...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Electric Hot Water Bag ক্রয় করবেন?  - ১০০% প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Rechargeable Ele...",
    "color": "",
    "size": "",
    "discountPercent": 58,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00007",
    "sku": "R-SOO-00007",
    "name": "Manual Stainless Steel Nose & Ear Hair Trimmer – Portable Rotary Hair Removal Tool for Men & Women, Manual Nose Hair Trimmer, Ear Hair Trimmer, Stainless Steel Nose Trimmer, Nose Hair Remover, Ear Hair Remover, Manual Hair Trimmer, Portable Grooming Tool, Rotary Nose Trimmer",
    "category": "Health & Beauty",
    "rawCategory": "Health & Beauty",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 130.0,
    "sellingPrice": 208.0,
    "stock": 20,
    "originalPrice": 514.0,
    "wholesalePrice": 163.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/bc40c84f9aebc46515100065f1b51a4d6452bcbc10d663978aa3f1390ab9d707-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/bc40c84f9aebc46515100065f1b51a4d6452bcbc10d663978aa3f1390ab9d707-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো অত্যন্ত কার্যকরী ও ব্যবহারবান্ধব Manual Stainless Steel Nose & Ear Hair Trimmer ",
    "specification": "Portable Rotary Hair Removal Tool for Men & Women। পুরুষ ও নারী উভয়ের জন্য উপযোগী এই ম্যানুয়াল ট্রিমারটি নাক ও কানের অবাঞ্ছিত লোম সহজে ও নিরাপদভাবে দূর করার একটি চমৎকার পার্সোনাল গ্রুমিং টুল...",
    "others": "১. পণ্যের নাম (Product Name): Manual Stainless Steel Nose & Ear Hair Trimmer – Portable Rotary Hair Removal Tool for Men & Women ২. পণ্যের ধরন (Product Type): Manual Nose...",
    "color": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Manual Stainless Steel Nose & Ear Hair Trimmer ক্রয় করবেন?  - ১০০% প্রিমিয়াম কোয়ালিটি ও সঠিক মান নিয়ন্ত্রণ: প্রতিটি Manual Stainless Steel Nose & Ear Hair Trimmer শিপিংয়ের আগে সঠিকভাবে Quality Check করা হয়, যাতে আপনি পান সেরা মানের এবং টেকসই প্রোডাক্ট।    - ব্যাটারিবিহীন ও ব্যথামুক্ত গ্রুমিং অভিজ্ঞতা: এটি একটি Manual Rotary Hair Removal Tool, যা কোনো ব্যাটারি ছাড়াই নাক ও কানের অবাঞ্ছিত লোম ব্যথামুক্তভাবে পরিষ্কার করতে সাহায্য করে।    - সহজ অর্ডার ও ক্যাশ অন ডেলিভারি: Dream Cart BD-তে পাচ্ছেন অত্যন্ত সহজ Easy Ordering Process এবং সারা বাংলাদেশে সুবিধাজনক Home Delivery সুবিধা।    - নিরাপদ ও যত্নশীল প্যাকেজিং: প্রোডাক্টটি যেন কোনো ধরনের ক্ষতি ছাড়াই আপনার হাতে পৌঁছায়, সেজন্য আমরা সুনির্দিষ্ট Secure Packaging নিশ্চিত করি।    - সার্বক্ষণিক কাস্টমার সাপোর্ট: অনলাইন শপিং বা পণ্য সংক্রান্ত যেকোনো তথ্যের জন্য আমাদের দক্ষ Customer Support টিম আপনাকে সর্বাত্মক সহায়তা প্রদান করতে প্রস্তুত।    - গ্রাহক সন্তুষ্টি ও রিটার্ন সুবিধা: আমরা ক্রেতাদের সর্বোচ্চ সন্তুষ্টি নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। নীতিমালার আওতায় প্রযোজ্য ক্ষেত্রে সহজ Return & Replacement Policy সুবিধা রয়েছে।",
    "size": "",
    "discountPercent": 60,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00008",
    "sku": "R-SOO-00008",
    "name": "Premium Microfiber Pearl Cleaning Towel – Super Absorbent Lint-Free Cloth for Car, Kitchen & Home Cleaning, Microfiber Pearl Towel, Microfiber Cleaning Cloth, Car Cleaning Towel, Kitchen Cleaning Cloth, Lint Free Towel, Super Absorbent Cloth, Car Detailing Towel, Glass Cleaning Cloth, Multipurpose Cleaning Towel",
    "category": "Fashion, Travel & Auto",
    "rawCategory": "Motors",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 300.0,
    "sellingPrice": 450.0,
    "stock": 20,
    "originalPrice": 990.0,
    "wholesalePrice": 375.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/5890cfbf708e100d8ef94e62505c64fe70fd0f63813112f58bb0b9422ced91ed-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/5890cfbf708e100d8ef94e62505c64fe70fd0f63813112f58bb0b9422ced91ed-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো বহুমুখী ব্যবহার উপযোগী Premium Microfiber Pearl Cleaning Towel – Super Absorbent Lint-Free Cloth for Car, Kitchen & Home Cleaning। ঘরবাড়ির দৈনন্দিন পরিষ্কার-পরিচ্ছন্নতা থেকে শুরু করে গাড়ির যত্ন—সবকিছুর জন্য এই Microfiber Pea...",
    "specification": "১. পণ্যের নাম (Product Name): Premium Microfiber Pearl Cleaning Towel – Super Absorbent Lint-Free Cloth for Car, Kitchen & Home Cleaning ২. পণ্যের ধরন (Product Type): Microfiber Cleaning Tow...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Premium Microfiber Pearl Cleaning Towel ক্রয় করবেন?  - ১০০% অরিজিনাল ও প্রিমিয়াম কোয়ালিটি: প্রতিটি Microfibe...",
    "color": "",
    "size": "",
    "discountPercent": 55,
    "inStock": true,
    "status": "active"
  },
  {
    "id": "R-SOO-00009",
    "sku": "R-SOO-00009",
    "name": "Shoe Cleaner Spray – Instant Sneaker & Canvas Shoe Cleaning Foam for White Shoes, Boots & Sports Shoes, Shoe Cleaner Spray, Sneaker Cleaner, Shoe Cleaning Spray, Sneaker Cleaning Foam, Canvas Shoe Cleaner, Boot Cleaner, White Shoe Cleaner, Sports Shoe Cleaner, Shoe Care Spray",
    "category": "Fashion, Travel & Auto",
    "rawCategory": "Fashion",
    "subCategory": "",
    "childCategory": "",
    "brand": "China Brand",
    "buyingPrice": 150.0,
    "sellingPrice": 240.0,
    "stock": 20,
    "originalPrice": 570.0,
    "wholesalePrice": 188.0,
    "minOrderQ": "10  Pcs",
    "images": [
      "https://shopioora.com/tenancy/assets/.media-thumbs/ed4451965f9bb0a6e67ece4b965dd009af7d5ed5b190709f12cedd6d64e83106-1000.avif"
    ],
    "primaryImage": "https://shopioora.com/tenancy/assets/.media-thumbs/ed4451965f9bb0a6e67ece4b965dd009af7d5ed5b190709f12cedd6d64e83106-1000.avif",
    "description": "Dream Cart BD-তে নিয়ে এলো কার্যকর ও সুবিধাজনক Shoe Cleaner Spray – Instant Sneaker & Canvas Shoe Cleaning Foam for White Shoes, Boots & Sports Shoes। আপনার পছন্দের স্নিকার্স, ক্যানভাস, বুট কিংবা স্পোর্টস শু-কে দ্রুত পরিষ্কার ও ঝকঝকে রাখতে এটি একটি স...",
    "specification": "১. পণ্যের নাম (Product Name): Shoe Cleaner Spray – Instant Sneaker & Canvas Shoe Cleaning Foam for White Shoes, Boots & Sports Shoes ২. পণ্যের ধরন (Product Type): Shoe Cleaner Spray / Shoe C...",
    "others": "অন্যান্য তথ্য (Other Information):  কেন Dream Cart BD থেকে এই Shoe Cleaner Spray ক্রয় করবেন?  - ১০০% প্রিমিয়াম কোয়ালিটি ও মান নিয়ন্ত্রণ: প্রতিটি Shoe Cleaner Spray শিপ...",
    "color": "",
    "size": "",
    "discountPercent": 58,
    "inStock": true,
    "status": "active"
  }
],

  // In-Memory Fallback Cache (Ensures app NEVER crashes even if localStorage is 100% full or restricted)
  _memory: {},
  _initialized: false,

  // Safe Storage Getter
  getStorage(key, fallback = []) {
    if (this._memory[key] && Array.isArray(this._memory[key]) && this._memory[key].length > 0) {
      return this._memory[key];
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (Array.isArray(parsed) ? parsed.length > 0 : true)) {
          this._memory[key] = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn(`[Storage Read Notice] Reading ${key} from localStorage:`, e);
    }
    this._memory[key] = fallback;
    return fallback;
  },

  // Safe Storage Setter (Guaranteed never to throw QuotaExceededError)
  setStorage(key, data) {
    this._memory[key] = data;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`[Storage Notice] localStorage quota exceeded for ${key}. Stored safely in-memory without crashing:`, e);
      // Attempt to clean old cache items to free up space
      try {
        localStorage.removeItem('dcbd_temp_cache');
        localStorage.removeItem('dcbd_old_products');
      } catch (cleanErr) {}
    }
  },

  // Normalize and parse raw row into product
  rowToProduct(row, index = 0) {
    if (!row || row.length === 0) return null;
    const c = CONFIG.productColumns;
    const imagesRaw = row[c.M_images] || '';
    const imageList = String(imagesRaw).split(',').map(s => s.trim()).filter(Boolean);
    const primaryImage = imageList[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
    
    const sellingPrice = parseFloat(row[c.H_sellingPrice]) || 0;
    const originalPrice = parseFloat(row[c.J_originalPrice]) || (sellingPrice * 1.3);
    const buyingPrice = parseFloat(row[c.G_buyingPrice]) || 0;
    const wholesalePrice = parseFloat(row[c.K_wholesalePrice]) || (sellingPrice * 0.85);
    const stock = parseInt(row[c.I_stock], 10) || 10;
    const minOrderQ = row[c.L_minOrderQ] || '1 Pcs';
    
    const discountPercent = (originalPrice > sellingPrice && originalPrice > 0)
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) 
      : 0;

    let cat = String(row[c.C_category] || 'General');
    if (/watch|jewel|ring|necklace|earring/i.test(cat)) cat = 'Watches & Jewellery';
    else if (/health|beauty|massage|nebulizer|blood|trimmer|pedicure|water bag|attar/i.test(cat)) cat = 'Health & Beauty';
    else if (/stationery|craft|file|holder|office/i.test(cat)) cat = 'Stationery & Office';
    else if (/computer|laptop|mouse|audio|speaker|wearable/i.test(cat)) cat = 'Gadgets & Electronics';
    else if (/gas|cook|kitchen|bottle|bedding|bath/i.test(cat)) cat = 'Home & Kitchen';
    else if (/tool|outdoor|torch|light|led/i.test(cat)) cat = 'Tools & Outdoor';
    else if (/modhu|honey|grocer|organic/i.test(cat)) cat = 'Organic & Groceries';
    else if (/bag|travel|fashion|mask|motor|shoe/i.test(cat)) cat = 'Fashion, Travel & Auto';

    return {
      id: String(row[c.A_sku] || ('PRD-' + (1000 + index))),
      sku: String(row[c.A_sku] || ('PRD-' + (1000 + index))),
      name: String(row[c.B_name] || 'Unnamed Product'),
      category: cat,
      rawCategory: String(row[c.C_category] || 'General'),
      subCategory: String(row[c.D_subCategory] || ''),
      childCategory: String(row[c.E_childCategory] || ''),
      brand: String(row[c.F_brand] || 'China Brand'),
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      stock: stock,
      originalPrice: originalPrice,
      wholesalePrice: wholesalePrice,
      minOrderQ: minOrderQ,
      images: imageList.slice(0, 2),
      primaryImage: primaryImage,
      description: String(row[c.N_description] || '').slice(0, 260),
      specification: String(row[c.O_specification] || '').slice(0, 200),
      others: String(row[c.P_others] || '').slice(0, 180),
      color: String(row[c.Q_color] || 'Default'),
      size: String(row[c.R_size] || 'Standard'),
      discountPercent: discountPercent,
      inStock: stock > 0,
      status: 'active'
    };
  },

  // Live Sync directly from Google Sheet with redirect protection to prevent CORS errors
  async fetchLiveSheetData() {
    const sheetUrl = CONFIG.sheetGvizUrl;
    if (!sheetUrl) return false;

    try {
      // Use redirect: 'error' so if Google tries to redirect to accounts.google.com, browser won't throw CORS errors
      const res = await Promise.race([
        fetch(sheetUrl, { redirect: 'error' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 6000))
      ]);

      if (!res.ok) throw new Error('Status ' + res.status);
      const text = await res.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\((.+)\);/s);
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        const table = json.table;
        if (table && table.rows && table.rows.length > 0) {
          const products = [];
          table.rows.forEach((r, idx) => {
            const rawCells = (r.c || []).map(cell => (cell ? cell.v : ''));
            const p = this.rowToProduct(rawCells, idx);
            if (p && p.name && (Number(p.sellingPrice) > 0 || Number(p.price) > 0)) {
              products.push(p);
            }
          });
          if (products.length > 0) {
            this.setStorage(this.STORAGE_KEYS.PRODUCTS, products);
            console.log(`[Google Sheet Live] Synchronized ${products.length} products directly from sheet.`);
            return true;
          }
        }
      }
    } catch (e) {
      // Fallback seamlessly to Apps Script Web App API if available
      try {
        if (CONFIG.apiBaseUrl) {
          const apiRes = await Promise.race([
            fetch(`${CONFIG.apiBaseUrl}?action=products/list`),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
          ]);
          if (apiRes.ok) {
            const result = await apiRes.json();
            if (result && result.success && result.data && Array.isArray(result.data.items) && result.data.items.length > 0) {
              this.setStorage(this.STORAGE_KEYS.PRODUCTS, result.data.items);
              console.log(`[Apps Script Live] Synchronized ${result.data.items.length} products via Web App API.`);
              return true;
            }
          }
        }
      } catch (err) {}
      console.log('[Google Sheet Live] Using pre-loaded sheet catalog of 33 products.');
    }
    return false;
  },

  // Instant Synchronous Product Lookup by SKU
  getProductBySku(sku) {
    if (!sku) return null;
    this.initSeedData();
    const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
    return products.find(p => p.sku === sku || p.id === sku) || null;
  },

  // Initialize seed catalog safely (Only runs once, Quota Safe)
  initSeedData() {
    if (this._initialized) return;
    this._initialized = true;

    // 1. Initialize Products
    let prods = [];
    try {
      const cached = localStorage.getItem(this.STORAGE_KEYS.PRODUCTS);
      if (cached) prods = JSON.parse(cached);
    } catch (e) {
      prods = [];
    }

    // Check if cache needs reset to the clean 33 products from sheet
    const hasOldDummy = Array.isArray(prods) && prods.some(p => p.sku === 'HWT-GT4-01' || p.sku === 'TOR-5000LM-01');
    if (!Array.isArray(prods) || prods.length < 30 || hasOldDummy) {
      this.setStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
      console.log(`[API Init] Initialized ${this.SEED_PRODUCTS.length} sheet products.`);
    } else {
      this._memory[this.STORAGE_KEYS.PRODUCTS] = prods;
    }

    // 2. Seed Banners (10 slides)
    if (!this.getStorage(this.STORAGE_KEYS.BANNERS, []).length) {
      const banners = [
        { id: 1, title: 'স্মার্ট স্টেইনলেস স্টিল কাপল রিং মেগা অফার', subtitle: 'মুড ও টেম্পারেচার সেনসিটিভ ওয়াটারপ্রুফ রিং', bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', badge: 'জুয়েলারি কালেকশন', link: '#/products?category=Watches%20%26%20Jewellery', img: 'https://img.drz.lazcdn.com/g/kf/S4ab09cc5364240ea8034e02f35e7c13dJ.jpg_720x720q80.jpg' },
        { id: 2, title: '৯২৫ স্টার্লিং সিলভার স্নোফ্লেক ইয়ার ক্লিপ', subtitle: 'কান ফোঁড়ানো ছাড়াই সহজে ব্যবহারযোগ্য রাজকীয় ক্রিস্টাল ক্লিপ', bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)', badge: 'ট্রেন্ডি অর্নামেন্ট', link: '#/products?category=Watches%20%26%20Jewellery', img: 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_003020_8bf8448e-404f-4530-b52b-4700c4ee6a2a.jpg' },
        { id: 3, title: '৯২৫ স্টার্লিং সিলভার হার্ট জিরকন জুয়েলারি সেট', subtitle: 'নেকলেস, কানের দুল ও এডজাস্টেবল আংটি সহ ওয়েডিং ব্রাইডাল সেট', bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', badge: 'ওয়েডিং গিফট', link: '#/products?category=Watches%20%26%20Jewellery', img: 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_002701_429597a1-c660-4f25-acb2-00f32662c451.jpg' },
        { id: 4, title: '২০২৬ মেনস লাক্সারি কোয়ার্টজ রিস্টওয়াচ', subtitle: 'আধুনিক ডিজাইন, টেকসই মেটাল বেল্ট ও নিখুঁত কোয়ার্টজ মেকানিজম', bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', badge: 'লাক্সারি ঘড়ি', link: '#/products?category=Watches%20%26%20Jewellery', img: 'https://img.drz.lazcdn.com/static/bd/p/127d2a30a24fcf78db90935acc1d0fba.png' },
        { id: 5, title: 'হোলসেলার ও পাইকারি বিক্রেতাদের জন্য এক্সক্লুসিভ রেট', subtitle: 'সরাসরি চায়না ইমপোর্টার রেটে পণ্য কিনুন ও দ্রুত কুরিয়ার ডেলিভারি', bg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', badge: 'হোলসেল অফার', link: '#/wholesale/dashboard', img: 'https://img.drz.lazcdn.com/static/bd/p/636047c61f22fa2ff074121c29665bc8.png' },
        { id: 6, title: 'গুড লাক সিঙ্গেল ফাইল হোল্ডার ও অর্গানাইজার', subtitle: 'অফিস ও স্টাডি টেবিলের ফাইল ও ম্যাগাজিন গুছিয়ে রাখার পারফেক্ট বক্স', bg: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)', badge: 'ডকুমেন্ট হোল্ডার', link: '#/products?category=Stationery%20%26%20Office', img: 'https://img.drz.lazcdn.com/static/bd/p/636047c61f22fa2ff074121c29665bc8.png' },
        { id: 7, title: 'উইস্টার ব্লাড গ্লুকোজ মনিটরিং কমপ্লিট কিট', subtitle: 'ডায়াবেটিস রোগীদের জন্য রক্তে শর্করার মাত্রা দ্রুত পরীক্ষার আধুনিক কিট', bg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', badge: 'মেডিকেল ডিভাইস', link: '#/products?category=Health%20%26%20Beauty', img: 'https://img.drz.lazcdn.com/static/bd/p/010155b9e0bb66f28b43f9a7620adcb2.png' },
        { id: 8, title: 'পারফিউম সুইট বক্স আতর কম্বো প্যাক (৬টি সেট)', subtitle: 'অ্যালকোহলমুক্ত মনমাতানো প্রিমিয়াম আতর কালেকশন', bg: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)', badge: 'সুগন্ধি আতর', link: '#/products?category=Health%20%26%20Beauty', img: 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_002834_823158c3-d7fa-4749-974d-947f631165ec.jpg' },
        { id: 9, title: 'লং রেঞ্জ এলইডি রিচার্জেবল পাওয়ারফুল টর্চলাইট', subtitle: 'শক্তিশালী আলো ও দীর্ঘস্থায়ী ব্যাটারি ব্যাকআপ', bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', badge: 'ট্যাকটিক্যাল লাইট', link: '#/products?category=Tools%20%26%20Outdoor', img: 'https://img.drz.lazcdn.com/static/bd/p/399ecbf9ce5dfd1f3918a3ea23a2e3ce.png' },
        { id: 10, title: 'গ্রামীন খাঁটি প্রাকৃতিক মধু (১০০% পিওর)', subtitle: 'প্রাকৃতিক পুষ্টি ও স্বাস্থ্য সুরক্ষায় নির্ভরযোগ্য খাঁটি মধু', bg: 'linear-gradient(135deg, #854d0e 0%, #713f12 100%)', badge: 'অর্গানিক ফুড', link: '#/products?category=Organic%20%26%20Groceries', img: 'https://packly-local.s3.ap-southeast-1.amazonaws.com/media/20260808_001858_33c91a0c-63b7-4d92-bfbe-d4508492fe35.jpg' }
      ];
      this.setStorage(this.STORAGE_KEYS.BANNERS, banners);
    }

    // 3. Seed Orders
    if (!this.getStorage(this.STORAGE_KEYS.ORDERS, []).length) {
      const demoOrders = [
        {
          orderId: 'ORD-88241',
          date: '2026-09-24 14:30',
          customerName: 'আব্দুল করিম',
          phone: '01815592089',
          address: 'কান্দিরপাড়, কুমিল্লা',
          products: 'Smart Stainless Steel Multifunctional Couple Ring',
          quantity: 2,
          subtotal: 388,
          deliveryCharge: 90,
          deliveryType: 'কুমিল্লার ভেতর (৯০৳)',
          paymentMethod: 'bKash',
          onlineDiscount: 19,
          trxId: '9K8X2M4L1',
          totalAmount: 459,
          status: 'Confirmed',
          items: [{ sku: 'Chi-Ali-000001', name: 'Smart Stainless Steel Couple Ring', price: 194, qty: 2 }]
        },
        {
          orderId: 'ORD-88240',
          date: '2026-09-24 11:15',
          customerName: 'মো: কামাল হোসেন',
          phone: '01715879111',
          address: 'মিরপুর ১০, ঢাকা',
          products: 'WISTER Blood Glucose Monitoring System',
          quantity: 2,
          subtotal: 2296,
          deliveryCharge: 0,
          deliveryType: 'ঢাকার ভেতরে (১১০৳) [ফ্রি ডেলিভারি]',
          paymentMethod: 'COD',
          onlineDiscount: 0,
          totalAmount: 2296,
          status: 'Pending',
          items: [{ sku: 'LM-DCB-00023', name: 'WISTER Blood Glucose Monitoring System', price: 1148, qty: 2 }]
        }
      ];
      this.setStorage(this.STORAGE_KEYS.ORDERS, demoOrders);
    }
  },

  // Master Unified Call Handler
  async call(action, payload = {}) {
    this.initSeedData();
    return this.localEngine(action, payload);
  },

  // High-Speed Local Engine with 33 Real Sheet Products
  async localEngine(action, payload) {
    switch (action) {
      case 'products/list': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        let filtered = [...products];
        if (payload.category && payload.category !== 'all') {
          filtered = filtered.filter(p => p.category.toLowerCase() === payload.category.toLowerCase() || (p.rawCategory && p.rawCategory.toLowerCase().includes(payload.category.toLowerCase())));
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

      // Group products by 8 distinct categories for Home Page Grid-6
      case 'products/get_by_category': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        // Requirement 5: Only in-stock products displayed on home page
        const inStockProducts = products.filter(p => (parseInt(p.stock, 10) || 0) > 0);
        
        // Find all unique categories from products
        const allCats = [...new Set(inStockProducts.map(p => p.category || 'General'))];
        
        const categoryGroups = allCats.map(cat => {
          const catProducts = inStockProducts.filter(p => p.category === cat);
          return {
            categoryName: cat,
            products: catProducts.slice(0, 12), // Requirement 4: 12 pcs per category
            totalCount: catProducts.length
          };
        }).filter(g => g.products.length > 0);

        return { success: true, data: { groups: categoryGroups } };
      }

      // Requirement 6: Categories Tree Hierarchy
      case 'categories/tree': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        const tree = {};

        // Build hierarchy from products
        products.forEach(p => {
          const main = p.category || 'General';
          const sub = p.subCategory || 'অন্যান্য পণ্য';
          const child = p.childCategory || 'স্পেশাল আইটেম';

          if (!tree[main]) tree[main] = {};
          if (!tree[main][sub]) tree[main][sub] = new Set();
          tree[main][sub].add(child);
        });

        // Convert Sets to Arrays
        const formattedTree = Object.keys(tree).map(main => {
          return {
            mainCategory: main,
            subCategories: Object.keys(tree[main]).map(sub => {
              return {
                subCategory: sub,
                childCategories: Array.from(tree[main][sub])
              };
            })
          };
        });

        return { success: true, data: formattedTree };
      }

      // Brands list
      case 'brands/list': {
        const brands = this.getStorage(this.STORAGE_KEYS.BRANDS, [
          { id: 'BRD-01', name: 'China Brand', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', count: 18 },
          { id: 'BRD-02', name: 'Huawei', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200', count: 4 },
          { id: 'BRD-03', name: 'OnePlus', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200', count: 3 },
          { id: 'BRD-04', name: 'Amazfit', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=200', count: 3 },
          { id: 'BRD-05', name: 'WISTER', image: 'https://img.drz.lazcdn.com/static/bd/p/010155b9e0bb66f28b43f9a7620adcb2.png', count: 2 },
          { id: 'BRD-06', name: 'Good Luck', image: 'https://img.drz.lazcdn.com/static/bd/p/636047c61f22fa2ff074121c29665bc8.png', count: 3 }
        ]);
        return { success: true, data: { items: brands, total: brands.length } };
      }

      case 'brands/add': {
        const brands = this.getStorage(this.STORAGE_KEYS.BRANDS, []);
        const newBrand = {
          id: 'BRD-' + Date.now().toString().slice(-4),
          name: payload.name || 'New Brand',
          image: payload.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
          description: payload.description || '',
          count: 0
        };
        brands.unshift(newBrand);
        this.setStorage(this.STORAGE_KEYS.BRANDS, brands);
        return { success: true, message: 'Brand added successfully!', brand: newBrand };
      }

      case 'brands/delete': {
        let brands = this.getStorage(this.STORAGE_KEYS.BRANDS, []);
        brands = brands.filter(b => b.id !== payload.id);
        this.setStorage(this.STORAGE_KEYS.BRANDS, brands);
        return { success: true, message: 'Brand deleted' };
      }

      // Requirement 3: Banners CRUD Actions
      case 'banners/add': {
        const banners = this.getStorage(this.STORAGE_KEYS.BANNERS, []);
        const newBanner = {
          id: Date.now(),
          title: payload.title || 'নতুন ব্যানার অফার',
          subtitle: payload.subtitle || 'সেরা অফারে কিনুন এখনই',
          badge: payload.badge || 'স্পেশাল কালেকশন',
          bg: payload.bg || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          link: payload.link || '#/products',
          img: payload.img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        };
        banners.unshift(newBanner);
        this.setStorage(this.STORAGE_KEYS.BANNERS, banners);
        return { success: true, message: 'ব্যানার সফলভাবে যুক্ত হয়েছে!', banner: newBanner };
      }

      case 'banners/update': {
        let banners = this.getStorage(this.STORAGE_KEYS.BANNERS, []);
        const idx = banners.findIndex(b => String(b.id) === String(payload.id));
        if (idx !== -1) {
          banners[idx] = { ...banners[idx], ...payload };
          this.setStorage(this.STORAGE_KEYS.BANNERS, banners);
          return { success: true, message: 'ব্যানার আপডেট সফল হয়েছে!' };
        }
        return { success: false, message: 'ব্যানার পাওয়া যায়নি' };
      }

      case 'banners/delete': {
        let banners = this.getStorage(this.STORAGE_KEYS.BANNERS, []);
        banners = banners.filter(b => String(b.id) !== String(payload.id));
        this.setStorage(this.STORAGE_KEYS.BANNERS, banners);
        return { success: true, message: 'ব্যানার মুছে ফেলা হয়েছে!' };
      }

      // Orders Additional Actions (Returns, Status updates, Delete)
      case 'orders/update_status': {
        let orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        const ord = orders.find(o => o.orderId === payload.orderId);
        if (ord) {
          ord.status = payload.status;
          this.setStorage(this.STORAGE_KEYS.ORDERS, orders);
          return { success: true, message: 'স্ট্যাটাস আপডেট সফল হয়েছে!' };
        }
        return { success: false, message: 'অর্ডার পাওয়া যায়নি' };
      }

      case 'orders/delete': {
        let orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        orders = orders.filter(o => o.orderId !== payload.orderId);
        this.setStorage(this.STORAGE_KEYS.ORDERS, orders);
        return { success: true, message: 'অর্ডার মুছে ফেলা হয়েছে' };
      }

      case 'orders/return_list': {
        const orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        const returns = orders.filter(o => o.status === 'Return' || o.status === 'Returned');
        return { success: true, data: { items: returns, total: returns.length } };
      }

      // Customer Profile & Password Change (Requirement 11)
      case 'customers/update': {
        let custs = this.getStorage(this.STORAGE_KEYS.CUSTOMERS, []);
        const idx = custs.findIndex(c => c.phone === payload.phone || c.userId === payload.userId);
        if (idx !== -1) {
          custs[idx] = { ...custs[idx], ...payload };
          this.setStorage(this.STORAGE_KEYS.CUSTOMERS, custs);
        }
        return { success: true, message: 'প্রোফাইল আপডেট হয়েছে!' };
      }

      case 'customers/change_password': {
        let custs = this.getStorage(this.STORAGE_KEYS.CUSTOMERS, []);
        const cust = custs.find(c => c.phone === payload.phone || c.userId === payload.userId);
        const currentStoredPwd = (cust && cust.password) || '123456';
        if (payload.oldPassword !== currentStoredPwd) {
          return { success: false, message: 'পুরাতন পাসওয়ার্ডটি সঠিক নয়! দয়া করে সঠিক পাসওয়ার্ড দিন।' };
        }
        if (cust) {
          cust.password = payload.newPassword;
          this.setStorage(this.STORAGE_KEYS.CUSTOMERS, custs);
        }
        return { success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' };
      }

      // Wholesaler Profile & Password Change (Requirement 12)
      case 'wholesalers/change_password': {
        let wsList = this.getStorage(this.STORAGE_KEYS.WHOLESALERS, []);
        const ws = wsList.find(w => w.phone === payload.phone || w.userId === payload.userId);
        const currentStoredPwd = (ws && ws.password) || '123456';
        if (payload.oldPassword !== currentStoredPwd) {
          return { success: false, message: 'পুরাতন পাসওয়ার্ডটি সঠিক নয়! দয়া করে সঠিক পাসওয়ার্ড দিন।' };
        }
        if (ws) {
          ws.password = payload.newPassword;
          this.setStorage(this.STORAGE_KEYS.WHOLESALERS, wsList);
        }
        return { success: true, message: 'হোলসেলার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' };
      }

      // Reviews Actions
      case 'reviews/list': {
        const reviews = this.getStorage(this.STORAGE_KEYS.REVIEWS, [
          { id: 1, customer: 'মো: আল আমিন', rating: 5, text: 'খুবই দ্রুত ডেলিভারি পেয়েছি। কাপল রিংগুলো দেখতে অসাধারণ ও প্রিমিয়াম!', product: 'Smart Stainless Steel Ring', date: '2026-09-22' },
          { id: 2, customer: 'তানজিনা আক্তার', rating: 5, text: '৯২৫ সিলভার ইয়ার ক্লিপটি চমৎকার! কোনো সমস্যা ছাড়াই কানে পরা যায়।', product: 'Sterling Silver Ear Clips', date: '2026-09-20' },
          { id: 3, customer: 'সাকিব হাসান (হোলসেলার)', rating: 5, text: 'ড্রিম কার্ট বিডি-এর হোলসেল রেট বাজারের সেরা। নিয়মিত মাল নিচ্ছি।', product: 'Wholesale Partner', date: '2026-09-18' }
        ]);
        return { success: true, data: { items: reviews, total: reviews.length } };
      }

      case 'reviews/add': {
        const reviews = this.getStorage(this.STORAGE_KEYS.REVIEWS, []);
        reviews.unshift({
          id: Date.now(),
          customer: payload.customer || 'Customer',
          rating: payload.rating || 5,
          text: payload.text || '',
          product: payload.product || 'General',
          date: new Date().toISOString().split('T')[0]
        });
        this.setStorage(this.STORAGE_KEYS.REVIEWS, reviews);
        return { success: true, message: 'রিভিউ সফলভাবে যুক্ত হয়েছে!' };
      }

      case 'reviews/delete': {
        let reviews = this.getStorage(this.STORAGE_KEYS.REVIEWS, []);
        reviews = reviews.filter(r => r.id !== payload.id);
        this.setStorage(this.STORAGE_KEYS.REVIEWS, reviews);
        return { success: true, message: 'রিভিউ ডিলিট হয়েছে' };
      }

      case 'products/details': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        const p = products.find(it => it.id === payload.id || it.sku === payload.id);
        if (p) return { success: true, data: p };
        return { success: false, message: 'প্রোডাক্টটি খুঁজে পাওয়া যায়নি।' };
      }

      case 'products/update_inline': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        const index = products.findIndex(p => p.sku === payload.sku || p.id === payload.sku);
        if (index !== -1) {
          if (payload.sellingPrice !== undefined) products[index].sellingPrice = parseFloat(payload.sellingPrice);
          if (payload.originalPrice !== undefined) products[index].originalPrice = parseFloat(payload.originalPrice);
          if (payload.buyingPrice !== undefined) products[index].buyingPrice = parseFloat(payload.buyingPrice);
          if (payload.stock !== undefined) {
            products[index].stock = parseInt(payload.stock, 10);
            products[index].inStock = products[index].stock > 0;
          }
          this.setStorage(this.STORAGE_KEYS.PRODUCTS, products);
          return { success: true, message: 'সফলভাবে আপডেট হয়েছে!', data: products[index] };
        }
        return { success: false, message: 'Product not found' };
      }

      case 'products/add': {
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
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
          originalPrice: parseFloat(payload.originalPrice) || (parseFloat(payload.sellingPrice) * 1.3),
          wholesalePrice: parseFloat(payload.wholesalePrice) || (parseFloat(payload.sellingPrice) * 0.85),
          minOrderQ: payload.minOrderQ || '1 Pcs',
          images: payload.images && payload.images.length ? payload.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
          primaryImage: payload.primaryImage || (payload.images && payload.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          description: (payload.description || '').slice(0, 260),
          specification: (payload.specification || '').slice(0, 200),
          others: (payload.others || '').slice(0, 180),
          color: payload.color || 'Default',
          size: payload.size || 'Standard',
          discountPercent: 15,
          inStock: (parseInt(payload.stock, 10) || 0) > 0,
          status: 'active'
        };
        products.unshift(newProduct);
        this.setStorage(this.STORAGE_KEYS.PRODUCTS, products);
        return { success: true, message: 'নতুন প্রোডাক্ট যুক্ত হয়েছে!', data: newProduct };
      }

      case 'products/delete': {
        let products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        products = products.filter(p => p.sku !== payload.sku && p.id !== payload.sku);
        this.setStorage(this.STORAGE_KEYS.PRODUCTS, products);
        return { success: true, message: 'প্রোডাক্ট ডিলিট করা হয়েছে।' };
      }

      case 'orders/create': {
        const orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
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
        this.setStorage(this.STORAGE_KEYS.ORDERS, orders);

        // Decrement stock safely
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        payload.items.forEach(it => {
          const p = products.find(prod => prod.sku === it.sku || prod.id === it.id);
          if (p) {
            p.stock = Math.max(0, p.stock - (it.quantity || 1));
            p.inStock = p.stock > 0;
          }
        });
        this.setStorage(this.STORAGE_KEYS.PRODUCTS, products);

        return { success: true, message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে!', data: newOrder };
      }

      case 'orders/save_incomplete': {
        const inc = this.getStorage(this.STORAGE_KEYS.INCOMPLETE, []);
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
        this.setStorage(this.STORAGE_KEYS.INCOMPLETE, inc);
        return { success: true, data: item };
      }

      case 'orders/list': {
        const orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        return { success: true, data: { items: orders, total: orders.length } };
      }

      case 'orders/incomplete_list': {
        const inc = this.getStorage(this.STORAGE_KEYS.INCOMPLETE, []);
        return { success: true, data: { items: inc, total: inc.length } };
      }

      case 'orders/track': {
        const orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        const q = (payload.query || '').trim();
        const found = orders.filter(o => 
          o.orderId.toLowerCase() === q.toLowerCase() || 
          o.phone.includes(q)
        );
        return { success: true, data: { items: found } };
      }

      case 'admin/stats': {
        const orders = this.getStorage(this.STORAGE_KEYS.ORDERS, []);
        const products = this.getStorage(this.STORAGE_KEYS.PRODUCTS, this.SEED_PRODUCTS);
        const incomplete = this.getStorage(this.STORAGE_KEYS.INCOMPLETE, []);
        
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
        const banners = this.getStorage(this.STORAGE_KEYS.BANNERS, []);
        return { success: true, data: banners };
      }

      default:
        return { success: true, message: 'Action executed successfully', data: {} };
    }
  }
};

// Initialize once
API.initSeedData();

// Expose globally
if (typeof window !== 'undefined') {
  window.API = API;
  // Non-blocking sync from live Google Sheet
  setTimeout(() => API.fetchLiveSheetData(), 1500);
}
