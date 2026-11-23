import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/jetbrains-mono'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
