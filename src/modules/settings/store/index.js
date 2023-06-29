import state from './setting.state'
import getters from './setting.getters'
import mutations from './setting.mutations'
import actions from './setting.actions'

const StoreName = 'settings';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

