export default {
    setSettings(state, settings) {
        state.entities = settings;
    },

    setSettingsGroups(state, groups) {
        state.groups = groups;
    },

    setSettingsCount(state, count) {
        state.length = count;
    },

    setSettingsGroupNames(state, groups) {
        state.groupNames = groups;
    },
};
