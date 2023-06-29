<template>
    <div>
        <div class="row table__title" style="align-items: center">
            <div>{{ i18n("labels.pay") }}</div>

            <router-link :to="{ name: 'settings.new' }" class="tab tab_primary tab_first">{{ i18n("buttons.add") }} </router-link>
        </div>
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
import SettingsListLang from "../language/SettingsListLang";
import SettingListContextMenu from "../components/SettingListContextMenu.vue";

const { t: i18n } = useI18n({ messages: SettingsListLang, useScope: "local" });
const tableColumns = columns(i18n);

const { entities, pagination, contextMenu, openEntityView } = inject("useInitList")(StoreName, SettingListContextMenu);
const openEntity = (entity) => openEntityView("settings.edit", entity);
</script>

<script>
export default {
    name: "TeamsList",
};
</script>

<style scoped></style>


