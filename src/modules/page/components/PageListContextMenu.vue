<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <!--        <div class="context-menu__item" @click="changePublish" v-if="entity">-->
        <!--            {{ entity.publish ? i18n("labels.unpublish") : i18n("labels.publish") }}-->
        <!--        </div>-->

        <div class="context-menu__item" @click="showInSite" v-if="entity && entity.publish && !entity.dynamic">
            {{ i18n("labels.watch") }}
        </div>
        <div class="context-menu__item" @click="removeEntity" v-if="entity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>

<script setup>
import PageContextMenuLang from "../language/PageContextMenuLang";
import { useI18n } from "vue-i18n";
import { inject } from "vue";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: PageContextMenuLang, useScope: "local" });

const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu,openEntity,changePublish, removeEntity,showInSite} = useContextMenu( "pages");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "pageListContextMenu",
};
</script>
