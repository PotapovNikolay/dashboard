import state from './room.state'
import getters from './room.getters'
import mutations from './room.mutations'
import actions from './room.actions'

const StoreName = 'room';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

