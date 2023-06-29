<template>
    <div>
        <constructor-nav-bar
            ref="constructorNavBarRef"
            :currentTemplate="entity.id"
            :tabs="tabs"
            :currentTabIndex="currentTabIndex"
            :isOpenContextMenu="isOpenContextMenu"
            @save="save()"
            @switchTab="switchTab"
            @openContextMenu="openContextMenu"
            @openSideBar="openSideBar"
        >
        </constructor-nav-bar>

        <Transition name="slide" v-click-outside="openSideBar">
            <constructor-side-bar
                v-if="isOpenSideBar"
                @updateTemplateVariablesFromSideBar="updateTemplateVariablesFromSideBar"
                @openSideBar="openSideBar"
                v-model:entity="entity"
            />
        </Transition>

        <Transition name="slide" v-click-outside="() => switchTab(2, i18n('labels.settings'))">
            <constructor-settings
                v-if="currentTabIndex === 2 && isOpenSettings && Object.entries(templateProps.settings).length"
                v-model:entity="entity"
                :errors="errors"
            />
        </Transition>

        <Transition
            name="slide"
            v-click-outside="
                () => {
                    if (isOpenPickr) {
                        switchTab(1, i18n('labels.styles'));
                    }
                }
            "
        >
            <constructor-styles
                v-if="currentTabIndex === 1 && isOpenStyles && Object.entries(templateProps.styles).length"
                v-model:entity="entity"
                v-model:isOpenPickr="isOpenPickr"
                :errors="errors"
            />
        </Transition>

        <div
            class="constructor__editing"
            ref="constructorRef"
            :style="[currentTabIndex === 0 ? 'justify-content: start' : 'justify-content: space-around']"
        >
            <Transition name="context-menu">
                <constructor-nav-bar-context-menu
                    v-if="isOpenContextMenu"
                    :currentTabIndex.number="currentTabIndex"
                    @openNewWindow="openNewWindow"
                    @syncBlocks="syncBlocks"
                    v-click-outside="openContextMenu"
                />
            </Transition>

            <div v-if="entity.template && currentTabIndex !== 0" class="constructor__iframeZone" ref="constructorIframeRef">
                <!--            :style="{ height: heightOfIframe + 'px' }"-->

                <app-iframe
                    :style="{ height: heightOfIframe + 'px' }"
                    :css="entity.css"
                    @openNewWindow="openNewWindow"
                    scrolling="no"
                    height="100%"
                    width="100%"
                >
                    <v-runtime-template
                        :template="entity.template"
                        :template-props="templateProps"
                        style="overflow: hidden; box-sizing: content-box; transition: all 0.2s linear; position: relative"
                    ></v-runtime-template>
                </app-iframe>
            </div>

            <div v-if="(currentTabIndex === 1 && Object.entries(templateProps.styles).length) || currentTabIndex === 0">
                <component
                    v-if="tabs[currentTabIndex].component"
                    :key="tabs[currentTabIndex].name"
                    ref="constructorGroupFieldRef"
                    :is="tabs[currentTabIndex].component"
                    :isOpenNewWindow="isOpenNewWindow"
                    v-model:entity="entity"
                    :errors="errors"
                >
                </component>
            </div>
        </div>
    </div>
</template>

<script setup>
import ConstructorSideBar from "../components/ConstructorSideBar";
import ConstructorNavBar from "../components/ConstructorNavBar";
import ConstructorNavBarContextMenu from "../components/ConstructorNavBarContextMenu";
import ConstructorSettings from "../components/ConstructorSettings.vue";
import ConstructorStyles from "../components/ConstructorStyles.vue";
import VRuntimeTemplate from "vue3-runtime-template";

import { useI18n } from "vue-i18n";
import { onUpdated, nextTick, computed, onActivated, ref, reactive, provide, inject, watch } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

import ConstructorViewLang from "../language/ConstructorViewLang";
import { entityItem, errorsItem } from "../helpers";
import { StoreName } from "../store";
import { tabs as tab } from "../helpers/tabs";

import useTransform from "../hooks/useTransform";
import useConvert from "../hooks/useConvert";
import useWindows from "../hooks/useWindows";

