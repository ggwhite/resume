# Cake 作品集素材：Resume

## 圖片

| 檔案 | 用途 | 尺寸 |
|---|---|---|
| `cover.png` | Cake 作品封面 | 1200 x 360 |
| `preview.png` | 圖卡總覽預覽 | 1296 x 270 |
| `card-01.png` | 說明圖卡 1：專案定位 | 1080 x 1350 |
| `card-02.png` | 說明圖卡 2：網站介面 | 1080 x 1350 |
| `card-03.png` | 說明圖卡 3：資料集中管理 | 1080 x 1350 |
| `card-04.png` | 說明圖卡 4：網站 / PDF 雙輸出 | 1080 x 1350 |
| `card-05.png` | 說明圖卡 5：履歷內容策略 | 1080 x 1350 |
| `card-06.png` | 說明圖卡 6：部署流程 | 1080 x 1350 |

## 重產圖片

```bash
python3 scripts/portfolio/render-resume-cake.py
npm run build
```

## Cake 標題建議

Resume — 可部署的雙語工程履歷

## Cake 作品描述草稿

這是一個以 Vue 3 + Vite 製作的個人履歷網站，把履歷從靜態 PDF 變成可部署、可維護、可雙語呈現的工程作品。

專案同時支援英文與繁體中文路由，履歷資料集中管理在 `src/data/`，Component 只負責渲染，避免內容散落在頁面模板中。網站版提供可展開的工作經歷、清楚的能力分類與 PDF 下載；PDF 版則透過專用路由與 Playwright 原生 PDF renderer 產生一頁式履歷，讓線上瀏覽與投遞附件使用同一份資料來源。

部署上使用 Vite build 輸出到 `docs/`，由 GitHub Pages 直接服務 `/resume/` 路徑。這個專案展示的不只是履歷內容，也包含前端資訊架構、靜態部署、PDF 產線與可維護資料模型。

GitHub: https://github.com/ggwhite/resume

