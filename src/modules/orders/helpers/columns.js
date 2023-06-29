// export default function columns(i18n) {
//     return [
//         {
//             name: "id",
//             entityProp: "id",
//         },
//         {
//             name: i18n("tableColumns.team"),
//             entityProp: "name",
//         },

//         {
//             name: i18n("tableColumns.publish"),
//             entityProp: (service) => (service.publish ? i18n("labels.published") : i18n("labels.noPublished")),
//         },
//         {
//             name: i18n("tableColumns.dateCreate"),
//             entityProp: "created_at",
//         },
//         {
//             name: i18n("tableColumns.dateUpdate"),
//             entityProp: "updated_at",
//         },
//     ];
// }

export default function columns() {
    return [
        {
            name: "id",
            entityProp: (order) => {
                return order.id + 11100;
            },
        },
        {
            name: "Покупатель",
            entityProp: (order) => {
                return (order.buyer.surname ? order.buyer.surname : "") + " " + order.buyer.name;
            },
        },
        {
            name: "Всего",
            entityProp: "total_cost",
        },
        {
            name: "Дата заказа",
            entityProp: "created_at_short",
            titleProp: "created_at",
        },
        {
            name: "Статус заказа",
            entityProp: (order) => order.status.name,
        },
        // {
        //     name: "Всего",
        //     entityPropComponent: orderList_Total,
        // },
        // {
        //     name: "Дата заказа",
        //     entityProp: "created_at_short",
        //     titleProp: "created_at",
        // },
        // {
        //     name: "Статус заказа",
        //     entityPropComponent: orderList_Status,
        // },
        // {
        //     name: "Статус оплаты",
        //     entityProp: (order) => order.payment.name + ", " + (order.payment.isPaid ? "оплачен" : "не оплачен"),
        // },
        // {
        //     name: "Комментарий",
        //     entityPropComponent: orderListManagerComment,
        //     maxWidth: 250,
        // },
    ];
}
