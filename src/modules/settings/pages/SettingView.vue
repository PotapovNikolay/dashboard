<template>
    <app-nav-bar v-if="entity" :title="title" @save="save" :tabs="tabs" />
    
</template>

<script setup>

import { useI18n } from "vue-i18n";
import SettingsLang from "../language/SettingsLang";
import { reactive, ref, provide, onActivated, inject } from "vue";
import { entityItem ,errorsItem  } from "../helpers";
import { StoreName } from "../store";
import { tabs as tab } from "../helpers/tabs";
import { useStore } from "vuex";

const store = useStore();
const { t: i18n } = useI18n({ messages: SettingsLang, useScope: "local" });

const title = i18n("title");
const tabs = ref(tab);

const entity = reactive(entityItem)
const errors = reactive(errorsItem)
// const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem, null, null, true);

provide("entity", entity);
provide("errors", errors);

const save = async () =>{

    await store.dispatch(`${StoreName}/newOrUpdate`, entity);
}


onActivated(async () => {

    await store.dispatch(`${StoreName}/getPaymentSettings`);
});
</script>