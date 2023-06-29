<template>
    <div v-if="store.state.adaptive.screen === 'mobile' && !store.state.adaptive.isOpenMenu" class="mobile-menu__header">
        <div>CMS</div>
        <button @click="store.commit('adaptive/toggleMenu')">
            <img :src="'/admin/images/list.svg'" class="page__nav_button_svg" alt="list"/>
        </button>
    </div>

    <div v-if="store.state.adaptive.screen !== 'mobile'" class="header">
        <div class="row">
            <div class="header__right row" style="padding-top: 1.5rem">

                <div class="sidebar__lang_container">
                    <button @click="setLanguage" class="sidebar__lang_container_button">
                        <img class="sidebar__icon" :src="'/admin/images/globe.svg'" alt="globe"/>
                        <span>{{ language }}</span>
                    </button>
                </div>

            <button
                    v-if="isImpersonator === 'true'"
                    style="background-color: rgba(0, 0, 0, 0); border: 0 solid; cursor: pointer"
                    class="header__item"
                    @click="switchImpersonator"
            >
                {{ i18n("labels.back") }}
            </button>
            <a href="/logout" class="header__item">{{ i18n("labels.exit") }}</a>
        </div>
        </div>
    </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";

import AppHeaderLang from "../language/AppHeaderLang";
import {ref, watch} from "vue";
import {useStore} from "vuex";

const store = useStore();

const {t: i18n, locale} = useI18n({messages: AppHeaderLang, useScope: "global"});

const language = ref("ru");
const isImpersonator = ref(false);

if (localStorage.is_impersonator) isImpersonator.value = localStorage.is_impersonator;

if (localStorage.language) {
    language.value = localStorage.language;

    locale.value = localStorage.language;
} else{
    localStorage.language = 'ru'
    locale.value = 'ru'
}


function setLanguage() {
    localStorage.language = language.value === "ru" ? "en" : "ru";
    language.value = language.value === "ru" ? "en" : "ru";

    window.location.reload();
}


async function switchImpersonator() {
    window.location.href = ` ?_switch_user=_exit`;
}
</script>

<script>
export default {
    name: "AppHeader",
};
</script>
