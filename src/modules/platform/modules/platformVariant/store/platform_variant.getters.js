export default {

    getEntityById: state => id => {

        return state.entities.find(entity => entity.id === id);
    },
}
