import EventMainTab from "../component/tabs/EventMainTab";
import EventMedia from "../component/tabs/EventMediaTab";
import EventTeams from "../component/tabs/EventTeamsTab";
import EventPlatformTab from "../component/tabs/EventPlatformTab";
import AppSeoTab from "../../../core/components/AppSeoTab";
import EventScoreTab from "../component/tabs/EventScoreTab";
import { shallowRef } from "vue";

const language = localStorage.language;

export const tabs = [
    {
        id:'main',
        name: language === "ru" ? "Главное" : "",
        component: shallowRef(EventMainTab),
        image: "main.svg",
    },

    {
        id:'platform',
        name: language === "ru" ? "Площадка" : "Platform",
        component: shallowRef(EventPlatformTab),
        image: "layers.svg",
    },

    {
        id:'media',
        name: language === "ru" ? "Медиа" : "Media",
        component: shallowRef(EventMedia),
        image: "images.svg",
    },
    {
        id:'teams',
        name: language === "ru" ? "Команды" : "Teams",
        component: shallowRef(EventTeams),
        image: "teams.svg",
    },

    {
        id:'seo',
        name: language === "ru" ? "Сео" : "Seo",
        component: shallowRef(AppSeoTab),
        image: "statistic.svg",
    },

    {
        id:'archive',
        name: language === "ru" ? "Архив" : "Archive",
        component: shallowRef(EventScoreTab),
        image: "archive.svg",
    },
];
