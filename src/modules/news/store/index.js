import state from './news.state'
import getters from './news.getters'
import mutations from './news.mutations'
import actions from './news.actions'

const StoreName = 'news';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

