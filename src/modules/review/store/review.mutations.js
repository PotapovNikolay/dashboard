
export default {

    setEntities(state, entities) {
        state.entities = entities;
    },

    setPagination(state, pagination) {
        state.pagination = pagination;
    },

    changePublish(state, payload) {
        let item = state.entities.find(item => item.id === payload.entity.id);
        if (item) {
            item.publish = payload.newPublish;
        }
    },

    remove(state, id) {

        state.entities = state.entities.filter((review) => review.id !== id);

    },

    add(state, item) {
        state.entities.unshift(item);
    },

    update(state, newItem) {
        let oldItem = state.entities.find(item => item.id === newItem.id);
        if (oldItem) {
            Object.assign(oldItem, newItem);
        }
    },
}
