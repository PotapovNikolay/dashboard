import PageList from "../pages/PageList";
import PageView from "../pages/PageView";

const language = localStorage.language;
export default [
    {
        path: "/pages",
        component: PageList,
        name: "pages.list",
        meta: {
            title: language === "ru" ? "Страницы" : "Pages",
            breadcrumbs: [
                {
                    name: "Страницы",
                    urlName: "pages.list",
                },
            ],
        },
    },

    {
        path: "/pages/new",
        component: PageView,
        name: "pages.new",
        meta: {
            title: language === "ru" ? "Добавить страницу" : "Add a page",
            breadcrumbs: [
                {
                    name: "Страница",
                    urlName: "pages.list",
                },
            ],
        },
    },
    {
        path: "/pages/:id/edit",
        component: PageView,
        name: "pages.edit",
        meta: {
            title: language === "ru" ? "Редактировать страницу" : "Editing a page",
            breadcrumbs: [
                {
                    name: "Страница",
                    urlName: "pages.list",
                },
            ],
        },
    },
];
