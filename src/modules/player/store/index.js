import state from './player.state'
import getters from './player.getters'
import mutations from './player.mutations'
import actions from './player.actions'

const StoreName = 'player';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

