<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <div class="context-menu__item" @click="changePublish" v-if="entity">
            {{ entity.publish ? i18n("labels.unpublish") : i18n("labels.publish") }}
        </div>

        <!--        <div class="context-menu__item" @click="showInSite" v-if="entity && entity.publish">{{i18n( "labels.watch")}}</div>-->

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { reactive, inject } from "vue";
import EventListContextMenuLang from "../language/EventListContextMenuLang";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: EventListContextMenuLang, useScope: "local" });

const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, removeEntity,openEntity,changePublish} = useContextMenu("events");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "EventListContextMenu",
};
</script>
