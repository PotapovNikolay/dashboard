export default {
    setNews(state, news) {
        state.entities = news;
    },

    setNewsDomains(state, news) {
        state.entitiesOfDomain = news;
    },

    addNewNewsDomains(state, id) {
        state.entitiesOfDomain.push(id);
    },

    deleteNewsDomains(state, id) {
        state.entitiesOfDomain.splice(state.entitiesOfDomain.indexOf(id), 1);
    },
};
