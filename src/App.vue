<script>
import { defineComponent } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Introduction from '@/components/layout/Introduction.vue'

export default defineComponent({
    components: { Introduction, Navbar }
})
</script>

<template>
    <!--    background objects    -->
    <div class="grid-layer" />
    <div class="radial-layer" />

    <!--    App    -->
    <div id="app">
        <Navbar />
        <Introduction />
    </div>
</template>

<style scoped>
#app {
    position: relative;
    margin: 0 auto;
    width: 1024px;
    height: 100vh;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

@media (max-width: 1024px) {
    #app {
        width: 100%;
    }
}

.grid-layer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 450px;
    background-color: transparent;
    background-image: linear-gradient(var(--color-chaos-black) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-chaos-black) 1px, transparent 1px),
        linear-gradient(var(--color-chaos-black-50) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-chaos-black-50) 1px, transparent 1px);
    background-size:
        150px 150px,
        150px 150px,
        50px 50px,
        50px 50px;
    background-position:
        -1px -1px,
        -1px -1px,
        -1px -1px,
        -1px -1px;
}

.radial-layer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 450px;
    background: radial-gradient(50% 50% at 50% 50%, transparent 0%, var(--color-black-metal) 100%);
}
</style>
