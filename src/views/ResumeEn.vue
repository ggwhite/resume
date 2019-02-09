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

    <section>
      <p class="title">
        <b>Education</b>
      </p>
      <education v-for="edu in education" 
        :key="edu.id" 
        :degree="edu.degree"
        :school="edu.school"
        :start="edu.start"
        :end="edu.end">
      </education>
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
      pdf: "/WhiteChang-Resume.en.pdf",
      profile: {
        name: "White Chang",
        position: "Senior Backend Engineer",
        email: "eddy6868@msn.com",
        phone: "+886 928827611",
        github: "https://github.com/ggwhite",
        linkedin: "https://linkedin.com/in/white-chang",
        photo: Photo,
        programming: {
          "Golang": ["Gin", "Gorilla"], 
          "Java": ["Spring", "Quartz"],
          "Javascript & Node.js": ["Vue.js", "jQuery"],
          "PHP": ["Phalcon", "Yii", "CodeIgniter"],
          "HTML & CSS": ["Bootstrap", "Less.js"],
        },
        tools: {
          "DevOps": ["Docker", "Jenkins", "Ansible"],
          "Data Store": ["Memcached", "Redis", "Elasticsearch", "SQL Server", "Oracle", "Postgres", "MySQL"],
          "Message Queue": ["Kafka"],
          "Testing": ["Postman", "JMeter"],
          "Other": ["Git", "Logstash", "Kibana"],
        }
      },
      summary: [
        "7+ years experience as a backend engineer.",
        "Ability to solve problems efficiently.",
        "Possessing all-round analysis and programming skills.",
        "Methodical yet creative and having a proven ability for effective problem-solving.",
      ],
      experience: [
        {
          id: "exp-1",
          company: "WistronITS Corp. Stationed: Taiwan Mobile",
          position: "Senior Backend Engineer",
          start: "Sep. 2016",
          end: "Present",
          description: {
            "Led 2 engineers, Developed Backend server": {
              "Developed micro-service, provided RESTful API web service": [
                "OpenId Service (Golang, Google APIs)",
                "Product Service (Java, SpringBoot, Golang, SQL Server, Memcached)",
                "Payment Service (Golang, SQL Server, Memcached)",
                "Stock Service (Golang, SQL Server, Memcached)",
                "Kafka Forwarder (Golang, Kafka)",
              ],
              "Maintained Invoice & Receipt Process System (Java, Spring, JBoss, Oracle)": ""
            },
            "Developed Frontend components": "Developed Vue.js components for the CMS team, increased development efficiency (Vue.js, Webpack)",
            "Built-up automated test / static-analysis / deploy mechanism": "",
            "Created dev environments and tools with Docker": [
              "Jenkins Server: Auto build Maven, NPM project and publish to Nexus Server",
              "Nexus Server: Managed private Maven repository and NPM registry",
              "Gitbook Demo: Wrote development documents with Gitbook",
              "Vue Components Demo",
              "Tomcat Server",
            ]
          },
        },
        {
          id: "exp-2",
          company: "Kangda Info Corp.",
          position: "Software Engineer",
          start: "Jul. 2015",
          end: "Aug. 2016",
          description: {
            "Developed project for MOST(Ministry of Science and Technology, R.O.C.) Department": ""
          },
        },
        {
          id: "exp-3",
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
          id: "exp-4",
          company: "Open-Life Corp.",
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
          id: "project-1",
          name: "Muxin CarePro CMS",
          start: "Nov. 2013",
          end: "Mar. 2015",
          description: [
            "5 members team work.",
            "Created Server, Linode account, base on CentOS, Apache, PHP, Postgres SQL."
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