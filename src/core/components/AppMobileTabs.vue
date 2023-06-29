<template>
    <div style="padding-top: 1rem">
        <div class="app-navbar__nav">
            <div class="app-navbar__tabs_pageName">
                {{ entity.id ? "Редактирование" : title }}

                <div class="app-navbar__tabs_subPageName">
                    {{ currentName }}
                </div>
            </div>

            <button class="app-navbar__button_with_text" @click="this.$emit('save')">
                <img :src="'/admin/images/bookmark-plus-fill.svg'" class="page__nav_button_svg" alt="bookmark-plus-fill" />
                <span>
                    {{ entity.id ? " Сохранить" : "Создать" }}
                </span>
            </button>
        </div>
    </div>

    <div class="event-view__content">
        <component :is="this.tabs[this.currentTabIndex].component" v-model:entity="entity" v-model:errors="errors"></component>
    </div>
    <div class="app-navbar__tabs">
        <div class="app-navbar__tabs_container">
            <div v-for="(tab, index) in tabs">
                <button
                    @click="switchIndex(index, tab.name)"
                    :class="[index === currentTabIndex ? 'app-navbar__tabs_button_active' : 'app-navbar__tabs_button']"
                >
                    <img :src="'/admin/images/' + tab.image" :alt="tab.image" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppMobileTabs",

    props: {
        entity: { type: Object },
        tabs: { type: Array },
        title: { type: String },
        errors: { type: Object },
    },

    data() {
        return {
            currentTabIndex: 0,
            currentTab: null,
            currentName: "Главное",
        };
    },

    methods: {
        switchIndex(index, name) {
            this.currentTabIndex = index;
            this.currentName = name;
        },
    },

    emits: ["save", "switchIndex"],
};
</script>

<style scoped></style>
