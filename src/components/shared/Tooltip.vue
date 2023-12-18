<script>
export default {
    props: {
        value: {
            type: String
        },
        spacing: {
            type: String,
            default: '5px'
        }
    }
}
</script>

<template>
    <div class="tooltip">
        <slot />
        <div class="text" :style="{ '--top': this.spacing }">{{ this.value }}</div>
    </div>
</template>

<style scoped>
.tooltip {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
}

.tooltip:hover .text {
    display: flex;
}

.text {
    --top: 5px;
    display: none;
    position: absolute;
    top: calc(100% + var(--top));
    width: max-content;
    font-size: 12px;
    padding: 5px 8px 6px 8px;
    background-color: var(--color-existential-angst);
    border: 1px solid var(--color-eerie-black);
    border-radius: 5px;
    user-select: none;
}
</style>
