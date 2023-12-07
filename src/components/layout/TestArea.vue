<script>
import Search from '@/components/shared/Search.vue'
import { defineComponent } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useSearchSuggestion } from '@/stores/searchSuggestion'

export default defineComponent({
    components: { Search },
    setup() {
        const search = useSearchSuggestion()
        const language = useLanguageStore()
        language.setEntity({
            tr: {
                placeholder: 'Aramak için yazın'
            },
            en: {
                placeholder: 'Type to search'
            }
        })

        return {
            language,
            search
        }
    },
    data() {
        return {
            isMacos: navigator.platform.toUpperCase().indexOf('MAC') >= 0
        }
    },
    methods: {
        toggleSearchSuggestion(event) {
            const search = useSearchSuggestion() // to prevent reference confusion

            if (event.metaKey || event.ctrlKey) {
                event.preventDefault() // to block google shortcuts

                if (event.key === 'k') {
                    search.toggleShow(true)
                    return
                }
            }

            if (event.keyCode === 27) search.toggleShow(false) // esc
        }
    },
    mounted() {
        window.addEventListener('keydown', this.toggleSearchSuggestion)
    },
    unmounted() {
        window.removeEventListener('keydown', this.toggleSearchSuggestion)
    }
})
</script>
<template>
    <div class="test-area">
        <Search :placeholder="language.translate('placeholder')" :shine-line-effect="true">
            <div class="hotkey" @click="search.toggleShow(true)">
                <div class="key">{{ isMacos ? '⌘' : 'CTRL' }}</div>
                +
                <div class="key">K</div>
            </div>
        </Search>
    </div>
</template>

<style scoped>
.test-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.hotkey {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-family-inter);
    font-size: 13px;
    color: var(--color-cold-grey);
    user-select: none;
    cursor: pointer;
}

.key {
    min-width: 30px;
    width: max-content;
    min-height: 30px;
    padding: 5px 8px;
    background-color: var(--color-raven);
    border: 1px solid var(--color-dreamless-sleep);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-titanium-white);
    text-transform: uppercase;
    box-sizing: border-box;
    transition: background-color 200ms;
}

.hotkey:hover > .key {
    background-color: var(--color-chaos-black);
    border: 1px solid var(--color-thamar-black);
}
</style>
