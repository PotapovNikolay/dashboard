import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/news`);

        commit("setNews", data.entities);
    },

    async addEntityToDomain({ commit }, id) {
        await Axios.post(`/news/${id}/domain`);

        commit("addNewNewsDomains", id);
    },

    async deleteEntityOfDomain({ commit }, id) {
        await Axios.delete(`/news/${id}/domain`);

        commit("deleteNewsDomains", id);
    },

    async getEntitiesOfDomain({ commit }) {
        const { data } = await Axios.get(`/news/domain`);

        commit("setNewsDomains", data.ids);
    },
};
