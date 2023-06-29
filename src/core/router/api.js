import router from './index'

class RouterApi
{
    constructor(router) {

        this.rotuer = router;

        if (process.env.NODE_ENV === 'development') {

            console.log('router api created');
        }
    }

    addRoutes(routes) {

        this.rotuer.addRoutes(routes);
    }
}

export default new RouterApi(router);