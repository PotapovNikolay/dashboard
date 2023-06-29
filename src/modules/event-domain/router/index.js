import EventDomainView from "../pages/EventDomainView";
import EventDomainList from "../pages/EventDomainList";

const language = localStorage.language;
export default [
    {
        path: "/events-domain",
        component: EventDomainList,
        name: "events-domain.list",
        meta: {
            title: language === "ru" ? "Мероприятия" : "Events",
            breadcrumbs: [
                {
                    name: "Домены",
                    urlName: "events-domain.list",
                },
            ],
        },
    },

    {
        path: "/events-domain/new",
        component: EventDomainView,
        name: "events-domain.new",
        meta: {
            title: language === "ru" ? "Добавить мероприятие" : "Add event",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "events-domain.list",
                },
            ],
        },
    },
    {
        path: "/events-domain/:host/edit",
        component: EventDomainView,
        name: "events-domain.edit",
        meta: {
            title: language === "ru" ? "Редактировать мероприятие" : "Edit event",
            breadcrumbs: [
                {
                    name: "Домен",
                    urlName: "events-domain.list",
                },
            ],
        },
    },
];
