import PlayerList from '../pages/PlayerList'
import PlayerView from "../pages/PlayerView";

export default [

    {
        path: '/player',
        component: PlayerList,
        name: 'player.list',
        meta: {
            title: 'Игроки',
            breadcrumbs: [
                {
                    name: 'Все Игроки',
                    urlName: 'player.list'
                }
            ]
        }
    },

    {
        path: '/player/new',
        component: PlayerView,
        name: 'player.new',
        meta: {
            title: 'Игроки',
            breadcrumbs: [
                {
                    name: 'Все Игроки',
                    urlName: 'player.list'
                },
                {

                }
            ]
        },
    },

    {
        path: '/player/:id/edit',
        component: PlayerView,
        name: 'player.edit',
        meta: {
            title: 'Игроки',
            breadcrumbs: [
                {
                    name: 'Все Игроки',
                    urlName: 'player.list'
                },
                {

                }
            ]
        },

        beforeEnter: (to, from, next) => {

            to.meta.breadcrumbs.pop();

            to.meta.breadcrumbs.push({
                name: 'Игрок #' + to.params.id,
            });

            next();
        }
    },
];