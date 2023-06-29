import { shallowRef } from "vue";
import ConstructorMainTab from "../components/tabs/ConstructorMainTab";
import ConstructorStylesTab from "../components/tabs/ConstructorStylesTab";
const language = localStorage.language;
export const tabs = [
    {
        id: "main",
        name: language === "ru" ? "Главное" : "Main",
        image: "main.svg",
        component: shallowRef(ConstructorMainTab),
    },
    {
        id: "style",
        name: language === "ru" ? "Стили" : "Style",
        image: "brush.svg",
        // component: shallowRef(ConstructorStylesTab),
    },
    {
        id: "settings",
        name: language === "ru" ? "Настройки" : "Settings",
        image: "settings.svg",
        // component: shallowRef(ConstructorSettingsTab),
    },
];
