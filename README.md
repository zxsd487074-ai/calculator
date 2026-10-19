# Calculator

一個以 JavaScript 為主的簡易計算機專案。目前支援四則運算與三個工程常用函數,之後再逐步擴充。

線上試用:https://zxsd487074-ai.github.io/calculator/(GitHub Pages)

## 功能

- [x] 加法 (`+`)
- [x] 減法 (`-`)
- [x] 乘法 (`×`)
- [x] 除法 (`÷`),除以 0 時顯示錯誤訊息而非回傳 `Infinity`
- [x] 清除 (`C`)
- [x] 平方根 (`√x`),輸入負數時顯示錯誤訊息
- [x] 平方 (`x²`)
- [x] 正弦 (`sin`),輸入單位為**角度**,例如 `sin(30) = 0.5`
- [ ] 小數點輸入、退格(規劃中)

> 函數會直接作用在目前顯示的數字上,不影響已輸入的待算運算。結果最多顯示 10 位有效數字,過長時改用科學記號。

## 技術

- 語言:JavaScript (ES6+)
- 介面:HTML + CSS(純前端,無需建置工具)

## 專案架構

```
calculator/
├── index.html   # 頁面結構:顯示區、函數鍵與數字/運算鍵
├── style.css    # 樣式
├── script.js    # 運算邏輯與按鈕事件
└── README.md
```

### 設計原則

- **運算以表格定義**:二元運算放在 `script.js` 的 `operations`(`+`、`-`、`×`、`÷`),單一數字的函數放在 `functions`(`sqrt`、`square`、`sin`)。
- **新增函數只需兩步**:在 `functions` 加入一個函式,再於 `index.html` 加一顆帶 `data-fn="名稱"` 的按鈕。

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
