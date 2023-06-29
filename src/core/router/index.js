import Vue from "vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import Home from "../../modules/homePage/pages/Home";

const user = localStorage.is_impersonator;

const router = createRouter({
    history: createWebHistory("/dashboard"),
    base: "/dashboard",
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                title: "Панель управления",
            },
            component: Home,
        },
    ],
});

function findRoute(rout) {
    return router.getRoutes().find((route) => route.name === rout);
}

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : to.name;

    //пока этих маршрутов нет, то закоментирую

    // if (findRoute('orders.list')) {
    //         next({ name: "orders.list" });
    // }
    // else if(findRoute('matches.list')){
    //     next({ name: "matches.list" });
    // }
    // else {
    //     next();
    // }
    next();
});

const setRouteModules = (modules) => {
    modules.forEach((moduleName) => {
        const module = require("../../modules/" + moduleName + "/index.js").default;

        if (module.routes) {
            module.routes.forEach((rout) => {
                router.addRoute(rout);
            });
        }
    });

    // if (localStorage.is_impersonator) {
    //     router.push({ path: "/constructor" }).then((r) => console.log(r));
    //     console.log(router);
    // }
};

export { router, setRouteModules, user };
