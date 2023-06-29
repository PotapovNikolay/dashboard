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
                    label: language === "ru" ? "Мероприятия" : "Events",
                    routerName: "events.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "events.new",
                        },
                    ],
                },
            ],
            image: "calendar-week.svg",
        },
    ],
};
