<template>
    <div class="constructor__nav_contextmenu">
        <button v-if="currentTabIndex !== 0" @click="emit('openNewWindow')" class="constructor__context_nav_button_with_text">
            <img :src="'/admin/images/bookmark-check-fill.svg'" class="page__nav_button_svg" alt="bookmark-check-fil" />
            <span style="margin-left: 1rem">{{ i18n("buttons.watch") }}</span>
        </button>
        <button
            v-if="route.params.id"
            class="constructor__context_nav_button_with_text"
            @click="deleteBlock"
            style="background-color: #c25e70"
        >
            <img :src="'/admin/images/bookmark-dash-fill.svg'" class="page__nav_button_svg" alt="bookmark-dash-fill" />
            <span style="margin-left: 1rem">{{ i18n("buttons.delete") }}</span>
        </button>
        <div class="row">
            <button
                id="syncVar"
                v-if="route.params.id"
                class="constructor__context_nav_button_with_text_long"
                @click="emit('syncBlocks', false)"
            >
                <img :src="'/admin/images/arrow-left-right.svg'" class="page__nav_button_svg" alt="bookmark-dash-fill" />
            </button>

            <button
                v-if="route.params.id"
                id="syncPage"
                class="constructor__context_nav_button_with_text_long"
                @click="emit('syncBlocks', true)"
            >
                <img :src="'/admin/images/arrow-repeat.svg'" class="page__nav_button_svg" alt="bookmark-dash-fill" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { StoreName } from "../store";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ConstructorViewLang from "../language/ConstructorViewLang";
import { onMounted } from "vue";
import tippy from "tippy.js";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const route = useRoute();
const router = useRouter();

const store = useStore();

const { currentTabIndex } = defineProps({ currentTabIndex: Number });
const emit = defineEmits(["openNewWindow", "deleteBlock", "syncBlocks"]);

async function deleteBlock() {
    const data = await store.dispatch(`${StoreName}/deleteEntity`, route.params.id);

    if (data.success) {
        await router.push({ name: "blocks.list" });
    } else {
        alert("что-то пошло не так");
    }
}

onMounted(() => {
    tippy("#syncPage", {
        content: i18n("buttons.syncPage"),
        placement: "bottom",
        zIndex: 10010,
        theme: "light",
    });
    tippy("#syncVar", {
        content: i18n("buttons.syncVar"),
        placement: "bottom",
        zIndex: 10010,
        theme: "light",
    });
});
</script>

<script>
export default {
    name: "ConstructorNavBarContextMenu",
};
</script>

<style scoped></style>
