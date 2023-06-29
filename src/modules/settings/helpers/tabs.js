import SettingMainTab from "../components/tabs/SettingMainTab";
import { shallowRef } from "vue";

const language = localStorage.language;

export const tabs = [
    {
        id: "main",
        name: language === "ru" ? "Главное" : "Main",
        component: shallowRef(SettingMainTab),
        image: "main.svg",
    },
];
