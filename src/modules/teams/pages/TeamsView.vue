<template>
    <app-nav-bar v-if="entity" :title="title" @save="save()" :tabs="tabs" />
</template>

<script setup>
import { provide, ref,inject } from "vue";
import { useI18n } from "vue-i18n";
import { tabs as tab } from "../helpers/tabs";
import { entityItem, errorsItem } from "../helpers";
import TeamsViewLang from "../language/TeamsViewLang";
import { StoreName } from "../store";


const { t: i18n } = useI18n({ messages: TeamsViewLang, useScope: "local" });

const title = i18n("title");
const tabs = ref(tab);

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem);

provide("entity", entity);
provide("errors", errors);

</script>

<script>
export default {
    name: "TeamsView",
};
</script>

