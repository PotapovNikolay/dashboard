<template>
    <div class="order-module">
        <div class="row table__title">
            <div>{{ i18n("labels.pages") }}</div>
            <router-link :to="{ name: 'pages.new' }" class="tab tab_primary tab_first" style="background-color: white">
                {{ i18n("buttons.add") }}
            </router-link>
        </div>

        <app-table
            :entities="entities"
            :tableColumns="tableColumns"
            :context-menu="contextMenu"
            @entity-click="openEntity"
            :pagination="pagination"
        />
    </div>
</template>

<script setup>

import { StoreName } from "../store";
import { inject } from "vue";
import PageListLang from "../language/PageListLang";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import PageListContextMenu from "../components/PageListContextMenu.vue";


const { t: i18n } = useI18n({ messages: PageListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,PageListContextMenu,'pages');
const openEntity = (entity) => openEntityView("pages.edit", entity);

</script>
