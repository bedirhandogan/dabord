<script>
import RangeSlider from '@/components/shared/RangeSlider.vue'
import testers from '@/components/testers'
import { flatObject, getObjectLength } from '@/utils'
import { useI18n } from 'vue-i18n'

export default {
    computed: {
        testers() {
            return testers
        }
    },
    components: { RangeSlider },
    setup() {
        const i18n = useI18n()

        return {
            i18n
        }
    },
    data() {
        return {
            horizontalValue: 0,
            verticalValue: 0,
            boxCoordinate: {
                x: 0,
                y: 0
            },
            star_count: 0
        }
    },
    watch: {
        horizontalValue() {
            // I subtract the width of the box from the width of the grid-pattern element,
            // then I take one percent, multiply it by the horizontal value and calculate the x coordinate.
            // ((area width - box width) * (1 / 100)) * value
            const horizontalOffset =
                (this.$refs['grid-pattern'].clientWidth - this.$refs['box2'].clientWidth) *
                (1 / 100) *
                this.horizontalValue

            const half =
                (this.$refs['grid-pattern'].clientWidth - this.$refs['box2'].clientWidth) / 2

            const integers = [
                ...Array.from({ length: Math.round(half) }, (_, index) => -index + 1).reverse(),
                0,
                ...Array.from({ length: Math.round(half) }, (_, index) => index + 1)
            ]

            this.boxCoordinate.x = integers[Math.round(horizontalOffset)]
        },
        verticalValue() {
            // I subtract the height of the box from the height of the grid-pattern element,
            // then I take one percent, multiply it by the vertical value and calculate the y coordinate.
            // ((area height - box height) * (1 / 100)) * value
            const verticalOffset =
                (this.$refs['grid-pattern'].clientHeight - this.$refs['box2'].clientHeight) *
                (1 / 100) *
                this.verticalValue

            const half =
                (this.$refs['grid-pattern'].clientHeight - this.$refs['box2'].clientHeight) / 2

            const integers = [
                ...Array.from({ length: Math.round(half) }, (_, index) => -index + 1).reverse(),
                0,
                ...Array.from({ length: Math.round(half) }, (_, index) => index + 1)
            ]

            this.boxCoordinate.y = integers[Math.round(verticalOffset)]
        }
    },
    async created() {
        const stars = await fetch(
            'https://api.github.com/repos/bedirhandogan/dabord/stargazers'
        ).then((res) => res.json())

        if (stars.message !== 'Not Found') {
            this.star_count = stars.length
        }
    },
    methods: { flatObject, getObjectLength }
}
</script>

<template>
    <div class="introduction">
        <div class="information">
            <div class="star">
                <img src="@/assets/svg/star.svg" alt="star" />
                {{ this.star_count }}
            </div>

            <p class="paragraph">{{ i18n.t('introduction.paragraph') }}</p>
            <div class="subtext">
                <div class="text" v-for="(component, name) in testers">
                    {{ name }} <span>({{ getObjectLength(component) }})</span>
                </div>
            </div>
        </div>
        <div class="demo">
            <div style="display: flex; flex-direction: column; gap: 25px">
                <div class="striped-pattern">
                    <div class="polka-pattern" ref="grid-pattern">
                        <div class="box" />
                        <div
                            class="box"
                            :style="{
                                top: this.boxCoordinate.y + 'px',
                                left: this.boxCoordinate.x + 'px'
                            }"
                            ref="box2"
                        />
                        <div class="box" />
                    </div>
                </div>
                <RangeSlider
                    orientation="horizontal"
                    style="width: 250px"
                    default-value="50"
                    :value="(value) => (this.horizontalValue = value)"
                />
            </div>
            <RangeSlider
                orientation="vertical"
                style="height: 250px"
                default-value="50"
                :value="(value) => (this.verticalValue = value)"
            />
        </div>
    </div>
</template>

<style scoped>
/* ----- Introduction ----- */
.introduction {
    width: 100%;
    height: 350px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ----- Information ----- */
.information {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 0;
}

.paragraph {
    font-size: 35px;
    font-weight: 900;
    max-width: 450px;
    background: linear-gradient(90deg, #e2e2e2 0%, #777 100%);
    font-family: var(--font-family-inter);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
}

.star {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-family-inter);
    font-size: 12px;
}

.subtext {
    font-size: 12px;
    font-family: var(--font-family-inter);
    color: var(--color-more-than-a-week);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    text-transform: capitalize;
}

.text::after {
    content: ' · ';
}

.text:last-of-type::after {
    content: '';
}

.subtext span {
    opacity: 0.7;
    font-family: var(--font-family-source-code);
}

/* ----- Demo ----- */
.demo {
    position: relative;
    display: flex;
    gap: 25px;
}

.striped-pattern {
    width: 250px;
    height: 250px;
    border: 1px solid var(--color-dreamless-sleep);
    background: repeating-linear-gradient(
        -45deg,
        var(--color-dreamless-sleep),
        var(--color-dreamless-sleep) 1px,
        var(--color-black-metal) 1px,
        var(--color-black-metal) 20px
    );
    display: flex;
    align-items: center;
    justify-content: center;
}

.polka-pattern {
    position: relative;
    width: 146px;
    height: 146px;
    outline: 2px solid var(--color-dreamless-sleep);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    background-image: radial-gradient(
        var(--color-dreamless-sleep) 1px,
        var(--color-black-metal) 1px
    );
    background-size: calc(146px / 10) calc(146px / 10);
    overflow: hidden;
}

.box {
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-bright-indigo);
    filter: grayscale(40%);
    box-sizing: border-box;
}

.box:nth-of-type(2) {
    position: relative;
    background-color: var(--color-bright-indigo);
    filter: unset;
    z-index: 1;
}

@media screen and (max-width: 900px) {
    .demo {
        display: none;
    }

    .paragraph {
        max-width: 100%;
    }
}

@media screen and (max-width: 425px) {
    .paragraph {
        font-size: 25px;
    }

    .subtext {
        font-size: 10px;
    }
}
</style>
