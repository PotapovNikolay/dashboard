<template>
    <div class="app-input" :class="{ 'app-input_inline': props.inline }">
        <label
            class="label app-input__label"
            :style="{ color: props.error.missing && !props.value ? ' #ef476f' : props.error.missing && props.value ? ' #06d6a0' : '' }"
        >
            {{ props.label }}
            <span v-if="props.required" class="text-red">*</span>
        </label>

        <div
            class="app-debounce-select app-input__width"
            v-click-outside="
                () => {
                    isToggle ? toggle() : null;
                }
            "
        >
            <button
                class="app-age-select__current app-input__width"
                style="font-size: 14px; font-family: 'Montserrat', sans-serif; text-align: start"
                :style="{
                    border:
                        props.error.missing && !props.value
                            ? '1px solid #ef476f'
                            : props.error.missing && props.value
                            ? '1px solid #06d6a0'
                            : '',
                    color: props.error.missing && !props.value ? '#8e8e8e' : props.error.missing && props.value ? '#000' : '',
                    borderBottomLeftRadius: isToggle ? '0' : '4px',
                    borderBottomRightRadius: isToggle ? '0' : '4px',
                }"
                @click="toggle"
            >
                {{ props.value }}
            </button>
        </div>
        <div v-if="isToggle" class="app-age-select__drop_container">
            <div @click="selectAge(age)" v-for="age in ages">
                {{ age }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isToggle = ref(false);
const ages = [0, 6, 12, 16, 18];

const props = defineProps({
    value: Number,
    minWidth: Number,
    label: String,
    error: Object,
    inline: Boolean,
    required: Boolean,
});

const emit = defineEmits(["update:value", "keypress-enter:value"]);

function selectAge(age) {
    emit("update:value", age);

    if (props.error.value) {
        props.error.value = null;
    }
}

function toggle() {
    isToggle.value = !isToggle.value;
}
</script>

<script>
export default {
    name: "AppAgeSelect",
};
</script>
<style scoped>
.app-input__width {
    min-width: v-bind(minWidth + "px");
}
</style>
