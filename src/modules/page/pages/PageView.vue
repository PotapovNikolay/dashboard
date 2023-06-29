<template>
    <page-nav-bar
        :isOpenContextMenu="isOpenContextMenu"
        @switchIndex="switchIndex"
        @openContextMenu="openContextMenu"
        @save="save(entities)"
        :tabs="tabs"
        :currentTabIndex="currentTabIndex"
    />

    <page-side-bar
        v-if="isOpenSideBar"
        @openSideBar="openSideBar"
        @callGetter="callGetter"
        :lastIndex="lastIndex"
        v-click-outside="openSideBar"
    />

    <div v-if="isOpenSideBar" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 10"></div>

    <div class="page__editing">
        <Transition name="context-menu">
            <page-nav-bar-context-menu
                v-if="isOpenContextMenu"
                :currentTabIndex.number="currentTabIndex"
                @resetEditor="resetEditor"
                @openNewWindow="openNewWindow"
                v-click-outside="openContextMenu"
            />
        </Transition>
        <component
            :is="tabs[currentTabIndex].component"
            :css="css"
            :isOpenNewWindow="isOpenNewWindow"
            v-model:entity="entity"
            :errors="errors"
            @openModal="openSideBar"
            @openNewWindow="openNewWindow"
        >
        </component>
    </div>
</template>

<script setup>
import PageNavBar from "../components/PageNavBar";
import PageSideBar from "../components/PageSideBar";
import PageNavBarContextMenu from "../components/PageNavBarContextMenu";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { computed, onActivated,  ref, provide, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { StoreName } from "../store";
import { entityItem, errorsItem } from "../helpers/index";
import { tabs as tab } from "../helpers/tabs";
import PageViewLang from "../language/PageViewLang.js";
import useWindows from "../../blocks/hooks/useWindows";

const tabs = ref(tab);

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: PageViewLang, useScope: "local" });

const route = useRoute();

const store = useStore();
const pageStore = store.state[StoreName];
const componentsForCreating = computed(() => pageStore.entities.componentsForCreating);
const componentsForEditing = computed(() => pageStore.entities.componentsForEditing);
const page = computed(() => pageStore.entities.page);

const resetSelectedComponents = () => {
    store.commit(`${StoreName}/resetSelectedComponents`);
};

//флаги для переключения окон
const { isOpenNewWindow, isOpenSideBar, isOpenContextMenu, openContextMenu, openNewWindow } = useWindows();

provide("isOpenNewWindow", isOpenNewWindow);

//индексация компонентов
const indexOfBlock = ref(100);
const lastIndex = ref(null);

//шаблон
const template = ref("");
const css = ref("");


//tabs
let currentTabIndex = ref(0);
let currentName = ref(i18n("title"));


const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem, null, transformEntity, true);

function transformEntity() {
    const blocks_ids = [];

    if (route.params.id) {
        componentsForEditing.value.forEach((block) => {
            blocks_ids.push(block.id);
        });
    } else {
        componentsForCreating.value.forEach((block) => {
            blocks_ids.push(block.id);
        });
    }

    Object.assign(entity, { blocks_ids: blocks_ids });
}

function openSideBar() {
    lastIndex.value = route.params.id ? componentsForEditing?.value.length : componentsForCreating?.value.length;
    isOpenSideBar.value = !isOpenSideBar.value;
}

function switchIndex(index, name) {
    currentTabIndex.value = index;
    currentName.value = name;
}

function addNewTemplateAndCssToOld(components) {
    components.value.forEach((item, key) => {
        template.value += item.template;
        css.value += item.css;
    });
}

function callGetter() {
    template.value = "";
    css.value = "";

    addNewTemplateAndCssToOld(route.params.id ? componentsForEditing : componentsForCreating);
}

function resetEditor() {
    css.value = "";
    template.value = "";
    isOpenContextMenu.value = false;
    resetSelectedComponents();
    route.params.id ? store.commit(`${StoreName}/resetComponentsForEditing`) : store.commit(`${StoreName}/resetComponentForCreating`);
}

onActivated(async () => {
    Object.assign(errors, errorsItem);
    resetEditor();

    if (route.params.id) {
        await resetSelectedComponents();

        store.dispatch(`${StoreName}/getPageById`, route.params.id).then((result) => {
            Object.assign(entity, result);

            if (result.blocks.length) {
                result.blocks.forEach((block) => {
                    store.commit(`${StoreName}/setSelectedComponents`, block.id);
                    template.value += block.template;
                    css.value += block.css;
                });
            } else {
                store.commit(`${StoreName}/setSelectedComponents`, result.blocks[1].id);
                template.value += result.blocks[1].template;
                css.value += result.blocks[1].css;
            }
        });

        await store.dispatch(`${StoreName}/getComponents`);
    } else {
        currentTabIndex.value = 0;
        indexOfBlock.value = 0;

        Object.assign(entity, entityItem);

        await store.dispatch(`${StoreName}/getComponents`);
    }
});

onBeforeRouteLeave((to, from) => {
    currentTabIndex.value = 0;
    template.value = "";
    css.value = "";
    store.commit(`${StoreName}/resetComponentsForEditing`);
    store.commit(`${StoreName}/resetComponentForCreating`);
    store.dispatch("loader/hide");
});
</script>

<script>
export default {
    name: "pageView",
};
</script>
