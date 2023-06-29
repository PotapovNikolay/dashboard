import { shallowRef } from "vue";
import OrderMainTab from "../components/tabs/OrderMainTab";
import OrderTicketTab from "../components/tabs/OrderTicketTab";

export const tabs = [
    {
        name: "Главное",
        component: shallowRef(OrderMainTab),
        image: "main.svg",
    },
    {
        name: "Билеты",
        component: shallowRef(OrderTicketTab),
        image: "ticket-perforated.svg",
    },
];
