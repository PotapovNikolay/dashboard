import state from "./teams.state";
import getters from "./teams.getters";
import mutations from "./teams.mutations";
import actions from "./teams.actions";

const StoreName = "teams";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
