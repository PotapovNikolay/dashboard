<template>
    <div class="order-module">
        <div class="row table__title">
            <div>{{ i18n("labels.blocks") }}</div>
            <router-link :to="{ name: 'blocks.new' }" class="tab tab_primary tab_first" style="background-color: white">
                {{ i18n("buttons.add") }}
            </router-link>
        </div>

        <!--        @paginate="paginate"-->
        <app-table
            :pagination="pagination"
            :table-columns="tableColumns"
            :entities="entities"
            :context-menu="contextMenu"
            @entity-click="openEntity"
        >
        </app-table>
    </div>
</template>

<script setup>

import { StoreName } from "../store";
import { inject, } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import ConstructorListLang from "../language/ConstructorListLang";
import ConstructorListContextMenu from "../components/ConstructorListContextMenu.vue";

const { t: i18n } = useI18n({ messages: ConstructorListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,ConstructorListContextMenu,'tableBlocks');
const openEntity = (entity) => openEntityView("blocks.edit", entity);
</script>

<script>
export default {
    name: "ConstructorList",
};
</script>
