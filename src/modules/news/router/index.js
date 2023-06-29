import NewsView from "../pages/NewsView";
import NewsList from "../pages/NewsList";

const language = localStorage.language;
export default [
    {
        path: "/news",
        component: NewsList,
        name: "news.list",
        meta: {
            title: language === "ru" ? "Новости" : "News",
            breadcrumbs: [
                {
                    name: "Новости",
                    urlName: "news.list",
                },
            ],
        },
    },

    {
        path: "/news/new",
        component: NewsView,
        name: "news.new",
        meta: {
            title: language === "ru" ? "Добавить новость" : "Add news",
            breadcrumbs: [
                {
                    name: "Новости",
                    urlName: "news.list",
                },
            ],
        },
    },
    {
        path: "/news/:id/edit",
        component: NewsView,
        name: "news.edit",
        meta: {
            title: language === "ru" ? "Редактировать новость" : "Edit news",
            breadcrumbs: [
                {
                    name: "Новости",
                    urlName: "news.list",
                },
            ],
        },
    },
];
