import state from './platform_variant.state'
import getters from './platform_variant.getters'
import mutations from './platform_variant.mutations'
import actions from './platform_variant.actions'

const StoreName = 'platform.variants';

const Store = {

    namespaced: true,

    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions

};

export { Store, StoreName }

