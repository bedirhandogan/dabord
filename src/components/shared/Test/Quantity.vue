<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        state: {
            type: Number,
            default: 0
        },
        mutation: {
            type: Function
        },
        max: {
            type: Number,
            default: 100
        }
    },
    methods: {
        increase() {
            if (this.state !== 0) {
                this.mutation(this.state - 1)
            }
        },
        decrease() {
            if (this.state < this.max) {
                this.mutation(this.state + 1)
            }
        },
        handleInputChange(event) {
            if (event.target.value >= this.max) {
                this.mutation(this.max)
                return
            }

            if (event.target.value.length !== 0) {
                this.mutation(parseInt(event.target.value, 10))
                return
            }

            this.mutation(0)
        },
        handleKeyDown(event) {
            if (this.state.toString().length === this.max.toString().length) {
                if (event.key >= '0' && event.key <= '9') {
                    event.preventDefault()
                }
            }
        }
    }
}
</script>

<template>
    <div class="quantity-container">
        <div v-show="this.label.length !== 0">{{ this.label }}:</div>
        <div class="quantity">
            <div class="increase" :class="0 === state && 'disabled'" @click="this.increase">−</div>
            <input
                :value="this.state.toString()"
                type="number"
                min="0"
                :max="this.max"
                @input="this.handleInputChange"
                @keydown="this.handleKeyDown"
            />
            <div class="decrease" :class="this.max === state && 'disabled'" @click="this.decrease">
                +
            </div>
        </div>
    </div>
</template>

<style scoped>
.quantity-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    font-size: 14px;
}

.quantity {
    position: relative;
    width: 150px;
    height: 35px;
    border: 1px solid var(--color-chaos-black);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}

.quantity input {
    all: unset;
    width: 50px;
    font-size: 12px;
    color: var(--color-cold-grey);
    text-align: center;
}

/* Chrome, Safari, Edge, Opera */
.quantity input::-webkit-outer-spin-button,
.quantity input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
.quantity input[type='number'] {
    -moz-appearance: textfield;
}

.increase,
.decrease {
    width: 35px;
    height: 100%;
    transition: all 200ms;

    color: var(--color-more-than-a-week);
    font-size: 14px;
    user-select: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.increase {
    border-right: 1px solid var(--color-chaos-black);
}

.decrease {
    border-left: 1px solid var(--color-chaos-black);
}

.increase:hover,
.decrease:hover {
    color: var(--color-titanium-white);
    background-color: var(--color-raven);
}

.increase.disabled,
.decrease.disabled {
    opacity: 0.5;
    cursor: default;
}

.increase.disabled:hover,
.decrease.disabled:hover {
    color: var(--color-more-than-a-week);
    background-color: transparent;
}
</style>
