import state from "./reviewDomain.state";
import getters from "./reviewDomain.getters";
import mutations from "./reviewDomain.mutations";
import actions from "./reviewDomain.actions";

const StoreName = "review-domain";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
