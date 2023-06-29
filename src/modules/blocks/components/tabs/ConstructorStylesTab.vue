<template>
    <div class="app-constructor__editor">
        <div class="constructor__container_scroll">
            <div class="app-constructor__editor_list app-constructor__editor_list__journal-scroll">
                <div v-for="(item, key) in entity.classes" :key="key" class="app-constructor__editor_styles">
                    <!--                    <color-picker-->
                    <!--                        style="position: absolute"-->
                    <!--                        v-if="item.key === 'color' || item.key === 'background' || item.key === 'background-color'"-->
                    <!--                        :color="item.value"-->
                    <!--                        @changeColor="debounceChange(item.var, event)"-->
                    <!--                    />-->
                    <div
                        v-if="item.key === 'color' || item.key === 'background' || item.key === 'background-color'"
                        :ref="
                            (el) => {
                                setItemRef(el, item.var, item.value);
                            }
                        "
                    ></div>
                    <!--                    :style="{ backgroundColor: item.value }"-->
                    <div v-else class="app-constructor__component_container_color">
                        <input
                            @input="(event) => debounceChange(item.var, event.target.value)"
                            :value="item.value"
                            :type="item.key === 'color' || item.key === 'background' || item.key === 'background-color' ? 'color' : 'text'"
                            :class="[
                                item.key === 'color' || item.key === 'background' || item.key === 'background-color'
                                    ? 'app-constructor__component_color'
                                    : 'app-constructor__component_fontSize',
                            ]"
                        />
                    </div>

                    <div>
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
        <!--        <div class="app-constructor__editor_warning" v-else>здесь пока нечего редактировать</div>-->
    </div>
</template>

<script setup>
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";
import "@simonwep/pickr/dist/themes/classic.min.css";
import { inject, onBeforeUpdate, ref, watchEffect } from "vue";
import { debounce } from "vue-debounce";

const { entity } = defineProps({
    entity: Object,
});

const templateProps = inject("templateProps");

const debounceChange = debounce(emit, "100ms");

function emit(key, value) {
    templateProps.styles[key] = value;
}

const pickrs = ref([]);

const setItemRef = (el, key, value) => {
    if (el) {
        Pickr.create({
            el: el,
            theme: "nano", // or 'monolith', or 'nano'
            default: value,
            defaultRepresentation: "HEX",
            swatches: [
                "rgba(244, 67, 54, 1)",
                "rgba(233, 30, 99, 0.95)",
                "rgba(156, 39, 176, 0.9)",
                "rgba(103, 58, 183, 0.85)",
                "rgba(63, 81, 181, 0.8)",
                "rgba(33, 150, 243, 0.75)",
                "rgba(3, 169, 244, 0.7)",
            ],

            components: {
                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true,
                },
            },
        }).on("change", (color, eventSource, PickrInstance) => {
            debounceChange(key, color.toHEXA().toString());
            PickrInstance.setColor(color.toHEXA().toString());
        });
    }
};

onBeforeUpdate(() => {
    pickrs.value = [];
});

// watchEffect(() => {
//     if (itemRefs.length) {
//         pickr = Pickr.create({
//             el: "#color-picker",
//             theme: "nano", // or 'monolith', or 'nano'
//
//             swatches: [
//                 "rgba(244, 67, 54, 1)",
//                 "rgba(233, 30, 99, 0.95)",
//                 "rgba(156, 39, 176, 0.9)",
//                 "rgba(103, 58, 183, 0.85)",
//                 "rgba(63, 81, 181, 0.8)",
//                 "rgba(33, 150, 243, 0.75)",
//                 "rgba(3, 169, 244, 0.7)",
//             ],
//
//             components: {
//                 // Main components
//                 preview: true,
//                 opacity: true,
//                 hue: true,
//
//                 // Input / output Options
//                 interaction: {
//                     hex: true,
//                     rgba: true,
//                     input: true,
//                     clear: true,
//                     save: true,
//                 },
//             },
//         });
//         pickr.on("change", (color) => {
//             console.log('Event: "change"', color.toHEXA().toString());
//         });
//     }
// });
</script>

<script>
export default {
    name: "ConstructorStylesTab",
};
</script>

<!--<script>-->
<!--export default {-->
<!--    props: {-->
<!--        entity: { type: Object },-->

<!--        iFrameVariablesContext: {-->
<!--            type: Object,-->
<!--        },-->
<!--        currentTemplate: {-->
<!--            type: [String, Number],-->
<!--        },-->
<!--    },-->
<!--    emits: ["editEditingComponents", "update:entity"],-->

<!--    watch: {-->
<!--        entity(newEntity) {-->
<!--            this.$emit("update:entity", newEntity);-->
<!--        },-->
<!--    },-->

<!--    name: "ConstructorStylesTab",-->
<!--};-->
<!--</script>-->

<style scoped></style>
