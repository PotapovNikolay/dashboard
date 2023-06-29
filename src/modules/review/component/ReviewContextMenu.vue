<template>
    <app-context-menu ref="appContextMenuRef">
        <div class="context-menu__item" @click="openEntity">{{ i18n("labels.editing") }}</div>

        <!--        <div class="context-menu__item" @click="changePublish" v-if="entity">-->
        <!--            {{ entity.publish ? i18n(ReviewListContextMenuLang, "labels.publish") : i18n(ReviewListContextMenuLang, "labels.unpublish") }}-->
        <!--        </div>-->

        <div class="context-menu__item" @click="removeEntity">{{ i18n("labels.delete") }}</div>
    </app-context-menu>
</template>


<script setup>
import {useI18n} from "vue-i18n";
import {inject, reactive, ref} from "vue";
import ReviewListContextMenuLang from "../language/ReviewListContextMenuLang";

//i18n - функция для интернализации
const {t: i18n} = useI18n({messages: ReviewListContextMenuLang, useScope: "local"});


const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, openEntity, removeEntity} = useContextMenu( "review");


defineExpose({
    showContextMenu,
});
</script>
