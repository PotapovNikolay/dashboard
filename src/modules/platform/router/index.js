import PlatformList from "../pages/PlatformList";
import PlatformView from "../pages/PlatformView";
import PlatformVariantList from "../modules/platformVariant/pages/PlatformVariantList";
import PlatformVariantView from "../modules/platformVariant/pages/PlatformVariantView";

const language = localStorage.language;

export default [
    {
        path: "/platforms",
        component: PlatformList,
        name: "platform.list",
        meta: {
            title: language === "ru" ? "Площадки" : "Platforms",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
            ],
        },
    },

    {
        path: "/platforms/new",
        component: PlatformView,
        name: "platform.new",
        meta: {
            title: language === "ru" ? "Добавление площадки" : "Add platform",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
                {
                    name: "Добавление площадки",
                },
            ],
        },
    },

    {
        path: "/platforms/:id/edit",
        component: PlatformView,
        name: "platform.edit",
        meta: {
            title: language === "ru" ? "Редактирование площадки" : "Edit platform",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
            ],
        },
    },

    {
        path: "/platforms/:id/variants",
        component: PlatformVariantList,
        name: "platform.variants.list",
        meta: {
            title: language === "ru" ? "Варианты площадки" : "Variants of platform",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
            ],
        },
    },

    {
        path: "/platforms/:id?/variants/new",
        component: PlatformVariantView,
        name: "platform.variants.new",
        meta: {
            title: "Добавление варианта площадки",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
                {
                    name: "Добавление варианта площадки",
                },
            ],
        },
    },

    {
        path: "/platforms/:id/variants/:varId/edit",
        component: PlatformVariantView,
        name: "platform.variants.edit",
        meta: {
            title: "Редактирование варианта площадки",
            breadcrumbs: [
                {
                    name: "Площадки",
                    urlName: "platform.list",
                },
            ],
        },
    },
];
