# Calculator

一個以 JavaScript 為主的簡易計算機專案。目前僅支援**加法**與**減法**,之後再逐步擴充。

## 功能

- [x] 加法 (`+`)
- [x] 減法 (`-`)
- [ ] 乘法、除法(規劃中)
- [ ] 小數點、清除、退格(規劃中)

## 技術

- 語言:JavaScript (ES6+)
- 介面:HTML + CSS(純前端,無需建置工具)

## 專案架構

```
calculator/
├── index.html        # 頁面結構:顯示區與按鈕
├── css/
│   └── style.css     # 樣式
├── js/
│   ├── calculator.js # 核心運算邏輯(純函式,不碰 DOM)
│   └── ui.js         # 介面層:綁定按鈕事件、更新顯示
├── tests/
│   └── calculator.test.js  # 核心邏輯的單元測試
└── README.md
```

### 設計原則

- **邏輯與介面分離**:`calculator.js` 只負責運算(`add`、`subtract`),不依賴瀏覽器,方便測試與日後新增功能。
- **新增運算只需兩步**:在 `calculator.js` 加入函式,再於 `ui.js` 綁定對應按鈕。

## 使用方式

1. 取得專案
   ```bash
   git clone https://github.com/zxsd487074-ai/calculator.git
   cd calculator
   ```
2. 直接用瀏覽器開啟 `index.html` 即可。

## 參與貢獻

1. 從 `main` 建立功能分支:`git checkout -b feature/your-feature`
2. 完成後 commit 並 push
3. 發送 Pull Request,簡述改動內容

## 授權

尚未指定,待團隊討論後補上。
