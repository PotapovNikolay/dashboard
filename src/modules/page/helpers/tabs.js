import PageMain from "../components/tabs/PageMainTab";
import { shallowRef } from "vue";
import PageConstructor from "../components/tabs/PageConstructorTab";

const language = localStorage.language;
export const tabs = [
    {
        name: language === "ru" ? "Главное" : "Main",
        image: "settings.svg",
        component: shallowRef(PageMain),
    },
    {
        name: language === "ru" ? "Конструктор" : "Designer",
        image: "columns.svg",
        component: shallowRef(PageConstructor),
    },
];
