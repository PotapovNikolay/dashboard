export default {

    getOrderById: state => id => {

        return state.orders.find(order => order.id === id);
    },

    getNewOrders: state => {

        return state.liveOrders.filter(order => order.status.id === 1);
    }
}
