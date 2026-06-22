import { contact, programming } from './shared'

export default {
  pdf: "/resume/WhiteChang-Resume.zh-tw.pdf",
  labels: {
    summary: "摘要",
    experience: "工作經歷",
    project: "外包接案",
    personalInfo: "個人資訊",
    programming: "程式語言",
    tools: "工具",
    education: "學歷",
    competencies: "核心能力",
    aiWorkflow: "AI 輔助開發",
    print: "列印 / 存為 PDF",
    download: "下載 PDF",
  },
  about: "資深後端工程師，10 年以上遊戲服務器架構經驗。我專注在解決問題——效能瓶頸、部署自動化、系統安全——而不是記住框架。我的工作方式是 AI 增強：由我主導架構設計與關鍵決策，再透過 AI agent（Claude Code、Codex）作為實作層，以 5-10 倍速度交付。AI 會漏的——生產環境的可觀測性、安全加固、系統完整性——由我把關。",
  competencies: [
    {
      title: "遊戲服務器架構",
      description: "設計多服務器系統（Gate/Lobby/Game），建立可複用的遊戲框架，大幅縮短新遊戲的開發週期。",
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
      description: "調查 Redis 資料竄改事件，追蹤攻擊路徑至 vendor 目錄漏洞，實作 AES 加密 + Checksum 驗證機制。",
    },
  ],
  aiWorkflow: {
    intro: "我設計系統、AI 負責實作、我驗收 AI 遺漏的部分。這個循環——架構 → 委派 → 補漏——是我能規模化交付的方式。",
    points: [
      "開發了 4x (github.com/ggwhite/4x)——開源的多角色 AI 開發框架，將工程流程拆分為 Design/Code/Review/Test 四階段，搭配確定性護欄機制",
      "架構優先工作流程：由我做架構決策（模組邊界、通訊協議、安全模型），再由 AI agent 實作——並補上 AI 遺漏的生產環境盲點，如 logging 覆蓋率與安全加固",
      "跨技術棧交付：10 年累積 Golang、Java、Lua、JavaScript 實戰經驗，搭配 AI 協作能快速在不同技術棧間切換交付",
      "運用 AI 加速團隊培育——透過 AI 輔助的 code review 和 test case 撰寫指導新人",
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
    "10 年以上後端工程師經歷，專精遊戲服務器架構（Lua/Skynet/Golang/Java）",
    "具備 MongoDB 效能優化、Redis 架構設計實戰經驗，解決大規模資料查詢效能問題",
    "熟悉 Kubernetes、Docker、GitLab CI/CD 等 DevOps 工具，具雲端與本地混合部署經驗",
    "具備 AI 輔助開發工作流程經驗（Claude Code、Codex）",
  ],
  experience: [
    {
      id: "Tyche",
      company: "大極科技 (TycheTech)",
      position: "資深後端服務工程師",
      start: "2021/01",
      end: "現在",
      description: {
        "維護及開發遊戲服務器與後台管理系統": [
          "專案 C：遊戲服務器 (Lua, Skynet)、後台 (Java, Spring Boot, MyBatis)、CI/CD (GitLab, SSH)",
          "專案 B：遊戲服務器 (Lua)、後台 (PHP, Laravel)、CI/CD (GitLab, SSH)",
          "專案 A：遊戲服務器 (Golang)、後台 (.Net)、CI/CD (GitLab, Kubernetes, Helm)",
        ],
        "MongoDB 效能優化": [
          "診斷全集合掃描問題（每日約 270 萬筆資料）",
          "設計複合索引，實作 Lua Server 排程自動預建每日索引",
        ],
        "Redis 架構優化": [
          "將 key 結構改為 Hash（rid 作為 field），避免大量 SCAN 操作，提升查詢效率",
        ],
        "資安強化": [
          "調查 Redis 資料遭竄改事件，發現 PHP vendor 目錄漏洞",
          "實作 AES 加密與 Checksum 驗證機制，確保異常竄改可被即時偵測",
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
          "封裝 FreeGame、Lightning、PickGame 等共用機制",
          "新遊戲開發可直接複用，大幅縮短開發週期",
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
