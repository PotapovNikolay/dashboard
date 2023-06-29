export default {

    setEntities(state, entities) {

        state.entities = entities;
    },

    setPagination(state, pagination) {

        state.pagination = pagination;
    },

    addEntity(state, entity) {

        state.entities.unshift(entity);
    },

    updateEntity(state, newEntity) {

        let entity = state.entities.find(entity => entity.id === newEntity.id);

        if (entity) {

            Object.assign(entity, newEntity);
        }
    },

    changePublish(state, payload) {

        let entity = state.entities.find(entity => entity.id === payload.entity.id);

        if (entity) {

            entity.publish = payload.newPublish;
        }
    },

    remove(state, entity) {

        let index = state.entities.indexOf(entity);

        if (index !== -1) {

            state.entities.splice(index, 1)
        }
    },

}
