import TeamsView from "../pages/TeamsView";
import TeamsList from "../pages/TeamsList";

const language = localStorage.language;
export default [
    {
        path: "/teams",
        component: TeamsList,
        name: "teams.list",
        meta: {
            title: language === "ru" ? "Команды" : "Teams",
            breadcrumbs: [
                {
                    name: "Новости",
                    urlName: "teams.list",
                },
            ],
        },
    },

    {
        path: "/teams/new",
        component: TeamsView,
        name: "teams.new",
        meta: {
            title: language === "ru" ? "Добавить команду" : "Add team",
            breadcrumbs: [
                {
                    name: "Команды",
                    urlName: "teams.list",
                },
            ],
        },
    },
    {
        path: "/teams/:id/edit",
        component: TeamsView,
        name: "teams.edit",
        meta: {
            title: language === "ru" ? "Редактировать команду" : "Edit team",
            breadcrumbs: [
                {
                    name: "Команды",
                    urlName: "teams.list",
                },
            ],
        },
    },
];
