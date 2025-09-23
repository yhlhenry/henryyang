# Google Apps Script 表單設置說明

## 📋 功能說明

這個 Google Apps Script 會創建一個與您網站表單相同的 Google Form，包含以下功能：

### 🎯 表單欄位
1. **姓名** (必填)
2. **Email** (必填)
3. **感興趣的課程** (下拉選單，必填)
   - Excel 基本入門
   - Excel 進階課程
   - Excel VBA 教學
   - NotebookLM 應用教學
   - Gemini/ChatGPT 應用教學
   - AI 簡報製作
   - Google Apps Script 自動化
   - n8n 免程式碼自動化
   - 網站架設
   - 企業內訓
   - 其他

4. **需求描述** (選填)
5. **聯絡方式偏好** (選填)
6. **預算範圍** (選填)
7. **上課時間** (選填)
8. **學習經驗** (選填)

### 🚀 自動化功能
- **自動 Email 通知**：有人提交表單時，會自動發送通知到 `yhlhenry@gmail.com`
- **回應儲存**：所有回應會自動儲存到 Google Sheets
- **確認訊息**：提交者會收到確認訊息

## 🛠️ 設置步驟

### 步驟 1：創建 Google Apps Script 專案
1. 前往 [Google Apps Script](https://script.google.com/)
2. 點擊「新增專案」
3. 將 `GoogleAppsScript_Form.gs` 的內容複製貼上到編輯器中

### 步驟 2：執行腳本
1. 在編輯器中，選擇 `setupCompleteForm` 函數
2. 點擊「執行」按鈕
3. 首次執行時需要授權權限

### 步驟 3：獲取表單網址
執行完成後，在執行記錄中會看到：
- 表單發布網址
- 表單編輯網址
- Google Sheets 回應表網址

### 步驟 4：設置觸發器（可選）
如果需要自動 Email 通知功能：
1. 在 Apps Script 編輯器中，點擊「觸發條件」
2. 新增觸發條件：
   - 函數：`onFormSubmit`
   - 事件來源：從表單
   - 事件類型：提交表單

## 📧 自動通知設置

### Email 通知內容包含：
- 提交者姓名和 Email
- 感興趣的課程
- 詳細需求描述
- 預算和時間偏好
- 學習經驗
- 提交時間

### 通知 Email 會發送到：
`yhlhenry@gmail.com`

## 🔗 整合到網站

### 方法 1：直接連結
將網站表單的提交按鈕改為連結到 Google Form：
```html
<a href="您的GoogleForm網址" target="_blank" class="btn btn-primary">送出諮詢</a>
```

### 方法 2：嵌入表單
將 Google Form 嵌入到網站中：
1. 在 Google Form 中點擊「傳送」
2. 選擇「嵌入」圖示
3. 複製 HTML 程式碼
4. 替換網站中的表單區塊

## 📊 回應管理

### Google Sheets 回應表
- 所有回應會自動儲存到 Google Sheets
- 可以進行數據分析和統計
- 支援匯出為 Excel 格式

### 回應欄位對應：
| 欄位 | Google Sheets 欄位 |
|------|-------------------|
| 姓名 | 您的姓名 |
| Email | 您的 Email |
| 課程 | 選擇感興趣的課程 |
| 描述 | 請描述您的需求或問題 |
| 聯絡偏好 | 偏好的聯絡方式 |
| 預算 | 預算範圍 |
| 時間 | 希望的上課時間 |
| 經驗 | 相關學習經驗 |
| 時間戳記 | 時間戳記 |

## 🎨 自定義選項

### 修改 Email 通知
在 `onFormSubmit` 函數中修改：
- 收件人 Email
- 郵件主旨格式
- 郵件內容格式

### 添加新欄位
1. 在 `createHenryYangForm` 函數中添加新欄位
2. 在 `onFormSubmit` 函數中處理新欄位資料

### 修改課程選項
在 `courseItem.setChoices()` 中修改課程清單

## 🔧 故障排除

### 常見問題：
1. **權限錯誤**：確保已授權所有必要的 Google 服務
2. **Email 發送失敗**：檢查 Gmail 配額限制
3. **表單無法創建**：檢查 Google Forms API 權限

### 測試功能：
使用 `testForm()` 函數來測試表單創建功能

## 📞 技術支援

如有任何問題，請聯繫：
- Email: yhlhenry@gmail.com
- LINE: @kmq1480f

---
*此腳本由 Henry Yang 亨利羊設計製作*
