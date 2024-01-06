<script>
export default {
    props: {
        orientation: {
            type: String,
            default: 'horizontal'
        },
        defaultValue: {
            type: String,
            default: 0
        },
        value: {
            type: Function
        }
    },
    data() {
        return {
            isDragging: false,
            startX: 0,
            circleX: 0,
            startY: 0,
            circleY: 0
        }
    },
    methods: {
        clientCoordinateMatcher(event, direction, device) {
            switch (true) {
                case device === 'desktop' && direction === 'y':
                    return event.clientY
                case device === 'desktop' && direction === 'x':
                    return event.clientX
                case device === 'mobile' && direction === 'y':
                    return event.touches[0].clientY
                case device === 'mobile' && direction === 'x':
                    return event.touches[0].clientX
            }
        },
        handlePointerStart(event, device) {
            event.preventDefault()
            this.isDragging = true

            /* ----- Vertical ----- */
            if (this.orientation === 'vertical') {
                this.startY = this.clientCoordinateMatcher(event, 'y', device) - this.circleY
                return
            }

            /* ----- Horizontal ----- */
            this.startX = this.clientCoordinateMatcher(event, 'x', device) - this.circleX
        },
        handlePointerMove(event, device) {
            if (this.isDragging) {
                /* ----- Vertical ----- */
                if (this.orientation === 'vertical') {
                    this.circleY = Math.min(
                        Math.max(0, this.clientCoordinateMatcher(event, 'y', device) - this.startY),
                        this.$refs['range-slider'].clientHeight
                    )
                    this.value(
                        Math.round((this.circleY / this.$refs['range-slider'].clientHeight) * 100)
                    )
                    return
                }

                /* ----- Horizontal ----- */
                this.circleX = Math.min(
                    Math.max(0, this.clientCoordinateMatcher(event, 'x', device) - this.startX),
                    this.$refs['range-slider'].clientWidth
                )
                this.value(
                    Math.round((this.circleX / this.$refs['range-slider'].clientWidth) * 100)
                )
            }
        },
        handlePointerEnd() {
            this.isDragging = false
        }
    },
    mounted() {
        document.addEventListener('mousemove', (event) => this.handlePointerMove(event, 'desktop'))
        document.addEventListener('mouseup', (event) => this.handlePointerEnd(event, 'desktop'))

        document.addEventListener('touchmove', (event) => this.handlePointerMove(event, 'mobile'))
        document.addEventListener('touchend', (event) => this.handlePointerEnd(event, 'mobile'))

        /* ----- Vertical ----- */
        if (this.orientation === 'vertical') {
            this.circleY = (1 / 100) * this.$refs['range-slider'].clientHeight * this.defaultValue
            this.value(Math.round((this.circleY / this.$refs['range-slider'].clientHeight) * 100))
        }

        /* ----- Horizontal ----- */
        this.circleX = (1 / 100) * this.$refs['range-slider'].clientWidth * this.defaultValue
        this.value(Math.round((this.circleX / this.$refs['range-slider'].clientWidth) * 100))
    },
    unmounted() {
        document.removeEventListener('mousemove', (event) =>
            this.handlePointerMove(event, 'desktop')
        )
        document.removeEventListener('mouseup', (event) => this.handlePointerEnd(event, 'desktop'))

        document.removeEventListener('touchmove', (event) =>
            this.handlePointerMove(event, 'mobile')
        )
        document.removeEventListener('touchend', (event) => this.handlePointerEnd(event, 'mobile'))
    }
}
</script>

<template>
    <div
        class="range-slider"
        :class="orientation"
        @mousedown="(event) => handlePointerStart(event, 'desktop')"
        v-on:touchstart="(event) => handlePointerStart(event, 'mobile')"
        ref="range-slider"
    >
        <div
            class="progress"
            :style="
                this.orientation === 'vertical'
                    ? { height: this.circleY + 5 + 'px' }
                    : { width: this.circleX + 5 + 'px' }
            "
        >
            <div
                class="circle"
                ref="circle"
                :style="
                    this.orientation === 'vertical'
                        ? { top: this.circleY + 'px' }
                        : { left: this.circleX + 'px' }
                "
            />
        </div>
    </div>
</template>

<style scoped>
.range-slider {
    user-select: none;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 3px;
    width: 100px;
    height: 3px;
    background-color: #131313;
}

.range-slider.vertical {
    flex-direction: column;
    width: 3px;
}

.range-slider.vertical > .progress {
    flex-direction: column;
    width: 3px;
}

.progress {
    position: absolute;
    left: 0;
    background-color: var(--color-bright-indigo);
    border-radius: 3px;
    height: 3px;
    display: flex;
    align-items: center;
}

.circle {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: var(--color-bright-indigo);
    align-items: center;
    outline: 2px solid rgba(112, 0, 255, 0.5);
    transition: transform 200ms;
    cursor: pointer;
    flex-shrink: 0;
}

.circle:is(:active, :hover) {
    transform: scale(1.5);
}
</style>
