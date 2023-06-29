import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/teams`);
        commit("setTeams", data.entities);
    },

    async patch({ commit }, { id, key, value }) {
        const { data } = await Axios.patch(`/teams/${id}/${key}`, {
            value: value,
        });

        if (data.success) {
            commit("changePublish", id);
        } else {
            alert("Ошибка при изменении значения");
        }
    },

    async getEntityById({ commit }, id) {
        const { data } = await Axios.get(`/teams/${id}`);
        commit("setTeamById", data.entity);
        return data;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const { data } = form.id ? await Axios.put("/teams/" + form.id, form) : await Axios.post("/teams", form);

        if (data.success) {
            commit(form.id ? "update" : "add", data.entity);
        }

        return data;
    },

    async deleteEntity({ commit }, id) {
        const { data } = await Axios.delete(`/teams/${id}`);
        commit("deleteTeamById", id);
        return data;
    },
};
