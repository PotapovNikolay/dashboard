import TeamsMainTab from "../component/tabs/TeamsMainTab";
import TeamsMediaTab from "../component/tabs/TeamsMediaTab";
import { shallowRef } from "vue";

const language = localStorage.language;

export const tabs = [
    {
        id: "main",
        name: language === "ru" ? "Главное" : "Main",
        component: shallowRef(TeamsMainTab),
        image: "main.svg",
    },

    {
        id: "media",
        name: language === "ru" ? "Медиа" : "Media",
        component: shallowRef(TeamsMediaTab),
        image: "images.svg",
    },
];
