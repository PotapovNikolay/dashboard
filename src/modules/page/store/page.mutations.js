export default {
    setIndexOfBlock(state, index) {
        state.indexOfBlock = index;
    },

    setPages(state, pages) {
        state.entities.pages = pages;
    },

    setComponentOfPage(state, id) {
        state.entities.page.push(state.entities.componentsForCreating.find((component) => component.id === id));
    },

    setSelectedComponents(state, id) {
        state.entities.selectedComponents.push(id);
    },

    deletePage(state, id) {
        state.entities.pages = state.entities.pages.filter((page) => page.id !== id);
    },
    // setPage(state, page){
    //     state.entities.pages.push
    // },

    resetSelectedComponents(state) {
        state.entities.selectedComponents = [];
    },

    resetComponentsForEditing(state) {
        state.entities.componentsForEditing = [];
    },

    resetComponentForCreating(state) {
        state.entities.componentsForCreating = [];
    },

    setNameOfComponents(state, nameOfComponents) {
        state.entities.nameOfComponents = nameOfComponents;
    },

    //Компоненты для создания
    setComponentsForCreating(state, { data, index }) {
        state.entities.componentsForCreating.splice(index + 1, 0, data);
    },

    deleteComponentFromComponentsForCreating(state, index) {
        state.entities.componentsForCreating.splice(index, 1);
    },

    setComponentsForCreatingByDraggable(state, value) {
        state.entities.componentsForCreating = value;
    },

    setPageById(state, page) {
        state.entities.page = page;
    },

    //компоненты для редактирования
    setComponentsForEditing(state, { data, index }) {
        //почему "=== undefined"? потому что index может прийти как 0 и будет засчитан как false
        if (index === undefined) {
            // if (data.isArray) {
            //     state.entities.componentsForEditing = data;
            // } else {
            //     state.entities.componentsForEditing = [data];
            // }

            Object.values(data).forEach((block, index) => {
                // state.entities.componentsForEditing.push(block)
                state.entities.componentsForEditing.splice(index, 0, block);
            });
        } else {
            state.entities.componentsForEditing.splice(index + 1, 0, data);
        }
    },

    deleteComponentFromComponentsForEditing(state, index) {
        state.entities.componentsForEditing.splice(index, 1);
    },

    setComponentsForEditingByDraggable(state, value) {
        state.entities.componentsForEditing = value;
    },

    setBlocks(state, { data, index }) {
        state.entities.blocks.splice(index + 1, 0, data);
    },

    deleteBlockFromBlocks(state, index) {
        state.entities.blocks.splice(index, 1);
    },

    changePublish(state, id) {
        state.entities.pages = state.entities.pages.map((page) => (page.id === id ? { ...page, publish: !page.publish } : page));
    },
};
