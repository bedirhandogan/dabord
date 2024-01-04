<script>
import { defineComponent } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Introduction from '@/components/layout/Introduction.vue'
import TestArea from '@/components/layout/TestArea.vue'
import Loader from '@/components/shared/Loader.vue'

export default defineComponent({
    components: { Loader, TestArea, Introduction, Navbar },
    data() {
        return {
            isLoading: true
        }
    },
    mounted() {
        document.body.style.overflow = 'hidden'

        this.$i18n.locale =
            localStorage.getItem('language') ||
            (() => {
                localStorage.setItem('language', 'en')
                return 'en'
            })()

        const stopLoader = () =>
            setTimeout(() => {
                this.isLoading = false
                document.body.style.overflow = 'auto'
            }, 500) // for a margin of error of half a second

        if (process.env.NODE_ENV === 'development') {
            stopLoader()
            return
        }

        window.onload = stopLoader
    }
})
</script>

<template>
    <Loader v-show="this.isLoading" />

    <!--    Background Objects    -->
    <div class="grid-layer" />
    <div class="radial-layer" />

    <!--    App    -->
    <div id="app">
        <Navbar />
        <Introduction />
        <TestArea />
    </div>
</template>

<style scoped>
#app {
    position: relative;
    margin: 0 auto;
    width: 1240px;
    height: max-content;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

@media screen and (max-width: 1440px) {
    #app {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    #app {
        padding: 0 20px 20px;
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
