import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/events`);

        commit("setEvents", data.entities);
    },

    async addEntityToDomain({ commit }, id) {
        const { data } = await Axios.post(`/events/${id}/domain`);

        commit("addNewEventDomains", id);
    },

    async deleteEntityOfDomain({ commit }, id) {
        const { data } = await Axios.delete(`/events/${id}/domain`);

        commit("deleteEventDomains", id);
    },

    async getEntitiesOfDomain({ commit }) {
        const { data } = await Axios.get(`/events/domain`);

        commit("setEventDomains", data.ids);
    },
};
