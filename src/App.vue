<template>
  <div id="app" @click="closeMenu">
    <div id="nav" class="container-fluid">
      <div class="menu">
        <a class="fa fa-bars" @click.stop.prevent="toggleMenu"></a>
        <section v-show="menu_display" class="mobile animated fadeInDown" ref="menu">
          <router-link v-for="(text, url) in menu" :key="url" :to="url">{{ text }}</router-link>
        </section>
        <section class="desktop">
          <router-link v-for="(text, url) in menu" :key="url" :to="url">{{ text }}</router-link>
        </section>
      </div>
      <div id="social">
        <a :href="_email" class="fa fa-envelope"></a>
        <a :href="github" class="fa fa-github-square" target="_blank"></a>
        <a :href="linkedin" class="fa fa-linkedin-square" target="_blank"></a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      email: "eddy6868@msn.com",
      github: "https://github.com/ggwhite",
      linkedin: "https://linkedin.com/in/white-chang",
      menu_display: false,
      menu: {
        "/": "Home",
        "/resume/en": "Resume(English)",
        "/resume/zh-tw": "Resume(Chinese)"
      }
    }
  },
  methods: {
    toggleMenu: function(){
      this.menu_display = !this.menu_display
    },
    closeMenu: function(){
      this.menu_display = false

    },
  },
  computed: {
    _email: function(){
      return "mailto:" + this.email
    }
  }
}
</script>


<style lang="less">
@import '~font-awesome/css/font-awesome.min.css';
@import '~animate.css/animate.min.css';


body {
  margin: 0;
  font-size: 0.8rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
}

a {
  color: #555;
  &:hover {
    text-decoration: none;
    color: #AAA;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555;
  padding-bottom: 20px;
}

#nav {
  position: relative;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    height: 400px;
    padding: 30px;
    margin-bottom: 20px;
  }

  @media print {
    display: none;
  }

  &:after {
    content: "";
    background-color: #555;
    background-image: url(assets/bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 85%;
    opacity: 0.05;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .menu {

    display: inline-block;

    @media (min-width: 768px) {

    }

    a {
      &.fa-bars {
        font-size: 150%;
        @media (min-width: 768px) {
          display: none;
        }  
      }
    }

    section {

      &.mobile {
        display: grid;
        box-shadow: 0 2px 1px #AAA;
        @media (min-width: 768px) {
          display: none;
        }

        a {
          border-bottom: 1px solid #AAA;

          &:last-child {
            border-bottom: 0;
          }
        }

      }

      &.desktop {
        display: none;
        @media (min-width: 768px) {
          display: block;
        }
      }

      @media (max-width: 767px) {
        position: absolute;
        top: 40px;
        left: 0;
        background-color: #FAFAFA;
        width: 100%;
        z-index: 999;
      }

      a {
        padding: 10px;

        @media (min-width: 768px) {
          display: inline-block;
          padding: 10px 15px;
          font-weight: bold;
        }

        &:hover {
          @media (min-width: 768px) {
            padding: 7px 12px;
            border: 3px solid;
          }
        }
        &.router-link-exact-active {
          color: #42b983;
        }
      }
      
    }
  }

  #social {

    float: right;
    font-size: 130%;

    @media (min-width: 768px) {
      position: absolute;
      bottom: 10px;
      right: 30px;
      font-size: 150%;
    }

    a {
      margin: 0 5px;
      @media (min-width: 768px) {
        margin: 0 10px;
      }
    }

  }

}

</style>
