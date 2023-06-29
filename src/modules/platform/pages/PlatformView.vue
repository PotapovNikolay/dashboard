<template>
    <app-nav-bar v-if="entity" :title="title" @save="save(entities)" :tabs="tabs" />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PlatformViewLang from "../language/PlatformViewLang";
import { inject,  provide,  ref } from "vue";
import { tabs as tab } from "../helpers/tabs";
import { StoreName } from "../store";
import { entityItem, errorsItem } from "../helpers";

const { t: i18n } = useI18n({ messages: PlatformViewLang, useScope: "local" });

const title = i18n("title");
const tabs = ref(tab);

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem, transformCoordsToArray);

provide("entity", entity);
provide("errors", errors);

function transformCoordsToArray() {
    Object.assign(entity, { coords: entity.coords.join() });
}


</script>
