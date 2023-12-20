<script>
export default {
    props: {
        previous: {
            type: Function
        },
        next: {
            type: Function
        },
        activePage: {
            type: Number
        },
        totalPage: {
            type: Number
        },
        direction: {
            type: String
        }
    }
}
</script>

<template>
    <div class="pagination" :class="this.direction">
        <div
            class="previous"
            :class="this.activePage === 1 && 'disabled'"
            @click="this.activePage !== 1 ? this.previous() : null"
        >
            <img
                src="@/assets/svg/arrow-up.svg"
                alt="previous"
                v-if="this.direction !== 'horizontal'"
            />
            <img src="@/assets/svg/arrow-left.svg" alt="previous" v-else />
        </div>
        <div class="page">
            {{ this.activePage < 10 ? '0' + this.activePage : this.activePage
            }}<span>/{{ this.totalPage < 10 ? '0' + this.totalPage : this.totalPage }}</span>
        </div>
        <div
            class="next"
            @click="this.next"
            :class="this.activePage === this.totalPage && 'disabled'"
        >
            <img
                src="@/assets/svg/arrow-down.svg"
                alt="next"
                v-if="this.direction !== 'horizontal'"
            />
            <img src="@/assets/svg/arrow-right.svg" alt="next" v-else />
        </div>
    </div>
</template>

<style scoped>
.pagination {
    width: 45px;
    background-color: var(--color-black-metal-2);
    border: 1px solid var(--color-dreamless-sleep);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}

.previous,
.next {
    width: 100%;
    height: 50px;
    transition: background-color 200ms;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
}

:is(.previous, .next) img {
    width: 24px;
}

:is(.previous, .next).disabled img {
    opacity: 0.5;
    width: 24px;
}

:is(.previous, .next).disabled:hover {
    background-color: transparent;
    cursor: default;
}

.previous {
    border-bottom: 1px solid var(--color-dreamless-sleep);
}

.next {
    border-top: 1px solid var(--color-dreamless-sleep);
}

:is(.previous, .next):hover {
    background-color: var(--color-existential-angst);
}

.page {
    width: 100%;
    height: max-content;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    gap: 1px;
    font-size: 11px;
}

.page span {
    opacity: 0.5;
}

/* ----- Horizontal ----- */
.pagination.horizontal {
    flex-direction: row;
    height: 40px;
    width: max-content;
    align-items: center;
}

.pagination.horizontal :is(.previous, .next) {
    width: 40px;
    height: 40px;
}

.pagination.horizontal .previous {
    border-bottom: unset;
    border-right: 1px solid var(--color-dreamless-sleep);
}

.pagination.horizontal .next {
    border-top: unset;
    border-left: 1px solid var(--color-dreamless-sleep);
}

.pagination.horizontal .page {
    padding: 0 20px;
}
</style>
