<template>

    <div class="order-module">

        <div class="row table__title">

            <div>Номера</div>

            <router-link :to="{ name: 'room.new' }" class="tab tab_primary tab_first" style="background-color: white">
                Добавить номер
            </router-link>

        </div>

        <app-table :entities="entities"
                   :tableColumns="tableColumns"
                   :pagination="pagination"
                   :context-menu="RoomListContextMenu"
                   @paginate="paginate"
                   @entity-click="openEntityView"
        ></app-table>

    </div>

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { ScrollTop } from '../../../mixins'
    import { StoreName } from '../store'
    import {shallowRef} from 'vue'

    import RoomListContextMenu from "../components/RoomListContextMenu";
    import AppTable from "../../../core/components/AppTable";

    export default {

        components:{AppTable},

        data() {

            return {

                tab: null,

                RoomListContextMenu: shallowRef(RoomListContextMenu),

                tableColumns: [
                    {
                        name: 'id',
                        entityProp: 'id'
                    },
                    {
                        name: 'Номер',
                        entityProp: 'name'
                    },
                    {
                        name: 'Категория',
                        entityProp: 'category.name'
                    },
                    {
                        name: 'Опубликовано',
                        entityProp: room => room.publish ? 'Да' : 'Нет'
                    },
                ]
            }
        },

        computed: {

            ...mapState(StoreName , {
                entities: state => state.entities,
                pagination: state => state.pagination,
            })
        },

        methods: {

            ...mapActions(StoreName, ['getEntities']),

            paginate(page) {

                this.getEntities(Object.assign({
                    page: page
                }));

                this.scrollTop();
            },

            openEntityView(entity) {

                this.$router.push({ name: 'room.edit', params: { id: entity.id } });
            },
        },

        created() {

            this.getEntities();
        },

        mixins: [ ScrollTop ],

        name: "RoomList"
    }
</script>