import routes from "./router";
import { Store, StoreName } from "./store";
import { Store as PlatformVariantStore, StoreName as PlatformVariantStoreName } from "./modules/platformVariant/store";

const language = localStorage.language;

export default {
    routes: routes,

    store: {
        [StoreName]: Store,
        [PlatformVariantStoreName]: PlatformVariantStore,
    },

    sidebar: [
        {
            nav: [
                {
                    label: language === "ru" ? "Площадки" : "Platforms",
                    routerName: "platform.list",
                    extends: [
                        {
                            key: "add",
                            routeName: "platform.new",
                        },
                    ],
                },
            ],
            image: "layers.svg",
        },
    ],
};
