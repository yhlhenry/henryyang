/**
 * Henry Yang 亨利羊 - 諮詢表單 Google Apps Script
 * 這個腳本會創建一個與網站表單相同的 Google Form
 */

function createHenryYangForm() {
  // 創建新的 Google Form
  const form = FormApp.create('Henry Yang 亨利羊 - 諮詢表單');
  
  // 設置表單描述
  form.setDescription('歡迎諮詢 Henry Yang 亨利羊的專業訓練服務！請填寫以下資訊，我們會盡快與您聯繫。');
  
  // 設置表單標題
  form.setTitle('Henry Yang 亨利羊 - 諮詢表單');
  
  // 1. 姓名欄位 (必填)
  const nameItem = form.addTextItem();
  nameItem.setTitle('您的姓名')
         .setRequired(true)
         .setHelpText('請輸入您的真實姓名');
  
  // 2. Email 欄位 (必填)
  const emailItem = form.addTextItem();
  emailItem.setTitle('您的 Email')
           .setRequired(true)
           .setHelpText('請輸入您的 Email 地址，我們會透過此信箱與您聯繫');
  
  // 3. 感興趣的課程 (下拉選單，必填)
  const courseItem = form.addListItem();
  courseItem.setTitle('選擇感興趣的課程')
            .setRequired(true)
            .setChoices([
              courseItem.createChoice('Excel 基本入門'),
              courseItem.createChoice('Excel 進階課程'),
              courseItem.createChoice('Excel VBA 教學'),
              courseItem.createChoice('NotebookLM 應用教學'),
              courseItem.createChoice('Gemini/ChatGPT 應用教學'),
              courseItem.createChoice('AI 簡報製作'),
              courseItem.createChoice('Google Apps Script 自動化'),
              courseItem.createChoice('n8n 免程式碼自動化'),
              courseItem.createChoice('網站架設'),
              courseItem.createChoice('企業內訓'),
              courseItem.createChoice('其他')
            ]);
  
  // 4. 需求描述 (段落文字，選填)
  const messageItem = form.addParagraphTextItem();
  messageItem.setTitle('請描述您的需求或問題')
             .setRequired(false)
             .setHelpText('請詳細描述您的學習需求、預算範圍、時間安排等相關資訊');
  
  // 5. 聯絡方式偏好 (單選，選填)
  const contactPreferenceItem = form.addMultipleChoiceItem();
  contactPreferenceItem.setTitle('偏好的聯絡方式')
                      .setRequired(false)
                      .setChoices([
                        contactPreferenceItem.createChoice('Email'),
                        contactPreferenceItem.createChoice('LINE'),
                        contactPreferenceItem.createChoice('都可以')
                      ]);
  
  // 6. 預算範圍 (單選，選填)
  const budgetItem = form.addListItem();
  budgetItem.setTitle('預算範圍')
            .setRequired(false)
            .setChoices([
              budgetItem.createChoice('NT$ 1,000 - 3,000'),
              budgetItem.createChoice('NT$ 3,000 - 5,000'),
              budgetItem.createChoice('NT$ 5,000 - 10,000'),
              budgetItem.createChoice('NT$ 10,000 以上'),
              budgetItem.createChoice('需要報價'),
              budgetItem.createChoice('暫不考慮預算')
            ]);
  
  // 7. 時間安排 (單選，選填)
  const timeItem = form.addMultipleChoiceItem();
  timeItem.setTitle('希望的上課時間')
          .setRequired(false)
          .setChoices([
            timeItem.createChoice('平日白天'),
            timeItem.createChoice('平日晚上'),
            timeItem.createChoice('週末'),
            timeItem.createChoice('彈性安排'),
            timeItem.createChoice('需要討論')
          ]);
  
  // 8. 學習經驗 (單選，選填)
  const experienceItem = form.addMultipleChoiceItem();
  experienceItem.setTitle('相關學習經驗')
                .setRequired(false)
                .setChoices([
                  experienceItem.createChoice('完全初學者'),
                  experienceItem.createChoice('有基礎概念'),
                  experienceItem.createChoice('有實作經驗'),
                  experienceItem.createChoice('進階使用者')
                ]);
  
  // 設置表單設定
  form.setAcceptingResponses(true);
  form.setShowLinkToRespondAgain(false);
  form.setPublishingSummary(false);
  
  // 設置確認訊息
  form.setConfirmationMessage('感謝您的諮詢！我們已收到您的表單，Henry Yang 會盡快與您聯繫。');
  
  // 獲取表單 URL
  const formUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();
  
  // 輸出結果
  console.log('表單創建成功！');
  console.log('發布網址：', formUrl);
  console.log('編輯網址：', editUrl);
  
  // 返回表單 URL 供後續使用
  return {
    publishedUrl: formUrl,
    editUrl: editUrl,
    formId: form.getId()
  };
}

