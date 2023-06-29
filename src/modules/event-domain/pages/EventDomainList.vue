<template>
    <div class="row table__title">
        <div>{{ i18n("labels.events") }}</div>
    </div>
    <app-table
        :entities="entities"
        :subEntities="subEntities"
        :tableColumns="tableColumns"
        :context-menu="contextMenu"
    ></app-table>
</template>

<script setup>
import { StoreName } from "../store";
import {  inject } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import EventDomainListContextMenu from "../component/EventDomainListContextMenu.vue";
import EventDomainListLang from "../language/EventDomainListLang";

const { t: i18n } = useI18n({ messages: EventDomainListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, subEntities, contextMenu} = useInitList(StoreName,EventDomainListContextMenu, null, true);


</script>

<script>
export default {
    name: "EventDomainList",
};
</script>

<style scoped></style>
