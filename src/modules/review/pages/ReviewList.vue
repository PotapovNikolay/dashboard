<template>
    <div class="order-module">
        <div class="row table__title">
            <div>{{ i18n( "labels.reviews") }} ({{ pagination.total }})</div>

            <router-link :to="{ name: 'review.new' }" class="tab tab_primary tab_first">
                {{ i18n( "buttons.add") }}
            </router-link>
        </div>

<!--        @paginate="paginate"-->
        <app-table
            :entities="entities"
            :tableColumns="tableColumns"
            :pagination="pagination"
            :context-menu="contextMenu"
            @entity-click="openEntity"
        ></app-table>
    </div>
</template>


<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import { StoreName } from "../store";
import ReviewListLang from "../language/ReviewListLang";
import columns from "../helpers/columns";
import ReviewContextMenu from "../component/ReviewContextMenu";

const { t: i18n } = useI18n({ messages: ReviewListLang, useScope: "local" });
const tableColumns = columns(i18n);

const useInitList = inject("useInitList");
const {entities, pagination, contextMenu, openEntityView} = useInitList(StoreName,ReviewContextMenu);
const openEntity = (entity) => openEntityView("review.edit", entity);

</script>
