<template>
    <div class="modal-provider">
        <slot />
    </div>
</template>

<style scoped>
.modal-provider {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-black-metal-95);
    width: 100%;
    height: 100vh;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
