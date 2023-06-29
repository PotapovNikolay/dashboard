import state from './platform.state'
import getters from './platform.getters'
import mutations from './platform.mutations'
import actions from './platform.actions'

const StoreName = 'platform';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

