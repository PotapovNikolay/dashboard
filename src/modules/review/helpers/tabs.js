import { shallowRef } from "vue";
import ReviewMainTab from "../component/tabs/ReviewMainTab";
import ReviewMediaTab from "../component/tabs/ReviewMediaTab";

const language = localStorage.language;
export const tabs = [
    {
        id: "main",
        name: language === "ru" ? "Главное" : "Main",
        component: shallowRef(ReviewMainTab),
        image: "main.svg",
    },

    {
        id: "media",
        name: language === "ru" ? "Медиа" : "Media",
        component: shallowRef(ReviewMediaTab),
        image: "images.svg",
    },
];
