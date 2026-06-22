# Resume — 網頁版履歷

## 專案概述
Vue 3 靜態網站，張育誠的網頁版履歷。
Repo: git@github.com:ggwhite/resume.git

## 技術棧
- Vue 3 + Vite
- Tailwind CSS v3
- vue-router 4（hash mode）
- @lucide/vue（UI icon）

## 指令
```bash
npm run dev      # 開發模式
npm run build    # 打包輸出至 docs/
npm run preview  # 預覽 production build
```

## PDF 產生
```bash
# 需要先啟動 dev server，再執行：
python scripts/generate-pdf.py --port <port>
```
使用 Playwright 的原生 PDF 渲染器，從 `/#/pdf` 和 `/#/pdf/zh-tw` 路由產生一頁式 PDF。
產出檔案直接寫入 `public/WhiteChang-Resume.{en,zh-tw}.pdf`。

## 部署流程
1. `npm run build`
2. `git add docs/`
3. `git commit && git push`

GitHub Pages 從 `master` branch 的 `/docs` 資料夾提供服務。
Production base path: `/resume/`

## 目錄結構
```
src/
  data/
    shared.js             # 共用資料（聯絡方式、程式語言技能）
    en.js                 # 英文版履歷內容 + section labels
    zh-tw.js              # 中文版履歷內容 + section labels
  views/
    ResumeModern.vue      # 主要 View（正式版），可展開工作經歷
    ResumePdf.vue         # PDF 專用佈局（一頁式精簡版）
    Resume.vue            # 舊版（/legacy 路由保留參考）
  components/
    MainHead.vue          # 姓名、職稱
    SummaryQualification.vue  # 摘要條列
    Experience.vue        # 工作經歷卡片
    Project.vue           # 接案專案卡片
    Profile.vue           # 右側個人資訊、技能列表
    Education.vue         # 學歷
    Description.vue       # 遞迴描述元件（支援 string / array / object）
    icons/
      GithubIcon.vue      # GitHub SVG icon
      LinkedinIcon.vue    # LinkedIn SVG icon
  assets/
    photo.jpg             # 大頭照
    bg.jpg                # 背景圖
scripts/
  generate-pdf.py         # Playwright PDF 產生腳本
```

## 資料維護原則
- **履歷資料集中在 `src/data/` 目錄**
- `shared.js`：聯絡方式（email、phone、github、linkedin）、程式語言技能 — 改一處兩個語言版本同步
- `en.js` / `zh-tw.js`：各語言的名字、職稱、section 標題、核心能力、AI 工作流程、工作經歷、接案、學歷
- Component 只負責渲染，不含任何履歷內容
- 英文版與中文版資料要保持同步更新
- 內容應與 GitHub profile（ggwhite/ggwhite）保持一致

## 路由
| 路由 | 說明 |
|---|---|
| `/#/` `/#/en` | 英文版（ResumeModern） |
| `/#/zh-tw` | 中文版（ResumeModern） |
| `/#/pdf` `/#/pdf/zh-tw` | PDF 專用佈局（隱藏，不在導航列） |
| `/#/legacy` `/#/legacy/zh-tw` | 舊版（保留參考） |

## 注意事項
- Vue 3 語法（Options API）
- `photo.jpg` 是個人照片，不要刪除或替換
- Tailwind CSS class 寫在 template 裡，不使用 scoped style
- GitHub/LinkedIn icon 是自訂 SVG 元件（@lucide/vue 無品牌 icon）
- PDF 用 Playwright 產生，不用 html2pdf.js
