<template>
    <div class="order-view__item edit_order">
        <div class="order-view__item-header">Билеты</div>

        <table class="order-view__products-table">
            <thead>
                <tr>
                    <td class="order-view__products-name">Событие</td>
                    <td>Название</td>
                    <td>Цена</td>
                    <td>Кол-во</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in order.items">
                    <td class="order-view__products-name">
                        <a :href="item.event_url" target="_blank">{{ item.event_name }}</a>
                    </td>

                    <td>
                        {{ item.name }}
                    </td>

                    <td>
                        {{ item.price }}
                    </td>

                    <td>
                        {{ item.places ? item.places : 1 }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        order: {
            type: Object,
        },
        errors: {
            type: Object,
        },
    },

    name: "OrderTicketTab",
};
</script>

<style scoped></style>
