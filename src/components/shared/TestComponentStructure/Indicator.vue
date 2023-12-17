<script>
export default {
    props: {
        value: {
            type: Array,
            default: []
        }
    }
}
</script>

<template>
    <div class="indicator">
        <span v-for="item in this.value" :key="item">{{ item }}</span>
    </div>
</template>

<style scoped>
.indicator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    color: var(--color-cold-grey);
}
</style>
