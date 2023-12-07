<script>
import Search from '@/components/shared/Search.vue'
import { defineComponent } from 'vue'
import { useSearchSuggestion } from '@/stores/searchSuggestion'

export default defineComponent({
    components: { Search },
    setup() {
        const search = useSearchSuggestion()

        return {
            search
        }
    }
})
</script>

<template>
    <div class="search-suggestion">
        <Search
            placeholder="Type to search"
            :shine-line-effect="false"
            style="
                background-color: var(--color-black-metal);
                border-color: var(--color-eerie-black);
            "
        >
            <div class="enter-key">Enter</div>
        </Search>

        <div class="suggestion-container">
            <div class="group">
                <div class="title">At-rules</div>
                <div class="suggestions">
                    <div
                        class="suggestion"
                        v-for="(item, index) in [
                            '@charset',
                            '@color-profile',
                            '@container',
                            '@counter-style',
                            '@font-face',
                            '@font-feature-values',
                            '@font-palette-values',
                            '@import',
                            '@keyframes',
                            '@layer',
                            '@media',
                            '@namespace',
                            '@page',
                            '@property',
                            '@scope',
                            '@starting-style',
                            '@supports'
                        ]"
                        :key="index"
                    >
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <div class="keys">
            <div class="key">
                <div class="item">
                    <img src="@/assets/svg/down-key.svg" alt="down-key" />
                </div>
                <div class="item">
                    <img src="@/assets/svg/up-key.svg" alt="up-key" />
                </div>
                to navigate
            </div>

            <div class="key" @click="search.toggleShow(false)">
                <div class="item">Esc</div>
                to close
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-suggestion {
    width: 700px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.enter-key {
    min-width: 30px;
    width: max-content;
    padding: 0 10px;
    min-height: 28px;
    background-color: var(--color-existential-angst);
    border: 1px solid var(--color-eerie-black);
    color: var(--color-cold-grey);
    border-radius: 5px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    transition: background-color 200ms;
    font-family: var(--font-family-inter);
}

.suggestion-container {
    background-color: var(--color-black-metal);
    border: 1px solid var(--color-eerie-black);
    border-radius: 10px;
    min-height: 300px;
    padding: 15px;
    box-sizing: border-box;
}

.group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.title {
    font-size: 14px;
}

.suggestions {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

.suggestion {
    background-color: var(--color-chaos-black);
    color: var(--color-cold-grey);
    font-size: 12px;
    border-radius: 3px;
    padding: 5px 7px 6px;
    display: flex;
    align-items: center;
    font-family: var(--font-family-inter);
}

.keys {
    display: flex;
    gap: 30px;
    font-size: 13px;
    color: var(--color-cold-grey);
    font-family: var(--font-family-inter);
}

.key {
    display: flex;
    align-items: center;
    gap: 10px;
}

.item {
    min-width: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-existential-angst);
    border: 1px solid var(--color-eerie-black);
    border-radius: 5px;
    padding: 0 8px;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 200ms;
}

:is(.enter-key, .item):hover {
    background-color: var(--color-black-wash);
}
</style>
