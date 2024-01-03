<script>
export default {
    props: {
        indicator: {
            type: Array,
            default: null
        }
    }
}
</script>

<template>
    <div class="overview-container">
        <div class="indicator" :style="{ display: this.indicator === null ? 'block' : 'grid' }">
            <div
                class="element"
                v-for="(item, index) in this.indicator"
                :key="item"
                :class="(index === 1 || index === 3) && item.length > 2 ? 'vertical' : ''"
            >
                <span>{{ item }}</span>
            </div>

            <slot />
        </div>
    </div>
</template>

<style scoped>
.overview-container {
    width: max-content;
    height: 100%;
    border-right: 1px solid var(--color-dreamless-sleep);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
}

.indicator {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 15px max-content 15px;
    grid-template-rows: 15px max-content 15px;

    grid-template-areas:
        '.... top ....'
        'left overview right'
        '.... bottom ....';
}

.element {
    min-width: max-content;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--font-family-inter);
    text-transform: uppercase;
    font-size: 12px;
    color: var(--color-more-than-a-week);
}

.element:nth-of-type(1) {
    grid-area: top;
}

.element:nth-of-type(2) {
    grid-area: right;
}

.element:nth-of-type(3) {
    grid-area: bottom;
}

.element:nth-of-type(2).vertical {
    position: relative;
}

.element:nth-of-type(4).vertical {
    position: relative;
}

.element:nth-of-type(2).vertical span {
    position: absolute;
    left: 8px;
    transform-origin: 0 0;
    transform: rotate(90deg) translate(-50%, -50%);
}

.element:nth-of-type(4) {
    grid-area: left;
}

.element:nth-of-type(4).vertical span {
    position: absolute;
    left: 9px;
    transform-origin: 0 0;
    transform: rotate(-90deg) translate(-50%, -50%);
}

@media screen and (max-width: 768px) {
    .overview-container {
        border-right: none;
        border-bottom: 1px solid var(--color-dreamless-sleep);
        width: 100%;
    }
}
</style>
