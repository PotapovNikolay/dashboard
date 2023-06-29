<template xmlns="http://www.w3.org/1999/html">
    <div class="app-input">
<!--        <div class="form_inline platform-variant-live-select__item  app-debounce-variant-select__width">-->
            <label class="label app-input__label">{{ label }}</label>

            <div class="app-debounce-select  app-debounce-variant-select__width" >
                <button
                    v-click-outside="
                        () => {
                            showDropdown = false;
                        }
                    "
                    @click="show"
                    class="app-debounce-select__current app-debounce-variant-select__width"
                    style="text-align: start"
                >
                    {{ variantOfPlatform ? variantOfPlatform.name:entity.name?entity.name : i18n("buttons.choose") }}
                </button>
                <div class="app-select__dropdown app-debounce-variant-select__width" :class="[{ show: showDropdown }]" >
                    <div class="app-select__option" @click="setVariant(variant)" v-for="variant in variants">
                        <div>{{ variant.name }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <button class="btn" v-if="selectedPlatformVariantId" @click="loadVariation">Загрузить вариацию</button> -->
<!--    </div>-->
</template>

<script setup>
import {ref} from "vue";

import { useI18n } from "vue-i18n";
import EventViewLang from "../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });


const platforms = [];
const showDropdown = ref(false);
const variantOfPlatform = ref(null);

const { minWidth, variants, entity, label } = defineProps({ minWidth: Number, variants: Array, entity: Object, label: String });
const emit = defineEmits(["update:entity"]);

function setVariant(variant) {
    variantOfPlatform.value = variant;
    emit("update:entity", variant);
}

function show() {
    showDropdown.value = !showDropdown.value;
}
</script>

<script>
export default {
    name: "PlatformVariantLiveSelect",
};
</script>

<style >
.app-debounce-variant-select__width {
    min-width: v-bind(minWidth + "px");
}

@media screen and (max-width: 600px) {
    .app-debounce-variant-select__width {
        min-width: 100%
    }
}

</style>