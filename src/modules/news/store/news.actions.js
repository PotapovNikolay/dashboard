import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/news`);
        commit("setNews", data.entities);
        commit("setPagination", data.pagination);
    },

    async getEntityById({ getters, commit }, id) {
        if (!getters.newsById(id)) {
            const { data } = await Axios.get(`/news/${id}`);
            commit("setNewsById", data.entity);

            return data;
        }
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const { data } = form.id ? await Axios.put("/news/" + form.id, form) : await Axios.post("/news", form);

        // if (data.success) {
        //     commit(form.id ? "setNewsById" : "setNewsById", data.entity);
        // }

        return data;
    },

    async deleteEntity({ commit }, id) {

        const { data } = await Axios.delete(`/news/${id}`);
        commit("deleteNewsById", id);
        return data;
    },
};
