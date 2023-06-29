export default {
    setEvents(state, events) {
        state.entities = events;
    },

    setEventDomains(state, events) {
        state.entitiesOfDomain = events;
    },

    addNewEventDomains(state, id) {
        state.entitiesOfDomain.push(id);
    },

    deleteEventDomains(state, id) {
        state.entitiesOfDomain.splice(state.entitiesOfDomain.indexOf(id), 1);
    },
};
