<template>
    <div class="row table__title">
        <div>{{ i18n("labels.review") }}</div>
    </div>

    <!--    :subEntities="reviewOfDomain"-->
    <app-table :entities="entities" :tableColumns="tableColumns" :context-menu="contextMenu"></app-table>
</template>

<script setup>

import { StoreName } from "../store";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import ReviewDomainListLang from "../language/ReviewDomainListLang";
import ReviewDomainListContextMenu from "../component/ReviewDomainListContextMenu.vue";


const { t: i18n } = useI18n({ messages: ReviewDomainListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu} = useInitList(StoreName,ReviewDomainListContextMenu, null, true);

</script>

<script>
export default {
    name: "ReviewDomainList",
};
</script>
