<template>
    <span v-if="entity.total_cost_with_discount !== entity.total_cost">
        <s>{{ entity.total_cost }}</s> {{ entity.total_cost_with_discount }}
    </span>
    <span v-else>
        {{ entity.total_cost }}
    </span>
</template>

<script>

    export default {
        props: ['entity'],

        name: "orderList_Total"
    }
</script>
