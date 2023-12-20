<script>
import { defineComponent } from 'vue'
import {
    TestButton,
    TestButtons,
    TestCodeBlock,
    TestController,
    TestHeader,
    TestMain,
    TestOverview,
    TestTitle,
    TestContainer,
    TestInformation,
    TestProperty,
    TestIndicator,
    TestArea,
    TestConverted,
    TestValue
} from '@/components/shared/Test'
import Tooltip from '@/components/shared/Tooltip.vue'
import { useLanguageStore } from '@/stores/language'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'

const codeSnippet = (y, x) => `.octagon {
    transform: rotate(atan2(${y}, ${x}));
}`

export default defineComponent({
    components: {
        BrowserCompatibility,
        Modal,
        TestIndicator,
        RangeSlider,
        TestArea,
        TestConverted,
        TestValue,
        TestProperty,
        TestInformation,
        Tooltip,
        TestCodeBlock,
        TestController,
        TestOverview,
        TestMain,
        TestButtons,
        TestButton,
        TestTitle,
        TestHeader,
        TestContainer
    },
    props: {
        title: {
            type: String,
            default: 'Untitled'
        }
    },
    setup() {
        const language = useLanguageStore()

        return {
            language
        }
    },
    data() {
        return {
            showCodeBlock: false,
            code: codeSnippet(0.5, -0.5),
            isCopied: false,
            propertyValueY: 0,
            propertyValueX: 0,
            showBrowserCompatibility: false
        }
    },
    methods: {
        copyCodeSnippetAndNotify,
        getReferenceURL,
        getSupportList,
        changePropertyValue(state, variable) {
            const integers = [
                ...Array.from({ length: 10 }, (_, index) => (-index - 1) / 10).reverse(),
                0,
                ...Array.from({ length: 10 }, (_, index) => (index + 1) / 10)
            ]

            // Normalize the slider state value to fit within the range of the 'integers' array indices,
            // ensuring it won't go beyond the bounds. The result is assigned to 'propertyValue'.
            const index = Math.round((state / 100) * (integers.length - 1))

            if (variable === 'y') this.propertyValueY = integers[index]
            if (variable === 'x') this.propertyValueX = integers[index]

            this.code = codeSnippet(this.propertyValueY, this.propertyValueX)
        }
    }
})
</script>

<template>
    <TestContainer>
        <TestHeader>
            <TestTitle>{{ this.title }}</TestTitle>
            <TestButtons title="">
                <Tooltip :value="language.translate('tipCode')">
                    <TestButton @click="this.showCodeBlock = true">
                        <img src="@/assets/svg/code.svg" alt="code" />
                    </TestButton>
                </Tooltip>
                <Tooltip
                    :value="language.translate('tipBrowser')"
                    @click="this.showBrowserCompatibility = true"
                >
                    <TestButton>
                        <img src="@/assets/svg/information.svg" alt="support" />
                    </TestButton>
                </Tooltip>
            </TestButtons>
        </TestHeader>

        <TestMain>
            <TestOverview>
                <div class="overview-child-wrapper">
                    <div
                        class="octagon"
                        :style="{
                            transform: `rotate(${Math.round(
                                (Math.atan2(this.propertyValueY, this.propertyValueX) * 180) /
                                    Math.PI
                            )}deg)`
                        }"
                    />
                </div>
            </TestOverview>
            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Transform Property </TestTitle>
                    <TestProperty>
                        transform:
                        <TestValue
                            >rotate ( atan2 (
                            <span style="color: whitesmoke"
                                >{{ this.propertyValueY }}, {{ this.propertyValueX }}</span
                            >
                            ) )</TestValue
                        >
                    </TestProperty>
                    <TestConverted v-if="language.data.selected === 'en'">
                        value converted from
                        <TestValue style="padding: 5px; color: whitesmoke"
                            ><span style="font-family: var(--font-family-source-code)">Y:</span>
                            {{ this.propertyValueY }}, <span style="margin: 0 3px" />
                            <span style="font-family: var(--font-family-source-code)">X:</span>
                            {{ this.propertyValueX }}</TestValue
                        >
                        to
                        <TestValue style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round(
                                    (Math.atan2(this.propertyValueY, this.propertyValueX) * 180) /
                                        Math.PI
                                )
                            }}°</TestValue
                        >
                    </TestConverted>
                    <TestConverted v-else-if="language.data.selected === 'tr'">
                        değer
                        <TestValue style="padding: 5px; color: whitesmoke"
                            ><span style="font-family: var(--font-family-source-code)">Y:</span>
                            {{ this.propertyValueY }}, <span style="margin: 0 3px" />
                            <span style="font-family: var(--font-family-source-code)">X:</span>
                            {{ this.propertyValueX }}</TestValue
                        >
                        'den
                        <TestValue style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round(
                                    (Math.atan2(this.propertyValueY, this.propertyValueX) * 180) /
                                        Math.PI
                                )
                            }}°</TestValue
                        >'e dönüştürüldü
                    </TestConverted>
                </TestInformation>

                <TestArea style="gap: 15px">
                    <div class="range-slider-wrapper">
                        Y:
                        <RangeSlider
                            default-value="75"
                            style="width: 100%"
                            :value="(state) => changePropertyValue(state, 'y')"
                        />
                    </div>
                    <div class="range-slider-wrapper">
                        X:
                        <RangeSlider
                            default-value="25"
                            style="width: 100%"
                            :value="(state) => changePropertyValue(state, 'x')"
                        />
                    </div>
                    <TestIndicator :value="['-', '0', '+']" style="margin-top: -5px" />
                </TestArea>
            </TestController>
        </TestMain>

        <TestCodeBlock :value="this.code" v-show="this.showCodeBlock">
            <Tooltip
                :value="
                    this.isCopied ? language.translate('tipCopied') : language.translate('tipCopy')
                "
            >
                <TestButton @click="copyCodeSnippetAndNotify(this)">
                    <img src="@/assets/svg/copy.svg" alt="copy" />
                </TestButton>
            </Tooltip>
            <Tooltip :value="language.translate('tipClose')">
                <TestButton @click="this.showCodeBlock = false">
                    <img src="@/assets/svg/close.svg" alt="close" />
                </TestButton>
            </Tooltip>
        </TestCodeBlock>
    </TestContainer>

    <Modal :state="this.showBrowserCompatibility">
        <BrowserCompatibility
            :state="(state) => (this.showBrowserCompatibility = state)"
            :data="getSupportList('types', 'atan2')"
            :reference="getReferenceURL('types', 'atan2')"
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

.range-slider-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 13px;
    font-family: var(--font-family-source-code);
    color: var(--color-cold-grey);
}
</style>
