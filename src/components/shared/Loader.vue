<template>
    <div class="loader-container">
        <div class="loader">
            <img src="@/assets/svg/LogoParts/Vector-1.svg" alt="vector-1" />
            <img src="@/assets/svg/LogoParts/Vector-2.svg" alt="vector-2" />
            <img src="@/assets/svg/LogoParts/Vector-3.svg" alt="vector-3" />
            <img src="@/assets/svg/LogoParts/Vector-4.svg" alt="vector-4" />
        </div>
    </div>
</template>

<style scoped>
.loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-black-metal);
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    display: flex;
    align-items: center;
}

.loader img {
    height: 50px;
}

.loader img:nth-of-type(1) {
    animation: loader-animation 500ms ease-in-out infinite;
    animation-direction: alternate;
}

.loader img:nth-of-type(2) {
    animation: loader-animation 500ms ease-in-out infinite;
    animation-delay: 100ms;
    animation-direction: alternate;
}

.loader img:nth-of-type(3) {
    animation: loader-animation 500ms ease-in-out infinite;
    animation-delay: 200ms;
    animation-direction: alternate;
}

.loader img:nth-of-type(4) {
    animation: loader-animation 500ms ease-in-out infinite;
    animation-delay: 300ms;
    animation-direction: alternate;
}

@keyframes loader-animation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
