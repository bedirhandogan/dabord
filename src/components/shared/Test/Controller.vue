<template>
    <div class="controller-container">
        <slot />
    </div>
</template>

<style scoped>
.controller-container {
    height: 100%;
    width: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 30px;
}
</style>
