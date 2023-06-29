<template>

    <div class="order-module">

        <div class="order__info-text">
            Автоматическая загрузка новых заказов каждые {{ intervalTime / 1000 }} сек.
        </div>

        <app-table :entities="orders"
                   :tableColumns="tableColumns"
                   @entity-click="openOrderView"
                   :context-menu="orderListContextMenu"
                   empty-message="Новые заказы отсутствуют"
        ></app-table>

    </div>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex';
    import { StoreName } from '../store'

    import orderList_Status from "../components/orderList_Status";
    import orderListContextMenu from "../components/orderList_contextMenu";

    export default {

        data() {

            return {

                tableColumns: [
                    {
                        name: 'id',
                        entityProp: 'id'
                    },
                    {
                        name: 'Покупатель',
                        entityProp: (order) => {
                            return (order.buyer.surname ? order.buyer.surname : '' )
                                + ' ' + order.buyer.name
                                + ' ' + (order.buyer.middleName ? order.buyer.middleName : '') ;
                        }
                    },
                    {
                        name: 'Всего',
                        entityProp: order => this.$numberFormat(order.total_cost)
                    },
                    {
                        name: 'Дата заказа',
                        entityProp: 'created_at_short',
                        titleProp: 'created_at'
                    },
                    {
                        name: 'Статус',
                        entityPropComponent: orderList_Status
                    },
                    {
                        name: 'Комментарий',
                        entityProp: 'managerComment',
                        maxWidth: 250,
                    },
                ],

                orderListContextMenu: orderListContextMenu,

                interval: null,

                intervalTime: 10000,
            }
        },

        computed: {

            ...mapGetters(StoreName , {
                orders: 'getNewOrders'
            })
        },

        methods: {

            ...mapActions(StoreName, ['getLiveOrders']),

            openOrderView(entity) {

                this.$router.push({ name: 'order.view', params: { id: entity.id } });
            },

            async startWatchNewOrders() {

                await this.getLiveOrders();

                if (!this.interval) {

                    this.interval = setInterval(async () => {

                        await this.getLiveOrders();

                    }, this.intervalTime);
                }
            }
        },

        async activated() {

            await this.startWatchNewOrders();
        },

        deactivated() {

            clearInterval(this.interval);

            this.interval = null;
        },

        beforeDestroy() {

            clearInterval(this.interval);

            this.interval = null;
        },

        name: "OrderList"
    }
</script>