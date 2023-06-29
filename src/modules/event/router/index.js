import EventList from "../pages/EventList";
import EventView from "../pages/EventView";

const language = localStorage.language;
export default [
    {
        path: "/event",
        component: EventList,
        name: "events.list",
        meta: {
            title: language === "ru" ? "Мероприятия" : "Events",
            breadcrumbs: [
                {
                    name: "Мероприятия",
                    urlName: "event.list",
                },
            ],
        },
    },

    {
        path: "/event/new",
        component: EventView,
        name: "events.new",
        meta: {
            title: language === "ru" ? "Добавить мероприятие" : "Add event",
            breadcrumbs: [
                {
                    name: "Мероприятие",
                    urlName: "event.list",
                },
            ],
        },
    },

    {
        path: "/event/:id/edit",
        component: EventView,
        name: "events.edit",
        meta: {
            title: language === "ru" ? "Мероприятие" : "Edit event",
            breadcrumbs: [
                {
                    name: "Мероприятие",
                    urlName: "event.list",
                },
            ],
        },
    },
];
