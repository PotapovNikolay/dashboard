<template>
    <div class="constructor__nav_contextmenu">
        <button @click="emit('resetEditor')" class="constructor__context_nav_button_with_text">
            <img :src="'/admin/images/bookmark-x-fill.svg'" class="page__nav_button_svg" alt="bookmark-x-fill" />
            <span style="margin-left: 1rem">{{ i18n("buttons.clear") }}</span>
        </button>

        <button v-if="currentTabIndex !== 0" @click="emit('openNewWindow')" class="constructor__context_nav_button_with_text">
            <img :src="'/admin/images/bookmark-star-fill.svg'" class="page__nav_button_svg" alt="bookmark-star-fill" />

            <span style="margin-left: 1rem">{{ i18n("buttons.watch") }}</span>
        </button>

        <button
            style="background-color: #c25e70"
            v-if="route.params.id"
            @click="deletePage()"
            class="constructor__context_nav_button_with_text"
        >
            <img :src="'/admin/images/bookmark-dash-fill.svg'" class="page__nav_button_svg" alt="bookmark-dash-fill" />
            <span style="margin-left: 1rem">{{ i18n("buttons.delete") }}</span>
        </button>
        <div class="row">
            <button
                v-if="route.params.id"
                id="syncPage"
                class="constructor__context_nav_button_with_text_long"
                @click="recompilePage(route.params.id)"
            >
                <img :src="'/admin/images/arrow-repeat.svg'" class="page__nav_button_svg" alt="bookmark-dash-fill" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import PageViewLang from "../language/PageViewLang";
import { StoreName } from "../store";
import tippy from "tippy.js";
import { onMounted } from "vue";

const store = useStore();

const router = useRouter();
const route = useRoute();

const { t: i18n } = useI18n({ messages: PageViewLang, useScope: "local" });

async function recompilePage(id) {
    await store.dispatch(`${StoreName}/syncRecompilePage`, id);
}

async function deletePage() {
    const data = await store.dispatch(`${StoreName}/deletePageById`, route.params.id);

    if (data.success) {
        await router.push({ name: "pages.list" });
    } else {
        alert("что-то пошло не так");
    }
}

const { currentTabIndex } = defineProps({ currentTabIndex: Number });
const emit = defineEmits(["resetEditor", "openNewWindow", "openModal"]);

onMounted(() => {
    tippy("#syncPage", {
        content: i18n("buttons.recompilePage"),
        placement: "bottom",
        zIndex: 10010,
        theme: "light",
    });
});
</script>

<!--<script>-->
<!--import { StoreName } from "../store";-->
<!--import { useStore } from "vuex";-->
<!--import { useRoute, useRouter } from "vue-router";-->
<!--import { useI18n } from "vue-i18n";-->
<!--import PageListLang from "../language/PageListLang";-->

<!--export default {-->
<!--    setup() {-->
<!--        const store = useStore();-->
<!--        const router = useRouter();-->
<!--        const route = useRoute();-->

<!--        const { t: i18n } = useI18n({ messages: PageListLang, useScope: "local" });-->

<!--        async function deletePage() {-->
<!--            const data = await store.dispatch(`${StoreName}/deletePageById`, route.params.id);-->

<!--            if (data.success) {-->
<!--                await router.push(this.prevRoute.path);-->
<!--            } else {-->
<!--                alert("что-то пошло не так");-->
<!--            }-->
<!--        }-->

<!--        return { deletePage, i18n };-->
<!--    },-->

<!--    emits: ["resetEditor", "openNewWindow"],-->
<!--    name: "PageNavBarContextMenu",-->
<!--};-->
<!--</script>-->

<style scoped></style>
