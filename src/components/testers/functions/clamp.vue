<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/shared/Tooltip.vue'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'
import { useI18n } from 'vue-i18n'
import { getCoordinateOnAxis } from '@/utils/object'

const codeSnippet = (x, y, symbol) => `.square {
    width: calc(${x} ${symbol} ${y});
}`

export default defineComponent({
    components: {
        BrowserCompatibility,
        Modal,
        RangeSlider,
        Tooltip
    },
    props: {
        title: {
            type: String,
            default: 'Untitled'
        }
    },
    setup() {
        const i18n = useI18n()

        return {
            i18n
        }
    },
    data() {
        return {
            showCodeBlock: false,
            code: codeSnippet('100%', '50px', '-'),
            isCopied: false,
            isMouseDown: false,
            showBrowserCompatibility: false,
            values: {
                maximum: 22,
                medium: 18,
                minimum: 14
            },
            xAxes: {
                start: 0,
                resizeBar: 0
            },
            width: 150,
            fontSize: 22
        }
    },
    watch: {
        width: function (state) {
            this.fontSize = {
                150: this.values.maximum,
                125: this.values.medium,
                100: this.values.minimum
            }[state]
        },
        'values.maximum': function (state) {
            if (this.width >= 125 && this.width <= 150) this.fontSize = state
        },
        'values.medium': function (state) {
            if (this.width >= 100 && this.width <= 125) this.fontSize = state
        },
        'values.minimum': function (state) {
            if (this.width <= 100) this.fontSize = state
        }
    },
    methods: {
        copyCodeSnippetAndNotify,
        getReferenceURL,
        getSupportList,
        handlePointerStart(event) {
            this.isMouseDown = true
            console.log(getCoordinateOnAxis(event, 'x'))
            this.xAxes.start = getCoordinateOnAxis(event, 'x') - this.xAxes.resizeBar
        },
        handlePointerMove(event) {
            if (this.isMouseDown) {
                const distance = getCoordinateOnAxis(event, 'x') - this.xAxes.start
                this.xAxes.resizeBar = Math.max(Math.min(distance, 0), -50)

                this.width = this.xAxes.resizeBar + 150
            }
        },
        handlePointerEnd() {
            this.isMouseDown = false
        }
    },
    mounted() {
        document.addEventListener('mousemove', this.handlePointerMove)
        document.addEventListener('mouseup', this.handlePointerEnd)
        document.addEventListener('touchmove', this.handlePointerMove)
        document.addEventListener('touchend', this.handlePointerEnd)
    },
    unmounted() {
        document.removeEventListener('mousemove', this.handlePointerMove)
        document.removeEventListener('mouseup', this.handlePointerEnd)
        document.removeEventListener('touchmove', this.handlePointerMove)
        document.removeEventListener('touchend', this.handlePointerEnd)
    }
})
</script>

<template>
    <TestContainer>
        <TestHeader>
            <TestTitle>{{ this.title }}</TestTitle>
            <TestButtons title="">
                <Tooltip :value="$t('tip.code')">
                    <TestButton @click="this.showCodeBlock = true">
                        <img src="@/assets/svg/code.svg" alt="code" />
                    </TestButton>
                </Tooltip>
                <Tooltip :value="$t('tip.browser')" @click="this.showBrowserCompatibility = true">
                    <TestButton>
                        <img src="@/assets/svg/information.svg" alt="support" />
                    </TestButton>
                </Tooltip>
            </TestButtons>
        </TestHeader>

        <TestMain>
            <TestOverview :indicator="[$t('preview-indicator.width')]">
                <div class="element-size-area-container">
                    <div class="element-size-area" :style="{ width: `${this.width}px` }">
                        <div v-if="this.isMouseDown">
                            <div
                                :style="{
                                    fontSize: `${this.fontSize}px`,
                                    color: 'var(--color-bright-indigo)',
                                    fontWeight: 'bold'
                                }"
                            >
                                WORD
                            </div>
                        </div>

                        <div v-else>
                            <div
                                :style="{
                                    fontSize: `${this.values.maximum}px`,
                                    color: 'var(--color-bright-indigo)',
                                    fontWeight: 'bold'
                                }"
                            >
                                WORD
                            </div>
                            <div
                                :style="{
                                    fontSize: `${this.values.medium}px`,
                                    color: 'var(--color-bright-indigo)',
                                    fontWeight: 'bold'
                                }"
                            >
                                WORD
                            </div>
                            <div
                                :style="{
                                    fontSize: `${this.values.minimum}px`,
                                    color: 'var(--color-bright-indigo)',
                                    fontWeight: 'bold'
                                }"
                            >
                                WORD
                            </div>
                        </div>
                        <div
                            class="element-size-area-resize-bar"
                            @mousedown="this.handlePointerStart"
                            v-on:touchstart="(event) => this.handlePointerStart(event)"
                        />
                    </div>
                </div>
            </TestOverview>

            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Font-size Property </TestTitle>
                    <TestProperty>
                        font-size:
                        <TestValue
                            >clamp (
                            <span style="color: whitesmoke">
                                {{ this.values.minimum }}px, {{ this.values.medium }}px,
                                {{ this.values.maximum }}px
                            </span>
                            )</TestValue
                        >
                    </TestProperty>
                </TestInformation>

                <TestArea style="gap: 10px; width: max-content">
                    <TestQuantity
                        label="Minimum"
                        :state="this.values.minimum"
                        :mutation="(state) => (this.values.minimum = state)"
                        :max="14"
                    />
                    <TestQuantity
                        label="Medium"
                        :state="this.values.medium"
                        :mutation="(state) => (this.values.medium = state)"
                        :max="18"
                    />
                    <TestQuantity
                        label="Maximum"
                        :state="this.values.maximum"
                        :mutation="(state) => (this.values.maximum = state)"
                        :max="22"
                    />
                </TestArea>
            </TestController>
        </TestMain>

        <TestCodeBlock :value="this.code" v-show="this.showCodeBlock">
            <Tooltip :value="this.isCopied ? $t('tip.copied') : $t('tip.copy')">
                <TestButton @click="copyCodeSnippetAndNotify(this)">
                    <img src="@/assets/svg/copy.svg" alt="copy" />
                </TestButton>
            </Tooltip>
            <Tooltip :value="$t('tip.close')">
                <TestButton @click="this.showCodeBlock = false">
                    <img src="@/assets/svg/close.svg" alt="close" />
                </TestButton>
            </Tooltip>
        </TestCodeBlock>
    </TestContainer>

    <Modal :state="this.showBrowserCompatibility">
        <BrowserCompatibility
            :state="(state) => (this.showBrowserCompatibility = state)"
            :data="getSupportList('types', 'clamp')"
            :reference="getReferenceURL('types', 'clamp')"
        />
    </Modal>
</template>

<style scoped></style>
