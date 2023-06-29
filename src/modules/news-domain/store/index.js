import state from "./newsDomain.state";
import getters from "./newsDomain.getters";
import mutations from "./newsDomain.mutations";
import actions from "./newsDomain.actions";

const StoreName = "news-domain";

const Store = {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};

export { Store, StoreName };
