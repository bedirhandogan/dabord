<script>
import { useLanguageStore } from '@/stores/language'
import Tooltip from '@/components/shared/Tooltip.vue'

export default {
    components: { Tooltip },
    props: {
        state: {
            type: Function
        },
        data: {
            type: Object
        },
        reference: {
            type: String
        }
    },
    setup() {
        const language = useLanguageStore()

        language.setEntity({
            tr: {
                title: 'Tarayıcı Uyumluluğu',
                label_no: 'Yok',
                reference: "MDN'den alıntılanmıştır.",
                tipClose: 'Kapat',
                desktop: 'Masaüstü',
                mobile: 'Mobil'
            },
            en: {
                title: 'Browser Compatibility',
                label_no: 'No',
                reference: 'Referenced from MDN.',
                tipClose: 'Close',
                desktop: 'Desktop',
                mobile: 'Mobile'
            }
        })

        return {
            language
        }
    }
}
</script>

<template>
    <div class="browser-compatibility">
        <div class="header">
            {{ language.translate('title') }}
            <Tooltip :value="language.translate('tipClose')">
                <div class="close" @click="this.state(false)">
                    <img src="@/assets/svg/close.svg" alt="close" />
                </div>
            </Tooltip>
        </div>

        <div class="table">
            <div class="row" style="height: 40px">
                <div class="labels" id="additional-style">
                    <div class="label">{{ language.translate('desktop') }}</div>
                    <div class="label">{{ language.translate('mobile') }}</div>
                </div>
            </div>

            <div class="row" v-for="(browser, name) in data" :key="name">
                <div class="browser">
                    <img :src="'/' + name + '.svg'" :alt="name" />
                    <span>{{ name.replace('_', ' ') }}</span>
                </div>
                <div class="labels">
                    <div class="label">
                        <template v-if="browser.version_desktop === false">
                            <img src="@/assets/svg/x-circle.svg" alt="x-circle" />
                            <span id="no-support"> {{ language.translate('label_no') }} </span>
                        </template>

                        <template v-else-if="!!browser.version_desktop">
                            <img src="@/assets/svg/tick-circle.svg" alt="tick-circle" />
                            <span id="support"> {{ browser.version_desktop }} </span>
                        </template>
                    </div>

                    <div class="label">
                        <template v-if="browser.version_mobile === false">
                            <img src="@/assets/svg/x-circle.svg" alt="x-circle" />
                            <span id="no-support"> {{ language.translate('label_no') }} </span>
                        </template>

                        <template v-else-if="!!browser.version_desktop">
                            <img src="@/assets/svg/tick-circle.svg" alt="tick-circle" />
                            <span id="support"> {{ browser.version_mobile }} </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <a class="reference" :href="this.reference" target="_blank">
            <img src="@/assets/svg/mdn-logo.svg" alt="mdn-logo" />
            {{ language.translate('reference') }}
        </a>
    </div>
</template>

<style scoped>
.browser-compatibility {
    position: relative;
    width: 700px;
    min-height: 400px;
    background-color: var(--color-black-metal);
    border: 1px solid var(--color-eerie-black);
    border-radius: 10px;
    margin: 20px;
}

.header {
    width: 100%;
    height: 55px;
    border-bottom: 1px solid var(--color-eerie-black);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px;
    box-sizing: border-box;
    font-size: 16px;
}

.close {
    --size: 30px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-black-wash);
    border-radius: 5px;
    transition: 200ms background-color;
    cursor: pointer;
}

.close:hover {
    background-color: var(--color-cursed-black);
}

.table {
}

.row {
    height: 55px;
    padding: 0 50px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px dotted var(--color-eerie-black);
}

.row:last-of-type {
    border: unset;
}

.browser {
    color: var(--color-aged-moustache-grey);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: capitalize;
}

.labels {
    width: 300px;
    display: flex;
    align-items: center;
    gap: 150px;
    justify-content: flex-end;
}

.labels#additional-style {
    position: absolute;
    right: 50px;
}

.label {
    display: flex;
    font-size: 14px;
    align-items: center;
    gap: 10px;
    flex: 1;
    width: max-content;
}

#no-support {
    color: var(--color-red);
}

#support {
    color: var(--color-bright-yellow-green);
}

.reference {
    all: unset;
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 10px;
    cursor: pointer;
}

.reference:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
}

@media screen and (max-width: 700px) {
    .browser-compatibility {
        width: 100%;
    }
}

@media screen and (max-width: 650px) {
    .row {
        padding: 0 20px;
    }

    .labels {
        width: 250px;
        gap: 50px;
    }

    .labels#additional-style {
        right: 20px;
    }
}

@media screen and (max-width: 600px) {
    .header {
        font-size: 15px;
    }

    .labels {
        width: 200px;
        gap: 20px;
    }

    .browser span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 50px;
    }
}

@media screen and (max-width: 500px) {
    .row {
        padding-right: 0;
    }

    .labels#additional-style {
        right: 0;
    }

    .browser span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 30px;
    }

    .label img {
        --size: 18px;
        width: var(--size);
        height: var(--size);
    }
}
</style>
