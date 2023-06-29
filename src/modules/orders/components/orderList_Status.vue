<template>
    <span :style="styles" class="order-status">{{ entity.status.name }}</span>
</template>

<script>

    export default {

        computed: {

            styles() {

                return {
                    backgroundColor: this.entity.status.color
                }
            }
        },

        props: ['entity'],

        name: "orderList_Status"
    }
</script>
