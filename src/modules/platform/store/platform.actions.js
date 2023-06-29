import Axios from "@axios";

export default {
    async getEntities({ commit, state }, payload) {
        let response = await Axios.get("/platforms");

        commit("setEntities", response.data.entities);
    },

    async deleteEntity({ commit, state }, id) {
        const response = await Axios.delete("/platforms/" + id);

        if (response.data.success) {
            commit("remove", id);
        }

        return response;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const { data } = form.id ? await Axios.put("/platforms/" + form.id, form) : await Axios.post("/platforms", form);

        if (data.success) {
            commit(form.id ? "update" : "add", data.entity);
        }

        return data;
    },

    async getEntityById({ state, getters }, id) {
        if (!getters.getEntityById(id)) {
            const { data } = await Axios.get(`/platforms/${id}`);

            return data;
        }
    },
};
