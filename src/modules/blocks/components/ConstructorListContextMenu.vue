<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
//i18n - функция для интернализации
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import ConstructorContextMenuLang from "../language/ConstructorContextMenuLang";

const { t: i18n } = useI18n({ messages: ConstructorContextMenuLang, useScope: "local" });

const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu,openEntity, removeEntity} = useContextMenu("blocks");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "ConstructorListContextMenu",
};
</script>
