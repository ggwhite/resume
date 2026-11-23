# Resume — 網頁版履歷

## 專案概述
張育誠的網頁版履歷：以 three.js 粒子場景為主視覺的單頁網站，加上一頁式、可機器讀取的 PDF（英文／繁中）。
Repo: git@github.com:ggwhite/resume.git

## 技術棧
- Vue 3（`<script setup>`）+ Vite
- three.js（動態 import，首屏文字不等它）
- vue-router 4（hash mode）
- 手寫 CSS（`src/styles/site.css`），不使用 Tailwind
- 字型：Bricolage Grotesque／Hanken Grotesk／JetBrains Mono（@fontsource-variable，自架）；中文用系統字型

## 指令
```bash
npm run dev      # 開發模式
npm run build    # 打包輸出至 docs/
npm run preview  # 預覽 production build
npm run pdf      # 重新產生兩份 PDF（自己啟動 dev server，寫入 public/ 並複製到 docs/）
```

## PDF 產生
- `npm run pdf` 需要 Python Playwright（`pip install playwright && playwright install chromium`）。
- 從 `/#/pdf`、`/#/pdf/zh-tw` 產生 `public/WhiteChang-Resume.{en,zh-tw}.pdf`，並複製到 `docs/`。
- 腳本一律檢查：每份剛好 1 頁；以 PDFKit（`scripts/pdf-text.swift`）抽出的文字去掉空白後必須與頁面文字完全相同（順序一致），且英數單字不可被拆開。任一項不過就 exit 1。
- PDF 版面（`src/views/ResumePdf.vue`）NEVER 加 letter-spacing、逐字 span、canvas／WebGL 文字、多欄；一律單欄、照 DOM 順序、系統字型。
- 中文 PDF 一律用 Heiti TC，NEVER 改回 PingFang TC（Chromium 會把文字層順序打亂）。
- 內容超過一頁時調 `ResumePdf.vue` 的字級／間距，或縮短 `pdfHighlights`。

## 部署流程
1. 內容有改：`npm run pdf`
2. `npm run build`
3. `git add docs public && git commit && git push`

GitHub Pages 從 `master` branch 的 `/docs` 資料夾提供服務。Production base path: `/resume/`
`public/portfolio/` 會原樣複製到 `docs/portfolio/`，路徑不可變動。

## 目錄結構
```
src/
  data/
    shared.js        # 聯絡方式、程式語言技能、開源 repo 連結與 star 數
    en.js            # 英文內容：履歷資料 + site（網站呈現文案）+ pdfHighlights
    zh-tw.js         # 中文內容，結構與 en.js 相同
  views/
    Site.vue         # 互動網站（/#/、/#/zh-tw），只渲染資料
    ResumePdf.vue    # PDF 專用一頁式版面（/#/pdf、/#/pdf/zh-tw）
  gl/
    field.js         # three.js 主場景：一個粒子場，依捲動位置變形成各區塊的結構
    shapes.js        # 各區塊的粒子目標形狀與配置（位置、透明度、縮放）
    portrait.js      # 大頭照的 WebGL 平面（全彩、切片進場、指標漣漪）
  styles/site.css    # 網站樣式、動態、reduced-motion 與無 WebGL fallback
  assets/
    portrait.jpg     # 網站與 PDF 使用的大頭照（由 photo.jpg 裁切，全彩）
    photo.jpg        # 原始照片
scripts/
  generate-pdf.py    # PDF 產生與檢查
  pdf-text.swift     # 以 PDFKit 抽出 PDF 文字
```

## 場景與區塊對應
`Site.vue` 每個 section 的 `data-scene="N"` 對應 `shapes.js` 的 `STAGES[N]`：
0 hero（螺旋）、1 systems（Gate/Lobby/Game 三層）、2 work（雙螺旋時間軸）、3 ai（主 session／輕量模型／worker／verifier）、4 oss（星座）、5 skills（晶格）、6 contact（同心環）。
新增區塊時兩邊一起加。3D 節點標籤的文字在 `data/*.js` 的 `site.scene`。

## 資料維護原則
- **履歷內容一律放 `src/data/`**；component 只負責渲染。
- 英文版與中文版保持同步。
- 只寫有來源的事實；數字、職稱、日期、成果 NEVER 自行編造。
- NEVER 寫「帶領／主導團隊」、NEVER 提內部專案代號；微服務／gRPC 整合與 HMAC 防竄改架構一律寫「做到 POC」。
- GitHub star 數以 `gh api repos/ggwhite/<repo>` 為準，改在 `shared.js` 的 `repos` 與對應的專案描述；不到 10 顆的不顯示。
- 聯絡方式只用 `shared.js` 的 `contact`。

## 動態與效能規則
- 一律尊重 `prefers-reduced-motion`：不跑動畫迴圈，粒子場只畫靜止畫面，大頭照用 `<img>`。
- 沒有 WebGL 時不下載 three.js，改用 CSS 漸層背景；NEVER 讓 console 出現錯誤。
- pixel ratio 上限：桌機 2、手機 1.5；fps 低於約 42 自動降低。分頁隱藏時暫停。
- 文字一律是真的 DOM 文字，NEVER 畫進 canvas。

## 路由
| 路由 | 說明 |
|---|---|
| `/#/`（`/#/en` 會轉址） | 英文版 |
| `/#/zh-tw` | 中文版 |
| `/#/pdf` `/#/pdf/zh-tw` | PDF 專用版面（不在導航列） |

## 注意事項
- `photo.jpg`／`portrait.jpg` 是個人照片，不要刪除；照片一律全彩，裁切時不可帶到其他人。
- `site.css` 會在 PDF 路由一起載入，PDF 版面的 class 名稱不可與它重複（例：`.contact` 曾撞名）。
