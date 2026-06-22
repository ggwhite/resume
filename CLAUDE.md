# Resume — 網頁版履歷

## 專案概述
Vue 3 靜態網站，張育誠的網頁版履歷。
Repo: git@github.com:ggwhite/resume.git

## 技術棧
- Vue 3 + Vite
- Tailwind CSS v3
- vue-router 4（hash mode）
- @lucide/vue（UI icon）
- html2pdf.js（前端 PDF 產生，lazy import）

## 指令
```bash
npm run dev      # 開發模式
npm run build    # 打包輸出至 docs/
npm run preview  # 預覽 production build
```

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
    Resume.vue            # 唯一的 View，透過 locale prop 切換語言
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
```

## 資料維護原則
- **履歷資料集中在 `src/data/` 目錄**
- `shared.js`：聯絡方式（email、phone、github、linkedin）、程式語言技能 — 改一處兩個語言版本同步
- `en.js` / `zh-tw.js`：各語言的名字、職稱、section 標題、工具列表、摘要、工作經歷、接案、學歷
- Component 只負責渲染，不含任何履歷內容
- 英文版與中文版資料要保持同步更新

## 路由
- `/#/` 或 `/#/en` → 英文版
- `/#/zh-tw` → 中文版

路由透過 `props: { locale }` 傳遞語言給 Resume.vue。

## PDF 功能
- **Print / Save PDF**：呼叫 `window.print()`，搭配 `@media print` CSS
- **Download PDF**：使用 html2pdf.js 前端產生 PDF 下載

## 注意事項
- Vue 3 語法（Options API）
- `photo.jpg` 是個人照片，不要刪除或替換
- Tailwind CSS class 寫在 template 裡，不使用 scoped style
- GitHub/LinkedIn icon 是自訂 SVG 元件（@lucide/vue 無品牌 icon）
