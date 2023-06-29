<template>
    <div class="order-module">
        <div class="row table__title">
            <div>
                Заказы
                <span class="item_qty"
                    >({{ pagination.total }} {{ number2Word(pagination.total, ["заказ", "заказа", "заказов"]) }})</span
                >
            </div>

            <!-- <span class="tab">Статистика</span> -->
        </div>

        <!-- <order-filter ref="orderFilter"></order-filter>-->

        <div v-if="entities">
            <app-table
            :entities="entities"
            :tableColumns="tableColumns"
            :pagination="pagination"
            :context-menu="contextMenu"
            @entity-click="openEntity"
        ></app-table> 
        </div>
    </div>
</template>

<script setup>
import orderListContextMenu from "../components/orderList_contextMenu";
import columns from "../helpers/columns";
import { inject } from "vue";
import { StoreName } from "../store";

const { numberFormat, number2Word } = inject("useHelpers")();

const tableColumns = columns()

const { entities, pagination, contextMenu, openEntityView } = inject("useInitList")(StoreName, orderListContextMenu);
const openEntity = (entity) => openEntityView("orders.view", entity);

</script>

<!-- <script>
import { mapState, mapActions } from "vuex";
import { ScrollTop } from "../../../mixins";

import { StoreName } from "../store";

import orderFilter from "../components/orderFilter";
import orderList_Status from "../components/orderList_Status";
import orderList_Total from "../components/orderList_Total";

import orderListManagerComment from "../components/orderList_ManagerComment";
import lodashGet from "lodash/get";


export default {
    data() {
        return {
            tab: null,

            orderListContextMenu: orderListContextMenu,

            
        };
    },

    computed: {
        ...mapState(StoreName, {
            items: (state) => state.orders,
            pagination: (state) => state.pagination,
        }),
    },

    methods: {
        ...mapActions(StoreName, ["getItems"]),

        paginate(page) {
            this.getItems(Object.assign({ page: page }));
        },

        openOrderView(entity) {
            this.$router.push({ name: "order.view", params: { id: entity.id } });
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            let user_id = lodashGet(to, "params.filter.user_id", null);

            if (user_id) {
                vm.$refs.orderFilter.set("user_id", user_id);
            }

            vm.getItems();
        });
    },

    components: {
        orderFilter,
    },

    mixins: [ScrollTop],

    name: "OrderList",
};
</script> -->
