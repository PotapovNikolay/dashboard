<template>
    <div class="app-constructor__sidebar_settings app-constructor__sidebar_scroll">
        <div class="app-constructor__sidebar_settings_title">{{ i18n("labels.settings") }}</div>
        <div>
            <div
                :ref="
                    (el) => {
                        setItemRef(el, style.var, style.value);
                    }
                "
                class="app-constructor__sidebar_settings_container"
                v-for="(style, styleKey) in entity.classes"
                :key="styleKey"
            >
                <div class="app-constructor__sidebar_header" @click="openCategory(style.name)">
                    <div class="app-constructor__sidebar_settings_name">{{ style.name }}</div>
                    <img v-if="currentStyles.includes(style.name)" :src="'/admin/images/caret-down-fill.svg'" alt="caret-right-fill" />
                    <img v-else :src="'/admin/images/caret-right-white.svg'" alt="caret-right-fill" />
                </div>
                <Transition
                    name="list"
                    v-show="
                        currentStyles.includes(style.name) &&
                        (style.key === 'color' || style.key === 'background' || style.key === 'background-color')
                    "
                >
                    <div class="constructor__input_container" @click="openPickr(styleKey)">
                        <div :id="style.var"></div>

                        <div style="margin-left: 1rem">
                            {{ style.value }}
                        </div>
                    </div>
                </Transition>
                <Transition
                    name="list"
                    v-show="
                        currentStyles.includes(style.name) &&
                        style.key !== 'color' &&
                        style.key !== 'background' &&
                        style.key !== 'background-color'
                    "
                >
                    <div class="constructor__input_container">
                        <input
                            @input="(event) => debounceChange(style.var, event.target.value)"
                            :value="style.value"
                            :type="'text'"
                            class="constructor__style_input"
                        />
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { debounce } from "vue-debounce";
import { useI18n } from "vue-i18n";
import ConstructorViewLang from "../language/ConstructorViewLang";
import usePickr from "../hooks/usePickr";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const templateProps = inject("templateProps");

let { entity } = defineProps({
    entity: Object,
    isOpenPickr: Boolean,
});

const emit = defineEmits(["update:isOpenPickr"]);
const debounceChange = debounce(changeProps, "100ms");

const { openPickr, setItemRef } = usePickr(debounceChange, emit);

const currentStyles = ref([]);
function openCategory(name) {
    currentStyles.value.indexOf(name) === -1
        ? currentStyles.value.push(name)
        : currentStyles.value.splice(currentStyles.value.indexOf(name), 1);
}

function changeProps(key, value) {
    templateProps.styles[key] = value;

    const item = entity.classes.find((style) => style.var === key);

    entity.classes[entity.classes.indexOf(item)].value = value;
}
</script>

<script>
export default {
    name: "ConstructorSettings",
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>