const tabs = ref(tab);

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const route = useRoute();
const router = useRouter();
const store = useStore();

let heightOfIframe = ref(0);
let heightOfScreen = ref();

//открытие окон
const {
    isOpenNewWindow,
    isOpenSideBar,
    isOpenContextMenu,
    isOpenSettings,
    isOpenStyles,
    isOpenPickr,
    openContextMenu,
    openSideBar,
    openNewWindow,
} = useWindows();

provide("isOpenNewWindow", isOpenNewWindow);

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem, null, transformEntity, true);

let templateProps = { styles: {}, settings: {} };
provide("templateProps", templateProps);

//tabs
let currentTabIndex = ref(0);
let currentName = ref(i18n("labels.main"));

function switchTab(index, name) {
    if (index === 2 && entity.template) {
        isOpenSettings.value = !isOpenSettings.value;
    }
    if (index === 1 && entity.template) {
        isOpenStyles.value = !isOpenStyles.value;
    }
    currentTabIndex.value = index;
    currentName.value = name;
}

watch(currentTabIndex, (newValue, oldValue) => {
    if (oldValue === 2) {
        isOpenSettings.value = !isOpenSettings.value;
    } else if (oldValue === 1) {
        isOpenStyles.value = !isOpenStyles.value;
    }
});

function transformEntity() {
    Object.assign(entity, useConvert(entity, templateProps));

    const key = route.params.id ? { key: Number(route.params.id) } : { key: entity.id, type: templateProps.block };

    Object.assign(entity, key);
}

async function syncBlocks(recompile) {
    await store.dispatch("loader/show");

    Object.assign(entity, useConvert(entity, templateProps));

    const data = recompile
        ? await store.dispatch(`${StoreName}/syncRecompileBlock`, Object.assign(entity))
        : await store.dispatch(`${StoreName}/syncBlock`, Object.assign(entity));

    if (data.success) {
        // await router.push({ name: "blocks.list" });
        await store.dispatch("loader/hide");
    } else {
        alert("Проверьте правильность заполнения полей");
        errors.value = Object.assign({}, data.errors);
    }
}

function updateTemplateVariablesFromSideBar(newEntity) {
    Object.entries(newEntity).forEach(([key, value]) => {
        if (key === "name" && entity.name !== "") {
            return;
        } else {
            entity[key] = value;
        }
    });

    entity.id = newEntity.key;

    switchTab(1, i18n("labels.styles"));
}

onBeforeRouteLeave(() => {
    store.dispatch("loader/hide");

    templateProps.styles = {};
    templateProps.settings = {};
    Object.assign(entity, entityItem);
});

onActivated(async () => {
    currentTabIndex.value = 0;

    if (route.params.id) {
        const item = store.dispatch(`${StoreName}/getBlocksById`, route.params.id);

        item.then(async () => {
            const stylesAndSettings = computed(() => store.getters[`${StoreName}/getterTemplateForBlockById`](route.params.id));
            Object.assign(entity, stylesAndSettings.value);

            const { styles, settings } = useTransform(stylesAndSettings.value);
            templateProps.styles = styles;
            templateProps.settings = settings;
        });
    } else {
        Object.assign(entity, entityItem);

        templateProps.styles = {};
        templateProps.settings = {};
    }
});

onUpdated(async () => {
    await nextTick();
    const el = document.querySelector("iframe")?.contentWindow.document.querySelector("#getHeight");
    if (!el) return;

    heightOfIframe.value = el.offsetHeight;
});
</script>

<script>
export default {
    name: "ConstructorView",
};
</script>

<style>
.slide-leave-from {
    transform: translateX(0);
    transition: all 0.3s ease-in-out;
}
.slide-leave-to {
    transform: translateX(-20rem);
    transition: all 0.3s ease-in-out;
}

.slide-enter-from {
    transform: translateX(-20rem);
    transition: all 0.3s ease-in-out;
}

.slide-enter-to {
    transform: translateX(0px);
    transition: all 0.3s ease-in-out;
}

.context-menu-leave-from {
    transform: translateY(0);
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.context-menu-leave-to {
    transform: translateY(-60px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.context-menu-enter-from {
    transform: translateY(-60px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.context-menu-enter-to {
    transform: translateY(0px);
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
