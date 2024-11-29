const SPERAD_SHEET_ID = '"スプレッドシートのID"';

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function addSheetData(name, destination, businessTripDate, returnTime, returnDate, remarks) {
  const SPREAD_SHEET = SpreadsheetApp.openById(SPERAD_SHEET_ID);
  const SHEET = SPREAD_SHEET.getActiveSheet();
  let lastRosNumber = SHEET.getLastRow();

  //データ保存処理
  let now = getFormattedDate();

  SHEET.getRange(lastRosNumber + 1, 1).setValue(name);
  SHEET.getRange(lastRosNumber + 1, 2).setValue(destination);
  SHEET.getRange(lastRosNumber + 1, 3).setValue(businessTripDate);
  SHEET.getRange(lastRosNumber + 1, 4).setValue(returnDate);
  SHEET.getRange(lastRosNumber + 1, 5).setValue(returnTime);
  SHEET.getRange(lastRosNumber + 1, 6).setValue(remarks);
  SHEET.getRange(lastRosNumber + 1, 7).setValue(now);

  //最新データの取得
  return getSheetData();
}

function getSheetData() {
  //データ登録先のSpreadsheetを取得しシートをアクティブにする
  const SPREAD_SHEET = SpreadsheetApp.openById(SPERAD_SHEET_ID);
  const SHEET = SPREAD_SHEET.getActiveSheet();

  //全データの取得
  let rows = SHEET.getDataRange().getValues();

  return rows;
}

function getFormattedDate() {
  //現在日時の取得
  let now = new Date();

  //日時のフォーマット
  let year = now.getFullYear();
  let month = ("00" + (now.getMonth() + 1)).slice(-2);
  let day = ("00" + (now.getDate())).slice(-2);

  return result = year + "-" + month + "-" + day;
}

function deleteRow(rowIndex) {
  const SPREAD_SHEET = SpreadsheetApp.openById(SPERAD_SHEET_ID);
  const SHEET = SPREAD_SHEET.getActiveSheet();
  
  // 指定された行を削除
  SHEET.deleteRow(rowIndex + 1); // シートのインデックスは1から始まるため +1 する
  
  // 削除後の最新データを取得
  return getSheetData();
}

function searchByName(name) {
  const SPREAD_SHEET = SpreadsheetApp.openById(SPERAD_SHEET_ID);
  const SHEET = SPREAD_SHEET.getActiveSheet();
  
  // 全データの取得
  let rows = SHEET.getDataRange().getValues();
  
  // 名前が一致する行をフィルタリング
  let filteredRows = rows.filter(function(row) {
    return row[0] === name;  // 名前が1列目にあると仮定
  });
  
  return filteredRows;
}
