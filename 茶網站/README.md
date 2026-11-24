# 日藏 SUNWARD TEA

苗栗頭屋九蒸九曬酸柑茶品牌形象網站。網站使用原生 HTML、CSS 與 JavaScript，無建置步驟，可直接部署為 Render Static Site。

## 本機預覽

直接用瀏覽器開啟 `index.html`，或在專案根目錄執行 `npx serve .`。

## GitHub 與 Render

1. 將整個專案推送到 GitHub repository。
2. 在 Render 選擇 **New → Static Site** 並連接該 repository。
3. Build Command 留空，Publish Directory 設為 `.`。也可使用根目錄的 `render.yaml` 建立服務。

## 功能

- 響應式品牌首頁、九蒸九曬工藝階段切換與點擊後啟用的 Web Audio 聲景。
- 3／5／10 年以上典藏年份切換與茶湯風味展示。
- 三款禮盒視覺、風味層次、草本文化說明。
- A／B／C 茶席與 DIY 體驗選擇及預約表單、確認摘要。

預約表單目前僅在瀏覽器端產生確認摘要，不會保存或傳送資料。若要正式接單，請串接表單服務或後端 API。
