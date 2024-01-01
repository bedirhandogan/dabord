import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n/data.json'
import {
    TestArea,
    TestButton,
    TestButtons,
    TestCodeBlock,
    TestContainer,
    TestController,
    TestConverted,
    TestHeader,
    TestIndicator,
    TestInformation,
    TestMain,
    TestOverview,
    TestProperty,
    TestTitle,
    TestValue
} from '@/components/shared/Test'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'tr',
    messages
})

const app = createApp(App)

// define components
app.component('TestButton', TestButton)
app.component('TestButtons', TestButtons)
app.component('TestCodeBlock', TestCodeBlock)
app.component('TestController', TestController)
app.component('TestHeader', TestHeader)
app.component('TestMain', TestMain)
app.component('TestOverview', TestOverview)
app.component('TestTitle', TestTitle)
app.component('TestContainer', TestContainer)
app.component('TestInformation', TestInformation)
app.component('TestProperty', TestProperty)
app.component('TestIndicator', TestIndicator)
app.component('TestArea', TestArea)
app.component('TestConverted', TestConverted)
app.component('TestValue', TestValue)

app.use(i18n)
app.use(createPinia())
app.mount('#app')
