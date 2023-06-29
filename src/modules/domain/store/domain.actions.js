import Axios from "@axios";

export default {
    async getDomains({ commit }) {
        const { data } = await Axios.get(`/domains`);

        commit("setDomains", data.entities);
    },

    async getDomainByHost({ getters, commit }, host) {
        if (!getters.domainByHost(host)) {
            const { data } = await Axios.get(`/domains/${host}`);

            commit("setDomainByHost", data.entity);

            return data;
        }
    },

    async newOrUpdate({ commit }, domain) {
        const { data } = await Axios.post(`/domains/new`, domain);

        return data;
    },

    async deleteDomain({ commit }, host) {
        const { data } = await Axios.delete(`/domains/${host}`);

        commit("deleteDomainByHost", host);

        return data;
    },
};
