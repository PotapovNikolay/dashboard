import { ref } from "vue";

export default function () {
    const filter = ref([]);
    const types = ref(["place", "parter", "other"]);

    function changeFilter(item) {
        if (filter.value.includes(item)) {
            filter.value = filter.value.map((type) => (type !== item ? type : null));
        } else {
            filter.value.push(item);
        }
    }

    return {
        filter,
        types,
        changeFilter,
    };
}
