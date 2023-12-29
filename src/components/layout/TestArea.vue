<script>
import Search from '@/components/shared/Search.vue'
import { defineComponent, markRaw, shallowRef } from 'vue'
import testers from '../testers'
import Modal from '@/components/modal/Modal.vue'
import SearchSuggestion from '@/components/modal/SearchSuggestion.vue'
import Pagination from '@/components/shared/Pagination.vue'
import Dropdown from '@/components/shared/Dropdown.vue'
import { useI18n } from 'vue-i18n'
import { flatObject, getObjectLength } from '@/utils/object'

export default defineComponent({
    computed: {
        testers() {
            return testers
        }
    },
    components: { Dropdown, Pagination, SearchSuggestion, Modal, Search },
    setup() {
        const i18n = useI18n()

        return {
            i18n
        }
    },
    data() {
        return {
            isMacos: navigator.platform.toUpperCase().indexOf('MAC') >= 0,
            showSearchSuggestion: false,
            tests: markRaw(flatObject(testers)),
            selectedGroup: 'all',
            activePage: 1,
            totalPage: Math.ceil(getObjectLength(flatObject(testers)) / 4),
            searchInputValue: '',
            searchFound: ''
        }
    },
    watch: {
        selectedGroup: function (state) {
            if (state === 'all') {
                this.tests = markRaw(flatObject(testers))
                this.totalPage = Math.ceil(getObjectLength(flatObject(testers)) / 4)
                return
            }

            this.tests = markRaw(testers[state])
            this.totalPage = Math.ceil(getObjectLength(this.tests) / 4)
        }
    },
    methods: {
        shallowRef,
        toggleSearchSuggestion(event) {
            if (event.metaKey || event.ctrlKey) {
                if (event.key === 'k') {
                    event.preventDefault() // to block google shortcuts

                    this.showSearchSuggestion = true
                    return
                }
            }

            if (event.keyCode === 27 && this.showSearchSuggestion) this.showSearchSuggestion = false
        },
        previousPage() {
            this.activePage -= 1
        },
        nextPage() {
            this.activePage = Math.min(this.activePage + 1, this.totalPage)
        },
        groupSelector(name) {
            this.selectedGroup = name
            this.activePage = 1
            this.searchInputValue = ''
            this.searchFound = ''
        },
        filteredTest(event) {
            this.searchInputValue = event.target.value.toLowerCase()

            const sortedTests = Object.keys(this.tests).sort((value) => {
                if (value.includes(this.searchInputValue)) return -1
            })

            this.tests = markRaw(
                sortedTests.reduce((acc, value) => {
                    acc[value] = this.tests[value]
                    return acc
                }, {})
            )

            if (this.searchInputValue.length === 0)
                this.tests = markRaw(
                    this.selectedGroup === 'all' ? flatObject(testers) : testers[this.selectedGroup]
                )

            this.searchFound = Object.keys(this.tests).find((value) =>
                value.includes(this.searchInputValue)
            )
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
        <Search
            :placeholder="$t('search.placeholder')"
            :shine-line-effect="true"
            @input="this.filteredTest"
            :value="this.searchInputValue"
        >
            <div class="hotkey" @click="this.showSearchSuggestion = true">
                <div class="key">{{ isMacos ? '⌘' : 'CTRL' }}</div>
                +
                <div class="key">K</div>
            </div>
        </Search>

        <div class="main">
            <div class="header">
                <div class="title">
                    <div v-show="this.searchFound !== undefined">
                        {{ $t(`css.${this.selectedGroup}`) }}
                    </div>
                    <div v-show="this.searchFound === undefined" class="not-found">
                        {{ i18n.t('search.result', { searchInputValue }) }}
                    </div>
                </div>
                <div class="dropdown-wrapper">
                    <Dropdown
                        :mutation="this.groupSelector"
                        :state="this.selectedGroup"
                        :data="['all', ...Object.keys(testers)]"
                        language-group="css"
                    >
                        <template v-slot:selected>
                            {{ $t(`css.${this.selectedGroup}`) }}
                        </template>
                    </Dropdown>
                </div>
                <div class="groups">
                    <div
                        v-for="name in ['all', ...Object.keys(testers).flatMap((key) => key)]"
                        class="group"
                        :class="this.selectedGroup === name ? 'active' : ''"
                        @click="this.groupSelector(name)"
                    >
                        {{ $t(`css.${name}`) }}
                    </div>
                </div>
            </div>
            <div class="tests">
                <component
                    v-for="name in Object.keys(tests).slice(
                        this.activePage * 4 - 4,
                        this.activePage * 4
                    )"
                    :is="tests[name]"
                    :key="name"
                    :title="name"
                />
            </div>
            <div class="pagination-wrapper" v-show="this.searchInputValue.length === 0">
                <div id="vertical">
                    <Pagination
                        :previous="this.previousPage"
                        :next="this.nextPage"
                        :activePage="this.activePage"
                        :totalPage="this.totalPage"
                    />
                </div>

                <div id="horizontal">
                    <Pagination
                        :previous="this.previousPage"
                        :next="this.nextPage"
                        :activePage="this.activePage"
                        :totalPage="this.totalPage"
                        direction="horizontal"
                    />
                </div>
            </div>
        </div>
    </div>

    <Modal :state="this.showSearchSuggestion">
        <SearchSuggestion :state="(state) => (this.showSearchSuggestion = state)" />
    </Modal>
</template>

<style scoped>
.test-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

.main {
    position: relative;
    display: grid;
    grid-template-columns: 100% max-content;
    grid-template-rows: 40px max-content;

    grid-gap: 10px;
    grid-template-areas:
        'header pagination'
        'tests pagination';
}

.header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.not-found {
    color: var(--color-cold-grey);
}

.dropdown-wrapper {
    display: none;
}

.groups {
    display: flex;
    height: max-content;
    align-items: center;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    font-size: 12px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

.group {
    padding: 10px;
    border-right: 1px solid var(--color-dreamless-sleep);
    transition: all 200ms;
}

.group.active,
.group:hover {
    background-color: var(--color-black-wash);
}

.group:last-of-type {
    border-right: none;
}

.pagination-wrapper {
    grid-area: pagination;
}

.tests {
    grid-area: tests;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
}

.pagination-wrapper #horizontal {
    display: none;
}

.pagination-wrapper #vertical {
    margin-top: 2px;
}

@media (max-width: 1440px) {
    .main {
        grid-template-columns: 100%;
        grid-template-areas:
            'header'
            'tests'
            'pagination';
    }

    .pagination-wrapper #horizontal {
        display: block;
    }

    .pagination-wrapper #vertical {
        display: none;
    }
}

@media screen and (max-width: 900px) {
    .groups {
        display: none;
    }
    .dropdown-wrapper {
        display: flex;
    }
}

@media screen and (max-width: 768px) {
    .tests {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}
</style>
