<template>
    <app-nav-bar v-if="entity" :title="title" @save="save()" :tabs="tabs" />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import ReviewViewLang from "../language/ReviewViewLang";
import { inject, provide, ref } from "vue";
import { entityItem, errorsItem } from "../helpers";
import { tabs as tab } from "../helpers/tabs";
import { StoreName } from "../store";

const { t: i18n } = useI18n({ messages: ReviewViewLang, useScope: "local" });

const title = i18n("title");
const tabs = ref(tab);

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem);

provide("entity", entity);
provide("errors", errors);
</script>
