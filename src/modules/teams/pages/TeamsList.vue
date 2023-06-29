<template>
    <div>
        <div class="row table__title" style="align-items: center">
            <div>{{ i18n("labels.teams") }}</div>

            <router-link :to="{ name: 'teams.new' }" class="tab tab_primary tab_first">{{ i18n("buttons.add") }} </router-link>

            <!--        <app-debounce-search v-model:value="teamsBySearch" ref="teamsSearch" urlString="/teams/search"></app-debounce-search>-->
        </div>
        <!--        :subEntities="teamsBySearch"-->

        <app-table
            v-if="entities"
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
import columns from "../helpers/columns";
import TeamsListLang from "../language/TeamsListLang";
import TeamsListContextMenu from "../component/TeamsListContextMenu.vue";

const { t: i18n } = useI18n({ messages: TeamsListLang, useScope: "local" });
const tableColumns = columns(i18n);

const {entities, pagination, contextMenu, openEntityView} = inject("useInitList")(StoreName,TeamsListContextMenu);
const openEntity = (entity) => openEntityView("teams.edit", entity);
</script>

<script>

export default {

    name: "TeamsList",
};
</script>

<style scoped></style>
