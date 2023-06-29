import Axios from "@axios";
import { commit } from "lodash/seq";

export default {
    async getPlatformVariants({ commit }, id) {
        let response = await Axios.get(`/platforms/${id}/variants`);

        commit("set", response.data.entities);

        return response.data.entities;
    },

    async newOrUpdate({ state, getters, commit }, entity) {
        const { data } = entity.id
            ? await Axios.put(`/platforms/${entity.platformId}/variants/${entity.id}`, entity)
            : await Axios.post(`/platforms/${entity.platformId}/variants`, entity);

        if (data.success) {
            commit(entity.id ? "update" : "add", data.entity);
        }

        return data;
    },

    async export({ state, getters, commit }, data) {
        return await Axios.post(`/platforms/${data.id}/variants/${data.varId}/export`);
    },

    async import({ state, getters, commit }, data) {
        let formData = new FormData();
        formData.append("file", data.file);
        formData.append("id", data.id);
        formData.append("varId", data.varId);

        const response =  await Axios.post(`/platforms/${data.id}/variants/${data.varId}/import`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    },

    async getEntityById({ state, getters }, data) {
        let item = getters.getEntityById(data.varId);


        if (!item) {
            let response = await Axios.get(`/platforms/${data.id}/variants/${data.varId}`);
            
            item = response.data;
        }

        return item;
    },

    async deleteEntity({ commit }, id) {
        const { data } = await Axios.delete("/platforms/variants/" + id);

        commit("remove", id);

        return { data };
    },
};
