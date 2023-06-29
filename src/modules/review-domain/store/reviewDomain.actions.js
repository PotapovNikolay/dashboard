import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/reviews`);

        commit("setEntities", data.entities);
    },

    async addEntityToDomain({ commit }, id) {
        await Axios.post(`/reviews/${id}/domain`);

        commit("addNewEntityOfDomains", id);
    },

    async deleteEntityOfDomain({ commit }, id) {
        await Axios.delete(`/reviews/${id}/domain`);

        commit("deleteEntityOfDomains", id);
    },

    async getEntitiesOfDomain({ commit }) {
        const { data } = await Axios.get(`/reviews/domain`);

        commit("setEntitiesOfDomains", data.ids);
    },
};
