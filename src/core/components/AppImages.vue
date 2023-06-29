<template>
    <div class="modalZoom" v-if="showModalCrop">
        <div class="modalWindow">
            <div>
                <div style="display: flex; justify-content: center; align-items: center">
                    <cropper :src="currentImage.source" alt="" ref="cropperRef" @change="onChange" style="max-width: 30rem" />
                    <div class="cropper-row">
                        <preview :width="200" :height="200" :image="result.image" :coordinates="result.coordinates" />
                        <div style="display: flex; justify-content: center; margin-top: 3rem">
                            <button
                                type="button"
                                @click="crop(cropperRef, value, currentIndex)"
                                style="display: block"
                                class="constructor__nav_button_with_text"
                            >
                                {{ i18n("buttons.crop") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close-modal" @click="changeShowModalCrop">
                <img :src="'/admin/images/exit.svg'" class="cropBtn_svg" alt="exit" />
            </div>
        </div>
    </div>
    <div class="modalZoom" v-if="showModalZoom">
        <div class="modalWindow">
            <div>
                <img :src="currentImage.source" alt="zoom-image" class="zoom-image" />
            </div>
        </div>
        <div class="close-modal" @click="changeShowModalZoom">
            <img :src="'/admin/images/exit.svg'" class="cropBtn_svg" alt="exit" />
        </div>
    </div>

    <div class="app-images component_offset">
        <div class="subtitle">
            {{ label ? label : "Изображение" }}
            <span class="app-images__recommended">({{ i18n("labels.size") }} - {{ image_x }}х{{ image_y }})</span>
        </div>

        <draggable v-model="value" class="row app-images__list" v-if="value && value.length" item-key="id">
            <template #item="{ element, index }">
                <div class="app-images__item">
                    <img :src="element.source" alt="" class="app-images__image" />
                    <div class="app-images__del" @click="removeImage(index, value)" :title="i18n('buttons.remove')">×</div>
                    <div class="toolsImages">
                        <button
                            @click="
                                () => {
                                    changeShowModalZoom();
                                    currentImage = element;
                                }
                            "
                        >
                            <img :src="'/admin/images/search.svg'" class="app-images_svg" alt="search" />
                        </button>
                        <button
                            @click="
                                () => {
                                    changeShowModalCrop();
                                    currentImage = element;
                                    currentIndex = index;
                                }
                            "
                        >
                            <img :src="'/admin/images/aspect-ratio.svg'" class="app-images_svg" alt="aspect-ratio" />
                        </button>
                    </div>
                </div>
            </template>
        </draggable>

        <div @click="$refs.inputImages.click()" class="btn btn_primary app-images__btn">
            <img :src="'/admin/images/upload.svg'" alt="upload" />
            <div>{{ i18n("buttons.upload") }}</div>
        </div>
        <div class="input_err_label" :title="error">{{ error }}</div>
        <input
            type="file"
            ref="inputImages"
            hidden
            accept="image/*"
            :multiple="true"
            @change="
                (event) => {
                    generateThumb(event, value);
                }
            "
        />
    </div>
</template>

<script setup>
import { Cropper, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import AppImageLang from "../language/AppImageLang";
import draggable from "vuedraggable";
import { useI18n } from "vue-i18n";

import useImage from "../../hooks/useImage";
import { watch } from "vue";
import { ref} from "vue";

const { t: i18n } = useI18n({ messages: AppImageLang, useScope: "local" });


const cropperRef = ref();
const currentImage = ref(null);
const currentIndex = ref(null);

let { label, value, error, image_x, image_y } = defineProps({
    label: String,
    value: Array,
    error: String,
    image_x: Number,
    image_y: Number,
});
const emit = defineEmits(["update:value"]);

const entities = { emit: emit };

const { showModalCrop, showModalZoom, result, changeShowModalCrop, changeShowModalZoom, generateThumb, onChange, crop, removeImage } =
    useImage(entities);

watch(
    () => value,
    (value) => {
        emit("update:value", value);
    }
);
</script>

<script>
export default {
    name: "AppImages",
};
</script>
