<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <div class="context-menu__item" @click="changePublish" v-if="entity">
            {{ entity.publish ? i18n("labels.unpublish") : i18n("labels.publish") }}
        </div>

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
import { reactive,inject } from "vue";
import { useI18n } from "vue-i18n";
import TeamsListContextMenuLang from "../language/TeamsListContextMenuLang";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: TeamsListContextMenuLang, useScope: "local" });


const {entity, appContextMenuRef, showContextMenu, removeEntity, changePublish, openEntity} = inject("useContextMenu")( "teams");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "CategoryContextMenu",
};
</script>
