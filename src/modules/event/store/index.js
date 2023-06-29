import state from "./event.state";
import getters from "./event.getters";
import mutations from "./event.mutations";
import actions from "./event.actions";

const StoreName = "events";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
