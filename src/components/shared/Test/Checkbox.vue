<script>
export default {
    props: {
        selected: {
            type: String
        }
    },
    data() {
        return {
            children: this.$slots.default()[0].children.trim()
        }
    }
}
</script>

<template>
    <div class="checkbox" :class="this.children === this.selected ? 'selected' : ''">
        <slot />
    </div>
</template>

<style scoped>
.checkbox {
    --size: 25px;
    width: var(--size);
    height: var(--size);
    border: 1px solid var(--color-chaos-black);
    border-radius: 5px;
    font-size: 12px;

    cursor: pointer;
    user-select: none;

    transition: background-color 200ms;

    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox:hover,
.checkbox.selected {
    background-color: var(--color-raven);
}
</style>
