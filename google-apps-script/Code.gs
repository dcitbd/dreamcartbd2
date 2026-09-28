/**
 * Dream Cart BD - Google Apps Script Backend (Code.gs)
 * Handles full Google Sheets Integration, Drive Image Uploads, and Email Notifications
 * 
 * Setup Instructions:
 * 1. Open Google Sheets (create a new sheet or use your existing sheet)
 * 2. Extensions > Apps Script
 * 3. Paste this entire Code.gs file
 * 4. Click Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into the Dream Cart BD Admin Panel -> Settings -> Google Apps Script URL
 */

const SHEET_NAMES = {
  ORDERS: 'Orders',
  PRODUCTS: 'Products',
  CATEGORIES: 'Catagories',
  BRANDS: 'Barand',
  BUYING: 'Buying',
  COSTS: 'Costs',
  INVEST: 'Invest',
  CUSTOMERS: 'User_Customer',
  WHOLESALERS: 'WholeSaller',
  STAFF: 'Admin_Worker',
  INCOMPLETE_ORDERS: 'Incomplete_Orders',
  SETTINGS: 'Settings',
  BANNERS: 'Banners'
};

const DRIVE_FOLDER_NAME = 'Dream_Cart_BD_Uploads';

function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  checkAndInitSheets(ss);

  let result = { status: 'success', data: null };

  if (action === 'getProducts') {
    result.data = readSheetToObjects(ss.getSheetByName(SHEET_NAMES.PRODUCTS));
  } else if (action === 'getOrders') {
    result.data = readSheetToObjects(ss.getSheetByName(SHEET_NAMES.ORDERS));
  } else if (action === 'getCategories') {
    result.data = readSheetToObjects(ss.getSheetByName(SHEET_NAMES.CATEGORIES));
  } else if (action === 'getSettings') {
    result.data = readSheetToObjects(ss.getSheetByName(SHEET_NAMES.SETTINGS));
  } else {
    result.data = { message: 'Dream Cart BD API Online. Ready for POST/GET.' };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let req = {};
  try {
    req = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON payload' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  checkAndInitSheets(ss);

  const action = req.action;
  let response = { status: 'success' };

  try {
    if (action === 'createOrder') {
      const order = req.order;
      const sheet = ss.getSheetByName(SHEET_NAMES.ORDERS);
      const row = [
        order.orderId || 'ORD-' + Date.now(),
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
        order.customerName,
        order.phone,
        order.address,
        JSON.stringify(order.items || []),
        order.items ? order.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1,
        order.totalAmount,
        order.deliveryType || 'Standard',
        order.status || 'Pending',
        order.paymentMethod || 'Cash On Delivery',
        order.trxId || '',
        order.discount || 0,
        order.roleType || 'Customer',
        order.resellerName || ''
      ];
      sheet.appendRow(row);

      // Send Email to Shop Owner & Customer
      sendOrderConfirmationEmails(order);
      response.orderId = order.orderId;

    } else if (action === 'recordIncompleteOrder') {
      const inc = req.incompleteOrder;
      const sheet = ss.getSheetByName(SHEET_NAMES.INCOMPLETE_ORDERS);
      sheet.appendRow([
        inc.id || 'INC-' + Date.now(),
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
        inc.name || '',
        inc.phone || '',
        inc.address || '',
        JSON.stringify(inc.items || []),
        inc.totalAmount || 0,
        'Incomplete'
      ]);

    } else if (action === 'updateOrderStatus') {
      const sheet = ss.getSheetByName(SHEET_NAMES.ORDERS);
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] == req.orderId) {
          sheet.getRange(i + 1, 10).setValue(req.status);
          break;
        }
      }

    } else if (action === 'bulkUpdateProducts') {
      const sheet = ss.getSheetByName(SHEET_NAMES.PRODUCTS);
      const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      sheet.clearContents();
      sheet.appendRow(headerRow);

      const products = req.products || [];
      products.forEach(p => {
        sheet.appendRow([
          p.id || '',
          p.name || '',
          p.category || '',
          p.sub_category || '',
          p.child_category || '',
          p.brand || '',
          p.buying_price || 0,
          p.selling_price || 0,
          p.stock || 0,
          p.original_price || 0,
          p.wholesale_price || 0,
          p.min_order_q || 1,
          Array.isArray(p.images) ? p.images.join(', ') : (p.images || ''),
          p.description || '',
          p.specification || '',
          p.others || '',
          Array.isArray(p.color) ? p.color.join(', ') : (p.color || ''),
          Array.isArray(p.size) ? p.size.join(', ') : (p.size || ''),
          p.reseller_price || 0
        ]);
      });

    } else if (action === 'uploadImageToDrive') {
      const base64Data = req.base64Data;
      const fileName = req.fileName || 'upload_' + Date.now() + '.jpg';
      const folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
      const decoded = Utilities.base64Decode(base64Data.split(',')[1] || base64Data);
      const blob = Utilities.newBlob(decoded, 'image/jpeg', fileName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      response.fileUrl = 'https://drive.google.com/uc?export=view&id=' + file.getId();
    }
  } catch (err) {
    response = { status: 'error', message: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendOrderConfirmationEmails(order) {
  try {
    const ownerEmail = 'jainal.dcitbd@gmail.com';
    const subject = 'নতুন অর্ডার প্রাপ্তি - ' + order.orderId + ' [Dream Cart BD]';
    const body = 'Dream Cart BD এ একটি নতুন অর্ডার এসেছে!\n\n' +
      'Order ID: ' + order.orderId + '\n' +
      'গ্রাহক: ' + order.customerName + '\n' +
      'ফোন: ' + order.phone + '\n' +
      'ঠিকানা: ' + order.address + '\n' +
      'মোট মূল্য: ৳' + order.totalAmount + '\n' +
      'পেমেন্ট মেথড: ' + (order.paymentMethod || 'COD') + '\n' +
      'TrxID: ' + (order.trxId || 'N/A') + '\n\n' +
      'অর্ডারটি প্রসেস করতে এডমিন প্যানেল ভিজিট করুন।';

    GmailApp.sendEmail(ownerEmail, subject, body);

    if (order.email && order.email.includes('@')) {
      const custSub = 'আপনার Dream Cart BD অর্ডার নিশ্চিতকরণ - ' + order.orderId;
      const custBody = 'প্রিয় ' + order.customerName + ',\n\n' +
        'Dream Cart BD থেকে অর্ডার করার জন্য ধন্যবাদ! আপনার অর্ডার আইডি: ' + order.orderId + '\n' +
        'মোট প্রদেয় মূল্য: ৳' + order.totalAmount + '\n' +
        'ডেলিভারি ঠিকানা: ' + order.address + '\n\n' +
        'আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।\n' +
        'হটলাইন: 01581703822, 01818273838';
      GmailApp.sendEmail(order.email, custSub, custBody);
    }
  } catch (e) {
    Logger.log('Email delivery notification skipped: ' + e);
  }
}

function checkAndInitSheets(ss) {
  const configs = [
    { name: SHEET_NAMES.ORDERS, headers: ['OrderID', 'Date', 'Customer_Name', 'Phone', 'Address', 'Products', 'Quantity', 'Total_Amount', 'Delivery_Type', 'Status', 'Payment_Method', 'TrxID', 'Discount', 'Role_Type', 'Reseller_Name'] },
    { name: SHEET_NAMES.PRODUCTS, headers: ['ID/SKU', 'P_Name', 'Category', 'Sub_Category', 'Child_Category', 'Brand', 'Buying_price', 'Selling_Price', 'Stock', 'Original_Price', 'WholeSale_price', 'Min_order_Q', 'Images', 'Description', 'Specification', 'Others', 'Color', 'Size', 'Reseller_Price'] },
    { name: SHEET_NAMES.CATEGORIES, headers: ['Catagory ID', 'Catagory Name', 'Sub Catagory id', 'Sub Catagory', 'Child Catagory id', 'Child Catagory'] },
    { name: SHEET_NAMES.BRANDS, headers: ['Brand_ID', 'Brand_Image', 'Brand_Name', 'Brand_Description'] },
    { name: SHEET_NAMES.BUYING, headers: ['Date', 'Who Buy', 'Product Name', 'buying price', 'Quantity', 'Total buying (calculated)', 'Supplier', 'Location'] },
    { name: SHEET_NAMES.COSTS, headers: ['Date', 'Who Paid', 'Purpose', 'Amount', 'Note'] },
    { name: SHEET_NAMES.INVEST, headers: ['Date', 'Invest type', 'Name of investor', 'Amount', 'Note'] },
    { name: SHEET_NAMES.CUSTOMERS, headers: ['USER_ID', 'Profile_photo', 'Name', 'Mobile', 'Mail', 'Address', 'User_ID', 'Password', 'Status'] },
    { name: SHEET_NAMES.WHOLESALERS, headers: ['USER_ID', 'Shop_logo', 'Name', 'Mobile', 'Mail', 'Address', 'Shop_Name', 'User_ID', 'Password', 'Status'] },
    { name: SHEET_NAMES.STAFF, headers: ['USER_ID', 'Profile Photo', 'Name', 'Mobile', 'Mail', 'Address', 'Worker_Type', 'Role', 'User_ID', 'Password'] },
    { name: SHEET_NAMES.INCOMPLETE_ORDERS, headers: ['OrderID', 'Date', 'Customer_Name', 'Phone', 'Address', 'Products', 'Total_Amount', 'Status'] },
    { name: SHEET_NAMES.SETTINGS, headers: ['Key', 'Value'] }
  ];

  configs.forEach(cfg => {
    let sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
      sheet.appendRow(cfg.headers);
      sheet.setFrozenRows(1);
    }
  });
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}

function readSheetToObjects(sheet) {
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0];
  const list = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx];
    });
    list.push(obj);
  }
  return list;
}
