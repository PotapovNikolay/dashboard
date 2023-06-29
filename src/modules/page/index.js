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
                    label: language === "ru" ? "Cтраницы" : "Pages",
                    routerName: "pages.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "pages.new",
                        },
                    ],
                },
            ],
            image: "pages.svg",
        },
    ],
};
