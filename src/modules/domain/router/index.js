import DomainView from "../pages/DomainView";
import DomainList from "../pages/DomainList";

const language = localStorage.language
export default [
    {
        path: "/domains",
        component: DomainList,
        name: "domains.list",
        meta: {
            title: language === "ru" ? "Домены" : "Domains",
            breadcrumbs: [
                {
                    name: "Домены",
                    urlName: "domains.list",
                },
            ],
        },
    },

    {
        path: "/domains/new",
        component: DomainView,
        name: "domains.new",
        meta: {
            title: language === "ru" ? "Добавить домен" : "Add domain",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "domains.list",
                },
            ],
        },
    },
    {
        path: "/domains/:host/edit",
        component: DomainView,
        name: "domains.edit",
        meta: {
            title: language === "ru" ? "Редактировать домен" : "Edit domain",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "domains.list",
                },
            ],
        },
    },
];
