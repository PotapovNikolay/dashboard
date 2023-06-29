<template>
    <div class="app-navbar__nav_padding">
        <div class="app-navbar__nav">
            <div class="app-navbar__tabs_pageName">
                {{ route.params.id ? i18n("labels.editing") : i18n("labels.newBlock") }}
            </div>

            <div class="app-navbar__tabs app-navbar__journal-scroll">
                <div class="app-navbar__tabs_container">
                    <div v-for="(tab, index) in tabs" :key="index" class="app-navbar__tab">
                        <button
                            @click="emit('switchTab', index, tab.name)"
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

            <div class="app-navbar__buttons_container">
                <!--                <button @click="emit('openSettings')" class="constructor__nav_button_with_text" style="justify-content: start">-->
                <!--                    Настройки-->
                <!--                </button>-->
                <button
                    v-if="!route.params.id"
                    @click="emit('openSideBar')"
                    @click.once="getBlocks"
                    class="constructor__nav_button_without_text"
                >
                    <img :src="'/admin/images/plus.svg'" class="page__nav_button_svg" alt="plus" />
                    <!--                    <img v-else :src="'/admin/images/collection.svg'" class="page__nav_button_svg" alt="collection" />-->
                </button>

                <button class="constructor__nav_button_with_text" style="justify-content: start" @click="emit('save')">
                    <img :src="'/admin/images/bookmark-plus-fill.svg'" class="page__nav_button_svg" alt="bookmark-plus-fill" />
                    <span style="margin-left: 1rem">
                        {{ !route.params.id ? i18n("buttons.add") : i18n("buttons.save") }}
                    </span>
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
import ConstructorViewLang from "../language/ConstructorViewLang";
import { StoreName } from "../store";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });
const router = useRouter();
const route = useRoute();
const store = useStore();

const { tabs, currentTabIndex, isOpenContextMenu } = defineProps({
    tabs: Array,
    currentTabIndex: Number,
    isOpenContextMenu: Boolean,
});

const emit = defineEmits(["save", "openSideBar", "switchTab", "openContextMenu", "openSettings"]);

function getBlocks() {
    store.dispatch(`${StoreName}/getAvailableBlocks`);
}
</script>

<script>
export default {
    name: "ConstructorNavBar",
};
</script>

<style scoped></style>
