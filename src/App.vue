<template>
  <router-view :key="$route.path" />
</template>

<script setup>
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watchEffect(() => {
  const root = document.documentElement
  root.classList.toggle('is-pdf', !!route.meta.pdf)
  root.lang = route.path.includes('zh-tw') ? 'zh-Hant-TW' : 'en'
})
</script>
