import ConstructorList from "../pages/ConstructorList";
import ConstructorView from "../pages/ConstructorView";

const language = localStorage.language;
export default [
    {
        path: "/blocks",
        component: ConstructorList,
        name: "blocks.list",
        meta: {
            title: language === "ru" ? "Блоки" : "Blocks",
            breadcrumbs: [
                {
                    name: "КонструкторЛист",
                    urlName: "blocks.list",
                },
            ],
        },
    },

    {
        path: "/blocks/new",
        component: ConstructorView,
        name: "blocks.new",
        meta: {
            title: language === "ru" ? "Добавить блок" : "Add block",
            breadcrumbs: [
                {
                    name: "Компонент",
                    urlName: "blocks.list",
                },
            ],
        },
    },

    {
        path: "/blocks/:id/edit",
        component: ConstructorView,
        name: "blocks.edit",
        meta: {
            title: language === "ru" ? " Редактировать блок" : "Edit block",
            breadcrumbs: [
                {
                    name: "Компонент",
                    urlName: "blocks.list",
                },
            ],
        },
    },
];
