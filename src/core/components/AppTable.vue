<template>
    <div class="app-table__container_journal-scroll" style="overflow-x: auto">
        <table class="table" v-if="entities.length">
            <thead class="thead">
                <tr>
                    <td class="" v-for="column in tableColumns" :style="{ maxWidth: column.maxWidth ? column.maxWidth + 'px' : '' }">
                        <!-- sorting_disabled sorting_up sorting_down -->
                        {{ column.name }}
                        <!-- <div class="table-sorting">
                            <div class="table-sorting__arrow-top table_arrow hide"></div>
                            <div class="table-sorting__arrow-down table_arrow active"></div>
                        </div> -->
                    </td>
                    <!-- <td class="table-sorting__wrap">
                        Покупатель
                        <div class="table-sorting">
                            <div class="table-sorting__arrow-top table_arrow active"></div>
                            <div class="table-sorting__arrow-down table_arrow"></div>
                        </div>
                    </td>
                    <td class="table-sorting__wrap">
                        Actions
                    </td>
                    -->
                </tr>
            </thead>

            <!--            v-if="subEntities?.length ? subEntities.includes(entity?.uuid) : entities"-->
            <tbody class="tbody">
                <tr
                    v-for="entity in entities"
                    :class="[subEntities?.includes(entity.id) ? 'table__item_current' : 'table__item']"
                    @click="$emit('entity-click', entity)"
                    @click.right.prevent="openContextMenu($event, entity)"
                >
                    <td
                        v-for="column in tableColumns"
                        :title="lodashGet(entity, column.titleProp, null)"
                        :style="{ maxWidth: column.maxWidth ? column.maxWidth + 'px' : '' }"
                    >
                        <template v-if="typeof column.entityProp === 'function'">
                            {{ column.entityProp(entity) }}
                        </template>
                        <template v-else-if="typeof column.entityProp === 'string'">
                            {{ lodashGet(entity, column.entityProp) }}
                        </template>
                        <template v-else-if="column.entityPropComponent">
                            <component v-bind:is="column.entityPropComponent" :entity="entity"></component>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else class="table__empty">
            {{ emptyMessage ? emptyMessage : "Ничего не найдено" }}
        </div>

        <app-pagination
            v-if="pagination && pagination.total !== 0 && pagination.last_page !== 1"
            :pagination="pagination"
            @paginate="$emit('paginate', $event)"
        ></app-pagination>

        <template v-if="contextMenu">
            <component ref="contextMenuRef" :is="contextMenu"></component>
        </template>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AppPagination from "./AppPagination";
import { get } from "lodash";
const contextMenuRef = ref(null);

const lodashGet = get;

const openContextMenu = (event, entity) => {
    if (contextMenu) {
        contextMenuRef.value.showContextMenu(event, entity);
    }
};

// function openContextMenu(event, entity) {
//     if (contextMenu) {
//         console.log(contextMenuRef);
//         contextMenuRef.showContextMenu(event, entity);
//     }
// }

const { entities, tableColumns, pagination, contextMenu, emptyMessage, subEntities } = defineProps([
    "entities",
    "tableColumns",
    "pagination",
    "contextMenu",
    "emptyMessage",
    "subEntities",
]);

// const emit = defineEmits(["entity-click"]);
</script>

<script>
export default {
    name: "AppTable",
};
</script>

<!--<script>-->
<!--import { get as lodashGet } from "lodash";-->
<!--import AppPagination from "./AppPagination";-->

<!--export default {-->
<!--    components: {-->
<!--        AppPagination,-->
<!--    },-->

<!--    methods: {-->
<!--        lodashGet: lodashGet,-->

<!--        openContextMenu(event, entity) {-->
<!--            if (this.contextMenu) {-->
<!--                this.$refs.contextMenu.showContextMenu(event, entity);-->
<!--            }-->
<!--        },-->
<!--    },-->

<!--    props: ["entities", "tableColumns", "pagination", "contextMenu", "emptyMessage", "subEntities"],-->

<!--    name: "AppTable",-->
<!--};-->
<!--</script>-->
