import state from "./constructor.state";
import getters from "./constructor.getters";
import mutations from "./constructor.mutations";
import actions from "./constructor.actions";

const StoreName = "blocks";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
