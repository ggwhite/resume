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
  // Voice and staging for the interactive site: headlines, stories, scene labels.
  // Creative framing only — every claim restates a fact from the record below
  // (competencies / aiWorkflow / experience / project), the approved interview
  // stories, or the repos' READMEs. Headlines, hero and diagrams use neutral terms
  // (services, users, platforms); industry detail stays in the experience record.
  site: {
    nav: { systems: "Problems", work: "Experience", ai: "AI workflow", oss: "Open source", skills: "Toolbox", contact: "Contact" },
    langSwitch: { label: "中文", to: "/zh-tw" },
    hero: {
      nameLines: ["White", "Chang"],
      altName: "張育誠",
      stack: "Go · Java · Lua",
      lede: "About 15 years of backend engineering, the last seven on high-concurrency, real-time platforms. I work on the parts that have to hold: data and performance, reliability and security, delivery. I build in Go, Java and Lua, and I run AI agents by one rule: whoever writes the code never verifies it.",
      words: ["Go", "Java", "Lua", "Redis", "MongoDB", "MySQL", "gRPC", "Docker", "Kubernetes"],
      photoAlt: "Portrait of White Chang",
    },
    stats: [
      { prefix: "~", num: 15, suffix: "", unit: "years", label: "of software development" },
      { prefix: "~", num: 2.7, decimals: 1, suffix: "M", unit: "records / day", label: "MongoDB collection whose full scans I diagnosed and indexed" },
      { prefix: ">", num: 50, suffix: "%", unit: "shorter", label: "development cycle for new products, via a reusable Go framework" },
      { prefix: "", num: 130, suffix: "+", unit: "GitHub stars", label: "go-masker, my open-source Go library" },
    ],
    systems: {
      title: "Five problems, told from the cause",
      sub: "The picture follows the text: the situation first, then what went wrong, then the fix.",
      steps: [
        {
          scene: "race", head: "Two requests, one check.", tags: ["Concurrency", "Redis"],
          body: [
            "A feature let each user claim something once a day. The server handled it in three steps: check that it had not been claimed yet, run a query to confirm the user qualified, then grant it.",
            "Users reported that the button did nothing, so they tapped again. Every extra tap passed step one, because nothing had been granted yet, and queued behind the same slow query. When the query came back, each waiting request granted the item. One user, several grants: a bug that cost real money.",
            "The hole was the gap between checking and granting. I closed it with a Redis marker: the first request to write the marker goes on, every later one is turned away, and the marker expires after a day.",
          ],
        },
        {
          scene: "index", head: "Why that query was slow enough to matter.", tags: ["MongoDB", "Performance"],
          body: [
            "The slow query was a second cause, and a separate one. The records it read live in a collection that is created automatically every day, about 2.7 million records a day.",
            "Nothing in that daily creation step built an index. So every query scanned the whole collection, and the slow queries triggered retries that made it worse.",
            "Adding an index by hand would have fixed one day. I wrote a scheduler on the Lua server that builds the compound index ahead of time, for today's and tomorrow's collections, so the midnight switch never lands on a bare one. Then I applied the same approach to the other large collections.",
          ],
        },
        {
          scene: "tamper", head: "When the secret leaks, move the data.", tags: ["Security", "Redis", "Docker"],
          body: [
            "To let a dropped connection pick up where it left off, a service kept session state in Redis.",
            "Then the records started showing results the normal flow could not have produced. The state in Redis was being altered outside the normal flow. I added a checksum, then AES encryption. Neither held: once the secret is exposed, the attacker can reproduce any app-layer validation.",
            "So I stopped guarding the data where it was and moved it. For the affected services, the sensitive state went into process memory, where a Redis client cannot reach it, and the environment was isolated with Docker. I also designed a tamper-resistant architecture (HMAC signing, a state machine, an audit trail); that part reached a working POC, not production.",
          ],
        },
        {
          scene: "migrate", head: "Moving live services without a surprise.", tags: ["Docker", "GitLab CI/CD", "Harbor", "AWS ECR"],
          body: [
            "Services and back offices for several platforms ran directly on bare-metal hosts, and some of the settings in git no longer matched what was actually running in production.",
            "A move like that gets one cutover. Deploy straight from git, and production settings roll back without anyone noticing.",
            "Between July and October 2026 I moved them into Docker containers. Images go to Harbor and AWS ECR, and a git tag triggers the release pipeline. I pulled the production configs back and compared them with git key by key, wrote scripts that compare MySQL, Redis and MongoDB between old and new, and wrote the cutover runbook: freeze writes, sync data, reopen traffic, each step with its own completion criteria. The fix-up tool only previews unless told to write, and backs up first.",
          ],
        },
        {
          scene: "poc", head: "Knowing when not to ship.", tags: ["Golang", "gRPC", "Protobuf"],
          body: [
            "Three platforms had grown up on three different stacks: Go with .NET, Lua with PHP, Lua/Skynet with Java. Each had its own servers, back office and deployment pipeline.",
            "After the tampering incident I wanted a root fix instead of another patch: one backend, services talking over gRPC, with data integrity designed in from the start.",
            "I built it to a working POC. Then I evaluated the migration separately from the design, and stopped: a full rewrite was too risky for live platforms. Nothing from it went to production. A good design does not make a migration worth doing.",
          ],
        },
      ],
    },
    work: {
      title: "Where it happened",
      sub: "Nearly 15 years across gaming, payment and enterprise systems.",
      role: "Architecture planning and technical decisions in a 5–10 person team: weighing whether a change should be made at all, what it touches, and what it risks. The five stories above are from here. Two more:",
      chapters: [
        {
          scene: "hash", head: "One Hash instead of a keyspace sweep.",
          body: [
            "Some Redis data was stored as one key per rid, so reading it meant running SCAN across the keyspace.",
            "I refactored the structure into a single Hash with rid as the field. Lookups became direct, and the excessive SCAN operations went away.",
          ],
        },
        {
          scene: "inject", head: "Evidence first. Restart second.",
          body: [
            "Abnormal results kept showing up in the records. I traced them to Lua code injected through the Skynet debug console, changing service logic in memory.",
            "I set up monitoring and preserved the evidence before restarting anything. The restart then cleared the injected code from memory.",
          ],
        },
      ],
      alsoTitle: "Also at Tyche",
      also: [
        "A shared team knowledge base and AI-agent rules, so Claude Code and Codex follow the same conventions.",
        "A playbook / runbook loop: every investigation and release pitfall gets written back into the docs.",
        "Real-time push notifications over RabbitMQ.",
        "GitLab CI/CD into Harbor, Helm charts on Kubernetes, GitLab Runners.",
        "New graduates onboarded through code review and pair programming.",
      ],
      record: "Full record",
      earlier: "Before that",
    },
    ai: {
      title: "Agents do the typing. I do the deciding.",
      quote: "Whoever writes the code never verifies it.",
      steps: [
        { scene: "delegate", head: "Three seats, never shared.", body: ["Lightweight models take file search and routine chores. A worker implements. A separate, independent verifier signs off.", "Architecture decisions — module boundaries, protocols, the security model — stay with me, and so do the production blind spots AI overlooks: logging coverage, security hardening."] },
        { scene: "guard", head: "A fence, and a memory.", body: ["Harness rule files (CLAUDE.md / AGENTS.md) keep agents inside project conventions.", "memory-mcp, which I built, carries preferences, past pitfalls and unfinished work into the next session."] },
      ],
    },
    oss: {
      title: "Things I've put on GitHub",
      freelance: "Freelance",
      archived: "archived",
      stars: "stars",
      lines: {
        "memory-mcp": "AI agents forget everything when a session ends. This remembers.",
        "jarvis": "A live HUD beside the chat: what every subagent is doing, and what it costs.",
        "go-masker": "One struct tag between your logs and someone's phone number.",
        "4x": "Archived on purpose. Its one rule still runs my workflow.",
      },
      labels: { problem: "Problem", how: "How it works", proof: "Proof", repo: "View on GitHub", more: "Also on GitHub" },
      flag: {
        "memory-mcp": {
          problem: "AI coding agents forget everything when a session ends: yesterday's fix, the convention you corrected twice, the half-finished refactor. The next session starts from zero.",
          how: "One Go binary and one SQLite file, reachable three ways: a CLI, an MCP server, and Claude Code hooks that inject relevant memories at session start and on every prompt, then write a summary at session end. Search is SQLite FTS5 with a trigram tokenizer, optionally fused with local Ollama embeddings through Reciprocal Rank Fusion.",
          proof: ["7 MCP tools", "CJK full-text search", "macOS + Linux binaries", "MIT"],
        },
        "jarvis": {
          problem: "Once work fans out to subagents, the chat alone does not show what each one is doing, what it costs, or whether it is stuck.",
          how: "A Claude Code mod that opens a live HUD pane beside the chat: every subagent in flight with its task, elapsed time, tokens and estimated API cost; stuck and looping agents flagged as it happens; plus the files the session touched and every other session on the machine.",
          proof: ["1,100+ tests", "Terminal + Claude Desktop", "English + 繁體中文 UI", "MIT"],
        },
        "go-masker": {
          problem: "Names, emails, phone numbers and card numbers end up in logs and API output unless someone remembers to hide them.",
          how: "Tag the struct field and the library masks it: built-in maskers for names, emails, phones, IDs and cards, dynamic tags such as mid-4-4, your own maskers through Register, and Sensitive[T] values that stay masked in fmt, JSON and slog until you call Reveal().",
          proof: ["130+ GitHub stars", "Maintained since Apr. 2019", "v3 · Go 1.22+", "MIT"],
        },
      },
      til: { label: "White's Tech Notes", line: "My TIL blog: backend notes on Go, Java, Lua, DevOps and AI-assisted development — pitfalls, root causes and fixes.", url: "https://ggwhite.github.io/ggwhite/" },
      demo: {
        termTitle: "quick start",
        termNotes: ["one index line per memory; full content by id with `get`", "exposes the 7 MCP tools to Claude Code"],
        jarvisNote: "Illustration of the Now tab — not live data",
        jarvisCols: ["subagent", "status", "elapsed"],
        jarvisStates: ["running", "done", "flagged: stuck"],
        raw: "Raw",
        masked: "Masked",
        fourxFail: "Reviewer FAIL → amending",
      },
    },
    skills: { title: "What's in the toolbox", hint: "Pick a language to see what I use with it." },
    contact: { title: "Open a connection.", sub: "Senior Backend Engineer · Go · Java · Lua" },
    scenes: {
      race: {
        labels: { req: ["User taps"], c1: ["1 · Claimed?"], c2: ["2 · Qualifies?", "slow query"], grant: ["3 · Grant"], mark: ["Redis marker"] },
        caps: ["How it should work: check, verify, grant once", "Step 2 is slow, so a second tap passes step 1 before anything is granted", "Fix: the first request writes a Redis marker; later ones are turned away"],
      },
      index: {
        labels: { query: ["Query"], idx: ["Compound index"], sched: ["Lua scheduler", "runs daily"], coll: ["Today's collection", "~2.7M records / day"] },
        caps: ["A new collection is created every day", "It has no index, so every query reads every record", "A scheduler builds the index ahead, for today and tomorrow", "Queries go through the index, straight to the matching records"],
      },
      tamper: {
        labels: { atk: ["Attacker"], redis: ["Redis", "session state"], val: ["App-layer validation", "checksum · AES"], docker: ["Docker"], svc: ["Service"], mem: ["Process memory"] },
        caps: ["A service keeps session state in Redis so connections can resume", "The state is edited in Redis directly; with the secret exposed, validation passes it", "The state moves into process memory; the environment is isolated with Docker"],
      },
      migrate: {
        labels: { old: ["Bare metal"], s1: ["Services"], s2: ["Back office"], neu: ["Docker"], c1: ["Services"], c2: ["Back office"], f: ["1 · Write freeze"], sy: ["2 · Data sync"], op: ["3 · Reopen traffic"] },
        caps: ["Before: live traffic on bare-metal hosts", "Runbook step 1: freeze writes", "Runbook step 2: sync data, compare old against new", "Runbook step 3: reopen traffic on the containers"],
      },
      poc: {
        labels: { a: ["Platform A", "Go · .NET"], b: ["Platform B", "Lua · PHP"], c: ["Platform C", "Lua · Java"], poc: ["gRPC POC", "HMAC · state machine · audit trail"], live: ["Live platforms"] },
        caps: ["Three platforms, three stacks, three of everything", "One backend, built to a working POC", "Evaluated, then stopped: a full rewrite is too risky for live platforms"],
      },
      hash: {
        labels: { keys: ["one key per rid"], q: ["Lookup"], hash: ["Hash", "field = rid"] },
        caps: ["SCAN walks the keyspace to find one rid", "One Hash, rid as the field: a direct lookup"],
      },
      inject: {
        labels: { atk: ["Attacker"], con: ["Skynet debug console"], svc: ["Service", "in memory"], mon: ["Monitoring"], ev: ["Evidence"] },
        caps: ["Lua code injected through the debug console", "First: monitoring on, evidence preserved", "Then: restart clears the injected code from memory"],
      },
      delegate: {
        labels: { main: ["Main session", "I plan and decide"], light: ["Lightweight model", "file search, chores"], worker: ["Worker", "implementation"], ver: ["Verifier", "independent sign-off"] },
        caps: ["Search and chores go to a lightweight model", "Implementation goes to the worker", "Sign-off comes from a separate verifier"],
      },
      guard: {
        labels: { rules: ["Harness rules", "CLAUDE.md / AGENTS.md"], agent: ["AI agent"], mem: ["memory-mcp"] },
        caps: ["Rule files keep the agent inside project conventions", "Session ends: what it learned is stored", "Next session starts: the memory comes back"],
      },
      handshake: { labels: { you: ["You"], me: ["White"] }, caps: [] },
    },
  },
  pdfHighlights: {
    Tyche: "3 game server projects (Lua/Skynet, Golang). Fixed reward-claim race condition, MongoDB optimization on 2.7M records/day. Redis architecture redesign. Redis tampering investigation: moved sensitive state into process memory, Docker isolation; handled a Lua code injection via the Skynet debug console. CI/CD pipeline with Docker/Harbor/Helm. Handled containerization of multiple platforms, migrating from bare metal (Harbor/ECR releases, cutover runbooks, data verification scripts); introduced a shared team knowledge base and AI collaboration rules.",
    Terpro: "Built a reusable game mechanics framework, cutting new-game development time by over 50%. Kubernetes/Helm deployment.",
    WistronITS: "Mentored 2 engineers. Built the OpenId, Product, Payment and Stock services and a Kafka forwarder. Jenkins/Nexus CI toolchain.",
  },
  about: "Senior backend engineer with nearly 15 years of software development experience, specializing in high-concurrency distributed systems. I focus on solving problems — performance bottlenecks, deployment automation, system security — not memorizing frameworks. Domain experience spans real-time gaming platforms (multi-server architectures serving multiple concurrent titles), payment processing, and enterprise APIs. My workflow is AI-augmented: Claude Code runs as my main session for planning and final decisions, delegating file search, implementation, and verification to subagents on different models (whoever writes the code never verifies it); harness rule files keep AI behavior in check, and my self-built memory-mcp carries context across sessions. I catch what AI misses — production observability, security hardening, system integrity.",
  competencies: [
    {
      title: "Architecture Evaluation & Modernization",
      description: "Planned a microservice / gRPC unification of a multi-platform game backend and built it to a working POC, including a tamper-resistant data layer (HMAC signing, state machine, audit trail). Evaluated it and stopped the project: a full rewrite was too risky for live platforms.",
      tech: "Golang, gRPC, Protobuf, Redis",
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
      description: "Investigated Redis data tampering incidents and traced the full attack chain. After confirming app-layer validation was bypassed once the secret was exposed, moved sensitive state for the affected games into process memory and isolated the environment with Docker.",
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
          "Investigated Redis data tampering, traced full attack chain (game state forgery + transaction record tampering); after confirming app-layer validation was bypassed once the secret was exposed, moved sensitive state for the affected games into process memory and isolated the environment with Docker",
          "Designed a tamper-resistant architecture (HMAC signing, state machine, audit trail) and built it to a working POC",
          "Handled a Lua code injection via the Skynet debug console: set up monitoring and preserved evidence first, then restarted affected services to clear the injected code from memory",
        ],
        "Platform Modernization POC": [
          "Planned a microservice / gRPC unification of the platforms' game backends and built it to a working POC; evaluated it and stopped the project because a full rewrite was too risky for live platforms",
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
      id: "jarvis",
      name: "Jarvis — Live Observability for Claude Code Agents (open source, personal)",
      start: "Oct. 2026",
      end: "Present",
      description: [
        "Real-time pane beside the chat showing each subagent's task, elapsed time, token use and estimated API cost, and flagging stuck or looping agents (github.com/ggwhite/jarvis)",
        "Fleet view across every local Claude Code session — status, quota usage, one-click jump to a session — plus per-repo file changes, diffs and commit graph",
        "TypeScript, Claude Code plugin API, 1,100+ tests; renders natively in Claude Desktop and as a cell grid in the terminal",
      ],
    },
    {
      id: "4x",
      name: "4x — Multi-Role AI Development Framework (open source, archived)",
      start: "Jun. 2026",
      end: "Aug. 2026",
      description: [
        "Open-source Go CLI (github.com/ggwhite/4x, 35 GitHub stars) that ran AI coding agents as isolated Design → Code → Review → Test roles with deterministic guardrails; archived once native subagents covered it, and its core rule — whoever writes the code never verifies it — lives on in my current workflow",
      ],
    },
    {
      id: "go-masker",
      name: "go-masker — Sensitive Data Masking Library for Go (open source, personal)",
      start: "Apr. 2019",
      end: "Present",
      pdf: false,
      description: [
        "Open-source Go library for masking sensitive fields (names, emails, phones, IDs, cards) in logs and API output via struct tags (github.com/ggwhite/go-masker, 130+ GitHub stars)",
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
