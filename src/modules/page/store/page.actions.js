import Axios from "@axios";

export default {
    async syncRecompilePage({ commit }, id) {
        const { data } = await Axios.post(`/pages/${id}/recompile`);

        return data;
    },

    async getHost() {
        const { data } = await Axios.get(`/user/privileges`);

        if (data.success) {
            return data.host;
        }
    },

    async getEntities({ commit }) {
        const { data } = await Axios.get(`/pages`);

        commit("setPages", data.entities);
    },

    async getPageById({ commit, getters }, id) {
        const { data } = await Axios.get(`/pages/${id}`);
        commit("setPageById", data.entity);
        commit("setComponentsForEditing", { data: data.entity.blocks });
        return data.entity;
    },

    async getComponents({ commit, state }) {
        const { data } = await Axios.get(`/blocks/list`);

        commit("setNameOfComponents", data.entities);
    },

    async getComponent({ commit, getters }, { id, index, indexOfPage }) {
        if (indexOfPage && !getters.componentsForEditingById(id)) {
            const { data } = await Axios.get(`/blocks/${id}/compiled`);

            commit("setComponentsForEditing", { data: data.entity, index: index });
            return data.entity;
        } else if (!indexOfPage && !getters.componentsForCreatingById(id)) {
            const { data } = await Axios.get(`/blocks/${id}/compiled`);
            commit("setComponentsForCreating", { data: data.entity, index: index });
            return data.entity;
        }
    },

    async getComponentForEditing({ commit, getters }, id) {
        if (!getters.componentsForEditingById(parseInt(id))) {
            const { data } = await Axios.get(`/blocks/${id}`);

            commit("setComponentsForEditing", data.entity);
            return data.entity;
        }
    },

    async newOrUpdate({ commit, getters, state }, entity) {
        let response;

        if (entity.id) {
            response = await Axios.put(`/pages/${entity.id}`, entity)
                .then(function ({ data }) {
                    if (data) {
                        state.preloader = false;

                        return data;
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        return error.response.status;
                    }
                });
        } else {
            response = await Axios.post(`/pages/new`, entity)
                .then(function ({ data }) {
                    if (data) {
                        state.preloader = false;

                        return data;
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        return error.response.status;
                    }
                });
        }
        return response;
    },

    async deleteEntity({ commit }, id) {
        const { data } = await Axios.delete(`/pages/${id}`);

        commit("deletePage", id);
        commit("resetComponentsForEditing");

        return data;
    },

    async changePublish({ commit }, id) {
        await Axios.post(`/pages/${id}/change-publish`);

        commit("changePublish", id);
    },
};
