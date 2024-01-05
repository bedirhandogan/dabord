<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/shared/Tooltip.vue'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'
import { useI18n } from 'vue-i18n'

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
            showBrowserCompatibility: false,
            fixedValue: '100%',
            propertyValue: 50,
            mathOperation: '-',
            result: 80,
            max: 100
        }
    },
    watch: {
        mathOperation: function (state) {
            const operations = {
                '+': () => {
                    this.fixedValue = '30px'
                    this.propertyValue = 70
                    this.max = 100
                },
                '-': () => {
                    this.fixedValue = '100%'
                    this.propertyValue = 50
                    this.max = 100
                },
                '*': () => {
                    this.fixedValue = '13px'
                    this.propertyValue = 5
                    this.max = 10
                },
                '/': () => {
                    this.fixedValue = '130px'
                    this.propertyValue = 3
                    this.max = 10
                }
            }

            operations[state]()
        },
        propertyValue: function (state) {
            const unit = this.mathOperation !== '/' && this.mathOperation !== '*' ? 'px' : ''
            this.code = codeSnippet(this.fixedValue, state + unit, this.mathOperation)
            this.computeWidth(state)
        }
    },
    methods: {
        copyCodeSnippetAndNotify,
        getReferenceURL,
        getSupportList,
        computeWidth(value) {
            const operations = {
                '+': (value) => {
                    return 30 + value
                },
                '-': (value) => {
                    return 130 - value
                },
                '*': (value) => {
                    return 13 * value
                },
                '/': (value) => 130 / value
            }

            this.result = operations[this.mathOperation](value)
        },
        getDisplayValue() {
            const unit = this.mathOperation !== '/' && this.mathOperation !== '*' ? 'px' : ''
            return this.mathOperation + ' ' + this.propertyValue + unit
        },
        getDisplayConvertedValue() {
            const unit = this.mathOperation === '-' && this.propertyValue === 0 ? '' : 'px'
            const value =
                this.propertyValue === 0
                    ? this.fixedValue.replace('px', '')
                    : this.result.toString().slice(0, 4)
            return value + unit
        }
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
            <TestOverview
                :indicator="[$t('preview-indicator.width'), $t('preview-indicator.height'), '', '']"
            >
                <div class="dotted-grid-area">
                    <div class="overview-child-wrapper" ref="overview-child-wrapper">
                        <div class="square" :style="{ width: this.result + 'px' }"></div>
                    </div>
                </div>
            </TestOverview>
            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Width Property </TestTitle>
                    <TestProperty>
                        width:
                        <TestValue
                            >calc ( {{ this.fixedValue }}
                            <span style="color: whitesmoke">
                                {{ this.getDisplayValue() }}
                            </span>
                            )</TestValue
                        >
                    </TestProperty>
                    <TestConverted v-if="this.$i18n.locale === 'en'">
                        the result of
                        <TestValue style="padding: 5px"
                            >{{ this.fixedValue }}
                            <span style="color: whitesmoke">
                                {{ this.getDisplayValue() }}</span
                            ></TestValue
                        >
                        is
                        <TestValue style="padding: 5px; color: whitesmoke">{{
                            this.getDisplayConvertedValue()
                        }}</TestValue>
                    </TestConverted>
                    <TestConverted v-if="this.$i18n.locale === 'tr'">
                        <TestValue style="padding: 5px"
                            >{{ this.fixedValue }}
                            <span style="color: whitesmoke">
                                {{ this.getDisplayValue() }}</span
                            ></TestValue
                        >'in sonucu
                        <TestValue style="padding: 5px; color: whitesmoke">{{
                            this.getDisplayConvertedValue()
                        }}</TestValue>
                    </TestConverted>
                </TestInformation>

                <TestArea style="gap: 15px">
                    <div class="checkboxes">
                        <span>{{ $t('no-group.operators') }}:</span>
                        <Tooltip :value="$t('tip.addition')">
                            <TestCheckbox
                                :selected="this.mathOperation"
                                @click="this.mathOperation = '+'"
                            >
                                +
                            </TestCheckbox>
                        </Tooltip>
                        <Tooltip :value="$t('tip.subtraction')">
                            <TestCheckbox
                                :selected="this.mathOperation"
                                @click="this.mathOperation = '-'"
                            >
                                -
                            </TestCheckbox>
                        </Tooltip>
                        <Tooltip :value="$t('tip.multiplication')">
                            <TestCheckbox
                                :selected="this.mathOperation"
                                @click="this.mathOperation = '*'"
                            >
                                *
                            </TestCheckbox>
                        </Tooltip>
                        <Tooltip :value="$t('tip.division')">
                            <TestCheckbox
                                :selected="this.mathOperation"
                                @click="this.mathOperation = '/'"
                            >
                                /
                            </TestCheckbox>
                        </Tooltip>
                    </div>

                    <TestQuantity
                        :state="this.propertyValue"
                        :mutation="(state) => (this.propertyValue = state)"
                        :max="this.max"
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
            :data="getSupportList('types', 'calc')"
            :reference="getReferenceURL('types', 'calc')"
        />
    </Modal>
</template>

<style scoped>
.checkboxes {
    display: flex;
    gap: 5px;
    align-items: center;
}

.checkboxes span {
    font-size: 14px;
    margin-right: 5px;
}

.overview-child-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
