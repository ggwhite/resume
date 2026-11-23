import { contact, programming } from './shared'

export default {
  pdf: "/resume/WhiteChang-Resume.zh-tw.pdf",
  labels: {
    summary: "摘要",
    experience: "工作經歷",
    project: "接案與個人專案",
    personalInfo: "個人資訊",
    programming: "程式語言",
    tools: "工具",
    education: "學歷",
    competencies: "核心能力",
    aiWorkflow: "AI 輔助開發",
    print: "列印 / 存為 PDF",
    download: "下載 PDF",
  },
  // 互動網站的語氣與場景：標題、故事、場景標籤。
  // 只是換說法——每一句都對應下方紀錄（competencies／aiWorkflow／experience／project）、
  // 已核可的面試故事，或各 repo README 裡的事實。標題、hero 與圖一律用中性詞
  // （服務、使用者、平台）；產業細節留在工作經歷紀錄裡。
  site: {
    nav: { bring: "我能做什麼", work: "經歷", oss: "開源", skills: "工具箱", contact: "聯絡" },
    langSwitch: { label: "EN", to: "/" },
    hero: {
      nameLines: ["張育誠"],
      altName: "White Chang",
      value: "我讓高併發的線上系統算得對、跑得快、改版上線穩得住，並用 AI agent 加快交付。",
      chips: ["約 15 年後端開發", "即時、高併發的線上系統", "開源 go-masker：GitHub 130+ stars"],
      stack: "Go · Java · Lua",
      contact: "聯絡我",
      words: ["Go", "Java", "Lua", "Redis", "MongoDB", "MySQL", "gRPC", "Docker", "Kubernetes"],
      photoAlt: "張育誠的照片",
    },
    labels: { situation: "情況", problem: "問題", action: "做法", result: "結果", detail: "工程細節" },
    bring: {
      title: "我能為團隊做什麼",
      sub: "三件事，每一件都有真實案例。",
      strengths: [
        {
          line: "系統出問題時，我找的是真正的原因，不是最近的那一個。",
          stories: [
            {
              scene: "race",
              head: "重複領取完全停止，查詢從幾分鐘降到幾百毫秒。",
              tldr: "一個每天只能領一次的功能，同一個人卻領到好幾次。看起來是一個 bug，底下其實是兩個各自獨立的原因；我把兩個都找出來，分開修掉。",
              detail: [
                { k: "situation", scene: "race", text: "有個功能讓每位使用者一天領取一次。伺服器分三步處理：先檢查今天領過沒，再跑一個查詢確認資格，最後發放。" },
                { k: "problem", scene: "race", text: "使用者回報按鈕點了沒反應，於是又點了幾次。每一次點擊都通過第一步，因為還沒有任何一筆發放；它們全排在同一個慢查詢後面。查詢一回來，每個等著的請求各發一次：同一個人領到好幾次，是會造成財損的 bug。" },
                { k: "action", scene: "race", text: "第一個原因：「檢查」和「發放」之間有空窗。我用 Redis 標記把它關上——第一個寫入標記的請求繼續往下走，之後的全部被擋下，標記一天後過期。" },
                { k: "action", scene: "index", text: "第二個原因：查詢本身。它讀的資料放在每天自動建立的 collection 裡，一天約 270 萬筆；而每天建立 collection 的流程裡沒有建索引這一步，所以每次查詢都是全集合掃描。我在 Lua Server 加了排程，提前為「今天」和「明天」的 collection 建好複合索引，再把同一套做法推廣到其他大型 collection。" },
                { k: "result", scene: "index", text: "重複領取完全停止。查詢時間從幾分鐘降到幾百毫秒。" },
              ],
              tags: ["併發", "Redis", "MongoDB", "效能"],
            },
          ],
        },
        {
          line: "我讓線上系統安全、穩定：出事先止血，搬動正式環境照劇本走。",
          stories: [
            {
              scene: "tamper",
              head: "資料被竄改的那條路，關上了。",
              tldr: "服務存在 Redis 裡的狀態，被人從外部改動。加密和校驗都擋不住，所以我把資料搬到 Redis client 碰不到的地方。",
              detail: [
                { k: "situation", text: "為了讓斷線的連線能從中斷處接回去，服務把 session 狀態存在 Redis。" },
                { k: "problem", text: "後來紀錄裡出現正常流程不可能產生的結果：Redis 裡的狀態在正常流程之外被改動了。我先加 checksum，再改用 AES 加密，都沒用——secret 一旦外露，任何應用層驗證攻擊者都能照做一份。" },
                { k: "action", text: "所以我不再守著原地的資料，而是把它搬走。受影響服務的敏感狀態改存 process 記憶體，Redis client 碰不到；環境再用 Docker 隔離。" },
                { k: "result", text: "狀態搬進 process 記憶體之後，這條竄改路徑就關上了，竄改停止。另外，我設計了防竄改架構（HMAC 簽章、狀態機、audit trail），做到可 demo 的 POC，沒有進正式環境。" },
              ],
              tags: ["資安", "Redis", "Docker"],
            },
            {
              scene: "inject",
              head: "清掉被注入執行中服務的程式碼，而且證據都留著。",
              tldr: "有人把程式碼注入一個執行中的服務。我先建立監控、保留證據，再重啟服務把它清掉。",
              detail: [
                { k: "situation", text: "一個線上服務的紀錄裡，持續出現異常結果。" },
                { k: "problem", text: "我追查到是有人透過 Skynet debug console 注入 Lua 程式碼，改掉了記憶體裡的服務邏輯。" },
                { k: "action", text: "我先建立監控、保留證據，才重啟受影響的服務。" },
                { k: "result", text: "重啟清掉了記憶體裡的注入程式碼；監控持續保留，用來檢查有沒有新的注入跡象。" },
              ],
              tags: ["事件處理", "Lua/Skynet"],
            },
            {
              scene: "migrate",
              head: "8 個平台搬進容器，沒有一次需要 rollback。",
              tldr: "2026 年 6 月到 11 月，我把 8 個平台的正式環境從裸機切換到 Docker，每一個都在排定的維護時段內完成。",
              detail: [
                { k: "situation", text: "多個平台的服務與後台直接跑在裸機上，而 git 裡有部分設定早就和正式環境實際在跑的不一致。" },
                { k: "problem", text: "這種搬遷，每個平台只有一次切換的機會。照著 git 直接上線，正式環境的設定會在沒人發現的情況下被改回舊值。" },
                { k: "action", text: "我把正式環境的設定撈回來，和 git 逐 key 比對；寫了比對新舊環境 MySQL、Redis、MongoDB 的腳本；也寫了上線 cutover runbook：停寫、資料同步、開放流量，每一步都有完成判準。image 推到 Harbor 與 AWS ECR，以 git tag 觸發發版 pipeline。修正工具預設只預覽，明確指定才寫入，而且先備份原值。" },
                { k: "result", text: "2026 年 6 月到 11 月，8 個平台切換到正式環境，每一個都在排定的維護時段內完成，沒有 rollback。" },
              ],
              tags: ["Docker", "GitLab CI/CD", "Harbor", "AWS ECR"],
            },
          ],
        },
        {
          line: "我用 AI agent 交付，但決定和把關的人是我。",
          stories: [
            {
              scene: "delegate",
              head: "AI 負責寫程式，但不能自己驗收自己。",
              tldr: "架構由我決定，一個 agent 實作，另一個獨立的 agent 驗收。為了讓這套流程每天都能運作，我做了兩個開源工具：memory-mcp 和 Jarvis。",
              detail: [
                { k: "situation", scene: "delegate", text: "日常開發以 Claude Code 為主 session：debug、調查、架構討論都在這裡進行，由我負責規劃與拍板。" },
                { k: "problem", scene: "delegate", text: "讓 agent 審自己寫的程式，審查時帶著的是同一批盲點。session 一結束它還會全部忘光；工作分派給好幾個 agent 之後，光看對話也看不出每個 agent 在做什麼。" },
                { k: "action", scene: "delegate", text: "我把位子分開：輕量模型負責檔案搜尋與雜事，worker 負責實作，再由另一個獨立的 verifier 驗收。模組邊界、通訊協議、安全模型這些架構決策留在我手上；AI 會漏掉的生產環境盲點，例如 logging 覆蓋率與安全加固，也由我補上。" },
                { k: "action", scene: "guard", text: "harness 規則檔（CLAUDE.md / AGENTS.md）把 AI 的行為限制在專案規範內。我做了 memory-mcp，讓偏好、踩過的坑與未完成的工作延續到下一個 session；也做了 Jarvis，即時看每個 subagent 的任務、時間與成本。" },
                { k: "result", scene: "guard", text: "這是我每天的工作方式。團隊現在讓 Claude Code 與 Codex 共用同一套規則；兩個工具都已開源：memory-mcp 用 Go 寫，Jarvis 用 TypeScript 寫、有 1,100+ 個測試。" },
              ],
              tags: ["Claude Code", "MCP", "memory-mcp", "Jarvis"],
            },
          ],
        },
      ],
    },
    work: {
      title: "經歷",
      sub: "近 15 年，橫跨遊戲、支付與企業系統。",
      role: "在 5–10 人團隊中負責架構規劃與技術決策：先評估一個改動該不該做、會動到哪裡、風險多高。上面的案例都發生在這裡。",
      notes: [
        { scene: "poc", head: "知道什麼時候不該上線。", text: "三個平台各自長在不同的技術棧上。我規劃把後端整合成一套（微服務／gRPC，含 HMAC 簽章、狀態機、audit trail 的防竄改資料層），做到可 demo 的 POC。接著把「遷移」和「設計」分開評估，然後喊停：全面重寫對線上平台風險過高。沒有任何東西進正式環境。" },
        { scene: "hash", head: "一個 Hash，取代整片 keyspace 的掃描。", text: "有些 Redis 資料是「每個 rid 一把 key」，要讀就得用 SCAN 掃過整片 keyspace。我把結構改成單一 Hash、rid 當 field，大量的 SCAN 操作就消失了。" },
      ],
      alsoTitle: "在大極還做了",
      also: [
        "導入團隊共用知識庫與 AI agent 協作規則，讓 Claude Code 與 Codex 共用同一套規範。",
        "建立 playbook／runbook 的沉澱流程：每次排查與上線踩到的坑都回寫成文件。",
        "用 RabbitMQ 做即時推播。",
        "GitLab CI/CD 推送 Harbor、Kubernetes Helm Chart、GitLab Runner。",
        "透過 code review 與 pair programming 帶新人上手。",
      ],
      record: "完整紀錄",
      earlier: "在那之前",
    },
    quote: "寫的人不驗自己。",
    oss: {
      title: "我放上 GitHub 的東西",
      freelance: "接案",
      archived: "不再維護",
      stars: "stars",
      lines: {
        "memory-mcp": "session 一結束，AI agent 就全忘了。這個工具幫它記得。",
        "jarvis": "對話旁的即時 HUD：每個 subagent 正在做什麼、花了多少。",
        "go-masker": "log 和別人的手機號碼之間，只隔一個 struct tag。",
        "4x": "已不再維護。它的那條規則，還在我的工作流程裡。",
      },
      labels: { problem: "問題", how: "怎麼運作", proof: "佐證", repo: "到 GitHub 看", more: "GitHub 上還有" },
      flag: {
        "memory-mcp": {
          problem: "AI coding agent 在 session 結束時會全部忘光：昨天修好的 bug、被糾正過兩次的慣例、做到一半的重構。下一個 session 又從零開始。",
          how: "一個 Go binary 加一個 SQLite 檔，三種用法：CLI、MCP server，以及 Claude Code hooks——session 開始與每則 prompt 自動注入相關記憶，session 結束時寫下摘要。搜尋用 SQLite FTS5 trigram tokenizer，可選擇搭配本機 Ollama 向量，以 Reciprocal Rank Fusion 混合排序。",
          proof: ["7 個 MCP tool", "中日韓全文搜尋", "macOS + Linux binary", "MIT"],
        },
        "jarvis": {
          problem: "工作一旦分派給多個 subagent，光看對話看不出每個 agent 在做什麼、花了多少、有沒有卡住。",
          how: "一個 Claude Code mod，在對話旁開即時 HUD 面板：每個執行中的 subagent 的任務、執行時間、token 與預估 API 成本；卡住或迴圈的 agent 當下就被標出來；還有這個 session 動過的檔案，以及本機其他所有 session。",
          proof: ["1,100+ 個測試", "終端機 + Claude Desktop", "英文 + 繁體中文介面", "MIT"],
        },
        "go-masker": {
          problem: "姓名、email、電話、卡號，只要沒人記得遮，就會出現在 log 和 API 輸出裡。",
          how: "在 struct 欄位加上 tag，函式庫就會遮罩：內建姓名、email、電話、身分證、卡號的 masker，mid-4-4 這類動態 tag，用 Register 掛上自訂 masker，以及 Sensitive[T]——在 fmt、JSON、slog 一律遮罩，要呼叫 Reveal() 才拿得到原值。",
          proof: ["GitHub 130+ stars", "2019/04 維護至今", "v3 · Go 1.22+", "MIT"],
        },
      },
      til: { label: "White's Tech Notes", line: "我的 TIL 技術筆記：Go、Java、Lua、DevOps 與 AI 輔助開發——踩過的坑、根因與解法。", url: "https://ggwhite.github.io/ggwhite/" },
      demo: {
        termTitle: "quick start",
        termNotes: ["每筆記憶一行索引；全文用 `get` 依 id 取回", "把 7 個 MCP tool 開給 Claude Code"],
        jarvisNote: "Now 分頁示意，非即時資料",
        jarvisCols: ["subagent", "狀態", "執行時間"],
        jarvisStates: ["執行中", "完成", "標記：卡住"],
        raw: "原始",
        masked: "遮罩後",
        fourxFail: "Reviewer FAIL → amending",
      },
    },
    skills: { title: "工具箱裡有什麼", hint: "點一個語言，看我搭配什麼用。" },
    contact: { title: "建立連線。", sub: "資深後端工程師 · Go · Java · Lua" },
    scenes: {
      race: {
        labels: { req: ["使用者點擊"], c1: ["1 · 領過了嗎？"], c2: ["2 · 符合資格？", "慢查詢"], grant: ["3 · 發放"], mark: ["Redis 標記"] },
        caps: ["原本該有的流程：檢查、確認、發放一次", "第 2 步很慢，第二次點擊在任何發放之前就通過了第 1 步", "解法：第一個請求寫入 Redis 標記，之後的全部被擋下"],
      },
      index: {
        labels: { query: ["查詢"], idx: ["複合索引"], sched: ["Lua 排程", "每日執行"], coll: ["今天的 collection", "每日約 270 萬筆"] },
        caps: ["每天都會自動建立一個新的 collection", "它沒有索引，所以每次查詢都把每一筆讀過", "排程提前建好今天和明天的索引", "查詢走索引，直接命中要的資料"],
      },
      tamper: {
        labels: { atk: ["攻擊者"], redis: ["Redis", "session 狀態"], val: ["應用層驗證", "checksum · AES"], docker: ["Docker"], svc: ["服務"], mem: ["Process 記憶體"] },
        caps: ["服務把 session 狀態存在 Redis，連線才能接回去", "狀態在 Redis 被直接改掉；secret 外露後，驗證照樣放行", "狀態改存 process 記憶體，環境以 Docker 隔離"],
      },
      migrate: {
        labels: { old: ["裸機"], s1: ["服務"], s2: ["後台"], neu: ["Docker"], c1: ["服務"], c2: ["後台"], f: ["1 · 停寫"], sy: ["2 · 資料同步"], op: ["3 · 開放流量"] },
        caps: ["搬遷前：線上流量跑在裸機上", "Runbook 第 1 步：停寫", "Runbook 第 2 步：同步資料，比對新舊環境", "Runbook 第 3 步：在容器上開放流量"],
      },
      poc: {
        labels: { a: ["平台 A", "Go · .NET"], b: ["平台 B", "Lua · PHP"], c: ["平台 C", "Lua · Java"], poc: ["gRPC POC", "HMAC · 狀態機 · audit trail"], live: ["線上平台"] },
        caps: ["三個平台、三種技術棧，什麼都是三套", "一套後端，做到可 demo 的 POC", "評估後喊停：全面重寫對線上平台風險過高"],
      },
      hash: {
        labels: { keys: ["每個 rid 一把 key"], q: ["查詢"], hash: ["Hash", "field = rid"] },
        caps: ["為了找一個 rid，SCAN 掃過整片 keyspace", "一個 Hash、rid 當 field：直接查到"],
      },
      inject: {
        labels: { atk: ["攻擊者"], con: ["Skynet debug console"], svc: ["服務", "記憶體中"], mon: ["監控"], ev: ["證據"] },
        caps: ["Lua 程式碼從 debug console 被注入", "先做：建立監控、保留證據", "再做：重啟，清掉記憶體裡的注入程式碼"],
      },
      delegate: {
        labels: { main: ["主 session", "我規劃與拍板"], light: ["輕量模型", "檔案搜尋與雜事"], worker: ["Worker", "實作"], ver: ["Verifier", "獨立驗收"] },
        caps: ["搜尋與雜事交給輕量模型", "實作交給 worker", "驗收由另一個獨立的 verifier 負責"],
      },
      guard: {
        labels: { rules: ["Harness 規則", "CLAUDE.md / AGENTS.md"], agent: ["AI agent"], mem: ["memory-mcp"] },
        caps: ["規則檔把 agent 限制在專案規範內", "session 結束：學到的東西存起來", "下一個 session 開始：記憶回來了"],
      },
      handshake: { labels: { you: ["你"], me: ["White"] }, caps: [] },
    },
  },
  pdfHighlights: {
    Tyche: "3 個遊戲服務器專案（Lua/Skynet、Golang）。修復重複領獎 race condition、MongoDB 每日 270 萬筆資料效能優化。Redis 架構重構。Redis 竄改事件調查：敏感狀態改存 process 記憶體、Docker 隔離；處理 Skynet debug console 遭注入 Lua 程式碼事件。Docker/Harbor/Helm CI/CD Pipeline。負責多平台從裸機容器化遷移（Harbor／ECR 發版、cutover runbook、資料比對腳本）；導入團隊共用知識庫與 AI 協作規則。",
    Terpro: "建立可複用遊戲機制框架，新遊戲開發週期縮短超過 50%。Kubernetes/Helm 部署。",
    WistronITS: "指導 2 名工程師上手。開發 OpenId、Product、Payment、Stock 服務與 Kafka Forwarder。Jenkins/Nexus CI 工具鏈。",
  },
  about: "資深後端工程師，近 15 年軟體開發經驗，專精高併發分散式系統。我專注在解決問題——效能瓶頸、部署自動化、系統安全——而不是記住框架。實戰領域涵蓋即時遊戲平台（多服務器架構、多平台並行營運）、支付處理與企業 API。我的工作方式是 AI 增強：以 Claude Code 為主 session 負責規劃與拍板，依任務把檔案搜尋、實作、驗收分派給不同模型的 subagent（寫的人不驗自己），並用 harness 規則檔約束 AI 行為、用自建的 memory-mcp 延續跨 session 記憶。AI 會漏的——生產環境的可觀測性、安全加固、系統完整性——由我把關。",
  competencies: [
    {
      title: "架構評估與系統現代化",
      description: "規劃多平台遊戲後端的微服務／gRPC 整合方案，做到可 demo 的 POC，包含 HMAC 簽章＋狀態機＋audit trail 的防竄改資料層。評估後停止專案：全面重寫對線上平台風險過高。",
      tech: "Golang, gRPC, Protobuf, Redis",
    },
    {
      title: "高併發後端架構",
      description: "設計多服務器分散式系統（Gate/Lobby/Game），橫跨 10+ 個 repo 與多平台。建立可複用框架，將新遊戲開發週期縮短超過 50%。",
      tech: "Lua/Skynet, Golang, TCP/WebSocket, gRPC",
    },
    {
      title: "資料庫與快取優化",
      description: "診斷每日 ~270 萬筆資料的全集合掃描問題並設計複合索引。重構 Redis key 架構，消除大量 SCAN 操作。",
      tech: "MongoDB, Redis, MySQL, PostgreSQL",
    },
    {
      title: "DevOps & CI/CD",
      description: "自動化 Docker Image 建置推送至 Harbor，設計 Kubernetes Helm Chart 部署，建置 GitLab Runner 與 SSH 遠端部署。",
      tech: "Kubernetes, Docker, Helm, GitLab CI/CD",
    },
    {
      title: "資安與資料完整性",
      description: "調查 Redis 資料竄改事件，追蹤攻擊路徑並分析完整攻擊鏈。確認 secret 外露時應用層驗證會被繞過後，將受影響遊戲的敏感狀態改存 process 記憶體，並以 Docker 隔離環境。",
    },
  ],
  aiWorkflow: {
    intro: "日常開發以 Claude Code 為主 session——debug、調查、架構討論都在這裡進行，由我負責規劃與拍板；實作與驗收則依任務分派給不同模型的 subagent。",
    points: [
      "多模型 subagent 分工：輕量模型負責檔案搜尋與雜事、實作交給 worker、再由另一個獨立的 verifier 驗收——寫的人不驗自己",
      "架構優先工作流程：由我做架構決策（模組邊界、通訊協議、安全模型），再由 AI agent 實作——並補上 AI 遺漏的生產環境盲點，如 logging 覆蓋率與安全加固",
      "為 AI 建立工程護欄：以 harness 規則檔（CLAUDE.md / AGENTS.md）約束 AI 行為與專案規範；以自建的 memory-mcp 提供跨 session 記憶，讓偏好、踩過的坑與未完成的工作能延續到下一個 session",
      "跨技術棧交付：近 15 年累積 Golang、Java、Lua、JavaScript 實戰經驗，搭配 AI 協作能快速在不同技術棧間切換交付",
    ],
  },
  profile: {
    name: "張育誠 (White)",
    position: "資深後端工程師",
    ...contact,
    programming,
    tools: {
      "DevOps": ["Kubernetes", "Docker", "GitLab CI/CD", "Helm", "Harbor"],
      "Data Store": ["Redis", "MongoDB", "MySQL", "PostgreSQL", "Oracle"],
      "Message Queue": ["RabbitMQ"],
      "Testing": ["Postman", "JMeter"],
      "AI 工具": ["Claude Code", "Codex"],
      "Other": ["Git"],
    },
  },
  summary: [
    "近 15 年軟體開發經歷，專精高併發分散式系統，橫跨遊戲、支付與企業 API 領域",
    "具備 MongoDB 效能優化、Redis 架構設計實戰經驗，處理日均 ~270 萬筆資料規模",
    "熟悉 Kubernetes、Docker、GitLab CI/CD 等 DevOps 工具，具雲端與本地混合部署經驗",
    "AI 增強開發實踐者——以 Claude Code 搭配多模型 subagent 分工（實作與驗收分離），並自建 memory-mcp 提供 AI agent 跨 session 記憶",
  ],
  experience: [
    {
      id: "Tyche",
      company: "大極科技 (TycheTech)",
      position: "資深後端服務工程師",
      start: "2021/01",
      end: "現在",
      description: {
        "在 5-10 人團隊中負責架構規劃與技術決策": [
          "規劃多平台系統架構，評估改動該不該做、影響範圍與風險，作為技術決策依據",
          "平台 C：遊戲服務器 (Lua/Skynet)、BI 後台 (Java/Spring Boot/MyBatis)、CI/CD (GitLab, SSH)",
          "平台 B：遊戲服務器 (Lua)、後台 (PHP/Laravel)、CI/CD (GitLab, SSH)",
          "平台 A：遊戲服務器 (Golang)、後台 (.Net)、CI/CD (GitLab, Kubernetes, Helm)",
          "導入團隊共用知識庫與 AI agent 協作規則：以索引文件串起平台環境、程式碼結構、決策紀錄與操作手冊，規則分為常駐與依情境載入兩層，讓 Claude Code 與 Codex 共用同一套規範",
          "建立排查 playbook 與 runbook 的沉澱流程：每次排查與上線踩到的坑都回寫成文件，並整理跨平台重複問題對照表，讓下一次遷移能提前避開",
        ],
        "容器化遷移（2026/06–2026/11）": [
          "將多個遊戲平台的遊戲服務與後台從裸機遷移至 Docker 容器（Docker Compose、healthcheck、環境變數注入設定）",
          "image 推送至 Harbor／AWS ECR，以 git tag 觸發 GitLab tag pipeline 發版；修正 CI 規則缺漏導致 tag pipeline 不觸發的問題",
          "撰寫上線 cutover runbook，從停寫、資料同步到開放流量分步驟執行，每步定義完成判準",
          "開發新舊環境 MySQL／Redis／MongoDB 資料比對與設定驗證腳本；修正工具預設只預覽，需明確指定才寫入，並先備份原值",
          "將正式環境設定撈回與 git 逐 key 做語意比對，找出 git 與線上不一致的設定，避免照 git 上線造成設定回退",
        ],
        "活動領獎 Bug 排查與效能優化": [
          "排查玩家重複領取活動獎勵的財損 bug，定位為併發競態（多請求同時通過檢查），設計 Redis 標記機制防止重複發放",
          "診斷全集合掃描問題（每日約 270 萬筆資料），設計複合索引，實作 Lua Server 排程自動預建每日索引，並推廣到其他大型 collection",
        ],
        "Redis 架構優化": [
          "將 key 結構改為 Hash（rid 作為 field），避免大量 SCAN 操作，提升查詢效率",
        ],
        "資安強化": [
          "調查 Redis 資料竄改事件，追蹤完整攻擊鏈（遊戲狀態偽造 + 交易紀錄竄改）；確認 secret 外露時應用層驗證會被繞過後，將受影響遊戲的敏感狀態改存 process 記憶體，並以 Docker 隔離環境",
          "設計 HMAC 簽章＋狀態機＋audit trail 的防竄改架構，做到可 demo 的 POC",
          "處理 Skynet debug console 遭注入 Lua 程式碼的事件：先建立監控、保留證據，再重啟受影響服務清除記憶體中的注入程式碼",
        ],
        "平台現代化 POC": [
          "規劃各平台遊戲後端的微服務／gRPC 整合方案並做到可 demo 的 POC；評估後停止專案，因為全面重寫對線上平台風險過高",
        ],
        "訊息推播": [
          "使用 RabbitMQ 實作即時推播機制，處理跨服務非同步通知",
        ],
        "CI/CD Pipeline": [
          "自動化建置 Docker Image 上傳至 Harbor Registry",
          "透過 SSH 遠端操作 Docker Compose 完成開發環境部署",
        ],
        "Infrastructure & DevOps": [
          "建立 Helm Chart、架設 GitLab Runner、開發部署腳本",
        ],
        "人才培育": [
          "透過 code review 與 pair programming 帶新人上手，指導撰寫 test case",
        ],
      },
    },
    {
      id: "Terpro",
      company: "專羿行動 (Terpro)",
      position: "資深後端服務工程師",
      start: "2019/06",
      end: "2020/12",
      description: {
        "遊戲機制共用框架 (Golang)": [
          "將共用遊戲機制封裝為可複用框架",
          "新遊戲開發週期縮短超過 50%",
        ],
        "Kubernetes 部署": [
          "設計並維護 Helm Chart 部署腳本",
        ],
        "Demo 網站 (Golang, Vue.js)": [
          "開發遊戲服務器入口網站",
        ],
      },
    },
    {
      id: "WistronITS",
      company: "緯創軟體 (WistronITS) 駐點：台灣大哥大",
      position: "資深後端工程師",
      start: "2016/09",
      end: "2019/05",
      description: {
        "Micro-service RESTful API (Golang / Java)": [
          "透過 pair programming 與 code review 帶 2 名工程師上手",
          "OpenId Service (Golang, Google APIs)",
          "Product Service、Payment Service、Stock Service (Golang, MSSQL, Memcached)",
          "Kafka Forwarder (Golang, Kafka)",
          "維護『發票暨單據處理系統』(Java, Spring, JBoss, Oracle)",
        ],
        "測試自動化": [
          "撰寫 Test Case 整合至 CI/CD Pipeline，透過 mvn test 自動執行",
        ],
        "前端組件開發 (Vue.js)": [
          "開發 Vue.js 元件供 CMS 團隊使用",
        ],
        "開發環境與工具 (Docker)": [
          "Jenkins：自動建置 Maven/NPM 專案，發佈至 Nexus",
          "Nexus：私有 Maven repository 與 NPM registry",
        ],
      },
    },
    {
      id: "Kangda",
      company: "康大資訊",
      position: "軟體工程師",
      start: "2015/06",
      end: "2016/08",
      description: {
        "開發科技部專案": "",
      },
    },
    {
      id: "BenQ",
      company: "明基電通(BenQ)",
      position: "軟體工程師",
      start: "2013/11",
      end: "2015/02",
      description: {
        "開發『Qmobi』, 客製化手機被蓋電商網的POC (PHP, Wordpress, MySQL)": "",
        "開發『eBookTaiwan』(now: digiPages) (Javascript, jQuery)": "",
      },
    },
    {
      id: "Open-Life",
      company: "智慧時尚(Open-Life)",
      position: "軟體工程師",
      start: "2011/11",
      end: "2013/10",
      description: {
        "開發及維護後台管理系統 (PHP, Yii, Postgres)": "",
        "開發活動網站 (PHP)": "",
      },
    },
  ],
  project: [
    {
      id: "memory-mcp",
      name: "memory-mcp — AI coding agent 跨 session 記憶（開源，個人專案）",
      start: "2026/06",
      end: "現在",
      description: [
        "以 Go 撰寫的 MCP server 與 CLI，讓 AI coding agent 在不同 session 間保存與檢索記憶（github.com/ggwhite/memory-mcp）",
        "SQLite FTS5 trigram 全文搜尋，支援中日韓文；可選用本機 Ollama 產生向量做語意搜尋，以 Reciprocal Rank Fusion 混合排序，Ollama 離線時自動降級為純關鍵字搜尋",
        "整合 Claude Code hooks：session 開始依工作目錄注入相關記憶、每則訊息自動檢索相關記憶、session 結束自動產生摘要；存入時遮蔽常見金鑰格式",
        "Golang、SQLite、mcp-go、Cobra",
      ],
    },
    {
      id: "jarvis",
      name: "Jarvis — Claude Code Agent 即時可觀測面板（開源，個人專案）",
      start: "2026/10",
      end: "現在",
      description: [
        "在對話旁開即時面板，顯示每個 subagent 的任務、執行時間、token 用量與預估 API 成本，並標出卡住或迴圈的 agent（github.com/ggwhite/jarvis）",
        "跨 session 總覽本機所有 Claude Code：狀態、額度用量、一鍵跳到該 session；另有各 repo 的檔案變更、diff 與 commit graph",
        "TypeScript、Claude Code plugin API、1,100+ 個測試；Claude Desktop 原生版面與終端機 cell grid 兩種繪製",
      ],
    },
    {
      id: "4x",
      name: "4x — 多角色 AI 開發框架（開源，不再維護）",
      start: "2026/06",
      end: "2026/08",
      description: [
        "開源 Go CLI（github.com/ggwhite/4x，GitHub 35 stars），讓 AI coding agent 以 Design → Code → Review → Test 彼此隔離的角色運作，並以確定性護欄把關；原生 subagent 功能成熟後不再維護，核心原則「寫的人不驗自己」延續到現在的工作流程",
      ],
    },
    {
      id: "go-masker",
      name: "go-masker — Go 敏感資料遮罩函式庫（開源，個人專案）",
      start: "2019/04",
      end: "現在",
      pdf: false,
      description: [
        "開源 Go 函式庫，以 struct tag 遮罩 log 與 API 輸出中的敏感欄位（姓名、email、電話、身分證、卡號）（github.com/ggwhite/go-masker，GitHub 130+ stars）",
      ],
    },
    {
      id: "PGS",
      name: "PGS 遊戲服務器（獨立開發）",
      start: "2022/12",
      end: "2023/04",
      description: [
        "獨立開發 3 款遊戲與後台管理網站",
        "遊戲服務器（Golang、TCP/WebSocket、gRPC）",
        "API 服務器（Golang、Gin、gRPC）",
        "後台網站（Vue.js、Nuxt3、TailwindCSS）",
      ],
    },
    {
      id: "Yapro",
      name: "中古車退稅資料登錄系統（2 人）",
      start: "2021/01",
      end: "2021/03",
      description: [
        "架設 RestAPI Server（Golang）",
        "使用 AWS 服務（ECS、RDS）",
      ],
    },
    {
      id: "CarePro",
      name: "沐欣照護後台管理系統（5 人）",
      start: "2013/11",
      end: "2015/03",
      description: [
        "架設伺服器（Linode、CentOS、Apache、PHP、PostgreSQL）",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "電機工程系, 學士",
      school: "國立高雄科技大學",
      start: "2006/09",
      end: "2010/06",
    },
  ],
}
