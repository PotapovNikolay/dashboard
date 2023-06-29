<template>
    <div class="modalZoom" v-if="showModalCrop">
        <div class="modalWindow">
            <div>
                <div style="display: flex; justify-content: center; align-items: center">
                    <cropper :src="value.source" alt="" ref="cropperRef" @change="onChange" style="max-width: 30rem" />
                    <div class="cropper-row">
                        <preview :width="200" :height="200" :image="result.image" :coordinates="result.coordinates" />
                        <div style="display: flex; justify-content: center; margin-top: 3rem">
                            <button
                                type="button"
                                @click="crop(cropperRef, value)"
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
                <img :src="value.source" alt="zoom-image" class="zoom-image" />
            </div>
        </div>
        <div class="close-modal" @click="changeShowModalZoom">
            <img :src="'/admin/images/exit.svg'" class="cropBtn_svg" alt="exit" />
        </div>
    </div>
    <div class="app-images component_offset">
        <div class="subtitle">
            {{ label ? label : "Изображение" }}
            <span class="app-images__recommended">({{ i18n("labels.size") }}- {{ image_x }}х{{ image_y }})</span>
        </div>
        <!--        v-on:mouseleave="unsetShowMenu" v-on:mouseover="setShowMenu"-->
        <div v-if="value?.id" class="app-images__item">
            <img :src="value.source" alt="" class="app-images__image" />
            <div class="app-images__del" @click="$emit('update:value', {})" :title="i18n('buttons.remove')">×</div>
            <div class="tools">
                <button @click="changeShowModalZoom">
                    <img :src="'/admin/images/search.svg'" class="app-images_svg" alt="search" />
                </button>
                <button @click="changeShowModalCrop">
                    <img :src="'/admin/images/aspect-ratio.svg'" class="app-images_svg" alt="aspect-ratio" />
                </button>
                <!--                <button @click="$refs.inputImages.click()">-->
                <!--                    <img :src="'/admin/images/upload.svg'" class="app-images_svg" alt="upload" />-->
                <!--                </button>-->
            </div>
        </div>

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
import { useI18n } from "vue-i18n";
import AppImageLang from "../language/AppImageLang";
import { ref } from "vue";
import useImage from "../../hooks/useImage";

const { t: i18n } = useI18n({ messages: AppImageLang, useScope: "local" });

const cropperRef = ref();

let { label, value, error, image_x, image_y } = defineProps({
    label: String,
    value: Object,
    error: String,
    image_x: Number,
    image_y: Number,
});
const emit = defineEmits(["update:value"]);

const entities = { emit: emit };

const { showModalCrop, showModalZoom, result, changeShowModalCrop, changeShowModalZoom, generateThumb, onChange, crop } =
    useImage(entities);
</script>

<script>
export default {
    name: "AppImage",
};
</script>
<style></style>
