import state from "./page.state";
import getters from "./page.getters";
import mutations from "./page.mutations";
import actions from "./page.actions";

const StoreName = "pages";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
