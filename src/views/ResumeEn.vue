<template>
  <div class="resume container">
    <main-head :name="profile.name" :position="profile.position" :pdf="pdf">
    </main-head>

    <section>
      <p class="title">
        <b>Summary of Qualifications</b>
      </p>
      <summary-qualification :summary="summary">
      </summary-qualification>
    </section>

    <section>
      <p class="title">
        <b>Employment History</b>
      </p>
      <experience v-for="exp in experience" :key="exp.id" :company="exp.company" :position="exp.position"
        :start="exp.start" :end="exp.end" :description="exp.description">
      </experience>
    </section>

    <section>
      <p class="title">
        <b>Piecework Project</b>
      </p>
      <project v-for="p in project" :key="p.id" :name="p.name" :start="p.start" :end="p.end" :description="p.description">
      </project>
    </section>

    <profile :photo="profile.photo" :email="profile.email" :phone="profile.phone" :github="profile.github"
      :linkedin="profile.linkedin" :programming="profile.programming" :tools="profile.tools">
    </profile>

  </div>
</template>

<script>
import MainHead from '@/components/MainHead.vue'
import SummaryQualification from '@/components/SummaryQualification.vue'
import Profile from '@/components/Profile.vue'
import Experience from '@/components/Experience.vue'
import Project from '@/components/Project.vue'
import Education from '@/components/Education.vue'

import Photo from '@/assets/photo.jpg'

export default {
  name: 'ResumeEn',
  components: {
    MainHead,
    SummaryQualification,
    Profile,
    Experience,
    Project,
    Education
  },
  data: function () {
    return {
      pdf: "/resume/WhiteChang-Resume.en.pdf",
      profile: {
        name: "White Chang",
        position: "Senior Backend Engineer",
        email: "eddy6868@msn.com",
        phone: "+886 928827611",
        github: "https://github.com/ggwhite",
        linkedin: "https://linkedin.com/in/white-chang",
        photo: Photo,
        programming: {
          "Golang": ["Gin", "Dig", "Cobra", "Viper", "gRPC"],
          "Java": ["Spring", "Spring Boot", "MyBatis"],
          "Lua": ["Skynet"],
          "Javascript & Node.js": ["Vue.js", "Nuxt.js", "TypeScript", "jQuery"],
          "PHP": ["Laravel"],
          "HTML & CSS": ["Tailwind CSS", "Bootstrap"],
        },
        tools: {
          "DevOps": ["Kubernetes", "Docker", "GitLab CI/CD", "Helm", "Harbor"],
          "Data Store": ["Redis", "MongoDB", "MySQL", "PostgreSQL", "Oracle"],
          "Message Queue": ["RabbitMQ"],
          "Testing": ["Postman", "JMeter"],
          "AI Tools": ["Claude Code", "GitHub Copilot"],
          "Other": ["Git"],
        }
      },
      summary: [
        "10+ years experience as a backend engineer, specializing in game server architecture (Lua/Skynet/Golang/Java).",
        "Hands-on experience in MongoDB performance tuning and Redis architecture optimization for large-scale data.",
        "Proficient in Kubernetes, Docker, and GitLab CI/CD; experienced in hybrid cloud/on-premise deployments.",
        "Experienced in AI-assisted development workflows (Claude Code, GitHub Copilot).",
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
              "Developed micro-service RESTful API (Golang, Java)",
              "Maintained Invoice & Receipt Process System (Java, Spring, JBoss, Oracle)",
            ],
            "Test Automation": [
              "Wrote test cases integrated into CI/CD pipeline, auto-executed via mvn test",
            ],
            "Developed Frontend components (Vue.js, Webpack)": "",
            "Created dev environments and tools with Docker": "",
          },
        },
        {
          id: "Kangda",
          company: "Kangda Info Corp.",
          position: "Software Engineer",
          start: "Jul. 2015",
          end: "Aug. 2016",
          description: {
            "Developed project for MOST(Ministry of Science and Technology, R.O.C.)": ""
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
          },
        }
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
            "Created Server, Linode account, base on CentOS, Apache, PHP, Postgres SQL"
          ],
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "Bachelor of Electrical Engineering",
          school: "National Kaohsiung University of Science and Technology(NKUST), Taiwan",
          start: "Sep. 2006",
          end: "Jun 2010"
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.resume {
  position: relative;

  @media (min-width: 768px) {
    display: grid;
    grid-template-areas: "head profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile"
      ". profile";
    grid-auto-columns: 1fr 265px;
  }

  .title {
    border-bottom: 1px solid #AAA;
    margin-bottom: 5px;
    font-size: 110%;

    @media (min-width: 768px) {
      font-size: 120%;
      margin-bottom: 10px;
      width: calc(100% - 30px);
    }
  }

  .main-head {
    margin-bottom: 10px;

    @media (min-width: 768px) {
      grid-area: head;
    }
  }

  .profile {

    padding: 0;

    @media (min-width: 768px) {
      grid-area: profile;
      padding: 10px;
    }
  }

  .experience {
    border-bottom: 2px dashed #AAA;
    margin: 10px;

    @media (min-width: 768px) {
      margin: 0 40px 10px 10px;
    }

    &:last-child {
      border-bottom: 0;
    }

  }

  .project {
    @media (min-width: 768px) {
      margin: 0 40px 0 10px;
    }
  }

  .education {
    @media (min-width: 768px) {
      margin: 0 40px 0 10px;
    }
  }

}
</style>