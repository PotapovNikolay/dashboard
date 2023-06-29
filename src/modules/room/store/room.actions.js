import Axios from "@axios";

export default {
    async getEntities({ commit, state }, payload) {
        let response = await Axios.get("/rooms", {
            params: { ...payload, ...state.filter },
        });

        commit("setEntities", response.data.entities);

        commit("setPagination", response.data.pagination);
    },

    async searchRooms({ commit, state }, searchString) {
        let response = await Axios.get("/rooms/search", {
            params: { searchString: searchString },
        });

        commit("setEntities", response.data.entities);

        commit("resetPagination");
    },

    async getEntityById({ state, getters }, id) {
        let item = getters.getEntityById(id);

        if (!item) {
            let response = await Axios.get("/rooms/" + id);

            item = response.data.entity;
        }

        return item;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const response = await Axios.post(
            `/rooms/${form.id}/new-or-update`,
            form
        );

        if (response.data.success) {
            commit(
                form.id ? "updateEntity" : "addEntity",
                response.data.entity
            );
        }

        return response;
    },

    async changePublish({ commit, state }, payload) {
        const response = await Axios.post(
            "/rooms/" + payload.entity.id + "/change-publish",
            {
                newPublish: payload.newPublish,
            }
        );

        if (response.data.success) {
            commit("changePublish", payload);
        } else {
            alert("Ошибка при изменении значения");
        }
    },

    async remove({ commit, state }, room) {
        const response = await Axios.delete("/rooms/" + room.id);

        if (response.data.success) {
            commit("remove", room);
        }

        return response;
    },
};
