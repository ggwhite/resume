# Resume — 網頁版履歷

## 專案概述
張育誠的網頁版履歷：捲動敘事式單頁網站，旁邊的 three.js 舞台把每一段故事「演出來」；另有一頁式、可機器讀取的 PDF（英文／繁中）。
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
- PDF 只印「紀錄」欄位（about／competencies／aiWorkflow／experience＋pdfHighlights／project／education），不印 `site` 的創意文案。
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
    en.js            # 英文內容：site（網站語氣、故事段落、場景標籤）＋紀錄欄位＋pdfHighlights
    zh-tw.js         # 中文內容，結構與 en.js 相同
  views/
    Site.vue         # 互動網站（/#/、/#/zh-tw），只渲染資料
    ResumePdf.vue    # PDF 專用一頁式版面（/#/pdf、/#/pdf/zh-tw）
  components/
    RepoDemo.vue     # 開源卡片裡的 demo：打字終端機、HUD 示意、遮罩切換、角色流程
  gl/
    scenes.js        # 故事場景：每個場景是一張小圖（節點＋連線）加一段迴圈腳本
    field.js         # three.js 引擎：粒子畫出場景、封包、投影 DOM 標籤與字幕、對齊 DOM slot
    portrait.js      # 大頭照的 WebGL 平面（全彩、切片進場、指標漣漪）
  styles/site.css    # 網站樣式、動態、reduced-motion 與無 WebGL fallback
  assets/
    portrait.jpg     # 網站與 PDF 使用的大頭照（由 photo.jpg 裁切，全彩，已去除 metadata）
    photo.jpg        # 原始照片，NEVER 刪除
scripts/
  generate-pdf.py    # PDF 產生與檢查
  pdf-text.swift     # 以 PDFKit 抽出 PDF 文字
```

## 場景怎麼接到內容
- 文字段落（`.step`）或區塊加 `data-scene="<key>"`；引擎取「閱讀線以上最後一個」當作目前場景，畫進最近的 `[data-stage-root]` 裡的 `.stage-slot`。
- 場景定義在 `gl/scenes.js`（節點、連線、`play(a, t)` 腳本）；標籤與字幕文字在兩個語言檔的 `site.scenes.<key>`。
- 場景一律要「演出那一段寫的事」：標籤用畫面上那段文字裡的名詞，腳本只表現來源裡有的事實（例：POC 停在 POC、Redis 事件的結果是「敏感狀態改存 process 記憶體＋Docker 隔離」）。NEVER 放純裝飾、沒有意義的形狀。
- 新增故事：`scenes.js` 加場景 → 兩個語言檔加 `site.scenes.<key>` → `Site.vue`（或資料的 steps／chapters）加一段 `data-scene`。
- 目前場景：cluster（hero）、poc／framework／index／pipeline／tamper（五種問題）、migrate／race／index／hash／inject（大極）、timeline（先前經歷）、delegate／guard（AI 工作流程）、handshake（聯絡）、dust（無圖）。

## 資料維護原則
- **履歷內容一律放 `src/data/`**；component 只負責渲染。
- 英文版與中文版保持同步、內容對等。
- `site` 的創意文案只能換說法（框架、節奏、標題、比喻），每一句都要對得上紀錄欄位或 repo README 的事實；數字、職稱、日期、成果 NEVER 自行編造。
- NEVER 寫「帶領／主導團隊」、NEVER 提內部專案代號；微服務／gRPC 整合與 HMAC 防竄改架構一律寫「做到 POC」。
- GitHub star 數以 `gh api repos/ggwhite/<repo>` 為準，改在 `shared.js` 的 `repos`；不到 10 顆的不顯示（memory-mcp、Jarvis 用測試數／功能當佐證）。
- 開源 demo（`RepoDemo.vue`）的指令、範例值、分頁與角色名稱一律取自各 repo README；NEVER 編造輸出或數據。Jarvis 面板要保留「示意，非即時資料」字樣。
- 聯絡方式只用 `shared.js` 的 `contact`。

## 動態與效能規則
- 一律尊重 `prefers-reduced-motion`：不跑動畫迴圈，場景只畫定格（`still` 時間點），大頭照用 `<img>`，demo 顯示最終狀態。
- 沒有 WebGL 時不下載 three.js、隱藏舞台欄；NEVER 讓 console 出現錯誤。
- pixel ratio 上限：桌機 2、手機 1.5；fps 低於約 42 自動降低。分頁隱藏時暫停。
- 窄螢幕：舞台固定在畫面上方，canvas 以 scissor 只畫在舞台範圍內，粒子不可跑到內文後面。
- 文字一律是真的 DOM 文字，NEVER 畫進 canvas。小字（kicker、編號、頁尾）保留深色底。

## 路由
| 路由 | 說明 |
|---|---|
| `/#/`（`/#/en`、`/#/legacy` 會轉址到這裡） | 英文版 |
| `/#/zh-tw`（`/#/legacy/zh-tw` 會轉址到這裡） | 中文版 |
| `/#/pdf` `/#/pdf/zh-tw` | PDF 專用版面（不在導航列） |

## 注意事項
- `photo.jpg`／`portrait.jpg` 是個人照片，不要刪除；照片一律全彩，裁切時不可帶到其他人。
- `site.css` 會在 PDF 路由一起載入，PDF 版面的 class 名稱不可與它重複（例：`.contact` 曾撞名）。
