import Routes from "./router";
import { Store, StoreName } from "./store";

const language = localStorage.language;

export default {
    routes: Routes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            nav: [
                {
                    label: language === "ru" ? "Блоки" : "Blocks",
                    routerName: "blocks.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "blocks.new",
                        },
                    ],
                },
            ],
            image: "columns.svg",
        },
    ],
};
