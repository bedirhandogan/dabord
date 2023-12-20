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

const codeSnippet = (value) => `.octagon {
    transform: rotate(abs(${value}deg));
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
            code: codeSnippet(-35),
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
                ...Array.from({ length: 50 }, (_, index) => -index - 1).reverse(),
                0,
                ...Array.from({ length: 50 }, (_, index) => index + 1)
            ]

            this.propertyValue = integers[state]
            this.code = codeSnippet(integers[state])
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
                            transform: `rotate(${Math.abs(this.propertyValue)}deg)`
                        }"
                        Test
                    />
                </div>
            </TestOverview>
            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Transform Property </TestTitle>
                    <TestProperty>
                        transform:
                        <TestValue
                            >rotate ( abs (
                            <span style="color: whitesmoke">{{ this.propertyValue }}deg</span> )
                            )</TestValue
                        >
                    </TestProperty>
                    <TestConverted v-if="language.data.selected === 'en'">
                        value converted from
                        <TestValue style="padding: 5px; color: whitesmoke"
                            >{{ this.propertyValue }}°</TestValue
                        >
                        to
                        <TestValue style="padding: 5px; color: whitesmoke"
                            >{{ Math.abs(this.propertyValue) }}°</TestValue
                        >
                    </TestConverted>
                    <TestConverted v-else-if="language.data.selected === 'tr'">
                        değer
                        <TestValue style="padding: 5px; color: whitesmoke"
                            >{{ this.propertyValue }}°</TestValue
                        >'den
                        <TestValue style="padding: 5px; color: whitesmoke"
                            >{{ Math.abs(this.propertyValue) }}°</TestValue
                        >'e dönüştürüldü
                    </TestConverted>
                </TestInformation>

                <TestArea>
                    <RangeSlider
                        default-value="15"
                        style="width: 100%"
                        :value="(state) => changePropertyValue(state)"
                    />
                    <TestIndicator :value="['-', '0', '+']" style="margin-top: 10px" />
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
            :data="getSupportList('types', 'abs')"
            :reference="getReferenceURL('types', 'abs')"
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
