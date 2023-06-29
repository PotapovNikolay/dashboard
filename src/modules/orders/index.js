import orderRoutes from "./router";
import { Store, StoreName } from "./store";

export default {
    routes: orderRoutes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            label: "Заказы",
            nav: [
                {
                    label: "Заказы",
                    routerName: "order.list",
                },
                /*{
                    label: 'Создать заказ',
                    routerName: 'order.new'
                },*/
                /*{
                    label: 'Live',
                    routerName: 'order.live'
                },*/
            ],
            image: "order.svg",
        },
    ],
};
