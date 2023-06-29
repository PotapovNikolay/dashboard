<template>

    <div @click.stop
         :class="{ 'order-list__manager-comment_allow-edit': allowEdit }"
         class="order-list__manager-comment"
         @keypress.ctrl.enter="updateManagerComment"
         :contenteditable="allowEdit ? 'true' : 'false'"
         ref="textarea"
         v-text="entity.managerComment"
    ></div>

</template>

<script>

    export default {

        data() {
            return {
                allowEdit: false,
            }
        },

        methods: {

            async updateManagerComment() {

                this.allowEdit = false;

                await this.$store.dispatch('order/updateManagerComment', {
                    id: this.entity.id,
                    managerComment: this.$refs.textarea.innerText.trim()
                });
            },
        },

        created() {

            this.$eventBus.$on('allow-edit-order-message', data => {

                if (this.entity.id === data.id) {

                    this.allowEdit = true

                    this.$refs.textarea.focus();
                }
            });
        },

        props: ['entity'],

        name: "orderList_ManagerComment"
    }
</script>
