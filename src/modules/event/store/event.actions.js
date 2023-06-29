import Axios from "@axios";

export default {
    async getPlatformVariants({ commit }, id) {
        let response = await Axios.get(`/platforms/${id}/variants`);

        // commit("set", response.data.entities);

        return response.data.entities;
    },

    async getEntities({ commit }) {
        let response = await Axios.get("/events");

        commit("setEntities", response.data.entities);

        commit("setPagination", response.data.pagination);

        return response;
    },

    async getEntityById({ state, getters }, id) {
        let item = getters.getEntityById(id);

        if (!item) {
            let response = await Axios.get("/events/" + id);

            item = response.data;
        }

        return item;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const response = form.id ? await Axios.put("/events/" + form.id, form) : await Axios.post("/events", form);

        if (!response) {
            return false;
        }

        if (response.data.success) {
            commit(form.id ? "update" : "add", response.data.entity);
        }

        return response.data;
    },

    async search({ commit }) {
        await Axios.get(`search`);

        commit("search");
    },

    async getSectorsOfEvent({ state, getters }, id) {
        let item = getters.getEntityById(id);

        if (!item) {
            let response = await Axios.get("/events/" + id + "/sectors");

            item = response.data.entity;
        }

        return item;
    },

    async patchRowsRollback({ state, getters }, id) {
        let item = getters.getEntityById(id);

        if (!item) {
            let response = await Axios.get("/events/" + id + "/sectors/row/rollback");

            item = response.data.entity;
        }

        return item;
    },

    async patch({ commit }, { id, key, value }) {
        const { data } = await Axios.patch(`/events/${id}/${key}`, {
            value: value,
        });

        if (data.success) {
            commit("changePublish", id);
        } else {
            alert("Ошибка при изменении значения");
        }
    },

    async changePublish({ commit, state }, payload) {
        const response = await Axios.post("/events/" + payload.entity.id + "/change-publish", {
            newPublish: payload.newPublish,
        });

        if (response.data.success) {
            commit("changePublish", payload);
        } else {
            alert("Ошибка при изменении значения");
        }
    },

    async deleteEntity({ commit, state }, id) {
        const response = await Axios.delete("/events/" + id);

        if (response.data.success) {
            commit("remove", id);
        }

        return response;
    },

    async import({ state, getters, commit }, data) {
        let formData = new FormData();
        formData.append("file", data.file);
        formData.append("id", data.id);

        return await Axios.post(`/events/${data.id}/import`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
