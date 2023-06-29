<template>
    <div class="row">
        <template v-if="schemeUrl">
            <a :href="schemeUrl" class="btn btn_primary upload-scheme__btn" target="_blank">{{ uploadSchema }}</a>
        </template>

        <div @click="inputRef.click()" class="btn btn_primary upload-scheme__btn">{{ watchSchema }}</div>

        <input :key="componentKey" type="file" ref="inputRef" hidden accept="image/svg+xml,image/svg" @change="uploadScheme" />
    </div>
</template>

<script setup>
import { ref, inject, onActivated, onDeactivated } from "vue";

const axios = inject("useAxios");

const schemeUrl = ref(null);
const inputRef = ref(null);

const { schema, uploadSchema, watchSchema } = defineProps(["schema", "uploadSchema", "watchSchema"]);
const emit = defineEmits(["setScheme"]);

const componentKey = ref(0);

async function uploadScheme(event) {
    let files = event.target.files.length > 1 ? event.target.files : event.target.files[0];

    if (!files) return;

    const fd = new FormData();

    fd.append("schema", files);

    const { data } = await axios.post(`/schema/parse`, fd);

    if (data.success) {
        emit("setScheme", { sectors: data.sectors, url: data.schema });
    } else {
        alert("что-то пошло не так");
    }
}

function setSchemeUrl(schema) {
    schemeUrl.value = schema;
}

onActivated(() => {
    componentKey.value += 1;
    schemeUrl.value = null;
});

defineExpose({
    setSchemeUrl,
});
</script>

<script>
export default {
    name: "UploadSchema",
};
</script>
