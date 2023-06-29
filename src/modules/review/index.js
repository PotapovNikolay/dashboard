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
                    label: language === "ru" ? "Отзывы" : "Review",
                    routerName: "review.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "review.new",
                        },
                    ],
                },
            ],
            image: "reviews.svg",
        },
    ],
};
