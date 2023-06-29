<template>
    <div v-if="show" class="app-page__preloader">
        <img :src="'/admin/images/arrow-clockwise.svg'" />
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const show = computed(() => store.state.loader.show);
</script>

<script>
export default {
    name: "AppPreloader",
};
</script>

<!--<script>-->
<!--import { mapState } from "vuex";-->

<!--export default {-->
<!--    computed: {-->
<!--        ...mapState("loader", { show: (state) => state.show }),-->
<!--    },-->

<!--    name: "AppPreloader",-->
<!--};-->
<!--</script>-->
