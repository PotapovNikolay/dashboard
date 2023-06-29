<template>
    <div class="order-module">
        <div class="row table__title">
            <div>{{ i18n("labels.platforms") }}</div>

            <router-link :to="{ name: 'platform.new' }" class="tab tab_primary tab_first">
                {{ i18n("buttons.add") }}
            </router-link>
        </div>

        <app-table
            :entities="entities"
            :tableColumns="tableColumns"
            :context-menu="contextMenu"
            @entity-click="openEntity"
        ></app-table>
    </div>
</template>

<script setup>
import { StoreName } from "../store";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import PlatformListLang from "../language/PlatformListLang";
import columns from "../helpers/columns";
import PlatformContextMenu from "../component/PlatformContextMenu";

const { t: i18n } = useI18n({ messages: PlatformListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,PlatformContextMenu);
const openEntity = (entity) => openEntityView("platform.variants.list", entity);

</script>

<script>
export default {
    name: "PlatformList",
};
</script>
