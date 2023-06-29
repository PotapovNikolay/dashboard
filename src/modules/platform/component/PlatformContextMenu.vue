<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <div class="context-menu__item" @click="openVariants">{{ i18n("labels.watchVariants") }}</div>

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
//i18n - функция для интернализации
import { useI18n } from "vue-i18n";
import PlatformListContextMenuLang from "../language/PlatformListContextMenuLang";
import { inject, reactive } from "vue";

const { t: i18n } = useI18n({ messages: PlatformListContextMenuLang, useScope: "local" });


const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, removeEntity, openEntity, openVariants} = useContextMenu( "platform");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "PlatformContextMenu",
};
</script>
