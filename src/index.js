import App from "./core/App";
import { initStore, setStoreModules } from "./core/store";
import { router, setRouteModules } from "./core/router/index";
import { createApp } from "vue";

import Axios from "@axios";
import "./sass/app.scss";
import i18n from "./helpers/i18n";
import components from "./core/components/index";
import vClickOutside from "click-outside-vue3";
import useGlobalHooks from "./hooks/useGlobalHooks";

function getModules() {
    return Axios.get("/user/privileges");
}

function init(modules) {
    modules.push("settings");
    modules.push("orders");
    setRouteModules(modules);

    const app = createApp(App);
    app.provide("modules", modules)
    useGlobalHooks(app);

    components.forEach((component) => {
        app.component(component.name, component);
    });

    app.config.compilerOptions.isCustomElement = (tag) => {
        return tag.startsWith("app-");
    };

    app.use(vClickOutside);
    app.use(i18n);
    app.use(router);
    app.use(setStoreModules(modules, initStore));
    app.mount("#app");
}

Promise.all([getModules()]).then(([{ data }]) => {
    localStorage.is_impersonator = data.is_impersonator;
    init(data.modules);
});
