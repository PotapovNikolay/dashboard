<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openVariant">{{ i18n("labels.editing") }}</div>

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
//i18n - функция для интернализации
import { useI18n } from "vue-i18n";
import { inject, reactive, ref } from "vue";
import PlatformVariantListContextMenuLang from "../language/PlatformVariantListContextMenuLang";

const { t: i18n } = useI18n({ messages: PlatformVariantListContextMenuLang, useScope: "local" });


const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef,showContextMenu, openVariant, removeEntity} = useContextMenu( "platform_variant");


defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "PlatformContextMenu",
};
</script>
