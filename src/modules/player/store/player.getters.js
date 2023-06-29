export default {

    getPlayerById: state => id => {

        return state.player.find(player => player.id === id);
    },
}
