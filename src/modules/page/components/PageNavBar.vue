<template>
    <div class="app-navbar__nav_padding">
        <div class="app-navbar__nav">
            <div class="app-navbar__tabs_pageName">
                {{ route.params.id ? i18n("labels.editing") : i18n("labels.newPage") }}
            </div>

            <div class="app-navbar__tabs app-navbar__journal-scroll">
                <div class="app-navbar__tabs_container">
                    <div v-for="(tab, index) in tabs" :key="index" class="app-navbar__tab">
                        <button
                            @click="emit('switchIndex', index, tab.name)"
                            :class="[index === currentTabIndex ? 'app-navbar__tab_button_active' : 'app-navbar__tab_button']"
                            style="justify-content: start"
                        >
                            <img :src="'/admin/images/' + tab.image" :alt="tab.image" />
                            <span v-if="store.state.adaptive.screen === 'desktop'" style="margin-left: 1rem">
                                {{ tab.name }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="route.params.id || componentsForCreating.length" class="app-navbar__buttons_container">
                <button @click="emit('save')" class="constructor__nav_button_with_text" style="justify-content: start">
                    <img :src="'/admin/images/bookmark-check-fill.svg'" class="page__nav_button_svg" alt="bookmark-check-fill" />
                    <span style="margin-left: 1rem">{{ i18n("buttons.save") }}</span>
                </button>

                <button
                    :class="[isOpenContextMenu ? 'constructor__nav_button_without_text' : 'constructor__nav_button_without_text_unactive']"
                    @click="emit('openContextMenu')"
                >
                    <img :src="'/admin/images/list.svg'" class="page__nav_button_svg" alt="list" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

import { StoreName } from "../store";
import { computed } from "vue";
import PageViewLang from "../language/PageViewLang.js";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const state = store.state[StoreName];
const componentsForCreating = computed(() => state.entities.componentsForCreating);

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: PageViewLang, useScope: "local" });

const { tabs, currentTabIndex, isOpenContextMenu } = defineProps({ tabs: Array, currentTabIndex: Number, isOpenContextMenu: Boolean });

const emit = defineEmits(["switchIndex", "openContextMenu", "save"]);
</script>

<script>
// import vClickOutside from "click-outside-vue3";
// import { mapState } from "vuex";
// import { StoreName } from "../store";
// import I18n from "../../../mixins/I18n";

// export default {
// props:{ indexOfPageByURLId:{type:String}},
// props: ["tabs", "currentTabIndex", "isOpenContextMenu"],
// emits: ["switchIndex", "switchIsOpenContextMenu", "openNewWindow"],

// data() {
//     return {
//         PageViewLang: PageViewLang,
//     };
// },

// computed: {
//     ...mapState(StoreName, {
//         componentsForCreating: (state) => state.entities.componentsForCreating,
//     }),
// },

// components: { PageNavBarContextMenu },
//     directives: {
//         clickOutside: vClickOutside.directive,
//     },
//     name: "PageNavBar",
//     mixins: [I18n],
// };
</script>

<style scoped></style>
