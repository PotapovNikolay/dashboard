<template>
    <div class="order-module-view module-style">

        <div class="page_title">
            Заказ
        </div>

        <div class="row">

            <div class="order-view__item">
                <div class="table-title">Общая информация</div>
                <table class="order-view__table">
                    <tbody>
                       
                        <tr>
                            <td class="order-view__table-key">Статус заказа</td>
                            <td>
                               <app-select v-model="order.status.id"
                                            :options="statuses"
                                            :no-selected="false"
                                            class="order-view__select"
                                ></app-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Общая стоимость</td>
                            <td>
                                {{ $numberFormat(order.total_cost) }} руб
                            </td>
                        </tr>

                    </tbody>
                </table>

             

            </div>

            <div class="order-view__item">

                <div class="table-title">Контакты</div>

                <table class="order-view__table">
                    <tbody>
                        <tr>
                            <td class="order-view__table-key">Имя</td>
                            <td>
                                <input name="name" type="text" v-model="order.name">
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Фамилия</td>
                            <td>
                                 <input name="surname" type="text" v-model="order.last_name">
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Отчество</td>
                            <td>
                                 <input name="otchestvo" type="text" v-model="order.surname">
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Телефон</td>
                            <td>
                                <input name="telephone" type="tel" v-model="order.phone">
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Е-mail</td>
                            <td>
                                <input name="email" type="email" v-model="order.email">
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="order-view__item">

                <div class="table-title">Доставка</div>

                <table class="order-view__table">
                    <tbody>

                        <tr>
                            <td class="order-view__table-key">Способ</td>
                            <td>
                                <app-select v-model="order.delivery.id"
                                            :options="deliveries"
                                            :no-selected="true"
                                            class="order-view__select"
                                ></app-select>
                            </td>
                        </tr>

                        <component v-bind:is="deliveryComponents[order.delivery.id]"></component>

                        <template>
                            <tr>
                                <td class="order-view__table-key">Стоимость</td>
                                <td>input руб</td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>

            <div class="order-view__item">

                <div class="table-title">Оплата</div>

                <table class="order-view__table">
                    <tbody>
                        <tr>
                            <td class="order-view__table-key">Способ</td>
                            <td>
                                <app-select v-model="order.payment.id"
                                            :options="payments"
                                            :no-selected="false"

                                            class="order-view__select"
                                ></app-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Статус</td>
                            <td>
                                <app-select v-model="order.paid"
                                            :options="[{
                                                id: 0,
                                                name: 'Не оплачен'
                                            }, {
                                                id: 1,
                                                name: 'Оплачен'
                                            }]"
                                            :no-selected="false"
                                            class="order-view__select"
                                ></app-select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="order-view__item">

                <div class="table-title">Комментарий покупателя</div>

                
                    <textarea class="order-view__table-comment"
                          v-model="order.userComment"
                          @input="managerCommentDebounce()"
                ></textarea>
                

            </div>

            <div class="order-view__item">

                <div class="table-title">Комментарий менеджера</div>

                <textarea class="order-view__table-comment"
                          v-model="order.managerComment"
                          @input="managerCommentDebounce()"
                ></textarea>

            </div>

        </div>

        <div class="order-view__item edit_order">
            <div class="order-view__item-header">
                Товары <span class="item_qty">({{ order.products.length }} {{ $number2Word(order.products.length, ['товар', 'товара', 'товаров']) }})</span>

                <!-- <a href="#" class="link order-view__link">Изменить</a> -->
            </div>

            <order-search @add-product="addProductToOrder"></order-search>


            <table class="order-view__products-table">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>Артикул</td>
                        <td class="order-view__products-name">Название</td>
                        <td>Цена</td>
                        <td>Скидка</td>
                        <td>Кол-во</td>
                        <td>Вес</td>
                        <td>Сумма</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in order.products">
                        <td>{{ product.id }}</td>
                        <td>{{ product.article }}</td>
                        <td class="order-view__products-name">
                            <a :href="product.url" class="link" target="_blank">

                                {{ product.name }}
                            </a>
                        </td>
                        <td>
                            {{ product.price }}
                        </td>
                        <td>
                            {{ product.sale }}
                        </td>
                        <td>
                            <input type="text" class="input_edit input_qty"
                                   v-model="product.quantity"
                                   @input="test(product)"
                            /> шт.
                        </td>
                        <td>
                            {{ product.weight }}
                        </td>
                        <td>
                            {{$numberFormat(product.quantity * product.price)}}
                        </td>
                        <td>
                            <span class="del"
                                  @click="removeProductFromOrder(product)"
                                  title="Убрать"
                            >&times;</span>
                        </td>

                    </tr>
                </tbody>
            </table>



        </div>

        <button class="btn btn_primary order-filter__btn">Оформить заказ</button>

    </div>
</template>

<script>

    import { mapState, mapGetters, mapActions } from 'vuex';
    import { Store, StoreName } from '../store'

    import Pickup from "../components/deliveries/Pickup";
    import Courier from "../components/deliveries/Courier";
    import Express from "../components/deliveries/Express";
    import RussianPost from "../components/deliveries/RussianPost";
    import Sdek from "../components/deliveries/Sdek";

    import orderSearch from '../components/orderSearch'

    const orderPrototype = {
        status: {
            id: 0,
        },
        name: null,
        last_name: null,
        surname: null,
        phone: null,
        email: null,
        delivery: {
            id: 0,
            cost: 0,
        },

        payment: {
            id: 0
        },

        paid: 0,

        products: [],

        userComment: null,
        managerComment: null,
    };

    export default {

        data() {
            return {

                order: Object.assign({}, orderPrototype),

                deliveryComponents: {
                    '0': null,
                    pickup: Pickup,
                    courier: Courier,
                    express: Express,
                    russian_post: RussianPost,
                    sdek: Sdek
                },

            }
        },

        computed: {

            // ...mapState('orderStatus' , { statuses: state => state.orderStatuses }),
            ...mapState('delivery' , { deliveries: state => state.deliveries }),
            ...mapState('payment' , { payments: state => state.payments }),
            // ...mapGetters('orderStatus' , { getStatusById: 'getStatusById' }),
        },

        methods: {

            addProductToOrder(product) {

                this.$set(product, 'quantity', 1);
                this.order.products.push(product);

            },

            removeProductFromOrder(product) {
                let i = product.id;
                let pos = this.order.products.indexOf(i,0)
                this.order.products.splice(pos, 1);
                //this.order.products.splice(i, 1);
                //console.log(this.order.products.splice(i, 1))
            },

            test(product) {

                product.quantity = product.quantity.replace(/\D/, '');
            }

        },

        components: {
            orderSearch,

            Pickup
        },

        name: "OrderNew"
    }
</script>

<style  scoped>
    input {
        width: 200px;
        padding: 1px;
        border-radius: 0.25rem;
        font-size: 13px;
        border: 1px solid #ced4da;
        letter-spacing: 0.02em;
        
    }
</style>