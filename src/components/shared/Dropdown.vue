<script>
import { useLanguageStore } from '@/stores/language'

export default {
    setup() {
        const language = useLanguageStore()

        return {
            language
        }
    },
    props: {
        mutation: {
            type: Function
        },
        state: {
            type: String
        },
        data: {
            type: [Array, Object]
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        toggleSelectorBox(event) {
            if (!this.$el.contains(event.target)) this.show = false
        }
    },
    mounted() {
        document.addEventListener('click', this.toggleSelectorBox)
    },
    unmounted() {
        document.removeEventListener('click', this.toggleSelectorBox)
    }
}
</script>

<template>
    <div class="dropdown">
        <div
            class="selected"
            @click="
                (event) => {
                    this.show = !this.show
                    if (event.clientX < 150) this.$refs['dropdown-box'].style.left = '0'
                }
            "
        >
            <slot name="selected" />
            <img
                src="@/assets/svg/arrow-down.svg"
                alt="arrow"
                :style="{ transform: `rotate(${this.show ? '180' : '0'}deg)` }"
            />
        </div>
        <div class="box" v-show="this.show" ref="dropdown-box">
            <div
                class="select"
                v-for="item in this.data"
                :class="item === this.state && 'active'"
                @click="
                    () => {
                        this.mutation(item)
                        this.show = false
                    }
                "
            >
                {{ language.translate(item) }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1;
}

.selected {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    padding: 10px;
    border-radius: 8px;
    font-size: 12px;
    user-select: none;
}

.box {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 120px;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    padding: 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.select {
    font-size: 14px;
    width: calc(100% - 20px);
    height: 25px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 5px 10px;
    box-sizing: content-box;
}

.select:is(.active, :hover) {
    background-color: var(--color-black-wash);
}

.selected img {
    width: 14px;
    transition: all 200ms;
}
</style>
