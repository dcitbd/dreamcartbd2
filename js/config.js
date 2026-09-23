/**
 * DREAM CART BD — GLOBAL CONFIGURATION (UPDATED SPECIFICATION)
 * Slogan, Phone numbers, Delivery charges, 5% online discount, Free delivery > 2000 BDT
 */
const CONFIG = {
  appName: 'Dream Cart BD',
  slogan: 'খাঁটি পণ্য, সাশ্রয়ী দাম, দ্রুততম ডেলিভারি ও বিশ্বস্ত হোলসেল প্ল্যাটফর্ম',
  tagline: 'সেরা দামে নির্ভরযোগ্য অনলাইন শপিং ও হোলসেল প্ল্যাটফর্ম',
  logoUrl: 'https://pictures-bangladesh.jijistatic.com/2033199_MjAwLTIwMC03Nzk0Y2Y2Yzkx.jpg',
  logoText: 'DC',
  
  // Contact & Support Numbers (Two Direct Phone & WhatsApp Channels)
  phone1: '01581703822',
  phone2: '01818273838',
  whatsapp1: '01581703822',
  whatsapp2: '01818273838',
  whatsappUrl1: 'https://wa.me/8801581703822',
  whatsappUrl2: 'https://wa.me/8801818273838',
  
  email: 'dubaiwholesalebd@gmail.com',
  address: 'মহেশখালী, কক্সবাজার / কুমিল্লা ও ঢাকা কর্পোরেট হাব, বাংলাদেশ',
  officeTime: 'সকাল ৯:০০ টা - রাত ১১:০০ টা (সপ্তাহে ৭ দিন)',
  guidelines: 'অর্ডার করার পর দ্রুত ডেলিভারি নিশ্চিত করতে ফোন সচল রাখুন। ডেলিভারিম্যানের সামনে পার্সেল চেক করে গ্রহণ করুন।',
  
  // Admin Master Authentication Password
  adminMasterPassword: 'Dcbd@2026',
  
  // Delivery Fee Structure (BDT)
  deliveryCumilla: 90,
  deliveryDhaka: 110,
  deliveryOutside: 135,
  freeDeliveryThreshold: 2000, // ২০০০ টাকার বেশি শপিং করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
  
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
  
  // Google Sheets ID
  spreadsheetId: '1W4k4HP1MBuHfdU7AkPHPf_P-huHATEpIbGhJQDRtpH4',
  apiBaseUrl: 'https://script.google.com/macros/s/AKfycbznjGoCkjC-4u-KUkm-yaxDKYpUnWvxjXUqjZDP6vZCvQnwfQlupl4_HODMv1oC7CJt/exec',
  
  currency: '৳',
  defaultTheme: 'dark',

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
