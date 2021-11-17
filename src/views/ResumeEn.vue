<template>
  <div class="resume container">
    <main-head
      :name="profile.name" 
      :position="profile.position"
      :pdf="pdf">
    </main-head>

    <section>
      <p class="title">
        <b>Summary of Qualifications</b>
      </p>
      <summary-qualification 
        :summary="summary">
      </summary-qualification>
    </section>

    <section>
      <p class="title">
        <b>Employment History</b>
      </p>
      <experience v-for="exp in experience" 
        :key="exp.id" 
        :company="exp.company"
        :position="exp.position"
        :start="exp.start"
        :end="exp.end"
        :description="exp.description">
      </experience>
    </section>

    <section>
      <p class="title">
        <b>Piecework Project</b>
      </p>
      <project v-for="p in project" 
        :key="p.id" 
        :name="p.name"
        :start="p.start"
        :end="p.end"
        :description="p.description">
      </project>
    </section>

    <profile
      :photo="profile.photo"
      :email="profile.email" 
      :phone="profile.phone" 
      :github="profile.github"
      :linkedin="profile.linkedin"
      :programming="profile.programming"
      :tools="profile.tools">
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
  data: function(){
    return {
      pdf: "resume/WhiteChang-Resume.en.pdf",
      profile: {
        name: "White Chang",
        position: "Senior Backend Engineer",
        email: "eddy6868@msn.com",
        phone: "+886 928827611",
        github: "https://github.com/ggwhite",
        linkedin: "https://linkedin.com/in/white-chang",
        photo: Photo,
        programming: {
          "Golang": ["Gin", "Gorilla", "gRPC"], 
          "Java": ["Spring", "Quartz"],
          "Javascript & Node.js": ["Vue.js", "jQuery"],
          "PHP": ["Phalcon", "Yii", "CodeIgniter"],
          "HTML & CSS": ["Bootstrap", "Less.js"],
        },
        tools: {
          "DevOps": ["Kubernetes", "Docker", "Jenkins", "Ansible"],
          "Data Store": ["Memcached", "Redis", "Elasticsearch", "SQL Server", "Oracle", "Postgres", "MySQL"],
          "Message Queue": ["Kafka"],
          "Testing": ["Postman", "JMeter"],
          "Other": ["Git", "Logstash", "Kibana"],
        }
      },
      summary: [
        "10+ years experience as a backend engineer.",
        "Ability to solve problems efficiently.",
        "Possessing all-round analysis and programming skills.",
        "Methodical yet creative and having a proven ability for effective problem-solving.",
      ],
      experience: [
        {
          id: "Tyche",
          company: "Tyche Tech Co, Ltd",
          position: "Senior Server Engineer",
          start: "Jan. 2021",
          end: "Present",
          description: {
            "Developed Gaming Serves ... (Golang)": [
              "Poker, Slot, PachiSlot game logic (TCP/Web Socket)",
              "CLI tools to access game servers (gRPC)",
            ],
            "Infrastructure & DevOps": [
              "Designed & maintained Game Servers helm chart scripts (for DEV, QA env)",
              "Setup services for development on kubernetes: GitLab Runner, Docker Registry, Minio",
              "Designed deploy script for Game Servers on linux server (Bash Script)",
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
            "Developed Gaming Serves ... (Golang)": "",
            "Designed & maintained Game Servers helm chart scripts (for DEV, QA env)": "",
          },
        },
        {
          id: "WistronITS",
          company: "WistronITS Corp. Stationed: Taiwan Mobile",
          position: "Senior Backend Engineer",
          start: "Sep. 2016",
          end: "May 2019",
          description: {
            "Led 2 engineers, Developed Backend server": [
              "Developed micro-service, provided RESTful API web service (Golang, Java)",
              "Maintained Invoice & Receipt Process System (Java, Spring, JBoss, Oracle)",
            ],
            "Developed Frontend components (Vue.js, Webpack)": "",
            "Built-up automated test / static-analysis / deploy mechanism": "",
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
            "Developed event site (PHP)": "",
          },
        }
      ],
      project: [
        {
          id: "Yapro",
          name: "Yapro car tax refund management (2 members)",
          start: "Jan. 2021",
          end: "Mar. 2021",
          description: [
            "Created RestAPI Server, base on Golang",
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