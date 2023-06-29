import Routes from "./router";
import { Store, StoreName } from "./store";

export default {
    routes: Routes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            nav: [
                {
                    label: "Номера",
                    routerName: "room.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "room.new",
                        },
                    ],
                },
            ],
            image: "rooms.svg",
        },
    ],
};
