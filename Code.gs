/**
 * ===================================================================
 * DREAM CART BD — GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * Spreadsheet ID: 1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g
 * Supports Cumilla (90 BDT), Dhaka (110 BDT), Outside (135 BDT),
 * Free delivery (>2000 BDT), 5% online discount & TrxID recording
 * ===================================================================
 */

const SPREADSHEET_ID = "1NdNovX7XXh-2n-mxG9-CWLAi6vi4QND3jTZnHyo4L-g";
const OWNER_EMAIL = "dubaiwholesalebd@gmail.com";

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "products/list";
    const payload = (e && e.parameter && e.parameter.payload) ? JSON.parse(e.parameter.payload) : {};
    return handleRouter(action, payload);
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let postData = {};
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    }
    const action = postData.action || "products/list";
    const payload = postData.payload || {};
    return handleRouter(action, payload);
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function handleRouter(action, payload) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  switch (action) {
    case "products/list":
      return getProductsList(ss, payload);

    case "products/get_by_category":
      return getProductsByCategory(ss);

    case "products/details":
      return getProductDetails(ss, payload.id);

    case "products/update_inline":
      return updateProductInline(ss, payload);

    case "products/add":
      return addProductRow(ss, payload);

    case "products/delete":
      return deleteProductRow(ss, payload.sku);

    case "orders/create":
      return createOrder(ss, payload);

    case "orders/save_incomplete":
      return saveIncompleteOrder(ss, payload);

    case "orders/list":
      return getOrdersList(ss);

    case "orders/incomplete_list":
      return getIncompleteOrdersList(ss);

    case "orders/track":
      return trackOrder(ss, payload.query);

    case "admin/stats":
      return getAdminStats(ss);

    default:
      return createJsonResponse({ success: false, message: "Unknown action: " + action });
  }
}

// 1. Get Products List (A-R mapping)
function getProductsList(ss, payload) {
  const sheet = ss.getSheetByName("Products");
  if (!sheet) return createJsonResponse({ success: false, message: "Products sheet not found" });

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return createJsonResponse({ success: true, data: { items: [], total: 0 } });

  const items = [];

  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    if (!r[0]) continue;

    const sku = String(r[0]);
    const name = String(r[1] || "");
    const category = String(r[2] || "General");
    const subCategory = String(r[3] || "");
    const childCategory = String(r[4] || "");
    const brand = String(r[5] || "");
    const buyingPrice = Number(r[6]) || 0;
    const sellingPrice = Number(r[7]) || 0;
    const stock = Number(r[8]) || 0;
    const originalPrice = Number(r[9]) || (sellingPrice * 1.25);
    const wholesalePrice = Number(r[10]) || (sellingPrice * 0.85);
    const minOrderQ = r[11] || "1 Pcs";
    const imagesRaw = String(r[12] || "");
    const imageList = imagesRaw.split(",").map(s => s.trim()).filter(Boolean);
    const primaryImage = imageList[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
    const description = String(r[13] || "");
    const specification = String(r[14] || "");
    const others = String(r[15] || "");
    const color = String(r[16] || "Default");
    const size = String(r[17] || "Standard");

    const discountPercent = originalPrice > sellingPrice 
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) 
      : 0;

    items.push({
      id: sku,
      sku: sku,
      name: name,
      category: category,
      subCategory: subCategory,
      childCategory: childCategory,
      brand: brand,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      stock: stock,
      originalPrice: originalPrice,
      wholesalePrice: wholesalePrice,
      minOrderQ: minOrderQ,
      images: imageList.length ? imageList : [primaryImage],
      primaryImage: primaryImage,
      description: description,
      specification: specification,
      others: others,
      color: color,
      size: size,
      discountPercent: discountPercent,
      inStock: stock > 0
    });
  }

  return createJsonResponse({ success: true, data: { items: items, total: items.length } });
}

// 2. Get Products by Category (12 items per category for Home Grid-6)
function getProductsByCategory(ss) {
  const res = getProductsList(ss, {});
  const obj = JSON.parse(res.getContent());
  const items = (obj.data && obj.data.items) || [];

  const catMap = {};
  items.forEach(p => {
    if (!catMap[p.category]) catMap[p.category] = [];
    catMap[p.category].push(p);
  });

  const groups = Object.keys(catMap).map(cat => ({
    categoryName: cat,
    products: catMap[cat].slice(0, 12),
    totalCount: catMap[cat].length
  }));

  return createJsonResponse({ success: true, data: { groups: groups } });
}

