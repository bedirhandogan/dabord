<template>
    <div class="button">
        <slot />
    </div>
</template>

<style scoped>
.button {
    min-height: 30px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-black-wash);
    border-radius: 5px;
    transition: background-color 200ms;
    cursor: pointer;
}

.button:hover {
    background-color: var(--color-cursed-black);
}
</style>
