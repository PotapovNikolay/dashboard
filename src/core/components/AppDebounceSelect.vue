<template>
    <div class="app-input" @click.stop>
        <label
            class="label app-input__label"
            :style="{ color: missing && !defaultValue ? ' #ef476f' : missing && defaultValue ? ' #2ec4b6' : '' }"
        >
            {{ label }}
            <span v-if="props.required" class="text-red">*</span>
        </label>
        <div class="app-debounce-select app-debounce-select__width">
            <button
                v-click-outside="onClickOutside"
                @click="toggle"
                :style="{
                    border:
                        missing && !defaultValue
                            ? '1px solid #ef476f'
                            : missing && defaultValue
                            ? '1px solid #2ec4b6'
                            : '',
                    color: missing && !defaultValue ? '#8e8e8e' : missing && defaultValue ? '#000' : '',
                }"
                class="app-debounce-select__current app-debounce-select__width"
                style="text-align: start"
            >
                {{
                    errorValue && !defaultValue
                        ? errorValue
                        : !defaultValue && !missing
                        ? i18n("labels.default")
                        : defaultValue
                }}
            </button>
            <Transition name="context-menu">
                <div v-if="showDropdown" class="app-select__dropdown app-debounce-select__width" :class="[{ show: showDropdown }]">
                    <input
                        type="text"
                        class="app-input__input app-debounce-select__dropdown_width"
                        :title="missing"
                        v-model="searchString"
                        @input="searchingEntityDebounce"
                        :placeholder="i18n('labels.search')"
                    />
                    <div class="app-select__option" @click.stop="select(0)">{{ i18n("labels.default") }}</div>

                    <div class="app-select__option" @click.stop="select(searchingEntity)" v-for="searchingEntity in searchingEntities">
                        <div>{{ searchingEntity.name ? searchingEntity.name : null }}</div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject, ref, watch, computed } from "vue";
import { debounce } from "vue-debounce";

import AppDebounceSelectLang from "../language/AppDebounceSelectLang";

const { t: i18n } = useI18n({ messages: AppDebounceSelectLang, useScope: "local" });
const axios = inject("useAxios");

const props = defineProps({
    errorKey: String,
    value: Object | Number,
    error: Object | String,
    label: String,
    minWidth: Number,
    initialValue: String,
    required: Boolean,
    urlString: String,
});

const emit = defineEmits(["update:value"]);

const missing = computed(()=>props.error && props.error.hasOwnProperty("value") ? props.error.missing : props.error)
const errorValue = computed(()=>props.error && props.error.hasOwnProperty("value") ? props.error.value : props.error)


const showDropdown = ref(false);
const defaultValue = ref(props.initialValue);
const searchingEntities = ref([]);
const searchString = ref("");

const searchingEntityDebounce = ref(debounce(fetchCategories, "450ms"));

watch(showDropdown, () => {
    if (!showDropdown.value) {
        searchString.value = "";
    }
});

async function fetchCategories() {
    const { data } = await axios.get(props.urlString, {
        params: {
            search: searchString.value,
        },
    });
    if (data.success) {
        searchingEntities.value = data.entities;
    }
}

function onClickOutside() {
    showDropdown.value = false;
}

function select(searchingEntity) {
    searchString.value = searchingEntity === 0 ? "Не выбрано" : searchingEntity.name;
    defaultValue.value = searchingEntity === 0 ? "Не выбрано" : searchingEntity.name;
    searchingEntityDebounce.value.cancel();

    emit("update:value", searchingEntity);

    if (props.error.value) {
        props.error.value = null;
    }

    hide();
}

function toggle() {
    fetchCategories();
    showDropdown.value = !showDropdown.value;
}

function hide() {
    showDropdown.value = false;
}

function initValue(string) {
    searchString.value = "";
    defaultValue.value = string;
    return false;
}

defineExpose({
    initValue,
});
</script>

<script>
export default {
    name: "AppDebounceSelect",
};
</script>

<style>
.app-debounce-select__width {
    min-width: v-bind(minWidth + "px");
}

.app-debounce-select__dropdown_width {
    min-width: v-bind(minWidth - 20 + "px");
    margin: 0 10px;
}

@media screen and (max-width: 720px) {
    .app-debounce-select__dropdown_width {
        min-width: v-bind(minWidth - 20 + "px");
        margin: 0;
    }
}
</style>
