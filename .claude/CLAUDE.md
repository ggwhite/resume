# Resume — 網頁版履歷

## 專案概述
Vue 2 靜態網站，張育誠的網頁版履歷。
Repo: git@github.com:ggwhite/resume.git

## 技術棧
- Vue 2（vue-cli-service）
- Bootstrap-Vue
- Font Awesome
- Less（CSS preprocessor）

## 指令
```bash
npm run serve                                  # 開發模式，預設 http://localhost:8080
NODE_OPTIONS=--openssl-legacy-provider npm run build   # 打包輸出至 docs/
```

> Node.js 17+ 需要加 `NODE_OPTIONS=--openssl-legacy-provider`，否則 webpack 4 會報 ERR_OSSL_EVP_UNSUPPORTED。

## 部署流程
1. `NODE_OPTIONS=--openssl-legacy-provider npm run build`
2. `git add docs/`
3. `git commit && git push`

GitHub Pages 從 `master` branch 的 `/docs` 資料夾提供服務。

## 目錄結構
```
src/
  views/
    ResumeEn.vue      # 英文版（所有履歷資料在此）
    ResumeZhTw.vue    # 中文版（所有履歷資料在此）
  components/
    MainHead.vue      # 姓名、職稱、PDF 連結
    SummaryQualification.vue  # 摘要條列
    Experience.vue    # 工作經歷卡片
    Project.vue       # 接案專案卡片
    Profile.vue       # 右側個人資訊、技能列表
    Education.vue     # 學歷
  assets/
    photo.jpg         # 大頭照
    bg.jpg            # 背景圖
```

## 資料維護原則
- **所有履歷資料只放在 View 檔（ResumeEn.vue / ResumeZhTw.vue）的 data()**
- Component 只負責渲染，不含任何履歷內容
- 英文版與中文版資料要保持同步更新

## 路由
- `/` 或 `/en` → 英文版
- `/zh-tw` → 中文版

## 注意事項
- Vue 2，不要用 Vue 3 語法
- PDF 檔（WhiteChang-Resume.*.pdf）放在 public/ 目錄，不在 src/
- `photo.jpg` 是個人照片，不要刪除或替換
