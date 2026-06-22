<template>
  <aside class="p-0 md:p-2.5">
    <div class="text-center p-1 md:block" @click="fullPhoto = !fullPhoto">
      <div class="w-[175px] mx-auto rounded-lg overflow-hidden p-2.5 border-2 border-gray-600 shadow-md
                  max-md:absolute max-md:top-0 max-md:right-5 max-md:w-[50px] max-md:p-0"
           :class="fullPhoto ? 'max-md:!fixed max-md:!w-full max-md:!h-full max-md:!top-0 max-md:!left-0 max-md:!p-10 max-md:!bg-black/30 max-md:!z-50 max-md:!rounded-none max-md:!border-0' : ''">
        <div :class="fullPhoto ? 'max-md:relative max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2' : ''">
          <img :src="photo" class="w-[150px] mx-auto rounded-lg max-md:w-full max-md:rounded-none" />
        </div>
      </div>
    </div>

    <h3 class="text-lg font-bold border-b border-gray-400 mt-5 mb-2.5">{{ labels.personalInfo }}</h3>
    <div class="mb-2.5 flex items-center gap-2.5">
      <Phone :size="16" class="shrink-0" />
      {{ phone }}
    </div>
    <div class="mb-2.5">
      <a :href="'mailto:' + email" class="flex items-center gap-2.5">
        <Mail :size="16" class="shrink-0" />
        {{ email }}
      </a>
    </div>
    <div class="mb-2.5">
      <a :href="github" target="_blank" class="flex items-center gap-2.5">
        <GithubIcon :size="16" class="shrink-0" />
        {{ stripProtocol(github) }}
      </a>
    </div>
    <div class="mb-2.5">
      <a :href="linkedin" target="_blank" class="flex items-center gap-2.5">
        <LinkedinIcon :size="16" class="shrink-0" />
        {{ stripProtocol(linkedin) }}
      </a>
    </div>

    <h3 class="text-lg font-bold border-b border-gray-400 mt-5 mb-2.5">{{ labels.programming }}</h3>
    <div v-for="(libs, lang) in programming" :key="lang" class="mb-1.5">
      <label class="font-bold block mb-0.5">{{ lang }}</label>
      <div class="flex flex-wrap gap-1.5">
        <span v-for="lib in libs" :key="lib"
              class="inline-block px-2 py-0.5 border border-gray-600 rounded-lg shadow-sm text-sm">
          {{ lib }}
        </span>
      </div>
    </div>

    <h3 class="text-lg font-bold border-b border-gray-400 mt-5 mb-2.5">{{ labels.tools }}</h3>
    <div v-for="(items, category) in tools" :key="category" class="mb-1.5">
      <label class="font-bold block mb-0.5">{{ category }}</label>
      <div class="flex flex-wrap gap-1.5">
        <span v-for="item in items" :key="item"
              class="inline-block px-2 py-0.5 border border-gray-600 rounded-lg shadow-sm text-sm">
          {{ item }}
        </span>
      </div>
    </div>
  </aside>
</template>

<script>
import { Phone, Mail } from '@lucide/vue'
import GithubIcon from './icons/GithubIcon.vue'
import LinkedinIcon from './icons/LinkedinIcon.vue'

export default {
  name: 'Profile',
  components: { Phone, Mail, GithubIcon, LinkedinIcon },
  props: {
    photo: String,
    phone: String,
    email: String,
    github: String,
    linkedin: String,
    programming: Object,
    tools: Object,
    labels: {
      type: Object,
      default: () => ({
        personalInfo: 'Personal Info',
        programming: 'Programming',
        tools: 'Tools',
      }),
    },
  },
  data() {
    return { fullPhoto: false }
  },
  methods: {
    stripProtocol(url) {
      return url.replace(/^https?:\/\//, '')
    },
  },
}
</script>
