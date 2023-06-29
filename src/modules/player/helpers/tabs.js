import Main from "../components/tabs/PlayerMainTab";
import Media from "../components/tabs/PlayerMediaTab";
import { shallowRef } from "vue";

export const tabs = [
    {
        name: "Главное",
        component: shallowRef(Main),
    },

    {
        name: "Медиа",
        component: shallowRef(Media),
    },
];
