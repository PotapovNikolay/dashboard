import state from "./eventDomain.state";
import getters from "./eventDomain.getters";
import mutations from "./eventDomain.mutations";
import actions from "./eventDomain.actions";

const StoreName = "events-domain";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
