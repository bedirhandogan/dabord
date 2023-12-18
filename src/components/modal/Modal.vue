<script>
export default {
    props: {
        state: {
            type: Boolean
        }
    },
    watch: {
        state: function (value) {
            switch (value) {
                case true:
                    document.body.style.overflow = 'hidden'
                    break
                case false:
                    document.body.style.overflow = 'auto'
                    break
            }
        }
    }
}
</script>
<template>
    <div class="modal-container" v-show="this.state">
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
