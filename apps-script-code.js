// ================================================
// InvestTrack - Google Sheets Sync Script (FREE)
// ================================================
// 
// HOW TO USE:
// 1. Open Google Sheets → Create new spreadsheet
// 2. Click Extensions → Apps Script
// 3. Delete all existing code
// 4. Paste THIS entire code
// 5. Click Deploy → New deployment
// 6. Click gear icon ⚙️ → Select "Web app"
// 7. Description: "InvestTrack Sync"
// 8. Execute as: Me
// 9. Who has access: Anyone
// 10. Click Deploy
// 11. Copy the Web App URL
// 12. Paste it in InvestTrack app → Settings → Sync Setup
//
// That's it! 100% FREE, no Google Cloud Console needed.
// ================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.action === 'sync') {
      syncAll(ss, data.sheets);
      return ContentService
        .createTextOutput(JSON.stringify({status:'ok'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'ping') {
      return ContentService
        .createTextOutput(JSON.stringify({status:'ok',msg:'InvestTrack connected!'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({status:'error',msg:'Unknown action'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error',msg:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status:'ok',msg:'InvestTrack Sync is running!'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function syncAll(ss, sheets) {
  // Helper: create or get sheet tab, clear it, write data
  function writeTab(name, headers, rows) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    sheet.clear();
    if (rows.length === 0) return;
    var values = [headers].concat(rows);
    sheet.getRange(1, 1, values.length, headers.length).setValues(values);
    // Auto-resize columns
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
    // Bold header row
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    // Freeze header row
    sheet.setFrozenRows(1);
  }

  // ===== STOCKS =====
  if (sheets.stocks && sheets.stocks.length > 0) {
    var rows = sheets.stocks.map(function(s) {
      return [
        s.symbol,
        s.qty,
        s.buyPrice,
        s.currentPrice,
        s.qty * s.buyPrice,
        s.qty * s.currentPrice,
        (s.qty * s.currentPrice) - (s.qty * s.buyPrice),
        s.broker,
        s.date
      ];
    });
    writeTab('Stocks',
      ['Symbol', 'Qty', 'Buy Price', 'Current Price', 'Invested', 'Current Value', 'P&L', 'Broker', 'Date'],
      rows
    );
  }

  // ===== MUTUAL FUNDS =====
  if (sheets.mutual_funds && sheets.mutual_funds.length > 0) {
    var rows = sheets.mutual_funds.map(function(m) {
      return [
        m.name,
        m.type,
        m.units,
        m.buyNAV,
        m.currentNAV,
        m.units * m.buyNAV,
        m.units * m.currentNAV,
        (m.units * m.currentNAV) - (m.units * m.buyNAV),
        m.platform,
        m.date
      ];
    });
    writeTab('MutualFunds',
      ['Fund Name', 'Type', 'Units', 'Buy NAV', 'Current NAV', 'Invested', 'Current Value', 'P&L', 'Platform', 'Date'],
      rows
    );
  }

  // ===== SAVINGS =====
  if (sheets.savings && sheets.savings.length > 0) {
    var rows = sheets.savings.map(function(s) {
      return [s.name, s.type, s.amount, (s.rate || 0) + '%', s.institution || ''];
    });
    writeTab('Savings',
      ['Name', 'Type', 'Amount', 'Interest Rate', 'Institution'],
      rows
    );
  }

  // ===== EXPENSES =====
  if (sheets.expenses && sheets.expenses.length > 0) {
    var rows = sheets.expenses.map(function(e) {
      return [e.date, e.category, e.description, e.amount, e.payment, e.type];
    });
    writeTab('Expenses',
      ['Date', 'Category', 'Description', 'Amount', 'Payment', 'Type'],
      rows
    );
  }

  // ===== SUMMARY =====
  var stCur = (sheets.stocks || []).reduce(function(a, s) { return a + s.qty * s.currentPrice; }, 0);
  var mfCur = (sheets.mutual_funds || []).reduce(function(a, m) { return a + m.units * m.currentNAV; }, 0);
  var svTot = (sheets.savings || []).reduce(function(a, s) { return a + s.amount; }, 0);
  var stInv = (sheets.stocks || []).reduce(function(a, s) { return a + s.qty * s.buyPrice; }, 0);
  var mfInv = (sheets.mutual_funds || []).reduce(function(a, m) { return a + m.units * m.buyNAV; }, 0);
  
  var now = new Date();
  var mo = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  var mExp = (sheets.expenses || []).filter(function(e) {
    return (e.date || '').indexOf(mo) === 0;
  }).reduce(function(a, e) { return a + e.amount; }, 0);

  writeTab('Summary',
    ['Metric', 'Value'],
    [
      ['Total Net Worth', stCur + mfCur + svTot],
      ['Stocks Current Value', stCur],
      ['Stocks Invested', stInv],
      ['Stocks P&L', stCur - stInv],
      ['Mutual Funds Current Value', mfCur],
      ['Mutual Funds Invested', mfInv],
      ['Mutual Funds P&L', mfCur - mfInv],
      ['Total Savings', svTot],
      ['This Month Expenses', mExp],
      ['Total Stocks Tracked', (sheets.stocks || []).length],
      ['Total Funds Tracked', (sheets.mutual_funds || []).length],
      ['Total Savings Accounts', (sheets.savings || []).length],
      ['Last Synced', now.toLocaleString('en-IN')]
    ]
  );
}
