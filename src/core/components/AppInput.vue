<template>
    <div class="app-input" :class="{ 'app-input_inline': props.inline }">
        <label
            class="label app-input__label"
            :style="{ color: missing && !props.value ? ' #ef476f' : missing && props.value ? ' #2ec4b6' : '' }"
        >
            {{ props.label }}
            <span v-if="props.required" class="text-red">*</span>
        </label>

        <input
            :type="props.type ? props.type : 'text'"
            class="app-input__input app-input__width"
            @input="(event) => handleInput(event.target.value)"
            :title="errorValue"
            :class="[missing ? 'input_err' : '']"
            :value="props.type === 'date' ? dateFormat(props.value) : props.value"
            :placeholder="errorValue"
            :style="{
                border: missing && !props.value ? '1px solid #ef476f' : missing && props.value ? '1px solid #2ec4b6' : '',
            }"
            @keypress.enter="emit('keypress-enter')"
        />
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    value: String | Number,
    type: String,
    error: Object | String,
    label: String,
    inline: Boolean,
    minWidth: Number,
    required: Boolean,
});

const missing = computed(() => (props.error && props.error.hasOwnProperty("value") ? props.error.missing : props.error));
const errorValue = computed(() => (props.error && props.error.hasOwnProperty("value") ? props.error.value : props.error));

const emit = defineEmits(["update:value", "keypress-enter:value"]);

function handleInput(value) {
    emit("update:value", value);

    if (props.error?.value) {
        props.error.value = null;
    }
}

function dateFormat(value) {
    if (value && value.match(/((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})/)?.length) {
        const [day, month, year] = value.split("-");
        return year + "-" + month + "-" + day;
    } else {
        return value;
    }
}
</script>

<script>
export default {
    name: "AppInput",
};
</script>

<style>
.app-input__width {
    min-width: v-bind(minWidth + "px");
}
</style>
