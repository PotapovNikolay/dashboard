export default {
    setEntities(state, entities) {
        state.entities = entities;
    },

    setPagination(state, pagination) {
        state.pagination = pagination;
    },

    add(state, entity) {
        state.entities.unshift(entity);
    },

    update(state, newEntity) {
        let entity = state.entities.find((entity) => entity.id === newEntity.id);

        if (entity) {
            Object.assign(entity, newEntity);
        }
    },

    changePublish(state, id) {
        let entity = state.entities.find((entity) => entity.id === id);

        if (entity) {
            entity.publish = !entity.publish;
        }
    },

    remove(state, id) {
        state.entities = state.entities.filter((event) => event.id !== id);
    },

    search(state, payload) {},
};