// 3. Product Details
function getProductDetails(ss, sku) {
  const sheet = ss.getSheetByName("Products");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(sku)) {
      const res = getProductsList(ss, {});
      const obj = JSON.parse(res.getContent());
      const p = obj.data.items.find(it => it.sku === sku);
      return createJsonResponse({ success: true, data: p });
    }
  }
  return createJsonResponse({ success: false, message: "Product not found" });
}

// 4. Inline Update
function updateProductInline(ss, payload) {
  const sheet = ss.getSheetByName("Products");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(payload.sku)) {
      const row = i + 1;
      if (payload.sellingPrice !== undefined) sheet.getRange(row, 8).setValue(payload.sellingPrice);
      if (payload.originalPrice !== undefined) sheet.getRange(row, 10).setValue(payload.originalPrice);
      if (payload.buyingPrice !== undefined) sheet.getRange(row, 7).setValue(payload.buyingPrice);
      if (payload.stock !== undefined) sheet.getRange(row, 9).setValue(payload.stock);
      return createJsonResponse({ success: true, message: "Product updated inline successfully" });
    }
  }
  return createJsonResponse({ success: false, message: "Product SKU not found" });
}

// 5. Add Product Row
function addProductRow(ss, payload) {
  const sheet = ss.getSheetByName("Products");
  const row = [
    payload.sku,
    payload.name,
    payload.category,
    payload.subCategory || "",
    payload.childCategory || "",
    payload.brand || "",
    payload.buyingPrice || 0,
    payload.sellingPrice || 0,
    payload.stock || 0,
    payload.originalPrice || 0,
    payload.wholesalePrice || 0,
    payload.minOrderQ || "1 Pcs",
    (payload.images || []).join(", "),
    payload.description || "",
    payload.specification || "",
    payload.others || "",
    payload.color || "",
    payload.size || ""
  ];
  sheet.appendRow(row);
  return createJsonResponse({ success: true, message: "Product added successfully" });
}

// 6. Delete Product Row
function deleteProductRow(ss, sku) {
  const sheet = ss.getSheetByName("Products");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(sku)) {
      sheet.deleteRow(i + 1);
      return createJsonResponse({ success: true, message: "Product deleted" });
    }
  }
  return createJsonResponse({ success: false, message: "SKU not found" });
}

// 7. Create Order (with Delivery Area & 5% Discount & TrxID)
function createOrder(ss, payload) {
  const sheet = ss.getSheetByName("Orders");
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const dateStr = Utilities.formatDate(new Date(), "Asia/Dhaka", "yyyy-MM-dd HH:mm");
  
  const productNames = (payload.items || []).map(i => i.name).join(", ");
  const totalQty = (payload.items || []).reduce((s, i) => s + (i.quantity || 1), 0);

  // Delivery type text
  let deliveryLabel = "উভয়ের বাইরে (১৩৫৳)";
  if (payload.deliveryZone === "cumilla") deliveryLabel = "কুমিল্লার ভেতর (৯০৳)";
  if (payload.deliveryZone === "dhaka") deliveryLabel = "ঢাকার ভেতরে (১১০৳)";
  if (payload.deliveryCharge === 0) deliveryLabel += " [ফ্রি ডেলিভারি]";

  // Payment note
  let paymentNote = payload.paymentMethod || "COD";
  if (payload.trxId) paymentNote += " (TrxID: " + payload.trxId + ")";

  // Orders Sheet Structure: OrderID, Date, Customer_Name, Phone, Address, Products, Quantity, Total_Amount, Delivery_Type, Status
  const row = [
    orderId,
    dateStr,
    payload.name,
    payload.phone,
    payload.address + " | পেমেন্ট: " + paymentNote,
    productNames,
    totalQty,
    payload.totalAmount,
    deliveryLabel,
    "Pending"
  ];

  sheet.appendRow(row);

  // Email Notification
  try {
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: "নতুন অর্ডার প্রাপ্তি! #" + orderId + " (" + payload.name + ")",
      body: "ড্রিম কার্ট বিডি-তে একটি নতুন অর্ডার এসেছে!\n\n" +
            "অর্ডার আইডি: " + orderId + "\n" +
            "তারিখ: " + dateStr + "\n" +
            "গ্রাহকের নাম: " + payload.name + "\n" +
            "মোবাইল: " + payload.phone + "\n" +
            "ঠিকানা: " + payload.address + "\n" +
            "ডেলিভারি এরিয়া: " + deliveryLabel + "\n" +
            "পেমেন্ট মাধ্যম: " + paymentNote + "\n" +
            "পণ্য: " + productNames + "\n" +
            "পরিমাণ: " + totalQty + " টি\n" +
            "সর্বমোট প্রদেয় টাকা: " + payload.totalAmount + " ৳"
    });
  } catch (mailErr) {
    Logger.log("Mail warning: " + mailErr);
  }

  return createJsonResponse({
    success: true,
    data: {
      orderId: orderId,
      date: dateStr,
      customerName: payload.name,
      phone: payload.phone,
      address: payload.address,
      products: productNames,
      totalAmount: payload.totalAmount,
      subtotal: payload.subtotal,
      deliveryCharge: payload.deliveryCharge,
      deliveryType: deliveryLabel,
      paymentMethod: payload.paymentMethod,
      onlineDiscount: payload.onlineDiscount || 0,
      trxId: payload.trxId || "",
      status: "Pending",
      items: payload.items
    }
  });
}

