export default {
    setEntities(state, entities) {
        state.entities = entities;
    },

    setEntitiesOfDomains(state, entities) {
        state.entitiesOfDomain = entities;
    },

    addNewEntityOfDomains(state, id) {
        state.entitiesOfDomain.push(id);
    },

    deleteEntityOfDomains(state, id) {
        state.entitiesOfDomain.splice(state.entitiesOfDomain.indexOf(id), 1);
    },
};
