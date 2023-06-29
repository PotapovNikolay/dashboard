import routes from "./router";
import { Store, StoreName } from "./store";

const language = localStorage.language;
export default {
    routes: routes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            nav: [
                {
                    label: language === "ru" ? "Домены" : "Domains",
                    routerName: "domains.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "domains.new",
                        },
                    ],
                },
            ],
            image: "globe-americas.svg",
        },
    ],
};
