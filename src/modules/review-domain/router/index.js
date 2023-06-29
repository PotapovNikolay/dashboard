import ReviewDomainView from "../pages/ReviewDomainView";
import ReviewDomainList from "../pages/ReviewDomainList";

const language = localStorage.language;
export default [
    {
        path: "/review-domain",
        component: ReviewDomainList,
        name: "review-domain.list",
        meta: {
            title: language === "ru" ? "Отзывы" : "Reviews",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review-domain.list",
                },
            ],
        },
    },

    {
        path: "/review-domain/new",
        component: ReviewDomainView,
        name: "review-domain.new",
        meta: {
            title: "Добавить домен",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review-domain.list",
                },
            ],
        },
    },
    {
        path: "/news-domain/:host/edit",
        component: ReviewDomainView,
        name: "review-domain.edit",
        meta: {
            title: "Редактировать домен",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review-domain.list",
                },
            ],
        },
    },
];
