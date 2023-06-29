import { createStore } from "vuex";
import loader from "./modules/loader";
import adaptive from "./modules/adaptive";

let modules = {};

function setStoreModules(model, callback) {
    model.forEach((moduleName) => {
        const module = require("../../modules/" + moduleName + "/index.js").default;

        if (module.store) {
            modules = Object.assign(modules, module.store);
        }
    });

    return callback();
}

function initStore() {
    modules.loader = loader;
    modules.adaptive = adaptive;

    return createStore({
        modules: modules,
    });
}

export { initStore, setStoreModules };
