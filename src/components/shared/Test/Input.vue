<script>
export default {
    props: {
        value: {
            type: String
        }
    }
}
</script>
<template>
    <div class="input">
        <slot name="icon" />
        <input :value="this.value" />
    </div>
</template>

<style scoped>
.input {
    width: 100%;
    height: 40px;
    border: 1px solid var(--color-chaos-black);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 10px;
    box-sizing: border-box;
}

.input input {
    all: unset;
    height: 100%;
    font-size: 14px;
    color: var(--color-cold-grey);
    width: 100%;
}
</style>
