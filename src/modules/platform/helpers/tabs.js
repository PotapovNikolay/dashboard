import PlatformMain from "../component/tabs/PlatformMainTab.vue";
import PlatformMedia from "../component/tabs/PlatformMediaTab.vue";
import AppSeoTab from "../../../core/components/AppSeoTab";
import { shallowRef } from "vue";

const language = localStorage.language;

export const tabs = [
    {
        id:"main",
        name: language === "ru" ? "Главное" : "Main",
        component: shallowRef(PlatformMain),
        image: "main.svg",
    },
    {
        id:"media",
        name: language === "ru" ? "Медиа" : "Media",
        component: shallowRef(PlatformMedia),
        image: "images.svg",
    },
    {
        id:"seo",
        name: language === "ru" ? "Сео" : "Seo",
        component: shallowRef(AppSeoTab),
        image: "statistic.svg",
    },
];
