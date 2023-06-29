export default {
    setTeams(state, teams) {
        state.entities = teams;
    },

    changePublish(state, id) {
        let entity = state.entities.find((entity) => entity.id === id);

        if (entity) {
            entity.publish = !entity.publish;
        }
    },

    setTeamById(state, teams) {
        state.entities.push(teams);
    },

    deleteTeamById(state, id) {
        state.entities = state.entities.filter((teams) => teams.id !== id);
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
};
