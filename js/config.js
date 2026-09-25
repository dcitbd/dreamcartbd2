/**
 * DREAM CART BD — GLOBAL CONFIGURATION
 * Google Sheet ID: 1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g
 */
const CONFIG = {
  appName: 'Dream Cart BD',
  slogan: 'খাঁটি পণ্য, সাশ্রয়ী দাম, দ্রুততম ডেলিভারি ও বিশ্বস্ত হোলসেল প্ল্যাটফর্ম',
  tagline: 'সেরা দামে নির্ভরযোগ্য অনলাইন শপিং ও হোলসেল প্ল্যাটফর্ম',
  logoUrl: 'https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg',
  fallbackLogoUrl: 'https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg',
  logoText: 'DC',
  
  // Developer & Leadership Credits
  developerName: 'Jainal Abedin',
  developerProfileUrl: 'https://dcitbd.github.io/Jainal-Abedin/',
  developerCompany: 'Dream Career IT BD',
  developerCompanyUrl: 'https://dcitbd.github.io/dcitbd/',
  developerRole: 'CEO, Dream Career IT BD',

  // Contact & Support Numbers (Two Hotlines & WhatsApp)
  phone1: '01581703822',
  phone2: '01818273838',
  whatsapp1: '01581703822',
  whatsapp2: '01818273838',
  whatsappUrl1: 'https://wa.me/c/8801581703822',
  whatsappUrl2: 'https://wa.me/8801818273838',
  
  // Official Emails
  email1: 'jainal.dcitbd@gmail.com',
  email2: 'saiful05333@gmail.com',
  email: 'jainal.dcitbd@gmail.com, saiful05333@gmail.com',
  
  // Shop Physical Location
  address: 'চৌধুরী প্লাজা, নিচ তলা, কক্ষ-০৩, পদুয়ার বাজার, বিশ্ব রোড, সদর দক্ষিণ, কুমিল্লা',
  officeTime: 'সকাল ৯:০০ টা - রাত ১১:০০ টা (সপ্তাহে ৭ দিন)',
  guidelines: 'অর্ডার করার পর দ্রুত ডেলিভারি নিশ্চিত করতে ফোন সচল রাখুন। ডেলিভারিম্যানের সামনে পার্সেল চেক করে গ্রহণ করুন।',
  
  // Admin Credentials
  adminDefaultUser: 'jainal.dcitbd@gmail.com',
  adminDefaultUserAlt: 'jainal.dcitbd@gmail.comm',
  adminMasterPassword: 'Dcbd@2026',
  
  // Delivery Fee Structure (BDT)
  deliveryCumilla: 90,
  deliveryDhaka: 110,
  deliveryOutside: 135,
  freeDeliveryThreshold: 2000, // ২০০০৳ এর বেশি কেনাকাটায় ডেলিভারি সম্পূর্ণ ফ্রি
  
  // Online Payment Discount (5% Instant Discount)
  onlineDiscountPercent: 5,
  
  // Payment Gateways & Account Details
  paymentAccounts: {
    bkashPersonal: '01879653143',
    bkashPayment: '01581703822',
    nagadPersonal: '01879653143',
    rocketPersonal: '01581703822',
    bank: {
      bankName: 'Islami Bank Bangladesh Limited',
      accountName: 'Jainal Abedin',
      accountNumber: '20508070200030208',
      branch: 'Maheshkhali / Coxs Bazar Branch'
    }
  },
  
  // Official Google Spreadsheet ID from Requirement 14
  spreadsheetId: '1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g',
  
  // Google Drive Storage Folders from Requirement 15
  driveFolders: {
    products: 'https://drive.google.com/drive/folders/1q8rfxni24t6q17wX-82ozjpbVXXR_ntG?usp=drive_link',
    productsId: '1q8rfxni24t6q17wX-82ozjpbVXXR_ntG',
    brands: 'https://drive.google.com/drive/folders/1kBORS5_d-7O1F8dd6YFWW9P2wTk6KXJu?usp=drive_link',
    brandsId: '1kBORS5_d-7O1F8dd6YFWW9P2wTk6KXJu',
    categories: 'https://drive.google.com/drive/folders/1ZwTZs_ZeLuZYtvU4G6JkK2DMWHRgHyyA?usp=drive_link',
    categoriesId: '1ZwTZs_ZeLuZYtvU4G6JkK2DMWHRgHyyA',
    settings: 'https://drive.google.com/drive/folders/1gF0RhJFX-JD4e8vZw2yx2SJ6zD5mf2Vd?usp=drive_link',
    settingsId: '1gF0RhJFX-JD4e8vZw2yx2SJ6zD5mf2Vd'
  },
  
  // Other Marketplace Links from Requirement 13
  marketplaces: [
    { name: 'WhatsApp ক্যাটালগ', url: 'https://wa.me/c/8801581703822', icon: 'bi-whatsapp', color: '#25D366' },
    { name: 'Facebook পেজ', url: 'https://www.facebook.com/dreamcartbd1', icon: 'bi-facebook', color: '#1877F2' },
    { name: 'Daraz শপ', url: 'https://www.daraz.com.bd/shop/m8svmjyg', icon: 'bi-shop', color: '#f85606' },
    { name: 'Othoba শপ', url: 'https://othoba.com/dream-cart-bd', icon: 'bi-bag-heart', color: '#e11d48' },
    { name: 'MartMama (Dream Cart)', url: 'https://martmama.com/shop/dream-cart-bd', icon: 'bi-cart4', color: '#10b981' },
    { name: 'MartMama (Saif Mart)', url: 'https://martmama.com/shop/saif-mart', icon: 'bi-cart-check', color: '#06b6d4' },
    { name: 'MartMama (Medixo BD)', url: 'https://martmama.com/shop/medixo-bd', icon: 'bi-capsule', color: '#8b5cf6' },
    { name: 'Bikroy শপ ১', url: 'https://bikroy.com/shop/dreamcartbd', icon: 'bi-tag-fill', color: '#00a651' },
    { name: 'Bikroy শপ ২', url: 'https://bikroy.com/shop/dreamcartbd', icon: 'bi-tag-fill', color: '#00a651' },
    { name: 'Pykari শপ', url: 'https://pykari.com/shop/dream-cart-bd', icon: 'bi-boxes', color: '#f59e0b' },
    { name: 'Packly শপ', url: 'https://packly.com/shop/dream-cart-bd', icon: 'bi-box-seam', color: '#3b82f6' },
    { name: 'DitchIt অ্যাডভার্টাইজার', url: 'https://ditchit.com/advertiser/jainal-abedin-59224946', icon: 'bi-megaphone', color: '#ec4899' }
  ],
  
  // Direct Google Sheets Visualization API for Instant Live Browser Syncing
  sheetGvizUrl: 'https://docs.google.com/spreadsheets/d/1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g/gviz/tq?tqx=out:json&sheet=Products',
  
  // Google Apps Script Web App Deployment URL
  apiBaseUrl: 'https://script.google.com/macros/s/AKfycbznjGoCkjC-4u-KUkm-yaxDKYpUnWvxjXUqjZDP6vZCvQnwfQlupl4_HODMv1oC7CJt/exec',
  
  currency: '৳',
  defaultTheme: 'dark', // Dark Mode by default

  // Columns A-R Mapping
  productColumns: {
    A_sku: 0,
    B_name: 1,
    C_category: 2,
    D_subCategory: 3,
    E_childCategory: 4,
    F_brand: 5,
    G_buyingPrice: 6,
    H_sellingPrice: 7,
    I_stock: 8,
    J_originalPrice: 9,
    K_wholesalePrice: 10,
    L_minOrderQ: 11,
    M_images: 12,
    N_description: 13,
    O_specification: 14,
    P_others: 15,
    Q_color: 16,
    R_size: 17
  }
};

window.CONFIG = CONFIG;
