export default {

    getReviewById: state => id => {

        return state.entities.find(item => item.id === id);
    },
}
