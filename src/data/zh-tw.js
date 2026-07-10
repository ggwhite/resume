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
  about: "資深後端工程師，10 年以上高併發分散式系統開發經驗。我專注在解決問題——效能瓶頸、部署自動化、系統安全——而不是記住框架。實戰領域涵蓋即時遊戲平台（多服務器架構、多平台並行營運）、支付處理與企業 API。我的工作方式是 AI 增強：日常以 AI 協作進行 debug、調查與架構討論；開發新功能時，透過自建的多角色 AI 迴圈框架自動化 Design → Code → Review → Test 流程。AI 會漏的——生產環境的可觀測性、安全加固、系統完整性——由我把關。",
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
    intro: "日常開發以 AI 協作為主——debug、調查、架構討論都透過 prompt 進行。新功能開發時，切換到自建的迴圈框架讓 AI 自主迭代，我負責架構設計與最終驗收。",
    points: [
      "開發了 4x (github.com/ggwhite/4x)——開源的多角色 AI 開發框架：Designer → Coder → Reviewer → Tester → Deep Reviewer → Acceptor，角色間互相監督，FAIL 自動回退重做，支援 batch 連續執行與結構化報告",
      "架構優先工作流程：由我做架構決策（模組邊界、通訊協議、安全模型），再由 AI agent 實作——並補上 AI 遺漏的生產環境盲點，如 logging 覆蓋率與安全加固",
      "為 AI 建立工程護欄：harness 配置（CLAUDE.md / AGENTS.md / coding-rules）確保 AI 遵循專案規範，外部記憶（learnings.json）讓 AI 不重複犯錯",
      "跨技術棧交付：10 年累積 Golang、Java、Lua、JavaScript 實戰經驗，搭配 AI 協作能快速在不同技術棧間切換交付",
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
    "10 年以上後端工程師經歷，專精高併發分散式系統，橫跨遊戲、支付與企業 API 領域",
    "具備 MongoDB 效能優化、Redis 架構設計實戰經驗，處理日均 ~270 萬筆資料規模",
    "熟悉 Kubernetes、Docker、GitLab CI/CD 等 DevOps 工具，具雲端與本地混合部署經驗",
    "AI 增強開發實踐者——開發了 4x 開源多角色 AI 開發框架，自動化新功能的 Design/Code/Review/Test 流程",
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
        "主導多平台遊戲系統架構與交付（5-10 人團隊）": [
          "平台 C：遊戲服務器 (Lua/Skynet)、BI 後台 (Java/Spring Boot/MyBatis)、CI/CD (GitLab, SSH)",
          "平台 B：遊戲服務器 (Lua)、後台 (PHP/Laravel)、CI/CD (GitLab, SSH)",
          "平台 A：遊戲服務器 (Golang)、後台 (.Net)、CI/CD (GitLab, Kubernetes, Helm)",
        ],
        "活動領獎 Bug 排查與效能優化": [
          "排查玩家重複領取活動獎勵的財損 bug，定位為併發競態（多請求同時通過檢查），設計 Redis 標記機制防止重複發放",
          "診斷全集合掃描問題（每日約 270 萬筆資料），設計複合索引，實作 Lua Server 排程自動預建每日索引，並推廣到其他大型 collection",
        ],
        "Redis 架構優化": [
          "將 key 結構改為 Hash（rid 作為 field），避免大量 SCAN 操作，提升查詢效率",
        ],
        "資安強化": [
          "調查 Redis 資料竄改事件，追蹤完整攻擊鏈（遊戲狀態偽造 + 出款紀錄竄改）",
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
        "老虎機遊戲底層框架 (Golang)": [
          "封裝 FreeGame、Lightning、PickGame 等共用機制為可複用框架",
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
