export default {

    setEntities(state, player) {

        state.player = player;
    },

    setPagination(state, pagination) {

        state.pagination = pagination;
    },

    add(state, player) {

        state.player.unshift(player);
    },

    update(state, newPlayer) {

        let oldPlayer = state.player.find(player => player.id === newPlayer.id);

        if (oldPlayer) {

            Object.assign(oldPlayer, newPlayer);
        }
    },

    changePublish(state, payload) {
        let item = state.player.find(item => item.id === payload.players.id);
        if (item) {
            item.publish = payload.newPublish;
        }
    },

    remove(state, rPlayers) {

        let index = state.player.indexOf(rPlayers);

        if (index !== -1) {

            state.player.splice(index, 1)
        }
    },

}
