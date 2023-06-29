export default {
    set(state, entity) {
        state.entities = entity;
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

    remove(state, entity) {
        let index = state.entities.indexOf(entity);

        if (index !== -1) {
            state.entities.splice(index, 1);
        }
    },

    setEntities(state, entities) {
        state.entities = entities;
    },
};
