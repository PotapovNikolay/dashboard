export default {
    setEntities(state, entities) {
        state.entities = entities;
    },

    add(state, entity) {
        state.entities.unshift(entity);
    },

    update(state, updatedEntity) {
        let oldEntity = state.entities.find((entity) => entity.id === updatedEntity.id);

        if (oldEntity) {
            Object.assign(oldEntity, updatedEntity);
        }
    },

    remove(state, id) {
        state.entities = state.entities.filter((news) => news.id !== id);
    },
};
