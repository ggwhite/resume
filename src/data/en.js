import { contact, programming } from './shared'

export default {
  pdf: "/resume/WhiteChang-Resume.en.pdf",
  labels: {
    summary: "Summary of Qualifications",
    experience: "Employment History",
    project: "Freelance & Side Projects",
    personalInfo: "Personal Info",
    programming: "Programming",
    tools: "Tools",
    education: "Education",
    competencies: "Core Competencies",
    aiWorkflow: "AI-Augmented Development",
    print: "Print / Save PDF",
    download: "Download PDF",
  },
  about: "Senior backend engineer with 10+ years building high-concurrency distributed systems. I focus on solving problems — performance bottlenecks, deployment automation, system security — not memorizing frameworks. Domain experience spans real-time gaming platforms (multi-server architectures serving multiple concurrent titles), payment processing, and enterprise APIs. My workflow is AI-augmented: I design the architecture and make critical decisions, then leverage AI agents as an implementation layer. I catch what AI misses — production observability, security hardening, system integrity.",
  competencies: [
    {
      title: "System Modernization & Multi-Tenancy",
      description: "Solo-led full platform rewrite from Lua/PHP/Java to Go with config-driven multi-tenant architecture, replacing 13 per-platform release branch forks with a single codebase. Designed Proto2/Proto3 dual-compatible serialization layer for seamless legacy client migration.",
      tech: "Golang, gRPC, Protobuf, Redis, MySQL, MongoDB",
    },
    {
      title: "High-Concurrency Backend Architecture",
      description: "Designed multi-server distributed systems (Gate/Lobby/Game) across 10+ repositories and multiple platforms. Built reusable frameworks that cut new title development cycles by over 50%.",
      tech: "Lua/Skynet, Golang, TCP/WebSocket, gRPC",
    },
    {
      title: "Database & Cache Optimization",
      description: "Diagnosed full-collection scans on ~2.7M records/day and designed compound indexes. Restructured Redis key architecture to eliminate excessive SCAN operations.",
      tech: "MongoDB, Redis, MySQL, PostgreSQL",
    },
    {
      title: "DevOps & CI/CD",
      description: "Automated Docker image builds to Harbor registry, designed Helm chart deployments on Kubernetes, set up GitLab Runners and remote SSH deployments.",
      tech: "Kubernetes, Docker, Helm, GitLab CI/CD",
    },
    {
      title: "Security & Data Integrity",
      description: "Investigated Redis data tampering incidents, analyzed full attack chains. Designed HMAC-SHA256 data signing mechanism to architecturally prevent direct Redis manipulation that bypasses application-layer validation.",
    },
  ],
  aiWorkflow: {
    intro: "I design the system, AI implements it, I verify what AI misses. This loop — architect → delegate → catch gaps — is how I deliver at scale.",
    points: [
      "Built 4x (github.com/ggwhite/4x) — an open-source multi-role AI dev framework that splits the engineering loop into Design/Code/Review/Test phases with deterministic guardrails",
      "Architect-first workflow: I make architecture decisions (module boundaries, protocols, security model), then use AI agents for implementation — catching production blind spots that AI overlooks, like logging coverage and security hardening",
      "Cross-stack delivery: 10+ years across Golang, Java, Lua, JavaScript — combined with AI orchestration, enables rapid context-switching across any tech stack",
      "Use AI to accelerate team mentoring — guided junior engineers with AI-assisted code review and test case writing",
    ],
  },
  profile: {
    name: "White Chang",
    position: "Senior Backend Engineer",

    ...contact,
    programming,
    tools: {
      "DevOps": ["Kubernetes", "Docker", "GitLab CI/CD", "Helm", "Harbor"],
      "Data Store": ["Redis", "MongoDB", "MySQL", "PostgreSQL", "Oracle"],
      "Message Queue": ["RabbitMQ"],
      "Testing": ["Postman", "JMeter"],
      "AI Tools": ["Claude Code", "Codex"],
      "Other": ["Git"],
    },
  },
  summary: [
    "10+ years as a backend engineer building high-concurrency distributed systems across gaming, payment, and enterprise domains.",
    "Hands-on MongoDB performance tuning and Redis architecture optimization at scale (~2.7M records/day).",
    "Proficient in Kubernetes, Docker, and GitLab CI/CD; experienced in hybrid cloud/on-premise deployments.",
    "AI-augmented workflow practitioner — built 4x, an open-source multi-role AI dev framework.",
  ],
  experience: [
    {
      id: "Tyche",
      company: "Tyche Tech Co, Ltd",
      position: "Senior Backend Engineer",
      start: "Jan. 2021",
      end: "Present",
      description: {
        "Platform Modernization (Solo Lead)": [
          "Rewrote Lua/PHP/Java gaming platform in Go — TCP gateway, game engine, BI backend, payment services",
          "Designed multi-tenant config-driven architecture: single codebase serving 13 platforms, replacing per-platform release branch forks",
          "Designed Proto2/Proto3 dual-compatible serialization layer for seamless legacy Lua client migration to Go",
          "Implemented Redis data HMAC-SHA256 signing to architecturally prevent data tampering attacks",
        ],
        "Architected & Delivered Multi-Platform Gaming Systems (5-10 person team)": [
          "Platform C: Game Servers (Lua/Skynet), BI Backend (Java/Spring Boot/MyBatis), CI/CD (GitLab, SSH)",
          "Platform B: Game Servers (Lua), Backend (PHP/Laravel), CI/CD (GitLab, SSH)",
          "Platform A: Game Servers (Golang), Backend (.Net), CI/CD (GitLab, Kubernetes, Helm)",
        ],
        "MongoDB Performance Optimization": [
          "Diagnosed full-collection scan on ~2.7M records/day",
          "Designed compound indexes; implemented Lua scheduler to pre-build daily indexes automatically",
        ],
        "Redis Architecture Optimization": [
          "Refactored key structure to Hash (rid as field), eliminated excessive SCAN operations",
        ],
        "Security Hardening": [
          "Investigated Redis data tampering, traced full attack chain (game state forgery + withdrawal record manipulation)",
          "Designed three-layer defense: HMAC signing + state machine + audit trail",
        ],
        "CI/CD Pipeline": [
          "Automated Docker image builds to Harbor registry via GitLab CI/CD",
          "Remote Docker Compose deployment via SSH for dev environments",
        ],
        "Infrastructure & DevOps": [
          "Built Helm charts, set up GitLab Runner, developed Linux server deploy scripts",
        ],
        "Mentoring": [
          "Onboarded new graduates through code review and pair programming, guided test case writing",
        ],
      },
    },
    {
      id: "Terpro",
      company: "Terpro Mobile Co, Ltd",
      position: "Senior Backend Engineer",
      start: "Jun. 2019",
      end: "Dec. 2020",
      description: {
        "Slot Game Core Framework (Golang)": [
          "Encapsulated shared mechanics (FreeGame, Lightning, PickGame) into a reusable framework",
          "Reduced new game development cycle by over 50% through framework reuse",
        ],
        "Kubernetes Deployment": [
          "Designed and maintained Helm chart deployment scripts",
        ],
        "Demo Website (Golang, Vue.js)": [
          "Developed entry-point website for game servers",
        ],
      },
    },
    {
      id: "WistronITS",
      company: "WistronITS Corp. Stationed: Taiwan Mobile",
      position: "Senior Backend Engineer",
      start: "Sep. 2016",
      end: "May 2019",
      description: {
        "Micro-service RESTful API (Golang / Java)": [
          "Mentored 2 engineers through pair programming and code review",
          "OpenId Service (Golang, Google APIs)",
          "Product Service, Payment Service, Stock Service (Golang, MSSQL, Memcached)",
          "Kafka Forwarder (Golang, Kafka)",
          "Maintained Invoice & Receipt Process System (Java, Spring, JBoss, Oracle)",
        ],
        "Test Automation": [
          "Wrote test cases integrated into CI/CD pipeline, auto-executed via mvn test",
        ],
        "Frontend Components (Vue.js)": [
          "Developed Vue.js components for CMS team",
        ],
        "Dev Environment & Tooling (Docker)": [
          "Jenkins: auto build Maven/NPM projects, publish to Nexus",
          "Nexus: private Maven repository and NPM registry",
        ],
      },
    },
    {
      id: "Kangda",
      company: "Kangda Info Corp.",
      position: "Software Engineer",
      start: "Jul. 2015",
      end: "Aug. 2016",
      description: {
        "Developed project for MOST(Ministry of Science and Technology, R.O.C.)": "",
      },
    },
    {
      id: "BenQ",
      company: "BenQ Corp.",
      position: "Software Engineer",
      start: "Nov. 2013",
      end: "Feb. 2015",
      description: {
        "Developed 『Qmobi』, POC of E-Commerce (PHP, Wordpress, MySQL)": "",
        "Developed 『eBookTaiwan』(now: digiPages) (Javascript, jQuery)": "",
      },
    },
    {
      id: "Open-Life",
      company: "Fashion Intelligence Co, Ltd (Open-Life)",
      position: "Software Engineer",
      start: "Nov. 2011",
      end: "Oct. 2013",
      description: {
        "Developed and maintained CMS (PHP, Yii, Postgres)": "",
        "Developed event site (PHP)": "",
      },
    },
  ],
  project: [
    {
      id: "PGS",
      name: "PGS Game Server (solo)",
      start: "Dec. 2022",
      end: "Apr. 2023",
      description: [
        "Designed & developed 3 games and a dashboard website as a solo developer",
        "Game Server (Golang, TCP/WebSocket, gRPC)",
        "API Server (Golang, Gin, gRPC)",
        "Web Dashboard (Vue.js, Nuxt3, TailwindCSS)",
      ],
    },
    {
      id: "Yapro",
      name: "Yapro car tax refund management (2 members)",
      start: "Jan. 2021",
      end: "Mar. 2021",
      description: [
        "Created RestAPI Server (Golang)",
        "Created AWS Services, use ECS, RDS",
      ],
    },
    {
      id: "CarePro",
      name: "Muxin CarePro CMS (5 members)",
      start: "Nov. 2013",
      end: "Mar. 2015",
      description: [
        "Created Server, Linode account, base on CentOS, Apache, PHP, Postgres SQL",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Electrical Engineering",
      school: "National Kaohsiung University of Science and Technology(NKUST), Taiwan",
      start: "Sep. 2006",
      end: "Jun 2010",
    },
  ],
}
