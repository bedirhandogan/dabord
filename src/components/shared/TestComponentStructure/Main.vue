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

@media screen and (max-width: 768px) {
    .main {
        flex-direction: column;
        gap: 10px;
        padding-bottom: 20px;
    }
}
</style>
