import state from "./adaptive.state";
import getters from "./adaptive.getters";
import mutations from "./adaptive.mutations";
import actions from "./adaptive.actions";

export default {
    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};
