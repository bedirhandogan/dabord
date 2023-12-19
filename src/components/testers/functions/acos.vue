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
    Property,
    Indicator,
    Area,
    Converted,
    Value
} from '@/components/shared/TestComponentStructure'
import Tooltip from '@/components/shared/Tooltip.vue'
import { useLanguageStore } from '@/stores/language'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'

const codeSnippet = (value) => `.octagon {
    transform: rotate(acos(${value}));
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
            code: codeSnippet(-0.5),
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
    },
    mounted() {
        console.log()
    }
})
</script>

<template>
    <Container>
        <Header>
            <Title>{{ this.title }}</Title>
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
                            transform: `rotate(${
                                (Math.acos(this.propertyValue) * 180) / Math.PI
                            }deg)`
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
                            >rotate ( acos (
                            <span style="color: whitesmoke">{{ this.propertyValue }}</span> )
                            )</Value
                        >
                    </Property>
                    <Converted v-if="language.data.selected === 'en'">
                        value converted from
                        <Value style="padding: 5px; color: whitesmoke">{{
                            this.propertyValue
                        }}</Value>
                        to
                        <Value style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round((Math.acos(this.propertyValue) * 180) / Math.PI)
                            }}°</Value
                        >
                    </Converted>
                    <Converted v-else-if="language.data.selected === 'tr'">
                        değer
                        <Value style="padding: 5px; color: whitesmoke">{{
                            this.propertyValue
                        }}</Value
                        >'den
                        <Value style="padding: 5px; color: whitesmoke" id="length-limit"
                            >{{
                                Math.round((Math.acos(this.propertyValue) * 180) / Math.PI)
                            }}°</Value
                        >'e dönüştürüldü
                    </Converted>
                </Information>

                <Area>
                    <RangeSlider
                        default-value="25"
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
                <Button @click="copyCodeSnippetAndNotify(this)">
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

    <Modal :state="this.showBrowserCompatibility">
        <BrowserCompatibility
            :state="(state) => (this.showBrowserCompatibility = state)"
            :data="getSupportList('types', 'acos')"
            :reference="getReferenceURL('types', 'acos')"
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
