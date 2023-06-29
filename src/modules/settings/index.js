import productRoutes from "./router";
import { Store, StoreName } from "./store";

const language = localStorage.language;
export default {
    routes: productRoutes,

    store: { [StoreName]: Store },

    sidebar: [
        {
            label: language === "ru" ? "Настройки" : "Settings",
            nav: [
                {
                    label: "Настройки",
                    routerName: "setting.list",
                },
            ],
            image: "settings.svg",
        },
    ],
};
