export default {

    orders: [],

    liveOrders: [],
    orderStatus:[],

    pagination: {
        total: 0,
        current_page: 1,
        last_page: 1,
    },

    filter: {
        id: null,
        status: null,
        hidden: false,
        paid: 0,
        phone: null,
        user_id: null,
    }

}
