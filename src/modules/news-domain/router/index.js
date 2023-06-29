import DomainView from "../pages/NewsDomainView";
import DomainList from "../pages/NewsDomainList";

export default [
    {
        path: "/news-domain",
        component: DomainList,
        name: "news-domain.list",
        meta: {
            title: "Домены",
            breadcrumbs: [
                {
                    name: "Домены",
                    urlName: "news-domain.list",
                },
            ],
        },
    },

    {
        path: "/news-domain/new",
        component: DomainView,
        name: "news-domain.new",
        meta: {
            title: "Добавить домен",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "news-domain.list",
                },
            ],
        },
    },
    {
        path: "/news-domain/:host/edit",
        component: DomainView,
        name: "news-domain.edit",
        meta: {
            title: "Редактировать домен",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "news-domain.list",
                },
            ],
        },
    },
];
