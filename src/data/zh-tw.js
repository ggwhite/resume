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
  // 互動網站的語氣與場景：標題、故事段落、場景標籤。
  // 只是換說法——每一句都對應下方紀錄（competencies／aiWorkflow／experience／project）
  // 或各 repo README 裡的事實。
  site: {
    nav: { systems: "問題", work: "經歷", ai: "AI 工作流程", oss: "開源", skills: "工具箱", contact: "聯絡" },
    langSwitch: { label: "EN", to: "/" },
    hero: {
      nameLines: ["張育誠"],
      altName: "White Chang",
      stack: "Go · Java · Lua",
      lede: "近 15 年後端開發，近 7 年都待在即時遊戲服務器平台——在這裡，一個併發競態會讓獎勵發兩次，一筆被竄改的 Redis 資料就能偽造遊戲狀態。我用 Go、Java、Lua（Skynet）寫系統，管 AI agent 只有一條規則：寫的人不驗自己。",
      scroll: "往下捲動",
      photoAlt: "張育誠的照片",
    },
    stats: [
      { prefix: "~", num: 15, suffix: "", unit: "年", label: "軟體開發經驗" },
      { prefix: "~", num: 270, suffix: " 萬", unit: "筆 / 日", label: "診斷全集合掃描並設計索引的 MongoDB 資料規模" },
      { prefix: ">", num: 50, suffix: "%", unit: "縮短", label: "以可複用 Go 框架縮短新遊戲開發週期" },
      { prefix: "", num: 130, suffix: "+", unit: "GitHub stars", label: "go-masker，我的開源 Go 函式庫" },
    ],
    systems: {
      title: "我一再解決的五種問題",
      sub: "往下捲，每一段都會演給你看。",
      steps: [
        { scene: "poc", head: "知道什麼時候不該上線。", body: "我規劃了多平台遊戲後端的微服務／gRPC 整合方案，做到可 demo 的 POC，連防竄改資料層都做了：HMAC 簽章、狀態機、audit trail。然後評估、喊停。全面重寫對線上平台風險過高，所以 POC 就停在 POC。" },
        { scene: "framework", head: "一套框架，很多款遊戲。", body: "多服務器分散式系統——Gate、Lobby、Game——橫跨 10+ 個 repo 與多個平台。把共用機制收進可複用框架之後，新遊戲開發週期縮短超過 50%。" },
        { scene: "index", head: "別再把每一筆都讀過一遍。", body: "一個每天進來約 270 萬筆資料的集合，查詢卻是從頭掃到尾。我診斷出全集合掃描，設計複合索引。快取這一側，重構 Redis key 架構，直到大量的 SCAN 消失。" },
        { scene: "pipeline", head: "從一個 git tag，到跑起來的容器。", body: "Docker Image 自動建置、推送到 Harbor。Kubernetes 用 Helm Chart 部署。架 GitLab Runner，也做 SSH 遠端部署。發版是一條 pipeline，不是一場儀式。" },
        { scene: "tamper", head: "先假設 secret 已經外露。", body: "我追完一起 Redis 資料竄改事件的完整攻擊鏈。secret 一旦外露，應用層驗證就會被繞過——所以受影響遊戲的敏感狀態從 Redis 搬進 process 記憶體，並以 Docker 隔離環境。" },
      ],
    },
    work: {
      title: "這些事發生的地方",
      sub: "近 15 年，橫跨遊戲、支付與企業系統。",
      role: "在 5–10 人團隊中負責架構規劃與技術決策：先評估一個改動該不該做、會動到哪裡、風險多高。",
      chapters: [
        { scene: "migrate", when: "2026/07 – 2026/10", head: "每一步都照劇本走的遷移。", body: "把多個平台的遊戲服務與後台，從裸機搬進 Docker 容器。上線照我寫的 cutover runbook 走——停寫、資料同步、開放流量——每一步都有完成判準。比對腳本逐一核對新舊環境的 MySQL、Redis、MongoDB；修正工具預設只預覽，明確指定才寫入，而且先備份原值。" },
        { scene: "race", head: "兩個請求，一份獎勵。", body: "玩家能重複領取同一個活動獎勵，是會造成財損的 bug。根因是併發競態：多個請求同時通過檢查。解法是 Redis 標記機制，擋下重複發放。" },
        { scene: "index", head: "每天約 270 萬筆，索引先到一步。", body: "查詢原本是全集合掃描。我設計複合索引，用 Lua Server 排程自動預建每日索引，再把同一套做法推廣到其他大型 collection。" },
        { scene: "hash", head: "一個 Hash，取代整片 keyspace 的掃描。", body: "原本以 rid 為變數的 key，查詢得靠 SCAN 去找。我把結構改成 Hash、rid 當 field，大量的 SCAN 操作就消失了。" },
        { scene: "inject", head: "先存證，再重啟。", body: "有人透過 Skynet debug console 注入 Lua 程式碼。我先建立監控、保留證據，才動手處理——接著重啟受影響的服務，把記憶體裡的注入程式碼清掉。" },
      ],
      alsoTitle: "在大極還做了",
      also: [
        "導入團隊共用知識庫與 AI agent 協作規則，讓 Claude Code 與 Codex 共用同一套規範。",
        "建立 playbook／runbook 的沉澱流程：每次排查與上線踩到的坑都回寫成文件。",
        "用 RabbitMQ 做即時推播。",
        "GitLab CI/CD 推送 Harbor、Helm Chart、GitLab Runner。",
        "透過 code review 與 pair programming 帶新人上手。",
      ],
      record: "完整紀錄",
      earlier: "在那之前",
    },
    ai: {
      title: "Agent 負責動手，我負責決定。",
      quote: "寫的人不驗自己。",
      steps: [
        { scene: "delegate", head: "三個位子，絕不兼任。", body: "輕量模型負責檔案搜尋與雜事，worker 負責實作，再由另一個獨立的 verifier 驗收。模組邊界、通訊協議、安全模型這些架構決策留在我手上；AI 會漏掉的生產環境盲點——logging 覆蓋率、安全加固——也由我補上。" },
        { scene: "guard", head: "一道圍欄，一份記憶。", body: "harness 規則檔（CLAUDE.md / AGENTS.md）把 AI 的行為限制在專案規範內。自建的 memory-mcp 讓偏好、踩過的坑與未完成的工作，延續到下一個 session。" },
      ],
    },
    oss: {
      title: "我放上 GitHub 的東西",
      freelance: "接案",
      archived: "已封存",
      stars: "stars",
      lines: {
        "memory-mcp": "session 一結束，AI agent 就全忘了。這個工具幫它記得。",
        "jarvis": "對話旁的即時 HUD：每個 subagent 正在做什麼、花了多少。",
        "go-masker": "log 和別人的手機號碼之間，只隔一個 struct tag。",
        "4x": "刻意封存。它的那條規則，還在我的工作流程裡。",
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
      cluster: { labels: { players: ["玩家"], gate: ["Gate"], lobby: ["Lobby"], g1: ["Game"], g2: ["Game"], g3: ["Game"] }, caps: [] },
      poc: {
        labels: { a: ["平台 A"], b: ["平台 B"], c: ["平台 C"], poc: ["gRPC POC", "HMAC · 狀態機 · audit trail"], live: ["線上平台"] },
        caps: ["整合方案做到可 demo 的 POC", "評估後喊停：全面重寫對線上平台風險過高"],
      },
      framework: {
        labels: { fw: ["可複用框架", "共用遊戲機制"], g1: ["新遊戲"], g2: ["新遊戲"], g3: ["新遊戲"], g4: ["新遊戲"] },
        caps: ["共用機制只寫一次", "新遊戲開發週期縮短超過 50%"],
      },
      index: {
        labels: { query: ["查詢"], idx: ["複合索引"], coll: ["Collection", "每日約 270 萬筆"] },
        caps: ["全集合掃描：每一筆都被讀過", "複合索引：直接命中要的資料"],
      },
      pipeline: {
        labels: { tag: ["git tag"], ci: ["GitLab CI/CD"], img: ["Docker Image"], reg: ["Harbor"], dep: ["Helm / SSH"], run: ["上線運行"] },
        caps: ["Tag → pipeline → image → registry → 部署"],
      },
      tamper: {
        labels: { atk: ["攻擊者"], redis: ["Redis", "敏感狀態"], val: ["應用層驗證"], docker: ["Docker"], game: ["遊戲服務器"], mem: ["Process 記憶體"] },
        caps: ["secret 外露：被竄改的資料直接通過應用層驗證", "敏感狀態改存 process 記憶體，並以 Docker 隔離環境"],
      },
      migrate: {
        labels: { old: ["裸機"], s1: ["遊戲服務"], s2: ["後台"], neu: ["Docker"], c1: ["遊戲服務"], c2: ["後台"], f: ["1 · 停寫"], sy: ["2 · 資料同步"], op: ["3 · 開放流量"] },
        caps: ["Runbook 第 1 步：停寫", "Runbook 第 2 步：同步資料，比對新舊環境", "Runbook 第 3 步：在容器上開放流量"],
      },
      race: {
        labels: { r1: ["請求 A"], r2: ["請求 B"], chk: ["檢查：領過了嗎？"], rew: ["獎勵"], mark: ["Redis 標記"] },
        caps: ["競態：兩個請求同時通過檢查", "有了 Redis 標記，重複的那一筆被擋下"],
      },
      hash: {
        labels: { keys: ["每個 rid 一把 key"], q: ["查詢"], hash: ["Hash", "field = rid"] },
        caps: ["為了找一個 rid，SCAN 掃過整片 keyspace", "一個 Hash、rid 當 field：直接查到"],
      },
      inject: {
        labels: { atk: ["攻擊者"], con: ["Skynet debug console"], svc: ["遊戲服務", "記憶體中"], mon: ["監控"], ev: ["證據"] },
        caps: ["Lua 程式碼從 debug console 被注入", "先做：建立監控、保留證據", "再做：重啟，清掉記憶體裡的注入程式碼"],
      },
      timeline: { labels: {}, caps: [] },
      delegate: {
        labels: { main: ["主 session", "我規劃與拍板"], light: ["輕量模型", "檔案搜尋與雜事"], worker: ["Worker", "實作"], ver: ["Verifier", "獨立驗收"] },
        caps: ["搜尋與雜事交給輕量模型", "實作交給 worker", "驗收由另一個獨立的 verifier 負責"],
      },
      guard: {
        labels: { rules: ["Harness 規則", "CLAUDE.md / AGENTS.md"], agent: ["AI agent"], mem: ["memory-mcp"] },
        caps: ["規則檔把 agent 限制在專案規範內", "session 結束：學到的東西存起來", "下一個 session 開始：記憶回來了"],
      },
      handshake: { labels: { you: ["你"], me: ["White"] }, caps: [] },
      dust: { labels: {}, caps: [] },
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
        "容器化遷移（2026/07–2026/10）": [
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
      name: "4x — 多角色 AI 開發框架（開源，已封存）",
      start: "2026/06",
      end: "2026/08",
      description: [
        "開源 Go CLI（github.com/ggwhite/4x，GitHub 35 stars），讓 AI coding agent 以 Design → Code → Review → Test 彼此隔離的角色運作，並以確定性護欄把關；原生 subagent 功能成熟後封存，核心原則「寫的人不驗自己」延續到現在的工作流程",
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
