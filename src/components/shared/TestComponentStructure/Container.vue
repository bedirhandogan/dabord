<template>
    <div class="test-container">
        <slot />
    </div>
</template>

<style scoped>
.test-container {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    border-radius: 10px;
    box-sizing: border-box;
}
</style>
