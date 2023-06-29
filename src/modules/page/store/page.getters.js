export default {

    pageById:state=>id => state.entities.pages.find(page=>page.id===parseInt(id)),

    nameOfComponents:state=>state.entities.nameOfComponents,

    componentsForCreating:state=>state.entities.componentsForCreating,

    componentById:state=>id=>state.entities.componentsForCreating.find(component=> component.id === parseInt(id)),

    componentsForEditing: state=>state.entities.componentsForEditing,

    selectedComponents: state => state.entities.selectedComponents,

    componentsForEditingById:state=>id=>state.entities.componentsForEditing.find(component=> component.id === parseInt(id)),

    componentsForCreatingById:state=>id=>state.entities.componentsForCreating.find(component=> component.id === parseInt(id)),






    //
    // getEntityById: state => id => {
    //
    //     return state.entities.find(entity => entity.id === id);
    // },
}
