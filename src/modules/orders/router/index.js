import OrderList from "../pages/OrderList";
import OrderView from "../pages/OrderView";
import OrderLiveList from "../pages/OrderLiveList";
import OrderNew from "../pages/OrderNew";

export default [
    {
        path: "/orders",
        component: OrderList,
        name: "order.list",
        meta: {
            title: "Заказы",
            breadcrumbs: [
                {
                    name: "Заказы",
                    urlName: "order.list",
                },
            ],
        },
    },

    {
        path: "/orders/new",
        component: OrderNew,
        name: "orders.new",
        meta: {
            title: "Создание заказа",
            breadcrumbs: [
                {
                    name: "Заказы",
                    urlName: "orders.list",
                },
            ],
        },
    },

    {
        path: "/orders/live",
        component: OrderLiveList,
        name: "orders.live",
        meta: {
            title: "Заказы",
            breadcrumbs: [
                {
                    name: "Заказы",
                    urlName: "orders.list",
                },
                {
                    name: "Live",
                },
            ],
        },
    },

    {
        path: "/orders/:id",
        component: OrderView,
        name: "orders.view",
        meta: {
            title: "Заказы",
            breadcrumbs: [
                {
                    name: "Заказы",
                    urlName: "orders.list",
                },
                {},
            ],
        },

        beforeEnter: (to, from, next) => {
            to.meta.breadcrumbs.pop();

            to.meta.breadcrumbs.push({
                name: "Заказ #" + to.params.id,
            });

            next();
        },
    },
];
