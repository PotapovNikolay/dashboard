import ReviewList from "../pages/ReviewList";
import ReviewView from "../pages/ReviewView";

const language = localStorage.language;

export default [
    {
        path: "/reviews",
        component: ReviewList,
        name: "review.list",
        meta: {
            title: language === "ru" ? "Отзывы" : "Review",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review.list",
                },
            ],
        },
    },

    {
        path: "/reviews/new",
        component: ReviewView,
        name: "review.new",
        meta: {
            title: language === "ru" ? "Создание отзыва" : "Create review",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review.list",
                },
                {
                    name: "Создание отзыва",
                },
            ],
        },
    },

    {
        path: "/reviews/:id/edit",
        component: ReviewView,
        name: "review.edit",
        meta: {
            title: language === "ru" ? "Редактирование отзыва" : "Edit review",
            breadcrumbs: [
                {
                    name: "Отзывы",
                    urlName: "review.list",
                },
                {},
            ],
        },

        beforeEnter: (to, from, next) => {
            to.meta.breadcrumbs.pop();

            to.meta.breadcrumbs.push({
                name: "Отвыз #" + to.params.id,
            });

            next();
        },
    },
];
