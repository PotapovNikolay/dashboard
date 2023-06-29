import Axios from "@axios";

export default {
    // async getSettings({ commit }) {
    //     let response = await Axios.get("/settings");

    //     commit("setSettingsGroups", response.data.entities);

    //     commit("setSettingsGroupNames", response.data.groups);

    //     commit("setSettingsCount", response.data.length);
    // },

    async uploadImage({ state, getters, commit }, data) {
        let formData = new FormData();

        formData.append("image", data.file);

        return await Axios.post(`/images/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    async syncImage({ state, getters, commit }, data) {
        return await Axios.post(`/settings/image/sync`, data);
    },

    async syncImages({ state, getters, commit }, data) {
        return await Axios.post(`/settings/images/sync`, data);
    },

    async importSettingFile({ state, getters, commit }, data) {
        let formData = new FormData();

        formData.append("key", data.key);
        formData.append("name", data.name);
        formData.append("file", data.file);

        return await Axios.post(`/settings/file/import`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    async updateSettingValue({ commit }, payload) {
        let response = await Axios.post(`/settings/${payload.key}`, {
            value: payload.newValue,
        });
    },

    async getPaymentSettings({ commit }) {
        const {
            data: { host },
        } = await Axios.get("/user/privileges");

        const { data } = await Axios.get("/paymentSettings");

        return data;
    },

    async createPaymentSettings({ commit }, payload) {
        const { data } = await Axios.post("/paymentSettings/new", payload);

        return data;
    },

    async getEntities({ commit }) {
        const { data } = await Axios.get("/paymentSettings");

        commit("setSettings", data.entities);

        return data;
    },

    async newOrUpdate({ state, getters, commit }, form) {
        const { data } = form.id ? await Axios.put("/paymentSettings/" + form.id, form) : await Axios.post("/paymentSettings/new", form);

        // if (data.success) {
        //     commit(form.id ? "update" : "add", data.entity);
        // }

        

        return data;
    },
};
