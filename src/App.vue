<template>
  <div id="app" class="font-['Avenir',Helvetica,Arial,sans-serif] antialiased text-gray-600 pb-5"
       @click="menuOpen = false">

    <nav class="relative overflow-hidden p-2.5 mb-2.5 md:p-[30px] md:mb-5 md:!h-[400px] transition-all duration-[400ms] print:hidden"
         :class="menuOpen ? 'h-[120px]' : 'h-10'">

      <div class="absolute inset-0 bg-gray-600 bg-cover bg-no-repeat opacity-30 animate-banner -z-10"
           :style="{ backgroundImage: `url(${bg})`, backgroundPosition: '0 85%' }"></div>

      <div class="inline-block">
        <a class="text-xl cursor-pointer md:hidden" @click.stop.prevent="menuOpen = !menuOpen">
          <Menu :size="20" />
        </a>

        <div v-show="menuOpen" class="absolute top-10 left-0 w-full z-[999] shadow-md md:hidden bg-white/90">
          <router-link v-for="(text, url) in menu" :key="url" :to="url"
                       class="block p-2.5 border-b border-gray-300 last:border-b-0"
                       @click="menuOpen = false">
            {{ text }}
          </router-link>
        </div>

        <div class="hidden md:flex md:gap-1">
          <router-link v-for="(text, url) in menu" :key="url" :to="url"
                       class="inline-block px-4 py-2 font-bold rounded-lg hover:bg-white/20 transition-colors"
                       active-class="!text-emerald-500 !bg-white/25">
            {{ text }}
          </router-link>
        </div>
      </div>

      <div class="float-right text-xl md:absolute md:bottom-2.5 md:right-8 md:text-2xl">
        <a :href="'mailto:' + contact.email" class="mx-1 md:mx-2.5"><Mail :size="22" /></a>
        <a :href="contact.github" target="_blank" class="mx-1 md:mx-2.5"><GithubIcon :size="22" /></a>
        <a :href="contact.linkedin" target="_blank" class="mx-1 md:mx-2.5"><LinkedinIcon :size="22" /></a>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { Mail, Menu } from '@lucide/vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import { contact } from '@/data/shared'
import bg from '@/assets/bg.jpg'

export default {
  name: 'App',
  components: { Mail, Menu, GithubIcon, LinkedinIcon },
  data() {
    return {
      contact,
      bg,
      menuOpen: false,
      menu: {
        '/en': 'English',
        '/zh-tw': '繁體中文',
      },
    }
  },
}
</script>
