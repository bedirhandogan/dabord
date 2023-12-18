<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        shineLineEffect: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <div class="search">
        <div class="shine-line" :style="{ borderImage: !this.shineLineEffect && 'unset' }">
            <div class="input-wrapper">
                <img src="@/assets/svg/search.svg" alt="search" />
                <input type="text" :placeholder="this.placeholder" />
            </div>

            <div class="button-wrapper">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.search {
    width: 100%;
    height: 60px;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    border-radius: 10px;
    padding: 0 15px;
    box-sizing: border-box;
}

.shine-line {
    width: 100%;
    height: 100%;
    border-image: linear-gradient(
            to right,
            transparent,
            transparent,
            #626262,
            transparent,
            transparent
        )
        30 / 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(100% / 3.5);
}

.input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

input[type='text'] {
    all: unset;
    color: var(--color-titanium-white);
    font-size: 15px;
    width: 100%;
}

input[type='text']::placeholder {
    color: var(--color-titanium-white);
}

@media screen and (max-width: 768px) {
    .button-wrapper {
        display: none;
    }
}

@media screen and (max-width: 425px) {
    .shine-line {
        border-image: linear-gradient(
                to right,
                transparent,
                transparent,
                transparent,
                #626262,
                transparent,
                transparent,
                transparent
            )
            30 / 1px;
    }
}
</style>
