<script>
import { defineComponent } from 'vue'
import Tooltip from '@/components/shared/Tooltip.vue'
import RangeSlider from '@/components/shared/RangeSlider.vue'
import Modal from '@/components/modal/Modal.vue'
import BrowserCompatibility from '@/components/modal/BrowserCompatibility.vue'
import { copyCodeSnippetAndNotify, getReferenceURL, getSupportList } from '@/utils'
import { useI18n } from 'vue-i18n'

const codeSnippet = `p::after {
    content: attr(data-source);
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
            code: codeSnippet,
            isCopied: false,
            showBrowserCompatibility: false,
            propertyValue: 'https://example.com'
        }
    },
    methods: {
        copyCodeSnippetAndNotify,
        getReferenceURL,
        getSupportList,
        changePropertyValue(state) {}
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
            <TestOverview>
                <div class="element-content-area-container">
                    <div class="element">
                        &lt;p data-source="<Tooltip :value="this.propertyValue">
                            <span
                                style="
                                    color: var(--color-more-than-a-week);
                                    cursor: pointer;
                                    max-width: 50px;
                                "
                                class="ellipsis"
                                >{{ this.propertyValue }}
                            </span> </Tooltip
                        >"&gt;
                    </div>
                    <div class="content">
                        <div class="title">Lorem</div>
                        <div class="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed
                            lectus...
                            <span class="ellipsis" v-show="this.propertyValue.length !== 0">{{
                                this.propertyValue
                            }}</span>
                        </div>
                    </div>
                    <div class="element">&lt;&#47;p&gt;</div>
                </div>
            </TestOverview>
            <TestController>
                <TestInformation>
                    <TestTitle style="font-size: 16px"> Pseudo Element </TestTitle>
                    <TestProperty>
                        content:
                        <TestValue
                            >attr ( <span style="color: whitesmoke">data-source</span> )</TestValue
                        >
                    </TestProperty>
                    <TestProperty>
                        data-source:
                        <TestValue style="color: whitesmoke; max-width: 180px" class="ellipsis">
                            {{ this.propertyValue.length === 0 ? 'Null' : this.propertyValue }}
                        </TestValue>
                    </TestProperty>
                </TestInformation>

                <TestArea style="gap: 15px">
                    <TestInput
                        :value="this.propertyValue"
                        @input="(event) => (this.propertyValue = event.target.value)"
                    >
                        <template #icon>
                            <img src="@/assets/svg/link.svg" alt="link" />
                        </template>
                    </TestInput>
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
            :data="getSupportList('types', 'attr')"
            :reference="getReferenceURL('types', 'attr')"
        />
    </Modal>
</template>

<style scoped>
.title {
    font-size: 16px;
}

.paragraph {
    margin-top: 5px;
    font-size: 13px;
    opacity: 0.7;
}

.paragraph span {
    max-width: 200px;
    display: block;
    margin-top: 5px;
    color: var(--color-more-than-a-week);
}

.paragraph span::before,
.paragraph span::after {
    content: "'";
}
</style>
