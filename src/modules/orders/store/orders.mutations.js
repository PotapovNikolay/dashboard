export default {

    setOrders(state, orders) {

        state.entities = orders;
    },

    setLiveOrders(state, orders) {

        if (!state.liveOrders.length) {

            state.liveOrders = orders;
        }
        else {

            orders.forEach((newOrder) => {

                state.liveOrders.unshift(newOrder);
            })
        }
    },

    setPagination(state, pagination) {

        state.pagination = pagination;
    },

    updateHidden(state, payload) {

        let order = state.orders.find(order => order.id === payload.order.id);

        let liveOrder = state.liveOrders.find(order => order.id === payload.order.id);

        if (order) order.hidden = payload.newHidden;

        if (liveOrder) liveOrder.hidden = payload.newHidden;
    },

    changeStatus(state, payload) {

        let order = state.orders.find(order => order.id === payload.order.id);

        let liveOrder = state.liveOrders.find(order => order.id === payload.order.id);

        if (order) {

            order.status = payload.newStatus;
        }

        if (liveOrder) {

            liveOrder.status = payload.newStatus;
        }
    },

    updateManagerComment(state, payload) {

        let order = state.orders.find(order => order.id === payload.id);

        let liveOrder = state.liveOrders.find(order => order.id === payload.id);

        if (order) order.managerComment = payload.managerComment;

        if (liveOrder) liveOrder.managerComment = payload.managerComment;
    },

    removeProduct(state, payload) {

        let order = state.orders.find(order => order.id === payload.id);

        let liveOrder = state.liveOrders.find(order => order.id === payload.id);

        if (order) {

            const product = order.products.find(product => product.id === payload.productId)

            order.products.splice(order.products.indexOf(product), 1);
        }

        if (liveOrder) {

            const product = liveOrder.products.find(product => product.id === payload.productId)

            liveOrder.products.splice(order.products.indexOf(product), 1);
        }
    },

    updatePaid(state, payload) {

        let order = state.orders.find(order => order.id === payload.id);

        let liveOrder = state.liveOrders.find(order => order.id === payload.id);

        if (order) order.payment.isPaid = payload.paid;

        if (liveOrder) liveOrder.payment.isPaid = payload.paid;
    },

    updateOrder(state, updatedOrder) {

        let oldOrder = state.orders.find(order => order.id === updatedOrder.id);

        Object.assign(oldOrder, updatedOrder);
    },

    setFilter(state, filter) {

        state.filter = filter;
    },

    updateFilter(state, keyValue) {

        if (state.filter.hasOwnProperty(keyValue.key)) {

            state.filter[keyValue.key] = keyValue.value;
        }
    },

    unshiftOrder(state, item) {

        state.orders.unshift(item);
    },

    addProductToOrder(state, payload) {

        let order = state.orders.find(order => order.id === payload.id);

        if (order) {

            state.orders.products.push(payload.productData);
        }
    },

    resetFilter(state) {

        state.filter = Object.assign({}, {
            id: null,
            status: null,
            hidden: false,
            paid: 0,
            phone: null,
            user_id: null,
        });
    },

    changeProductQuantity(state, payload) {

        let order = state.orders.find(order => order.id === payload.id);

        if (order) {

            const product = order.products.find(product => product.id === payload.productId);

            product.quantity = payload.newQuantity;
        }
    },

}
