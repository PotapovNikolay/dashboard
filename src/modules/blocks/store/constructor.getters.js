export default {
    getterTableBlocks: (state) => state.entities.tableBlocks,

    getBlockById: (state) => (id) => state.entities.blockTypeTemplate.find((entity) => entity.id === id),

    getTemplateForBlockById: (state) => (id) => state.entities.templateForBlockById.find((entity) => entity.id === id),

    getBlocksName: (state) => state.entities.availableBlocks,

    getBlocksTypeName: (state) => (blockName) => state.entities.typesOfBlock ? state.entities.typesOfBlock[blockName] : null,

    getterTemplateForBlockById: (state) => (id) => {
        return state.entities.templateForBlockById ? state.entities.templateForBlockById.find((item) => item.id === Number(id)) : null;
    },

    getterTemplateForBlockAvailable: (state) => (key) => {
        return state.entities.templateForBlockAvailable ? state.entities.templateForBlockAvailable.find((item) => item.key === key) : null;
    },

    searchBlocks: (state) => (key) => {
        console.log(key, state.entities.blockTypeTemplate);
        console.log(
            state.entities.blockTypeTemplate
                ? state.entities.blockTypeTemplate.filter((item) => item.name.toLowerCase().includes(key.toLowerCase()))
                : null
        );
    },
};
