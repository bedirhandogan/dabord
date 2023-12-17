<template>
    <div class="overview-container">
        <div class="axiss">
            <div class="y-axis">
                <div class="axis" data-type="y">y</div>
                <div class="x-axis">
                    <div class="axis" data-type="x">-x</div>
                    <div class="overview">
                        <slot />
                    </div>
                    <div class="axis" data-type="x">x</div>
                </div>
                <div class="axis" data-type="-y">-y</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overview-container {
    width: max-content;
    height: 100%;
    border-right: 1px solid var(--color-dreamless-sleep);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
}

.axiss {
    position: relative;
}

.y-axis {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.x-axis {
    display: flex;
    align-items: center;
    gap: 20px;
}

.axis {
    width: max-content;
    font-family: var(--font-family-inter);
    text-transform: uppercase;
    font-size: 12px;
    color: var(--color-more-than-a-week);
}

.overview {
    --size: 150px;
    height: var(--size);
    width: var(--size);

    outline: 1px solid var(--color-dreamless-sleep);

    background-image: radial-gradient(var(--color-dreamless-sleep) 1px, transparent 1px);
    background-size: calc(var(--size) / 10) calc(var(--size) / 10);
    overflow: hidden;
}
</style>
