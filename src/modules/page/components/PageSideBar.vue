<template>
    <div class="page__sideBar_window">
        <div class="page__sideBar_window_nav">
            <div class="page__sideBar_window_nav_item">Библиотека блоков</div>
            <button @click="emit('openSideBar')" class="page__sideBar_window_nav_item" style="cursor: pointer">
                <img :src="'/admin/images/x.svg'" class="sidebar__icon" />
            </button>
        </div>

        <div @click="addComponentToPage(item.id)" :key="key" v-for="(item, key) in nameOfComponents" class="page__sideBar_window_itemOfList">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import { StoreName } from "../store";

const route = useRoute();

const store = useStore();
const state = store.state[StoreName];

const indexOfBlock = computed(() => state.indexOfBlock);
const nameOfComponents = computed(() => store.getters[`${StoreName}/nameOfComponents`]);

const { lastIndex } = defineProps({ lastIndex: Number });

const emit = defineEmits(["openSideBar", "callGetter"]);

function addComponentToPage(id) {
    const index = indexOfBlock.value === null ? lastIndex : indexOfBlock.value;

    store.dispatch(`${StoreName}/getComponent`, { id: id, index: index, indexOfPage: route.params.id }).then((_) => {
        emit("callGetter");
        emit("openSideBar");
        store.commit(`${StoreName}/setSelectedComponents`, id);
    });
}
</script>

<script>
export default {
    name: "PageSideBar",
};
</script>


<style scoped></style>
