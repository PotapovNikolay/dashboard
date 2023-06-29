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
                    label: language === "ru" ? "Мероприятия" : "Events",
                    routerName: "events-domain.list",
                },
            ],
            image: "calendar-week.svg",
        },
    ],
};
