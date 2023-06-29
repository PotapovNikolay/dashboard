import state from "./domain.state";
import getters from "./domain.getters";
import mutations from "./domain.mutations";
import actions from "./domain.actions";

const StoreName = "domains";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
