<template>

    <app-context-menu ref="appContextMenu">

        <div class="context-menu__item" @click="openOrder">

            Просмотреть

        </div>

        <div class="context-menu__item" @click="editComment">

            Редактировать комментарий

        </div>

        <div class="context-menu__item context-menu__item_dropdown" @mouseover.self="dropdownHover">

            Изменить статус

            <span class="icon_right"></span>

            <div class="context-menu__dropdown">

                <div class="context-menu__item" v-for="status in statuses" @click="setStatus(status)">
                    {{ status.name }}
                </div>

            </div>

        </div>

        <div class="context-menu__item" @click="toggleHidden" v-if="order">

            {{ order.hidden ? 'Показывать в общем списке' : 'Скрыть' }}

        </div>

    </app-context-menu>

</template>

<script>

    import { mapState } from 'vuex'

    export default {

        data() {

            return {

                order: null,
            }
        },

        // computed: {

        //     ...mapState('orderStatus' , {
        //         statuses: state => state.orderStatuses,
        //     })
        // },

        methods: {

            setStatus(newStatus) {

                this.$store.dispatch('order/changeStatus', {
                    order: this.order,
                    newStatus: newStatus
                });

                this.hide();
            },

            dropdownHover(event) {

                const target = event.target;

                const dropdown = target.querySelector('.context-menu__dropdown');

                const contextMenu = target.closest('.context-menu__content');

                if ((parseInt(this.$refs.appContextMenu.position.left) + contextMenu.offsetWidth + dropdown.offsetWidth) > window.innerWidth) {

                    dropdown.classList.add('context-menu__item_dropdown_left');
                }
                else {

                    dropdown.classList.remove('context-menu__item_dropdown_left');
                }

            },

            openOrder() {

                this.$router.push({ name: 'order.view', params: { id: this.order.id } });

                this.hide();
            },

            editComment() {

                this.$eventBus.$emit('allow-edit-order-message', { id: this.order.id });

                this.hide();
            },

            showContextMenu(event, order) {

                this.$refs.appContextMenu.showContextMenu(event);

                this.order = order;
            },

            toggleHidden() {

                this.$store.dispatch('order/changeHidden', {
                    order: this.order,
                    newHidden: !this.order.hidden
                });

                this.hide();
            },

            hide() {

                this.$refs.appContextMenu.hideContextMenu();
            }
        },

        name: "OrderContextMenu"
    }
</script>
