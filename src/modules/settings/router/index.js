import SettingList from "../pages/SettingList";
import SettingView from '../pages/SettingView'

const language = localStorage.language;
export default [
    {
        path: "/settings",
        component: SettingList,
        name: "setting.list",
        meta: {
            title: language === "ru" ? "Настройки" : "Settings",
            breadcrumbs: [
                {
                    name: "Настройки",
                    urlName: "setting.list",
                },
            ],
        },
    },

    {
        path: "/settings/new",
        component: SettingView,
        name: "settings.new",
        meta: {
            title: language === "ru" ? "Добавить платежку" : "Add payment",
            breadcrumbs: [
                {
                    name: "Платежки",
                    urlName: "settings.list",
                },
            ],
        },
    },
    {
        path: "/settings/:id/edit",
        component: SettingView,
        name: "settings.edit",
        meta: {
            title: language === "ru" ? "Редактировать платежку" : "Edit payment",
            breadcrumbs: [
                {
                    name: "Платежки",
                    urlName: "settings.list",
                },
            ],
        },
    },
];
