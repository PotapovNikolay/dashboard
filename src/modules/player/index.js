import playerRoutes from "./router";
import { Store, StoreName } from "./store";

export default {
    routes: playerRoutes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            nav: [
                {
                    label: "Игроки",
                    routerName: "player.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "player.new",
                        },
                    ],
                },
            ],

            image: "person-badge.svg",
        },
    ],
};
