<template>
    <div class=" component_offset "
    :class="[missing && !props.value ?'app-description-error':missing && props.value ?'app-description-correct':'app-description']">
        <label class="label app-input__label">
            {{ props.label }}
            <span v-if="props.required" class="text-red">*</span>
        </label>

        <QuillEditor
            :toolbar="toolbar"
            ref="myEditor"
            @textChange="textDebounce"
            :content="props.value"
            contentType="html"
            style="height: 200px"
            class="ql-error"
        >
        </QuillEditor>
    </div>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { debounce } from "vue-debounce";
import { reactive, ref, computed } from "vue";

const editor = ref();

const myEditor = ref();

const toolbar = reactive({
    container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        [
            {
                color: [],
            },
        ],
        ["clean"],
    ],
});


const missing = computed(()=>props.error && props.error.hasOwnProperty("value") ? props.error.missing : props.error)


const props = defineProps({ value: String, error: Object| String, label: String, required: Boolean });
const emit = defineEmits(["update:value"]);

const textDebounce = debounce(setValue, "600ms");

function setValue() {
    emit("update:value", myEditor.value ? myEditor.value.getHTML() : null);

    if (props.error?.value) {
        props.error.value = null;
    }
}

function initValue(content) {
    if (myEditor.value) {
        myEditor.value.setContents(content);

        return false;
    }
    return true;
}

function onDeactivated() {
    if (editor.value) {
        editor.value.destroy();

        editor.value = null;
    }
}

defineExpose({
    initValue,
});
</script>

<script>
export default {
    name: "AppDescription",
};
</script>
