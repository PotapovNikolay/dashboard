<template>
    <!--    mobile version-->
    <div
            v-click-outside="closeMenu"
            v-if="store.state.adaptive.screen === 'mobile' && store.state.adaptive.isOpenMenu"
            class="sidebar__mobile"
    >
        <div>
            <div class="sidebar__logo_exit" style="justify-content: space-between">
                <div>CMS</div>
                <button @click="closeMenu">
                    <img class="sidebar__icon" :src="'/admin/images/exit.svg'" alt="exit"/>
                </button>
            </div>

            <div v-if="isImpersonator === 'true'" @click="switchImpersonator" class="sidebar__impersonator_container">Вернуться</div>
            <div>
                <div class="sidebar__nav" v-for="item in items">
                    <div v-for="nav in item.nav" @click="closeMenu">
                        <router-link
                                :to="{ name: nav.routerName }"
                                :class="[
                                $route.name?.split('.')[0] === nav.routerName.split('.')[0] ? 'sidebar__link_active' : 'sidebar__nav-link',
                            ]"
                        >
                            <img class="sidebar__icon" :src="'/admin/images/' + item.image" :alt="nav.routerName"/>
                            <div>
                                {{ nav.label }}
                            </div>
                        </router-link>
                    </div>
                </div>

                <div class="sidebar__nav-link" style="margin-top: 2rem">
                    <img class="sidebar__icon" :src="'/admin/images/box-arrow-left.svg'" alt="box-arrow-left"/>
                    <a href="/logout">Выход</a>
                </div>
            </div>
        </div>
        <div class="sidebar__lang_container">
            <button @click="setLanguage" class="sidebar__lang_container_button">
                <img class="sidebar__icon" :src="'/admin/images/globe.svg'" alt="globe"/>
                <span>{{ this.language }}</span>
            </button>
        </div>
    </div>

    <!--    dekstop version-->
    <div
            v-if="store.state.adaptive.screen !== 'mobile'"
            class="sidebar"
            :style="[toggle ? 'width:255px;transition: all 0.2s linear;' : ' width:60px;transition: all 0.2s linear;']"
    >
        <!--        <div style="background-color: #2e3442; width: 3rem; height: 3rem; position: absolute; right: -50px; top: 70px">-->
        <!--            <div style="width: 3rem; height: 3rem; background-color: #eeeff4; border-top-left-radius: 1.5rem"></div>-->
        <!--        </div>-->
        <div
                class="sidebar__backGround"
                :style="[toggle ? 'width:220px;transition: all 0.2s linear;' : ' width:60px;transition: all 0.2s linear;']"
        ></div>
        <div class="sidebar__nav" v-for="(item, key) in items">
            <div
                    v-for="(nav, index) in item.nav"
                    :key="index"
                    :class="[route.name?.split('.')[0] === nav.routerName.split('.')[0] ? 'row sidebar__link_active' : 'row sidebar__link']"
                    style="margin-top: 5rem"
                    :style="[
                    toggle
                        ? `width:205px;transition: all 0.2s linear; top:${key * 45}px`
                        : `width:40px; transition: all 0.2s linear;top:${key * 45}px `,
                ]"
            >
                <router-link :to="{ name: nav.routerName }" :class="[toggle ? 'sidebar__nav-link' : 'sidebar__nav-link_unactive']">
                    <img class="sidebar__icon" :src="'/admin/images/' + item.image" :alt="nav.routerName"/>
                    <div v-if="toggle">
                        {{ nav.label }}
                    </div>
                </router-link>

                <template v-if="lodashFind(nav.extends, ['key', 'add']) && toggle">
                    <router-link :to="{ name: lodashFind(nav.extends, ['key', 'add']).routeName }" class="sidebar__nav-add">
                        +
                    </router-link>
                </template>
            </div>
        </div>

        <div
                v-if="store.state.adaptive.screen === 'desktop'"
                @click="toggle = !toggle"
                class="sidebar__arrowSide"
                :style="[toggle ? 'left:212px; transition: all 0.2s linear;' : ' left:50px; transition: all 0.2s linear;']"
        >
            <img v-if="toggle" :src="'/admin/images/caret-left-fill.svg'" alt="caret-left-fill"/>
            <img v-else :src="'/admin/images/caret-right-fill.svg'" alt="caret-right-fill"/>
        </div>

        <div v-if="toggle" class="copyright">
            <div>
                CMS<br/>
                v2022.04.10
            </div>
        </div>
    </div>
</template>

<script setup>

import lodashFind from "lodash/find";
import {ref,inject} from 'vue'
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const store = useStore()
const route = useRoute()
const modules = inject('modules')


const items = ref([])
const toggle = ref(false)
const isImpersonator = ref(false)
const language = ref("ru")

function addItems(item) {
    items.value = items.value.concat(item);
}

function closeMenu() {
    store.commit("adaptive/toggleMenu");
}


function setLanguage() {
    localStorage.language = language.value === "ru" ? "en" : "ru";
    language.value = language.value === "ru" ? "en" : "ru";

    window.location.reload();
}

async function switchImpersonator() {
    window.location.href = ` ?_switch_user=_exit`;
}

if (localStorage.is_impersonator) isImpersonator.value = localStorage.is_impersonator;
if (localStorage.language) language.value = localStorage.language;

modules.forEach((moduleName) => {
    const module = require("../../modules/" + moduleName + "/index.js").default;
    if (module.sidebar) addItems(module.sidebar);
});




</script>

