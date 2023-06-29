2<template>
    <app-context-menu ref="appContextMenuRef">
        <div v-if="subEntities.includes(entity?.id)" class="context-menu__item" @click="deleteEntityOfDomain">
            {{ i18n("labels.remove") }}
        </div>

        <div v-else class="context-menu__item" @click="addEntityToDomain">{{ i18n("labels.add") }}</div>
    </app-context-menu>
</template>

<script setup>
import { StoreName } from "../store";
import {  inject, reactive,  } from "vue";
import { useI18n } from "vue-i18n";
import NewsDomainListContextMenuLang from "../language/NewsDomainListContextMenuLang";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: NewsDomainListContextMenuLang, useScope: "local" });


const useContextMenu = inject("useContextMenu");
const {entity, appContextMenuRef, showContextMenu, addEntityToDomain, deleteEntityOfDomain} = useContextMenu(StoreName);

const useInitList = inject("useInitList");
const {subEntities} = useInitList(StoreName,null, null, true);

defineExpose({
    showContextMenu,
});
</script>

<script>
export default {
    name: "NewsDomainListContextMenu",
};
</script>
