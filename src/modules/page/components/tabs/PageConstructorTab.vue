<template>
    <div>
        <div v-if="isOpenDragModal" class="page_module_drag_modal">
            <div class="page_module_drag_modal_container" v-click-outside="openDragModal">
                <div style="margin-bottom: 1rem">Переупорядочить содержимое</div>
                <div class="page_module_drag_modal_items_container">
                    <draggable v-model="blocks" item-key="id">
                        <template #item="{ element, index }">
                            <div class="page_module_drag_modal_item">
                                <img :src="'/admin/images/list.svg'" alt="list" />
                                <span>{{ element.name }}</span>
                            </div>
                        </template>
                    </draggable>
                </div>
                <button @click="openDragModal" class="page_module_drag_modal_button">Отмена</button>
            </div>
        </div>
        <div class="page_module_view">
            <div v-if="blocks.length > 1" class="page_module_view_editing">
                <div @click="openDragModal"><img :src="'/admin/images/pencil.svg'" alt="pencil" /></div>
            </div>

            <div v-if="blocks.length" style="background-color: rgba(0, 0, 0, 0)">
                <app-iframe
                    :css="css"
                    @openNewWindow="emit('openNewWindow')"
                    scrolling="no"
                    :style="{ height: height }"
                    style="width: 100%; border: none; overflow: hidden"
                >
                    <draggable v-model="blocks" item-key="id">
                        <template #item="{ element, index }">
                            <div
                                :ref="
                                    (el) => {
                                        if (el) itemRefs[index] = el;
                                    }
                                "
                            >
                                <div v-if="indexOfBlock === index && !isOpenNewWindow" class="page__constructor_icons_container">
                                    <button ref="deleteButtonRef" class="page__constructor_icons_container_button">
                                        <img :src="'/admin/images/trash.svg'" alt="trash" />
                                    </button>

                                    <button class="page__constructor_icons_container_button">
                                        <img :src="'/admin/images/hand-index-thumb.svg'" alt="and-index-thumb" />
                                    </button>
                                </div>
                                <div
                                    :class="[
                                        indexOfBlock === index && !isOpenNewWindow
                                            ? 'page__constructor_html_container'
                                            : 'page__constructor_html_container_hover',
                                    ]"
                                    v-html="element.template"
                                ></div>

                                <div class="page__constructor_plus_button_div">
                                    <button
                                        ref="plusButtonRef"
                                        v-if="indexOfBlock === index && !isOpenNewWindow"
                                        class="page__constructor_plus_button"
                                    >
                                        <img :src="'/admin/images/plus.svg'" class="page__constructor_plus_icon" alt="plus" />
                                    </button>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </app-iframe>
            </div>

            <div class="app-page__plusZone">
                <button @mouseenter="setIndexOfBlock(null)" @click="emit('openModal')" class="app-page__plus">
                    <span style="position: absolute; left: 0; width: 100%">{{ i18n("buttons.addBlock") }}</span>

                    <img :src="'/admin/images/plus-fill.svg'" class="page__nav_button_svg" alt="plus" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { computed, onBeforeUpdate, onMounted, onUpdated, ref, watch, watchEffect } from "vue";
import { StoreName } from "../../store";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import PageViewLang from "../../language/PageViewLang";

const { t: i18n } = useI18n({ messages: PageViewLang, useScope: "local" });
const route = useRoute();

const store = useStore();
const pageStore = store.state[StoreName];
const setIndexOfBlock = (index) => {
    store.commit(`${StoreName}/setIndexOfBlock`, index);
};

const indexOfBlock = computed(() => pageStore.indexOfBlock);

const blocks = computed({
    get() {
        return route.params.id ? pageStore.entities.componentsForEditing : pageStore.entities.componentsForCreating;
    },

    set(value) {
        route.params.id
            ? store.commit(`${StoreName}/setComponentsForEditingByDraggable`, value)
            : store.commit(`${StoreName}/setComponentsForCreatingByDraggable`, value);
    },
});

const height = ref("");
const itemRefs = ref([]);
const plusButtonRef = ref(null);
const deleteButtonRef = ref(null);
const isOpenDragModal = ref(false);
const antiDoubleDelete = ref(false);

function openDragModal() {
    isOpenDragModal.value = !isOpenDragModal.value;
}

onBeforeUpdate(() => {
    itemRefs.value = [];
});

onUpdated(() => {
    // да, согласен, костыль, но попыток это сделать нормально было ооочень много
    setTimeout(() => {
        height.value =
            parseInt(document.querySelector("iframe")?.contentWindow.document.querySelector("#getHeight")?.offsetHeight) + 30 + "px";
    }, 200);
});

watch(plusButtonRef, (newPlusButtonRef, oldPlusButtonRef) => {
    if (newPlusButtonRef !== oldPlusButtonRef) {
        plusButtonRef.value?.addEventListener("click", () => {
            emit("openModal");
        });
    }
});

watch(deleteButtonRef, () => {
    if (deleteButtonRef.value && !antiDoubleDelete.value) {
        antiDoubleDelete.value = true;
        deleteButtonRef.value.addEventListener("click", async () => {
            route.params.id
                ? store.commit(`${StoreName}/deleteComponentFromComponentsForEditing`, indexOfBlock.value)
                : store.commit(`${StoreName}/deleteComponentFromComponentsForCreating`, indexOfBlock.value);
            setIndexOfBlock(null);
        });
    } else if (antiDoubleDelete.value) {
        antiDoubleDelete.value = false;
    }
});

watchEffect(
    () => {
        if (!isOpenModalWindow.value) {
            itemRefs.value.forEach((item, index) => {
                item.addEventListener("mouseenter", () => {
                    setIndexOfBlock(index);
                });
            });
        }
    },
    {
        flush: "post",
    }
);

onBeforeRouteLeave(() => {
    height.value = "";
    store.commit(`${StoreName}/resetComponentsForEditing`);
});

onMounted(() => {
    setTimeout(() => {
        height.value =
            parseInt(document.querySelector("iframe")?.contentWindow.document.querySelector("#getHeight")?.offsetHeight) + 30 + "px";
    }, 200);
});

const { css, isOpenNewWindow, isOpenModalWindow } = defineProps({
    css: String,
    isOpenNewWindow: Boolean,
    isOpenModalWindow: Boolean,
});

const emit = defineEmits(["openModal", "openNewWindow"]);
</script>

<style scoped></style>
