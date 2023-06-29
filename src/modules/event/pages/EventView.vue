<template>
    <app-nav-bar v-if="entity" :title="title" @save="save()" :tabs="tabs" />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import EventViewLang from "../language/EventViewLang";
import { provide, ref, inject } from "vue";
import { entityItem, errors as initErrors } from "../helpers";
import { tabs as tab } from "../helpers/tabs";
import { StoreName } from "../store";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });
const axios = inject("useAxios");

const title = i18n("title");
const tabs = ref(tab);

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, initErrors, getSectorsForPlatformTab, transform);

provide("entity", entity);
provide("errors", errors);

function transform() {
    const data = {
        platform_variant_id: entity.platform_variant?.id,
        category_id: entity.category?.id,
        first_team_id: entity.first_team?.id,
        second_team_id: entity.second_team?.id,
    };

    entity.sectors.map((sector) => {
        sector.rows.map((row, key) => {
            Object.assign(row, {number:key})
        });
    });


    Object.assign(entity, data);
}

async function getSectorsForPlatformTab(entity) {
    const { data } = await axios.get(`/events/${entity.id}/sectors`);
    entity.sectors = data.entities;
}
</script>

<script>
export default {
    name: "EventView",
};
</script>
