<template>
    <div class="row table__title">
        <div>{{ i18n("labels.news") }}</div>
        <router-link :to="{ name: 'news.new' }" class="tab tab_primary tab_first"> {{ i18n("buttons.add") }} </router-link>
    </div>
    <app-table
        v-if="entities"
        :entities="entities"
        :tableColumns="tableColumns"
        :pagination="pagination"
        :context-menu="contextMenu"
        @entity-click="openEntity"
    ></app-table>
</template>

<script setup>
import { StoreName } from "../store";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import NewsListLang from "../language/NewsListLang";
import NewsListContextMenu from "../component/NewsListContextMenu.vue";

const { t: i18n } = useI18n({ messages: NewsListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,NewsListContextMenu,'news');
const openEntity = (entity) => openEntityView("news.edit", entity);
</script>

<script>
export default {
    name: "NewsList",
};
</script>


<style scoped></style>
