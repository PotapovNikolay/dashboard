import Main from "../component/tabs/NewsMainTab";
import Media from "../component/tabs/NewsMediaTab";
import AppSeoTab from "../../../core/components/AppSeoTab";
import { shallowRef } from "vue";

const language = localStorage.language;
export const tabs = [
    {
        id: "main",
        name: language === "ru" ? "Главное" : "Main",
        component: shallowRef(Main),
        image: "main.svg",
    },
    {
        id: "media",
        name: language === "ru" ? "Медиа" : "Media",
        component: shallowRef(Media),
        image: "images.svg",
    },
    {
        id: "seo",
        name: language === "ru" ? "СЕО" : "Seo",
        component: shallowRef(AppSeoTab),
        image: "statistic.svg",
    },
];
