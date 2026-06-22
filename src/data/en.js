import { contact, programming } from './shared'

export default {
  pdf: "/resume/WhiteChang-Resume.en.pdf",
  labels: {
    summary: "Summary of Qualifications",
    experience: "Employment History",
    project: "Piecework Project",
    personalInfo: "Personal Info",
    programming: "Programming",
    tools: "Tools",
    education: "Education",
    competencies: "Core Competencies",
    aiWorkflow: "AI-Augmented Development",
    print: "Print / Save PDF",
    download: "Download PDF",
  },
  about: "Senior backend engineer with 10+ years building game server systems at scale. I focus on solving problems — performance bottlenecks, deployment automation, system security — not memorizing frameworks. My workflow is AI-first: I use Claude Code as my primary development tool, supplemented by Codex, for architecture design, code review, and rapid development across any tech stack.",
  competencies: [
    {
      title: "Game Server Architecture",
      description: "Designed multi-server systems (Gate/Lobby/Game) and built reusable game frameworks that significantly cut development cycles for new titles.",
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
      description: "Investigated Redis data tampering incidents, traced attack vectors to vendor directory vulnerabilities, implemented AES encryption + checksum verification.",
    },
  ],
  aiWorkflow: {
    intro: "AI is not a tool I list on my resume — it's how I work. Specific technologies matter less when AI enables rapid adaptation to any stack.",
    points: [
      "Daily workflow: architecture design, code generation, debugging, and code review through Claude Code, with Codex as supplement",
      "Cross-stack delivery: 10+ years of hands-on experience across Golang, Java, Lua, JavaScript — combined with AI, enables rapid context-switching and delivery across stacks",
      "Built this resume site (Vue 3 + Vite + Tailwind CSS) entirely through AI-assisted development",
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
    "10+ years experience as a backend engineer, specializing in game server architecture (Lua/Skynet/Golang/Java).",
    "Hands-on experience in MongoDB performance tuning and Redis architecture optimization for large-scale data.",
    "Proficient in Kubernetes, Docker, and GitLab CI/CD; experienced in hybrid cloud/on-premise deployments.",
    "Experienced in AI-assisted development workflows (Claude Code, Codex).",
  ],
  experience: [
    {
      id: "Tyche",
      company: "Tyche Tech Co, Ltd",
      position: "Senior Server Engineer",
      start: "Jan. 2021",
      end: "Present",
      description: {
        "Maintained & Developed Gaming Servers & Backend Management Projects": [
          "Project C: Servers(Lua, Skynet), Backend(Java, Spring Boot, MyBatis), CI/CD(GitLab, SSH)",
          "Project B: Servers(Lua), Backend(PHP, Laravel), CI/CD(GitLab, SSH)",
          "Project A: Servers(Golang), Backend(.Net), CI/CD(GitLab, Kubernetes, Helm)",
        ],
        "MongoDB Performance Optimization": [
          "Diagnosed full-collection scan on ~2.7M records/day",
          "Designed compound indexes; implemented Lua scheduler to pre-build daily indexes automatically",
        ],
        "Redis Architecture Optimization": [
          "Refactored key structure to Hash (rid as field), eliminated excessive SCAN operations",
        ],
        "Security Hardening": [
          "Traced Redis data tampering to PHP vendor directory vulnerability",
          "Implemented AES encryption + checksum verification to detect unauthorized modification",
        ],
        "CI/CD Pipeline": [
          "Automated Docker image builds to Harbor registry via GitLab CI/CD",
          "Remote Docker Compose deployment via SSH for dev environments",
        ],
        "Infrastructure & DevOps": [
          "Built Helm charts, set up GitLab Runner, developed Linux server deploy scripts",
        ],
        "Mentoring": [
          "Led junior engineers, guided test case writing, established team testing habits",
        ],
      },
    },
    {
      id: "Terpro",
      company: "Terpro Mobile Co, Ltd",
      position: "Senior Server Engineer",
      start: "Jun. 2019",
      end: "Dec. 2020",
      description: {
        "Slot Game Core Framework (Golang)": [
          "Encapsulated shared mechanics: FreeGame, Lightning, PickGame",
          "New games reuse the framework directly, significantly reducing development cycle",
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
        "Led 2 engineers — Micro-service RESTful API (Golang / Java)": [
          "Pair programming to support team growth",
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
