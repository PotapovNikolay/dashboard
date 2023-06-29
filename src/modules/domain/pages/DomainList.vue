<template>
    <div class="row table__title">
        <div>{{ i18n("labels.domains") }}</div>
        <router-link :to="{ name: 'domains.new' }" class="tab tab_primary tab_first"> {{ i18n("buttons.add") }}</router-link>
    </div>


    <app-table
        :entities="entities"
        :tableColumns="tableColumns"
        :context-menu="domainListContextMenu"
        @entity-click="openEntityView"
    ></app-table>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import DomainListLang from "../language/DomainListLang";
import columns from "../helpers/columns";
import { computed, onActivated, shallowRef } from "vue";
import { StoreName } from "../store";
import DomainListContextMenu from "../component/DomainListContextMenu";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useStore();
const domainStore = store.state[StoreName];
const entities = computed(() => domainStore.entities.domains);
const pagination = computed(() => domainStore.pagination);

const { t: i18n } = useI18n({ messages: DomainListLang, useScope: "local" });
const tableColumns = columns(i18n);


onActivated(async () => {
    await store.dispatch(`${StoreName}/getDomains`);
});

async function openEntityView(entity) {
    await router.push({
        name: "domains.edit",
        params: { host: entity.host },
    });
}

const domainListContextMenu = shallowRef(DomainListContextMenu);
</script>

<script>
export default {
    name: "DomainList",
};
</script>

<style scoped></style>
