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
                    label: language === "ru" ? "Команды" : "Teams",
                    routerName: "teams.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "teams.new",
                        },
                    ],
                },
            ],
            image: "teams.svg",
        },
    ],
};
