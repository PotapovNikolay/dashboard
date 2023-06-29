import Axios from "@axios";

export default {
    async getPlayer({ commit, state }, payload) {
        let response = await Axios.get("/player", { params: { ...payload, ...state.filter } });

        commit("setEntities", response.data.entities);

        commit("setPagination", response.data.pagination);
    },

    async getPlayerById({ state, getters }, id) {
        let item = getters.getPlayerById(id);

        if (!item) {
            let response = await Axios.get("/player/" + id);

            item = response.data.entity;
        }

        return item;
    },

    async changePublish({ commit, state }, payload) {
        const response = await Axios.post("/player/" + payload.players.id + "/change-publish", {
            newPublish: payload.newPublish,
        });

        if (response.data.success) {
            commit("changePublish", payload);
        } else {
            alert("Ошибка при изменении значения");
        }
    },

    async remove({ commit, state }, category) {
        const response = await Axios.delete("/player/" + category.id);

        if (response.data.success) {
            commit("remove", category);
        }

        return response;
    },

    async newOrUpdate({ commit }, form) {
        const { data } = form.id ? await Axios.put("/player/" + form.id, form) : await Axios.post("/player", form);

        if (data.success) {
            commit(form.id ? "update" : "add", data.entity);
        }

        return data;
    },
};
