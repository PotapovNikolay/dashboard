export default {

    getSettingById: state => id => {

        return state.settings.find(setting => setting.id === id);
    },
}
