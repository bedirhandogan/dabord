import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
    const data = ref({
        selected:
            localStorage.getItem('language') ||
            (() => {
                localStorage.setItem('language', 'en')
                return 'en'
            })(),
        entities: {}
    })

    function setEntity(state) {
        // Loop through each language
        for (const lang in state) {
            // If there is no corresponding language, assign an empty object
            data.value.entities[lang] = data.value.entities[lang] || {}

            // Loop through keys within each language
            for (const key in state[lang]) {
                // If there is no value for a specific key in the language, or if it is empty,
                // assign the value from the state object
                data.value.entities[lang][key] =
                    data.value.entities[lang][key] || `${state[lang][key]}`
            }
        }
    }

    function setLanguage(state) {
        data.value.selected = state
        localStorage.setItem('language', state)
    }

    function translate(entity) {
        return data.value.entities[data.value.selected]?.[entity]
    }

    return { data, setEntity, setLanguage, translate }
})
