<template>
    <div class="converted">
        <slot />
    </div>
</template>

<style scoped>
.converted {
    font-size: 14px;
    color: var(--color-cold-grey);
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
}
</style>
