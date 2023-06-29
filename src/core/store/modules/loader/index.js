import state from './loader.state'
import getters from './loader.getters'
import mutations from './loader.mutations'
import actions from './loader.actions'

export default {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

}
