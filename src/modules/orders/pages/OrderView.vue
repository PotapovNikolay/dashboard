<template>
    <!--    <app-nav-bar v-if="entity" :title="title" @save="save('order')" :tabs="tabs" v-model:entity="entity" v-model:errors="errors" />-->
    <!-- <app-tabs-navigation :title="title" @save="save('events')" :tabs="tabs" v-model:entity="entity" v-model:errors="errors" /> -->
    <app-nav-bar v-if="entity" :title="title" @save="save()" :tabs="tabs" />
</template>


<script setup>
import { provide, ref,inject } from "vue";
import { tabs as tab } from "../helpers/tabs";
import { StoreName } from "../store";
// const { t: i18n } = useI18n({ messages: TeamsViewLang, useScope: "local" });

// const title = i18n("title");
const tabs = ref(tab);

const { entity, errors, save } = inject("useInitView")(StoreName, {}, {});

provide("entity", entity);
provide("errors", errors);

</script>

<!-- <script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Store, StoreName } from "../store";
import debounce from "lodash/debounce";
import orderSearch from "../components/orderSearch";
import copy from "copy-to-clipboard";



export default {
    data() {
        return {
            currentTabIndex: 0,
            tabs: tabs,
            currentTab: null,
            entity: null,
            title: "Новый зазаз",
            managerCommentDebounce: debounce(this.updateManagerComment, 800),
        };
    },


    computed: {
        ...mapState("orderStatus", { statuses: (state) => state.orderStatuses }),
        ...mapGetters("orderStatus", { getStatusById: "getStatusById" }),
    },

    methods: {
        ...mapActions(StoreName, { getItemById: "getOrderById" }),

        assignErrors(response) {
            this.errors = Object.assign({}, errors, response.errors);
        },

        async updateOrderStatus(newStatusId) {
            await this.$store.dispatch("order/changeStatus", {
                order: this.order,
                newStatus: this.getStatusById(newStatusId),
            });
        },

        copyText(text) {
            copy(text);

            alert("Скопировано");
        },

        async updateManagerComment() {
            await this.$store.dispatch("order/updateManagerComment", {
                id: this.order.id,
                managerComment: this.order.managerComment,
            });
        },

        async updatePaid(newPaid) {
            await this.$store.dispatch("order/updatePaid", {
                id: this.entity.id,
                paid: newPaid,
            });
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if ("id" in to.params) {
                let item = vm.getItemById(to.params.id);

                item.then((item) => {
                    vm.entity = Object.assign({}, item);
                });
            }
        });
    },

    components: {
        orderSearch,
    },

    name: "OrderView",
    mixins: ["SwitchTab"],
};
</script> -->
