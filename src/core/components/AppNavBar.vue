<template>
    <div>
        <div class="app-navbar__nav_padding">
            <div class="app-navbar__nav">
                <div class="app-navbar__tabs_pageName">
                    {{ route.params.id ? i18n("title") : title }}

                    <div class="app-navbar__tabs_subPageName">
                        {{ currentName }}
                    </div>
                </div>
                <div ref="navBarRef" @wheel="scrollHorizontally" class="app-navbar__tabs app-navbar__journal-scroll">
                    <div class="app-navbar__tabs_container">
                        <div v-for="(tab, index) in tabs" class="app-navbar__tab">
                            <button
                                @click="switchIndex(index, tab.name)"
                                :class="[index === currentTabIndex ? 'app-navbar__tab_button_active' : 'app-navbar__tab_button']"
                            >
                                <img :src="'/admin/images/' + tab.image" :alt="tab.image" />
                                <span class="app-navbar__tab_text"
                                    >{{ store.state.adaptive.screen === "desktop" ? tab.name : null }}

                                    <span v-if="modulesWithErrors.includes(tab.id)" class="app-navbar__tab_sign_container">
                                        <span class="app-navbar__tab_sign app-navbar__tab_sign_negative" />
                                        <span class="app-navbar__tab_sign_animate app-navbar__tab_sign_animate_negative" />
                                    </span>
                                    <span v-if="modulesWithWasErrors.includes(tab.id)" class="app-navbar__tab_sign_container">
                                        <span class="app-navbar__tab_sign app-navbar__tab_sign_positive" />
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="app-navbar__container_button_with_text">
                    <button class="app-navbar__button_with_text" @click="emit('save')">
                        <img :src="'/admin/images/bookmark-plus-fill.svg'" class="page__nav_button_svg" alt="bookmark-plus-fill" />
                        <span>
                            {{ route.params.id ? i18n("buttons.save") : i18n("buttons.create") }}
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div class="event-view__content">
            <component :is="tabs[currentTabIndex].component"></component>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import AppNavBarLang from "../language/AppNavBarLang";
import { ref, inject, watch, onDeactivated } from "vue";
import { useStore } from "vuex";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: AppNavBarLang, useScope: "local" });
const route = useRoute();
const store = useStore();

const currentTabIndex = ref(0);
const currentName = ref(i18n("label"));
const navBarRef = ref(null);

function switchIndex(index, name) {
    currentTabIndex.value = index;
    currentName.value = name;
}

function scrollHorizontally(e) {
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    navBarRef.value.scrollLeft -= delta * 40;
    e.preventDefault();
}

const modulesWithErrors = ref([]);
const modulesWithWasErrors = ref([]);

const errors = inject("errors");

watch(errors, () => {
    for (const [tab, property] of Object.entries(errors)) {
        const value = Object.values(property).find((prop) => prop?.value);

        if (value) {
            modulesWithErrors.value.push(tab);
        } else if (!value && modulesWithErrors.value.includes(tab)) {
            modulesWithWasErrors.value.push(tab);
            modulesWithErrors.value = modulesWithErrors.value.filter((module) => module !== tab);
        }
    }
});

const { tabs, title } = defineProps({ tabs: Array, title: String });

const emit = defineEmits(["save"]);

onDeactivated(() => {
    currentTabIndex.value = 0;
    modulesWithWasErrors.value = []
});
</script>

<script>
export default {
    name: "AppNavBar",
};
</script>

<style scoped></style>
