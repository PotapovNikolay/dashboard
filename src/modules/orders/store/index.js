import state from "./orders.state";
import getters from "./orders.getters";
import mutations from "./orders.mutations";
import actions from "./orders.actions";

const StoreName = "orders";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