// 8. Save Incomplete Order
function saveIncompleteOrder(ss, payload) {
  let sheet = ss.getSheetByName("Incomplete_Orders");
  if (!sheet) {
    sheet = ss.insertSheet("Incomplete_Orders");
    sheet.appendRow(["IncompleteID", "Date", "Customer_Name", "Phone", "Address", "Products", "Total_Amount", "Status"]);
  }
  const incId = "INC-" + Math.floor(1000 + Math.random() * 9000);
  const dateStr = Utilities.formatDate(new Date(), "Asia/Dhaka", "yyyy-MM-dd HH:mm");
  const row = [
    incId,
    dateStr,
    payload.name || "Unknown",
    payload.phone || "",
    payload.address || "",
    (payload.items || []).map(i => i.name).join(", "),
    payload.totalAmount || 0,
    "Abandoned Checkout"
  ];
  sheet.appendRow(row);
  return createJsonResponse({ success: true, id: incId });
}

// 9. Get Orders List
function getOrdersList(ss) {
  const sheet = ss.getSheetByName("Orders");
  if (!sheet) return createJsonResponse({ success: true, data: { items: [] } });
  const data = sheet.getDataRange().getValues();
  const items = [];
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    if (!r[0]) continue;
    items.push({
      orderId: String(r[0]),
      date: String(r[1]),
      customerName: String(r[2]),
      phone: String(r[3]),
      address: String(r[4]),
      products: String(r[5]),
      quantity: Number(r[6]) || 1,
      totalAmount: Number(r[7]) || 0,
      deliveryType: String(r[8]),
      status: String(r[9])
    });
  }
  return createJsonResponse({ success: true, data: { items: items.reverse() } });
}

// 10. Track Order
function trackOrder(ss, query) {
  const q = String(query || "").toLowerCase().trim();
  const res = getOrdersList(ss);
  const obj = JSON.parse(res.getContent());
  const matches = (obj.data && obj.data.items || []).filter(o => 
    o.orderId.toLowerCase() === q || o.phone.includes(q)
  );
  return createJsonResponse({ success: true, data: { items: matches } });
}

// 11. Admin KPI Stats
function getAdminStats(ss) {
  const ordersSheet = ss.getSheetByName("Orders");
  const prodsSheet = ss.getSheetByName("Products");
  const orders = ordersSheet ? ordersSheet.getDataRange().getValues().slice(1) : [];
  const prods = prodsSheet ? prodsSheet.getDataRange().getValues().slice(1) : [];

  let totalSelling = 0;
  let pendingOrders = 0;
  orders.forEach(r => {
    totalSelling += Number(r[7]) || 0;
    if (String(r[9]).toLowerCase() === "pending") pendingOrders++;
  });

  return createJsonResponse({
    success: true,
    data: {
      totalSelling: totalSelling,
      totalOrders: orders.length,
      pendingOrders: pendingOrders,
      totalProducts: prods.length,
      liveViewers: Math.floor(20 + Math.random() * 15)
    }
  });
}
