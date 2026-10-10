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
  about: "資深後端工程師，近 15 年軟體開發經驗，專精高併發分散式系統。我專注在解決問題——效能瓶頸、部署自動化、系統安全——而不是記住框架。實戰領域涵蓋即時遊戲平台（多服務器架構、多平台並行營運）、支付處理與企業 API。我的工作方式是 AI 增強：以 Claude Code 為主 session 負責規劃與拍板，依任務把檔案搜尋、實作、驗收分派給不同模型的 subagent（寫的人不驗自己），並用 harness 規則檔約束 AI 行為、用自建的 memory-mcp 延續跨 session 記憶。AI 會漏的——生產環境的可觀測性、安全加固、系統完整性——由我把關。",
  competencies: [
    {
      title: "系統現代化與多租戶架構",
      description: "獨立主導遊戲平台全面重寫：以 Go 多租戶 config-driven 架構取代 13 個平台各自 fork 的 release branch。設計 Proto2/Proto3 雙相容序列化層，讓舊 client 無縫接入新系統。",
      tech: "Golang, gRPC, Protobuf, Redis, MySQL, MongoDB",
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
      description: "調查 Redis 資料竄改事件，追蹤攻擊路徑並分析完整攻擊鏈。設計 HMAC-SHA256 資料簽章機制，從架構層阻斷直接修改 Redis 繞過應用層驗證的攻擊。",
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
        "平台現代化（獨立主導）": [
          "以 Go 重寫 Lua/PHP/Java 混合遊戲平台，涵蓋 TCP gateway、遊戲引擎、BI 後台、支付服務",
          "設計多租戶 config-driven 架構，單一 codebase 支援 13 個平台，取代各自 fork 的 release branch",
          "設計 Proto2/Proto3 雙相容序列化層，舊 Lua client 無縫接入 Go 新系統",
          "實作 Redis 資料 HMAC-SHA256 簽章機制，從架構層防禦資料竄改攻擊",
        ],
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
          "調查 Redis 資料竄改事件，追蹤完整攻擊鏈（遊戲狀態偽造 + 交易紀錄竄改）",
          "設計 HMAC 簽章 + 狀態機 + audit trail 三層防護架構",
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
      id: "4x",
      name: "4x — 多角色 AI 開發框架（開源，已完成）",
      start: "2026/06",
      end: "2026/08",
      description: [
        "開源 CLI（github.com/ggwhite/4x，GitHub 34 stars），將 AI coding agent 編排成 Design → Code → Review → Test → Deep Review → Accept 的多角色迴圈，角色彼此隔離、互相監督",
        "以 Go CLI 實作狀態機、scope lock 等確定性護欄，不依賴 prompt 約束；支援 Claude Code、Codex、Gemini CLI 等多種 runner，以及依相依關係排程的 batch 模式",
        "從這個多角色 pipeline 的經驗，收斂成現在較輕量的 subagent 分工，保留「實作與驗收分離」的核心原則",
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
