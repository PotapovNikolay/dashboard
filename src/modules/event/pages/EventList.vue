<template>
    <div class="order-module">
        <div class="row table__title">
            <div>{{ i18n("labels.events") }}</div>

            <router-link :to="{ name: 'events.new' }" class="tab tab_primary tab_first"> {{ i18n("buttons.add") }}</router-link>
        </div>
        <!--        @paginate="paginate"-->
        <app-table
            :entities="entities"
            :tableColumns="tableColumns"
            :pagination="pagination"
            :context-menu="contextMenu"
            @entity-click="openEntity"
        ></app-table>
    </div>
</template>

<script setup>
import { StoreName } from "../store";
import { inject,  } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import EventListLang from "../language/EventListLang";
import EventListContextMenu from "../component/EventListContextMenu.vue";

const { t: i18n } = useI18n({ messages: EventListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,EventListContextMenu);
const openEntity = (entity) => openEntityView("events.edit", entity);

</script>

<script>
export default {
    name: "EventList",
};
</script>
