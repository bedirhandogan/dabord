<script>
import { useModal } from '@/stores/modal'

export default {
    setup() {
        const modal = useModal()

        return {
            modal
        }
    }
}
</script>

<template>
    <div
        class="modal-container"
        v-show="
            modal.data &&
            typeof modal.data === 'object' &&
            Object.values(modal.data || {}).includes(true)
        "
    >
        <slot />
    </div>
</template>

<style scoped>
.modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-black-metal-95);
    width: 100%;
    height: 100vh;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
