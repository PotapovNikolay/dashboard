import state from './review.state'
import getters from './review.getters'
import mutations from './review.mutations'
import actions from './review.actions'

const StoreName = 'review';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

