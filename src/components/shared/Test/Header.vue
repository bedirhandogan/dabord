<template>
    <div class="header">
        <slot />
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid var(--color-dreamless-sleep);
    padding: 10px 10px 10px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
