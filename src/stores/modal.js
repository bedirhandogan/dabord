import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModal = defineStore('modal', () => {
    const data = ref({
        showSearchSuggestion: false,
        showBrowserCompatibility: false
    })

    function mutation(key, value) {
        if (Object.keys(data.value).includes(key)) {
            data.value[key] = value
        }

        if (value) {
            document.body.style.overflow = 'hidden'
            return
        }

        document.body.style.overflow = 'auto'
    }

    return { data, mutation }
})
