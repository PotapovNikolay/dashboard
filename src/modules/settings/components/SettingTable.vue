<template>

    <div>

        <div class="table setting__table" v-if="entitiesCount">

            <div v-for="(entities, group_key) in entitiesGroups">

                <setting-table-item
                    :entities="entities"
                    :group_name="entitiesGroupNames[group_key]"
                    :group_key="group_key"
                ></setting-table-item>

            </div>

        </div>

        <div v-else class="table__empty">
            {{ emptyMessage ? emptyMessage : 'Ничего не найдено' }}
        </div>

        <app-pagination v-if="pagination && pagination.total !== 0 && pagination.last_page !== 1" :pagination="pagination" @paginate="$emit('paginate', $event)"></app-pagination>

    </div>

</template>

<script>

    import { get as lodashGet } from 'lodash'

    import SettingTableItem from "./SettingTableItem";
    import AppPagination from "../../../core/components/AppPagination";

    export default {

        components: {
            SettingTableItem, AppPagination
        },

        methods: {

            lodashGet: lodashGet,

        },

        props: ['entitiesGroups', 'pagination', 'emptyMessage', 'entitiesCount', 'entitiesGroupNames'],

        name: "AppTable",

    }
</script>