/**
 * 設置表單提交後的處理邏輯
 * 當有人提交表單時，會自動執行這個函數
 */
function onFormSubmit(e) {
  try {
    // 獲取表單回應
    const responses = e.response;
    const itemResponses = responses.getItemResponses();
    
    // 提取回應資料
    const formData = {};
    itemResponses.forEach(function(itemResponse) {
      const question = itemResponse.getItem().getTitle();
      const answer = itemResponse.getResponse();
      formData[question] = answer;
    });
    
    // 創建通知 Email 內容
    const emailSubject = `新的諮詢表單提交 - ${formData['您的姓名'] || '未提供姓名'}`;
    const emailBody = `
新的諮詢表單提交：

姓名：${formData['您的姓名'] || '未提供'}
Email：${formData['您的 Email'] || '未提供'}
感興趣的課程：${formData['選擇感興趣的課程'] || '未選擇'}
需求描述：${formData['請描述您的需求或問題'] || '無'}
聯絡方式偏好：${formData['偏好的聯絡方式'] || '未選擇'}
預算範圍：${formData['預算範圍'] || '未選擇'}
上課時間：${formData['希望的上課時間'] || '未選擇'}
學習經驗：${formData['相關學習經驗'] || '未選擇'}

提交時間：${new Date().toLocaleString('zh-TW')}

---
此郵件由 Google Apps Script 自動發送
    `;
    
    // 發送通知 Email 給您
    MailApp.sendEmail({
      to: 'yhlhenry@gmail.com',
      subject: emailSubject,
      body: emailBody
    });
    
    console.log('通知 Email 已發送');
    
  } catch (error) {
    console.error('處理表單提交時發生錯誤：', error);
  }
}

/**
 * 創建 Google Sheets 來儲存表單回應
 */
function createResponseSheet() {
  // 獲取表單
  const forms = FormApp.getActiveForm();
  
  // 創建新的 Google Sheets
  const sheet = SpreadsheetApp.create('Henry Yang 諮詢表單回應');
  
  // 將表單連結到 Google Sheets
  forms.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  
  console.log('Google Sheets 已創建並連結到表單');
  console.log('Sheets URL：', sheet.getUrl());
  
  return sheet.getUrl();
}

/**
 * 設置自動回覆 Email 給提交者
 */
function setupAutoReply() {
  // 這個函數可以設置自動回覆功能
  // 需要配合 Gmail API 使用
  console.log('自動回覆功能需要額外設置 Gmail API');
}

/**
 * 主執行函數 - 一鍵設置完整表單
 */
function setupCompleteForm() {
  console.log('開始設置 Henry Yang 諮詢表單...');
  
  // 1. 創建表單
  const formResult = createHenryYangForm();
  console.log('表單創建完成');
  
  // 2. 創建回應儲存表
  const sheetUrl = createResponseSheet();
  console.log('回應儲存表創建完成');
  
  console.log('=== 設置完成 ===');
  console.log('表單網址：', formResult.publishedUrl);
  console.log('編輯網址：', formResult.editUrl);
  console.log('回應表：', sheetUrl);
  
  return {
    formUrl: formResult.publishedUrl,
    editUrl: formResult.editUrl,
    sheetUrl: sheetUrl
  };
}

/**
 * 測試函數 - 測試表單功能
 */
function testForm() {
  console.log('測試表單創建...');
  const result = createHenryYangForm();
  console.log('測試完成，表單網址：', result.publishedUrl);
  return result;
}
