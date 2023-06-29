<template>
    <div v-if="entity">
        <div class="page_title">
            Заказ #{{ entity.id }}
            <!--  / 2 июня 10:00 -->
        </div>

        <div class="row">
            <div class="order-view__item">
                <div class="table-title">Общая информация</div>
                <table class="order-view__table">
                    <tbody>
                        <tr>
                            <td class="order-view__table-key">Номер заказа</td>
                            <td>
                                {{ entity.id }}
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Дата заказа</td>
                            <td>
                                {{ entity.created_at }}
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Статус заказа</td>
                            <td>
                                <app-select
                                    v-model="entity.status.id"
                                    :options="statuses"
                                    :no-selected="false"
                                    @input="updateOrderStatus"
                                    class="order-view__select"
                                ></app-select>
                            </td>
                        </tr>
                        <tr v-if="order.promocode">
                            <td class="order-view__table-key">Промокод</td>
                            <td>{{ entity.promocode.name }} ({{ entity.promocode.discount }}%)</td>
                        </tr>
                        <tr v-if="entity.points">
                            <td class="order-view__table-key">Использовано баллов</td>
                            <td>{{ entity.points }} б.</td>
                        </tr>
                        <!-- <tr>
                        <td class="order-view__table-key">Общая стоимость</td>
                        <td v-if="entity.total_cost_with_discount === entity.total_cost">{{ $numberFormat(entity.total_cost) }} руб</td>
                        <td v-else>
                            <s>{{ $numberFormat(order.total_cost) }} руб</s> {{ $numberFormat(order.total_cost_with_discount) }} руб
                        </td>
                    </tr> -->
                    </tbody>
                </table>

                <div v-if="entity.additionalInfo" class="order-view__sale-list">
                    <div v-for="additionalInfo in entity.additionalInfo" class="order-view__sale">
                        {{ additionalInfo.info }}
                    </div>
                </div>
            </div>

            <div class="order-view__item">
                <div class="table-title">Контакты</div>

                <table class="order-view__table">
                    <tbody>
                        <tr>
                            <td class="order-view__table-key">Имя</td>
                            <td>
                                {{ entity.buyer.name }}
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Телефон</td>
                            <td>
                                {{ entity.buyer.phone }}
                            </td>
                        </tr>
                        <tr v-if="entity.buyer.email">
                            <td class="order-view__table-key">Е-mail</td>
                            <td>
                                <a :href="'mailto:' + entity.buyer.email" class="link" target="_blank">{{ order.buyer.email }}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="order-view__item">
                <div class="table-title">Доставка</div>

                <table class="order-view__table">
                    <tbody>
                        <tr v-if="order.deliveryAddress">
                            <td class="order-view__table-key">Адрес</td>
                            <td>
                                {{ order.deliveryAddress }}
                            </td>
                        </tr>
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
                                {{ order.payment.name }}
                            </td>
                        </tr>
                        <tr>
                            <td class="order-view__table-key">Статус</td>
                            <td>
                                <app-select
                                    v-model="order.paid"
                                    :options="[
                                        {
                                            id: 0,
                                            name: 'Не оплачен',
                                        },
                                        {
                                            id: 1,
                                            name: 'Оплачен',
                                        },
                                    ]"
                                    :no-selected="false"
                                    @input="updatePaid"
                                    class="order-view__select"
                                ></app-select>
                            </td>
                            <td v-if="order.payment.link">
                                <span @click="copyText(order.payment.link)" style="color: #3962d7; cursor: pointer"
                                    >Скопировать ссылку на оплату</span
                                >
                            </td>
                        </tr>
                        <tr v-if="order.payment.order_id">
                            <td class="order-view__table-key">Платежный шлюз - id Заказа</td>
                            <td>
                                {{ order.payment.order_id }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="order-view__item" v-if="order.userComment">
                <div class="table-title">Комментарий пользователя</div>

                <div class="order-view__table-comment">
                    {{ order.userComment }}
                </div>
            </div>

            <div class="order-view__item">
                <div class="table-title">Комментарий менеджера</div>

                <textarea class="order-view__table-comment" v-model="order.managerComment" @input="managerCommentDebounce()"></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from "vue";

const entity = inject("entity");
const errors = inject("errors");
</script>

<style scoped></style>
