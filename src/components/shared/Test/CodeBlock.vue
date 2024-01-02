<script>
export default {
    props: {
        value: {
            type: String
        }
    },
    data() {
        return {
            lineNumbers: [1] // I must give a default value so that the height value can be obtained
        }
    },
    methods: {
        lineCountHandler() {
            this.lineNumbers = Array.from(
                { length: this.value.trim().split('\n').length },
                (_, index) => index + 1
            )
        },
        colorizeCodeBlock() {
            const splitCode = this.value.trim().split('\n')
            const selector = /\.(\S+)\s*{/
            const value = /:(.*?)\s*;/

            /* ----- Selector Colorize ----- */
            splitCode.forEach((codeLine, index) => {
                const matchedSelector = codeLine.match(selector)
                if (matchedSelector) {
                    splitCode[index] = matchedSelector.input.replace(
                        selector,
                        '.<span style="color: #ff3d00;">$1</span> {\n'
                    )
                    return
                }

                const matchedValue = codeLine.match(value)
                if (matchedValue) {
                    splitCode[index] = matchedValue.input.replace(
                        value,
                        ':<span style="color: #7000ff;">$1</span>;\n'
                    )

                    return
                }

                splitCode[index] = `${splitCode[index]}\n`
            })

            this.$refs.code.children[0].innerHTML = '' // clear
            this.$refs.code.children[0].innerHTML = splitCode.join('')
        }
    },
    watch: {
        value: function () {
            this.lineCountHandler()
            this.colorizeCodeBlock()
        }
    },
    mounted() {
        this.lineCountHandler()
        this.colorizeCodeBlock()
    }
}
</script>

<template>
    <div class="code-block">
        <div class="line-numbers">
            <div v-for="number in lineNumbers" :key="number" ref="lineNumber">{{ number }}</div>
        </div>
        <div class="code" ref="code">
            <code></code>
        </div>

        <div class="buttons">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.code-block {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-black-metal-2);
    border-radius: 10px;
    z-index: 2;
    display: flex;
    box-sizing: border-box;
}

.line-numbers {
    color: var(--color-more-than-a-week);
    font-family: var(--font-family-source-code);
    border-right: 1px solid var(--color-dreamless-sleep);
    padding: 17px 20px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 2.3px;
}

.code {
    white-space: pre-wrap;
    line-height: 1.3;
    height: max-content;
    color: #8e8e8e;
    font-size: 14px;
    padding: 15px 10px;
    font-family: var(--font-family-source-code);
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}
</style>
