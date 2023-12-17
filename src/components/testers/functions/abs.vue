<script>
import { defineComponent } from 'vue'
import {
    Button,
    Buttons,
    CodeBlock,
    Controller,
    Header,
    Main,
    Overview,
    Title,
    Container,
    Information,
    Property
} from '@/components/shared/TestComponentStructure'
import Tooltip from '@/components/shared/Tooltip.vue'
import { useLanguageStore } from '@/stores/language'
import Value from '@/components/shared/TestComponentStructure/Value.vue'
import Converted from '@/components/shared/TestComponentStructure/Converted.vue'
import Area from '@/components/shared/TestComponentStructure/Area.vue'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Indicator from '@/components/shared/TestComponentStructure/Indicator.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { getReferenceURL, getSupportList } from '@/utils'

const codeSnippet = (value) => `.octagon {
    transform: rotate(abs(${value}deg));
}`

export default defineComponent({
    components: {
        BrowserCompatibility,
        Modal,
        Indicator,
        RangeSlider,
        Area,
        Converted,
        Value,
        Property,
        Information,
        Tooltip,
        CodeBlock,
        Controller,
        Overview,
        Main,
        Buttons,
        Button,
        Title,
        Header,
        Container
    },
    setup() {
        const language = useLanguageStore()

        language.setEntity({
            tr: {
                tipCode: 'Kaynak Kodu',
                tipBrowser: 'Tarayıcı Uyumluluğu',
                tipCopy: 'Kopyala',
                tipCopied: 'Kopyalandı',
                tipClose: 'Kapat'
            },
            en: {
                tipCode: 'Source Code',
                tipBrowser: 'Browser Compatibility',
                tipCopy: 'Copy',
                tipCopied: 'Copied',
                tipClose: 'Close'
            }
        })

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
        getReferenceURL,
        getSupportList,
        copyCodeSnippet() {
            this.isCopied = true
            navigator.clipboard.writeText(this.code)

            setTimeout(() => (this.isCopied = false), 500)
        },
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
    <Container>
        <Header>
            <Title>Abs()</Title>
            <Buttons title="">
                <Tooltip :value="language.translate('tipCode')">
                    <Button @click="this.showCodeBlock = true">
                        <img src="@/assets/svg/code.svg" alt="code" />
                    </Button>
                </Tooltip>
                <Tooltip
                    :value="language.translate('tipBrowser')"
                    @click="this.showBrowserCompatibility = true"
                >
                    <Button>
                        <img src="@/assets/svg/information.svg" alt="support" />
                    </Button>
                </Tooltip>
            </Buttons>
        </Header>

        <Main>
            <Overview>
                <div class="overview-child-wrapper">
                    <div
                        class="octagon"
                        :style="{
                            transform: `rotate(${Math.abs(this.propertyValue)}deg)`
                        }"
                    />
                </div>
            </Overview>
            <Controller>
                <Information>
                    <Title style="font-size: 16px"> Transform Property </Title>
                    <Property>
                        transform:
                        <Value
                            >rotate ( abs(
                            <span style="color: whitesmoke">{{ this.propertyValue }}deg</span> )
                            )</Value
                        >
                    </Property>
                    <Converted v-if="language.data.selected === 'en'">
                        value converted from
                        <Value style="padding: 5px; color: whitesmoke"
                            >{{ this.propertyValue }}°</Value
                        >
                        to
                        <Value style="padding: 5px; color: whitesmoke"
                            >{{ Math.abs(this.propertyValue) }}°</Value
                        >
                    </Converted>
                    <Converted v-else-if="language.data.selected === 'tr'">
                        değer
                        <Value style="padding: 5px; color: whitesmoke"
                            >{{ this.propertyValue }}°</Value
                        >'den
                        <Value style="padding: 5px; color: whitesmoke"
                            >{{ Math.abs(this.propertyValue) }}°</Value
                        >'e dönüştürüldü
                    </Converted>
                </Information>

                <Area>
                    <RangeSlider
                        default-value="15"
                        style="width: 100%"
                        :value="(state) => changePropertyValue(state)"
                    />
                    <Indicator :value="['-', '0', '+']" style="margin-top: 10px" />
                </Area>
            </Controller>
        </Main>

        <CodeBlock :value="this.code" v-show="this.showCodeBlock">
            <Tooltip
                :value="
                    this.isCopied ? language.translate('tipCopied') : language.translate('tipCopy')
                "
            >
                <Button @click="this.copyCodeSnippet">
                    <img src="@/assets/svg/copy.svg" alt="copy" />
                </Button>
            </Tooltip>
            <Tooltip :value="language.translate('tipClose')">
                <Button @click="this.showCodeBlock = false">
                    <img src="@/assets/svg/close.svg" alt="close" />
                </Button>
            </Tooltip>
        </CodeBlock>
    </Container>

    <Modal v-show="this.showBrowserCompatibility">
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
.octagon {
    background: linear-gradient(#7000ff, #cc00ff);
    width: 80px;
    height: 80px;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
</style>