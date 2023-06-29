<template>
    <div class="order-module">
        <div class="row table__title">
            <div>Игроки</div>

            <router-link :to="{ name: 'player.new' }" class="tab tab_primary tab_first"> Добавить игрока </router-link>
            <router-link :to="{ name: 'playerCategory.new' }" class="tab tab_primary tab_first"> Добавить категорию игроков </router-link>
        </div>

        <app-table
            :entities="player"
            :tableColumns="tableColumns"
            :pagination="pagination"
            @paginate="paginate"
            :context-menu="playerListContextMenu"
            @entity-click="openNewView"
        ></app-table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ScrollTop } from "../../../mixins";
import { StoreName } from "../store";
import PlayerListContextMenu from "../components/PlayerListContextMenu";

export default {
    data() {
        return {
            playerListContextMenu: PlayerListContextMenu,

            tableColumns: [
                {
                    name: "id",
                    entityProp: "id",
                },
                {
                    name: "Имя",
                    entityProp: "name",
                },
            ],
        };
    },

    computed: {
        ...mapState(StoreName, {
            player: (state) => state.player,
            pagination: (state) => state.pagination,
        }),
    },

    methods: {
        ...mapActions(StoreName, ["getPlayer"]),

        paginate(page) {
            this.getPlayer(
                Object.assign({
                    page: page,
                })
            );

            this.scrollTop();
        },

        openNewView(entity) {
            this.$router.push({ name: "player.edit", params: { id: entity.id } });
        },
    },

    created() {
        // this.getPlayer();
    },

    mixins: [ScrollTop],

    name: "PlayerList",
};
</script>
