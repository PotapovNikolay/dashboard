import Axios from "@axios";

export default {
    async getEntities({ commit }) {
        let response = await Axios.get("/reviews");

        commit("setEntities", response.data.entities);

        commit("setPagination", response.data.pagination);
    },

    async deleteEntity({ commit, state }, id) {
        const {data} = await Axios.delete("/reviews/" + id);

        if (data.success) {
            commit("remove", id);
        }

        return data;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const { data } = form.id ? await Axios.put("/reviews/" + form.id, form) : await Axios.post("/reviews", form);

        if (data.success) {
            commit(form.id ? "update" : "add", data.entity);
        }

        return data;
    },

    async getEntityById({ state, getters }, id) {
        let item = getters.getReviewById(id);

        if (!item) {
            let {data} = await Axios.get("/reviews/" + id);

            return data;

        }

        return item;
    },
};
