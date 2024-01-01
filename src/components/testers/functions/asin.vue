<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/shared/Tooltip.vue'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'
import { useI18n } from 'vue-i18n'

const codeSnippet = (value) => `.octagon {
    transform: rotate(asin(${value}));
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
            code: codeSnippet(0),
            isCopied: false,
            propertyValue: 0,
            showBrowserCompatibility: false
        }
    },
    methods: {
        copyCodeSnippetAndNotify,
        getReferenceURL,
        getSupportList,
        changePropertyValue(state) {
            const integers = [
                ...Array.from({ length: 10 }, (_, index) => (-index - 1) / 10).reverse(),
                0,
                ...Array.from({ length: 10 }, (_, index) => (index + 1) / 10)
            ]

            // Normalize the slider state value to fit within the range of the 'integers' array indices,
            // ensuring it won't go beyond the bounds. The result is assigned to 'propertyValue'.
            this.propertyValue = integers[Math.round((state / 100) * (integers.length - 1))]
            this.code = codeSnippet(integers[Math.round((state / 100) * (integers.length - 1))])
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
            <!-- clockwise -->
            <TestOverview :indicator="['y', 'x', '-y', '-x']">
                <div class="dotted-grid-area">
                    <div class="overview-child-wrapper">
                        <div
                            class="octagon"
                            :style="{
                                transform: `rotate(${
                                    Math.asin(this.propertyValue) * (180 / Math.PI)
                                }deg)`
                            }"
                        />
                    </div>
                </div>
            </TestOverview>
            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Transform Property </TestTitle>
                    <TestProperty
                        >transform:
                        <TestValue
                            >rotate ( asin (
                            <span style="color: whitesmoke">{{ this.propertyValue }}</span> )
                            )</TestValue
                        >
                    </TestProperty>
                    <TestConverted v-if="this.$i18n.locale === 'en'">
                        value converted from
                        <TestValue style="padding: 5px; color: whitesmoke">{{
                            this.propertyValue
                        }}</TestValue>
                        to
                        <TestValue style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round(Math.asin(this.propertyValue) * (180 / Math.PI))
                            }}°</TestValue
                        >
                    </TestConverted>
                    <TestConverted v-else-if="this.$i18n.locale === 'tr'">
                        değer
                        <TestValue style="padding: 5px; color: whitesmoke">{{
                            this.propertyValue
                        }}</TestValue
                        >'den
                        <TestValue style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round(Math.asin(this.propertyValue) * (180 / Math.PI))
                            }}°</TestValue
                        >'e dönüştürüldü
                    </TestConverted>
                </TestInformation>

                <TestArea>
                    <RangeSlider
                        default-value="50"
                        style="width: 100%"
                        :value="(state) => changePropertyValue(state)"
                    />
                    <TestIndicator :value="['-', '0', '+']" style="margin-top: 10px" />
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
            :data="getSupportList('types', 'asin')"
            :reference="getReferenceURL('types', 'asin')"
        />
    </Modal>
</template>

<style scoped>
.overview-child-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
