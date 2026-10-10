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
  about: "Senior backend engineer with nearly 15 years of software development experience, specializing in high-concurrency distributed systems. I focus on solving problems — performance bottlenecks, deployment automation, system security — not memorizing frameworks. Domain experience spans real-time gaming platforms (multi-server architectures serving multiple concurrent titles), payment processing, and enterprise APIs. My workflow is AI-augmented: Claude Code runs as my main session for planning and final decisions, delegating file search, implementation, and verification to subagents on different models (whoever writes the code never verifies it); harness rule files keep AI behavior in check, and my self-built memory-mcp carries context across sessions. I catch what AI misses — production observability, security hardening, system integrity.",
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
    intro: "Claude Code is my main session for day-to-day work — debugging, investigation, and architecture discussions happen there, with me owning planning and final decisions. Implementation and verification are delegated to subagents on different models depending on the task.",
    points: [
      "Multi-model subagent delegation: lightweight models handle file search and routine chores, a worker handles implementation, and a separate, independent verifier signs off — whoever writes the code never verifies it",
      "Architect-first workflow: I make architecture decisions (module boundaries, protocols, security model), then use AI agents for implementation — catching production blind spots that AI overlooks, like logging coverage and security hardening",
      "Engineering guardrails for AI: harness rule files (CLAUDE.md / AGENTS.md) constrain AI behavior and enforce project conventions; my self-built memory-mcp provides cross-session memory so preferences, past pitfalls, and unfinished work carry over to the next session",
      "Cross-stack delivery: nearly 15 years across Golang, Java, Lua, JavaScript — combined with AI collaboration, enables rapid context-switching across any tech stack",
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
    "Nearly 15 years of software development experience, building high-concurrency distributed systems across gaming, payment, and enterprise domains.",
    "Hands-on MongoDB performance tuning and Redis architecture optimization at scale (~2.7M records/day).",
    "Proficient in Kubernetes, Docker, and GitLab CI/CD; experienced in hybrid cloud/on-premise deployments.",
    "AI-augmented workflow practitioner — runs Claude Code with multi-model subagent delegation (implementation and verification kept separate), and built memory-mcp to give AI agents cross-session memory.",
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
        "Architecture Planning & Technical Decisions in a 5-10 Person Team": [
          "Planned multi-platform system architecture; assessed whether proposed changes should be made, along with their impact and risk, to inform technical decisions",
          "Platform C: Game Servers (Lua/Skynet), BI Backend (Java/Spring Boot/MyBatis), CI/CD (GitLab, SSH)",
          "Platform B: Game Servers (Lua), Backend (PHP/Laravel), CI/CD (GitLab, SSH)",
          "Platform A: Game Servers (Golang), Backend (.Net), CI/CD (GitLab, Kubernetes, Helm)",
          "Introduced the team's shared knowledge base and AI agent collaboration rules: an index document ties together platform environments, codebase structure, decision records, and runbooks; rules are split into always-loaded and on-demand layers so Claude Code and Codex share the same conventions",
          "Set up a feedback loop for troubleshooting playbooks and runbooks: every investigation and release pitfall is written back into the docs, with a cross-platform table of recurring issues so the next migration can avoid them up front",
        ],
        "Containerization Migration (Jul. 2026 – Oct. 2026)": [
          "Migrated game services and back-office systems for multiple platforms from bare metal to Docker containers (Docker Compose, healthchecks, environment-variable-based config injection)",
          "Pushed images to Harbor / AWS ECR and released via GitLab tag pipelines triggered by git tags; fixed a missing CI rule that prevented tag pipelines from running",
          "Wrote the production cutover runbook — step-by-step from write freeze and data sync to reopening traffic, with clear completion criteria for each step",
          "Built data comparison and config validation scripts for MySQL / Redis / MongoDB across old and new environments; the fix-up tool defaults to dry-run, writes only when explicitly told to, and backs up original values first",
          "Pulled production configs back and compared them against git key by key (semantic, not textual), surfacing settings where git had drifted from production to prevent config regressions at launch",
        ],
        "Reward Claim Bug Investigation & Performance Optimization": [
          "Investigated a financial-loss bug where players could claim rewards multiple times; root-caused to a race condition (concurrent requests passing the check simultaneously), fixed with a Redis-based dedup marker",
          "Diagnosed full-collection scan on ~2.7M records/day, designed compound indexes, implemented Lua scheduler to pre-build daily indexes automatically, and generalized the fix to other large collections",
        ],
        "Redis Architecture Optimization": [
          "Refactored key structure to Hash (rid as field), eliminated excessive SCAN operations",
        ],
        "Security Hardening": [
          "Investigated Redis data tampering, traced full attack chain (game state forgery + transaction record tampering)",
          "Designed three-layer defense: HMAC signing + state machine + audit trail",
        ],
        "Message Queue": [
          "Implemented real-time push notification system using RabbitMQ for cross-service async messaging",
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
        "Game Mechanics Framework (Golang)": [
          "Encapsulated shared game mechanics into a reusable framework",
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
      id: "memory-mcp",
      name: "memory-mcp — Cross-Session Memory for AI Coding Agents (open source, personal)",
      start: "Jun. 2026",
      end: "Present",
      description: [
        "MCP server and CLI written in Go that lets AI coding agents store and recall memory across sessions (github.com/ggwhite/memory-mcp)",
        "SQLite FTS5 full-text search with a trigram tokenizer, supporting CJK; optional semantic search with local Ollama embeddings, merged via Reciprocal Rank Fusion, falling back to keyword-only search when Ollama is offline",
        "Claude Code hooks integration: injects relevant memories at session start based on the working directory, auto-recalls related memories on each prompt, and auto-summarizes at session end; common secret formats are masked on write",
        "Golang, SQLite, mcp-go, Cobra",
      ],
    },
    {
      id: "4x",
      name: "4x — Multi-Role AI Development Framework (open source, completed)",
      start: "Jun. 2026",
      end: "Aug. 2026",
      description: [
        "Open-source CLI (github.com/ggwhite/4x, 34 GitHub stars) that orchestrated AI coding agents into a multi-role loop — Design → Code → Review → Test → Deep Review → Accept — with isolated, mutually checking roles",
        "Implemented deterministic guardrails (state machine, scope lock) in the Go CLI rather than relying on prompts; supported multiple runners including Claude Code, Codex, and Gemini CLI, plus a dependency-aware batch mode",
        "Lessons from this multi-role pipeline evolved into my current, lighter subagent setup, keeping its core principle of separating implementation from verification",
      ],
    },
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
