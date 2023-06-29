import { ref } from "vue";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";
import "@simonwep/pickr/dist/themes/monolith.min.css";
export default function (debounceChange, emit) {
    const picrs = ref([]);

    function openPickr(key) {
        picrs.value[key].show();
    }

    const setItemRef = (el, key, value) => {
        if (el && el.querySelector(`#${key}`)) {
            picrs.value.push(
                Pickr.create({
                    el: el.querySelector(`#${key}`),
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
                })
                    .on("change", (color, eventSource, PickrInstance) => {
                        debounceChange(key, color.toHEXA().toString());
                        PickrInstance.setColor(color.toHEXA().toString());
                    })
                    .on("show", () => {
                        emit("update:isOpenPickr", false);
                    })
                    .on("hide", () => {
                        emit("update:isOpenPickr", true);
                    })
            );
        }
    };

    return { openPickr, setItemRef };
}
