import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchSuggestion = defineStore('search-suggestion', () => {
    const data = ref({
        show: false
    })

    function toggleShow(state) {
        data.value.show = state
    }

    return { data, toggleShow }
})
