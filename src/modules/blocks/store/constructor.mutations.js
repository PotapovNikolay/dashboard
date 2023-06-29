export default {
    setTableBlocks(state, entities) {
        state.entities.tableBlocks = entities;
    },

    setAvailableBlocks(state, entities) {
        state.entities.availableBlocks = entities;
    },

    setBlockTypes(state, entities) {
        Object.assign(state.entities.typesOfBlock, entities);
    },

    setTemplateForBlockById(state, data) {
        state.entities.templateForBlockById.push(data);
    },

    setTemplateForBlockAvailable(state, data) {
        state.entities.templateForBlockAvailable.push(data);
    },

    deleteAvailableBlockByKey(state, entity) {
        state.entities.templateForBlockAvailable = state.entities.templateForBlockAvailable.filter((block) => block.key !== entity.key);
    },

    deleteBlockById(state, id) {
        state.entities.tableBlocks = state.entities.tableBlocks.filter((block) => block.id !== id);
    },
};
