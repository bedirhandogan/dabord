<template>
    <div class="value">
        <slot />
    </div>
</template>

<style scoped>
.value {
    padding: 5px 8px;
    background: var(--color-chaos-black-50);
    border: 1px solid var(--color-chaos-black);
    width: max-content;
    border-radius: 5px;
    font-size: 12px;
}
</style>
