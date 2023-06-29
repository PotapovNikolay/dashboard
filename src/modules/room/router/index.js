import RoomList from "../pages/RoomList";
import RoomView from "../pages/RoomView";

export default [
    {
        path: "/rooms",
        component: RoomList,
        name: "room.list",
        meta: {
            title: "Номера",
            breadcrumbs: [
                {
                    name: "Номера",
                    urlName: "room.list",
                },
            ],
        },
    },

    {
        path: "/rooms/new",
        component: RoomView,
        name: "room.new",
        meta: {
            title: "Добавить номер",
            breadcrumbs: [
                {
                    name: "Номер",
                    urlName: "room.list",
                },
            ],
        },
    },

    {
        path: "/rooms/:id/edit",
        component: RoomView,
        name: "room.edit",
        meta: {
            title: "Номер",
            breadcrumbs: [
                {
                    name: "Номер",
                    urlName: "room.list",
                },
            ],
        },
    },
];
