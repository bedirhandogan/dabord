import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n/data.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'tr',
    messages
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.mount('#app')
