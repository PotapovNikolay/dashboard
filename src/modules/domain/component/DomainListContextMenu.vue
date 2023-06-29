<template>
    <app-context-menu ref="appContextMenuRef">
        <!--        <div class="context-menu__item" @click="openCategory">-->
        <!--            Редактировать-->
        <!--        </div>-->

        <!--        <div class="context-menu__item" @click="changePublish" v-if="entity">-->
        <!--            {{ entity.publish ? 'Снять с публикации' : 'Опубликовать' }}-->
        <!--        </div>-->

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.remove") }}</div>

        <div class="context-menu__item" @click="changeUser">{{ i18n("labels.login") }}</div>
    </app-context-menu>
</template>

<script setup>
//i18n - функция для интернализации
import { useI18n } from "vue-i18n";
import {  inject } from "vue";
import DomainListContextMenuLang from "../language/DomainListContextMenuLang";

const { t: i18n } = useI18n({ messages: DomainListContextMenuLang, useScope: "local" });


const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, removeEntity, changeUser, openEntity} = useContextMenu( "domains");

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "DomainListContextMenu",
};
</script>
