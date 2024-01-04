<script>
import { defineComponent } from 'vue'
import Dropdown from '@/components/shared/Dropdown.vue'
import { useI18n } from 'vue-i18n'
import changeLocalLanguage from '@/utils/language'

export default defineComponent({
    components: { Dropdown },
    setup() {
        const i18n = useI18n()

        return {
            i18n
        }
    },
    data() {
        return {
            showSelectorBox: false,
            showMenu: null
        }
    },
    methods: {
        changeLocalLanguage,
        hideSelectorBox(event) {
            if (!this.$el.contains(event.target)) this.showSelectorBox = false
        }
    },
    mounted() {
        window.addEventListener('click', this.hideSelectorBox)
    },
    unmounted() {
        window.removeEventListener('click', this.hideSelectorBox)
    }
})
</script>

<template>
    <div class="navbar">
        <img src="@/assets/svg/logo.svg" alt="logo" />
        <div
            class="nav-items"
            :class="showMenu === true ? 'active' : showMenu === false && 'deactivate'"
        >
            <div class="links">
                <a href="#github">
                    <img src="@/assets/svg/github.svg" alt="github" />
                    Github
                </a>
                <a href="#donate">
                    <img src="@/assets/svg/donate.svg" alt="donate" />
                    {{ $t('navbar.donate') }}
                </a>
            </div>
            <hr />
            <Dropdown
                :mutation="(state) => changeLocalLanguage(state, this.$i18n)"
                :state="this.$i18n.locale"
                :data="['tr', 'en']"
                language-group="language"
            >
                <template v-slot:selected>
                    <div class="selected-lang">
                        <img src="@/assets/svg/language.svg" alt="language" />
                        {{ $t(`language.${this.$i18n.locale}`) }}
                    </div>
                </template>
            </Dropdown>
        </div>
        <div
            class="menu-toggle-icon"
            :class="showMenu && 'active'"
            @click="this.showMenu = !this.showMenu"
        >
            <span />
            <span />
            <span />
        </div>
    </div>
</template>

<style scoped>
/* ----- Navbar ----- */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    z-index: 2;
}

.nav-items {
    display: flex;
    align-items: center;
    gap: 15px;
}

.nav-items hr {
    all: unset;
    height: 25px;
    width: 2px;
    border-radius: 2px;
    background-color: var(--color-chaos-black);
}

/* ----- Links ----- */
.links {
    display: flex;
    gap: 25px;
}

.links a {
    all: unset;
    color: var(--color-titanium-white);
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: color 200ms;
}

.links a:hover {
    color: var(--color-cold-grey);
}

.selected-lang {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}

/* ----- Menu Toggle Icon ----- */
.menu-toggle-icon {
    height: max-content;
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
}

.menu-toggle-icon span {
    display: block;
    width: 25px;
    height: 1.8px;
    background-color: var(--color-titanium-white);
    border-radius: 2px;
    transition: all 200ms;
}

.menu-toggle-icon.active > span:nth-of-type(2) {
    display: none;
}

.menu-toggle-icon.active > span:nth-of-type(1) {
    position: relative;
    top: 0;
    transform: rotate(45deg) translate(0, 5px);
}

.menu-toggle-icon.active > span:nth-of-type(3) {
    position: relative;
    top: 0;
    transform: rotate(-45deg) translate(0, -5px);
}

/* ----- Media 768px, Mobile ----- */
@media screen and (max-width: 768px) {
    .navbar {
        background-color: var(--color-black-metal);
        height: 70px;
    }

    .nav-items hr {
        display: none;
    }

    .nav-items {
        position: absolute;
        top: 70px;
        left: 0;

        width: 100%;
        border-top: 1px solid var(--color-dreamless-sleep);
        border-bottom: 1px solid var(--color-dreamless-sleep);
        background-color: var(--color-black-metal);
        padding: 25px;
        box-sizing: border-box;

        display: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .nav-items.deactivate {
        display: flex;
        animation: 200ms ease-in-out menu-hidden-animation;
        animation-fill-mode: forwards;
    }

    .nav-items.active {
        display: flex;
        opacity: 0;
        animation: 200ms ease-in-out menu-visible-animation;
        animation-fill-mode: forwards;
    }

    @keyframes menu-visible-animation {
        from {
            display: flex;
            opacity: 0;
            transform: translateX(-100px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes menu-hidden-animation {
        from {
            opacity: 1;
            transform: translateX(0);
        }

        to {
            opacity: 0;
            transform: translateX(-100px);
            display: none;
        }
    }

    .links {
        flex-direction: column;
        gap: 20px;
    }

    .menu-toggle-icon {
        display: flex;
    }
}
</style>
