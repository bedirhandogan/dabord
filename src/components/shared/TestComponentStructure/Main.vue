<template>
    <div class="main">
        <slot />
    </div>
</template>

<style scoped>
.main {
    height: calc(100% - 50px);
    display: flex;
}
</style>
