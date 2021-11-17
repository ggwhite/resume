<template>
  <div class="resume container">
    <main-head
      :name="profile.name" 
      :position="profile.position"
      :pdf="pdf">
    </main-head>

    <section>
      <p class="title">
        <b>摘要</b>
      </p>
      <summary-qualification 
        :summary="summary">
      </summary-qualification>
    </section>

    <section>
      <p class="title">
        <b>工作經歷</b>
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
        <b>外包接案</b>
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
import Photo from '@/assets/photo.jpg'
import Experience from '@/components/Experience.vue'
import Project from '@/components/Project.vue'
import Education from '@/components/Education.vue'

export default {
  name: 'ResumeZhTw',
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
      pdf: "resume/WhiteChang-Resume.zh-tw.pdf",
      profile: {
        name: "張育誠 (White)",
        position: "資深後端工程師",
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
        "10年以上後端工程師經歷",
        "能夠有效地解決問題",
        "擁有全面的分析和編程技巧",
        "有條不紊，富有創造力，具有有效解決問題的能力",
      ],
      experience: [
        {
          id: "Tyche",
          company: "大極科技(TycheTech)",
          position: "資深後端服務工程師",
          start: "2021/01",
          end: "現在",
          description: {
            "開發各項遊戲服務器 ... (Golang)": [
              "棋牌, 老虎機, 柏青斯洛 遊戲開發 (TCP/Web Socket)",
              "查詢/控制 遊戲服務器的指令工具 (gRPC)",
            ],
            "Infrastructure & DevOps": [
              "建立遊戲服務器 helm chart 腳本 (for DEV, QA env)",
              "在Kubernetes Cluster內架設開發用工具: GitLab Runner, Docker Registry, Minio",
              "開發 Linux Server 部署遊戲服務器的腳本 (Bash Script)",
            ],
          },
        },
        {
          id: "Terpro",
          company: "專羿行動(Terpro)",
          position: "資深後端服務工程師",
          start: "2019/06",
          end: "2020/12",
          description: {
            "開發各項遊戲服務器 ... (Golang)": "",
            "建立遊戲服務器 helm chart 腳本 (for DEV, QA env)": "",
          },
        },
        {
          id: "exp-1",
          company: "緯創軟體(WistronITS) 駐點: 台灣大哥大",
          position: "資深後端工程師",
          start: "2016/09",
          end: "2019/05",
          description: {
            "領導2名工程師, 開發後端服務": [
              "開發 micro-service, 提供 RESTful API 服務 (Golang, Java)",
              "維護『發票暨單據處理系統』 (Java, Spring, JBoss, Oracle)",
            ],
            "開發前端組件 (Vue.js, Webpack)": "",
            "建立自動化的 測試 / 靜態分析 / 部署 機制": "",
            "建立開發用的環境及工具(使用Docker)": "",
          },
        },
        {
          id: "exp-2",
          company: "康大資訊",
          position: "軟體工程師",
          start: "2015/06",
          end: "2016/08",
          description: {
            "開發科技部專案": ""
          },
        },
        {
          id: "exp-3",
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
          id: "exp-4",
          company: "智慧時尚(Open-Life)",
          position: "軟體工程師",
          start: "2011/11",
          end: "2013/10",
          description: {
            "開發及維護後台管理系統 (PHP, Yii, Postgres)": "",
            "開發活動網站 (PHP)": "",
          },
        }
      ],
      project: [
        {
          id: "Yapro",
          name: "中古車退稅資料登陸系統(2人)",
          start: "Jan. 2021",
          end: "Mar. 2021",
          description: [
            "架設 RestAPI Server, (Golang)",
            "使用 AWS 服務, ECS, RDS",
          ],
        },
        {
          id: "CarePro",
          name: "沐欣照護 後台管理系統(5人)",
          start: "2013/11",
          end: "2015/03",
          description: [
            "架設伺服器, Apache, PHP, Postgres SQL"
          ],
        }
      ],
      education: [
        {
          id: "edu-1",
          degree: "電機工程系, 學士",
          school: "國立高雄科技大學",
          start: "2006/09",
          end: "2010/06"
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