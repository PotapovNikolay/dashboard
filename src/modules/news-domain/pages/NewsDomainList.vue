<template>
    <div class="row table__title">
        <div>{{ i18n("labels.news") }}</div>
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
import NewsDomainListLang from "../language/NewsDomainListLang";
import NewsDomainListContextMenu from "../component/NewsDomainListContextMenu.vue";

const useInitList = inject("useInitList");
const {entities, pagination, subEntities, contextMenu} = useInitList(StoreName,NewsDomainListContextMenu, null, true);

const { t: i18n } = useI18n({ messages: NewsDomainListLang, useScope: "local" });
const tableColumns = columns(i18n);

</script>

<script>
export default {
    name: "NewsDomainList",
};
</script>
