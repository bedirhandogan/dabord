<script>
import Search from '@/components/shared/Search.vue'
import { defineComponent } from 'vue'
import { useLanguageStore } from '@/stores/language'
import testers from '../testers'
import Modal from '@/components/modal/Modal.vue'
import SearchSuggestion from '@/components/modal/SearchSuggestion.vue'

export default defineComponent({
    computed: {
        testers() {
            return testers
        }
    },
    components: { SearchSuggestion, Modal, Search },
    setup() {
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
            language
        }
    },
    data() {
        return {
            isMacos: navigator.platform.toUpperCase().indexOf('MAC') >= 0,
            showSearchSuggestion: false
        }
    },
    methods: {
        toggleSearchSuggestion(event) {
            if (event.metaKey || event.ctrlKey) {
                if (event.key === 'k') {
                    event.preventDefault() // to block google shortcuts

                    this.showSearchSuggestion = true
                    return
                }
            }

            if (event.keyCode === 27 && this.showSearchSuggestion) this.showSearchSuggestion = false
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
            <div class="hotkey" @click="this.showSearchSuggestion = true">
                <div class="key">{{ isMacos ? '⌘' : 'CTRL' }}</div>
                +
                <div class="key">K</div>
            </div>
        </Search>

        <div class="tests">
            <component
                v-for="(tester, name) in testers['functions']"
                :key="name"
                :is="tester"
                :title="name"
            />
        </div>
    </div>

    <Modal v-show="this.showSearchSuggestion">
        <SearchSuggestion :state="(state) => (this.showSearchSuggestion = state)" />
    </Modal>
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

.tests {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
}
</style>
