import Axios from "@axios";

export default {
    async syncBlock({ commit }, payload) {
        const { data } = await Axios.post(`/blocks/${payload.id}/sync`, payload);

        return data;
    },

    async syncRecompileBlock({ commit }, payload) {
        const { data } = await Axios.post(`/blocks/${payload.id}/sync/recompile`, payload);

        return data;
    },

    async getEntities({ commit, state }) {
        const { data } = await Axios.get(`/blocks/list`);

        if (state.entities.tableBlocks !== data.entities) {
            commit("setTableBlocks", data.entities);
        }
    },

    async deleteEntity({ commit }, id) {
        const response = await Axios.delete(`/blocks/${id}`)
            .then(function ({ data }) {
                if (data) {
                    commit("deleteBlockById", id);
                    return data;
                }
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response.status;
                }
            });

        return response;
    },

    async getBlocksById({ commit, getters, state }, id) {
        if (!getters.getTemplateForBlockById(id)) {
            const { data } = await Axios.get(`/blocks/${id}`);

            commit("setTemplateForBlockById", data.entity);
        }
    },

    async getAvailableBlocks({ commit }) {
        const { data } = await Axios.get(`/blocks/categories`);
        commit("setAvailableBlocks", data.categories);
    },

    async getBlockTypes({ commit, getters }, payload) {
        if (!getters.getBlocksTypeName(payload)) {
            const { data } = await Axios.get(`/blocks/categories/${payload}`);
            const entities = { [payload]: data.entities };

            commit("setBlockTypes", entities);
        }
    },

    async actionTemplateForBlockAvailable({ commit, getters }, { type, key }) {
        const item = getters.getterTemplateForBlockAvailable(key);

        if (!item) {
            const { data } = await Axios.get(`/blocks/categories/${type}/${key}`);

            await commit("setTemplateForBlockAvailable", data.entity);

            return data;
        }
    },

    async newOrUpdate({ commit, getters }, payload) {
        const { data } = Number.isFinite(payload.key)
            ? await Axios.patch(`/blocks/${payload.key}`, payload)
            : await Axios.post(`/blocks/new`, payload);

        !Number.isFinite(payload.key) ? commit("deleteAvailableBlockByKey", payload) : null;

        return data;
    },
};
