<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject,  } from "vue";
import NewsListContextMenuLang from "../language/NewsListContextMenuLang";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: NewsListContextMenuLang, useScope: "local" });

const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, removeEntity} = useContextMenu( "news");

defineExpose({
    showContextMenu,
});
</script>

<script>

export default {

    name: "CategoryContextMenu",
};
</script>
