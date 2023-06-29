import Axios from '@axios';

export default {
    async getEntities({ commit }) {
        const { data } = await Axios.get(`/orders`);
        commit("setOrders", data.entities);
    },

    async getItems({ commit, state }, payload) {
        let response = await Axios.get("/orders", { params: { ...payload, ...state.filter } });

        commit("setOrders", response.data.entities);

        commit("setPagination", response.data.pagination);

        if (response.data.filter) {
            commit("setFilter", response.data.filter);
        }
    },

    async getLiveOrders({ commit, state }, payload) {
        const ignoreIds = state.liveOrders.map((order) => order.id);

        let response = await Axios.get("/orders/live", {
            params: {
                ignoreIds: ignoreIds,
            },
        });

        if (response.data.entities.length) {
            commit("setLiveOrders", response.data.entities);
        }

        return response.data.entities.length;
    },

    async resetFilter({ commit, dispatch }) {
        commit("resetFilter");

        dispatch("getItems");
    },

    async newOrUpdate({ commit, state }, payload) {
        let url = payload.exist ? "update" : "create";

        let response = await Axios.post("/api/products/" + url, payload.formData);

        if (response.data.errors) return response.data;

        commit(payload.exist ? "updateItem" : "unshiftItem", response.data.entity);

        return response.data;
    },

    async getOrderById({ state, getters }, id) {
        let item = getters.getOrderById(id);

        if (!item) {
            let response = await Axios.get("/orders/" + id);

            item = response.data.entity;
        }

        return item;
    },

    async changeStatus({ commit }, payload) {
        let response = await Axios.post("/orders/" + payload.order.id + "/change-status", {
            newStatusId: payload.newStatus.id,
        });

        if (response.data.success) {
            commit("changeStatus", payload);
        } else {
            alert("Ошибка при изменении статуса заказа");
        }

        return !!response.data.success;
    },

    async updateManagerComment({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.id + "/update-manager-comment", {
            managerComment: payload.managerComment,
        });

        if (response.data.success) {
            commit("updateManagerComment", payload);
        } else {
            alert("Ошибка при обновлении комментария");
        }
    },

    async changeHidden({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.order.id + "/update-hidden", {
            hidden: payload.newHidden,
        });

        if (response.data.success) {
            commit("updateHidden", payload);
        } else {
            alert("Ошибка при обновлении поля скрытый");
        }
    },

    async removeProduct({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.id + "/remove-product", {
            productId: payload.productId,
        });

        if (response.data.success) {
            commit("removeProduct", payload);

            return response.data.total_cost;
        } else {
            alert("Ошибка при удалении товара");
        }
    },

    async updatePaid({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.id + "/update-paid", {
            newPaid: payload.paid,
        });

        if (response.data.success) {
            commit("updatePaid", payload);
        } else {
            alert("Ошибка при изменении статуса оплаты");
        }
    },

    async changeProductQuantity({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.id + "/change-product", {
            productId: payload.productId,
            newQuantity: payload.newQuantity,
        });

        if (response.data.success) {
            commit("changeProductQuantity", payload);

            return response.data.total_cost;
        } else {
            alert("Ошибка при изменении кол-ва товара");
        }
    },

    async addProductToOrder({ commit }, payload) {
        const response = await Axios.post("/orders/" + payload.id + "/add-product", {
            productId: payload.productId,
        });

        if (response.data.success) {
            commit("addProductToOrder", payload);

            return response.data.total_cost;
        } else {
            alert("Ошибка при добавлении товара");
        }
    },
};
