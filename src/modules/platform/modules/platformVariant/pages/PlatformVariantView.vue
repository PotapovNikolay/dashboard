<template>
    <div class="order-module-view module-style" v-if="entity">
        <div class="page_title">
            {{ entity.id ? i18n("title.edit") : i18n("title.create") }}
        </div>

        <div class="category-view__name form-group">
            <app-input v-model:value="entity.name" :label="i18n('labels.name')" :error="errors.name" :min-width="450"></app-input>
        </div>

        <!--            Тип-->
        <!--            v-if="entity.schema"-->
        <div class="form-group">
            <upload-schema
                ref="uploadSchemeRef"
                :watchSchema="i18n('buttons.uploadSchema')"
                :uploadSchema="i18n('buttons.watchSchema')"
                :schema="entity.schema"
                @setScheme="setScheme"
            ></upload-schema>
        </div>

        <div class="scheme-svg" v-if="entity.sectors?.length">
            <div v-if="schemeSvgRaw" v-html="schemeSvgRaw" @click="openSchemeSector" style="max-width: 100%; max-height: 500px"></div>

            <div class="platform-variant-view__filter_container row">
                <span style="margin-right: 2rem"> {{ i18n("labels.filter") }}: </span>
                <button
                    :style="[
                        filter.includes(item) ? 'transition: all .2s linear;' : 'background-color:#bebebe; transition: all .2s linear;',
                    ]"
                    @click="changeFilter(item)"
                    v-for="item in types"
                >
                    <span>{{ item }}</span>
                    <span style="font-size: 20px">&times;</span>
                </button>
            </div>
            <div class="row">
                <div
                    class="platform-variant-view__sector"
                    v-for="sector in entity.sectors.filter((item) => (filter.includes(item?.type) ? item : null))"
                >
                    <div class="platform-variant-view__sector-info">
                        <div class="platform-variant-view__sector-value">
                            {{ i18n("labels.nameOfSector") }}: <span class="strong">{{ sector.name }}</span>
                        </div>

                        <div class="platform-variant-view__sector-value">
                            {{ i18n("labels.type") }}:
                            {{ sector.type === "place" ? i18n("options.places") : i18n("options.stalls") }}
                        </div>

                        <span v-if="sector?.rows?.length" class="platform-variant-view__sector-value">
                            [ {{ i18n("labels.rows") }}: {{ sector.rows.length }}, {{ i18n("labels.places") }}:
                            {{ getPlaceCount(sector.rows) }} ]
                        </span>
                    </div>

                    <span class="del" @click="removeSector(sector)">&times;</span>

                    <div>
                        <a
                            v-if="sector.type === 'place'"
                            href="#"
                            class="platform-variant-view__sector-link"
                            @click.prevent="markUpSector(sector)"
                        >
                            {{ i18n("buttons.markUp") }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="platform-variant-view__input_container">
            <input
                type="text"
                :placeholder="i18n('labels.nameOfSector')"
                class="input app-input__input platform-variant-view__input"
                v-model="newSector.name"
                @keypress.enter="addSector"
            />

            <div class="app-input platform-variant-view__checkboxes checkboxes-wrap">
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" value="place" v-model.number="newSector.type" />
                    {{ i18n("options.places") }}
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" value="parter" v-model.number="newSector.type" />
                    {{ i18n("options.stalls") }}
                </label>
            </div>

            <button class="btn btn_primary platform-variant-view__btn" @click="addSector">
                {{ i18n("buttons.add") }}
            </button>
        </div>

        <app-images
            v-if="entity.images"
            v-model:value="entity.images.gallery"
            :label="i18n('labels.image')"
            :error="errors.images.gallery"
            :image_x="1920"
            :image_y="1024"
        >
        </app-images>

        <generator-sector
            v-show="showStateSectorGenerator"
            ref="sectorGeneratorRef"
            @hideSectorGenerator="hideSectorGenerator"
            @close="hideSectorGenerator"
        ></generator-sector>

        <div style="margin-left: 0" class="form-group row">
            <div>
                <button class="btn btn_primary save__btn" @click="save">{{ i18n("buttons.save") }}</button>
            </div>

            <!--            <div class="save ml10">-->
            <!--                <button class="btn btn_primary save__btn" @click="fileExport">Экспорт</button>-->
            <!--            </div>-->

            <div v-if="entity.id" class="form-group row">
                <label class="btn btn_primary save__btn ml10 p_rel _file_save_button" style="margin-left: 50px"
                    >{{ i18n("labels.selectFile") }}
                    <input type="file" id="file" ref="fileRef" @change="fileImport" />
                </label>
                <div class="save ml10">
                    <button class="btn btn_primary save__btn" @click="fileUpload">
                        {{ i18n("buttons.send") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import GeneratorSector from "../component/GeneratorSector";
import UploadSchema from "../component/UploadSchema";
import { useI18n } from "vue-i18n";
import PlatformVariantViewLang from "../language/PlatformVariantViewLang";
import { entityItem, errorsItem } from "../helpers";
import { onActivated, onDeactivated, inject, ref, reactive, watchEffect } from "vue";
import { StoreName } from "../store";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import cloneDeep from "lodash/cloneDeep";

import { useFiles, useSectors, useSchema, useUpdateTippy } from "../hooks";

const store = useStore();
const route = useRoute();
const router = useRouter();

const { t: i18n } = useI18n({ messages: PlatformVariantViewLang, useScope: "local" });

const uploadSchemeRef = ref();

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem, null, transformEntity, true);

const { getPlaceCount, updateTippy } = useUpdateTippy(entity);

const { filter, types, changeFilter } = inject("useFilter")();

const { file, fileRef, fileImport, fileUpload } = useFiles();

const {
    newSector,
    sectorGeneratorRef,
    showStateSectorGenerator,
    addSector,
    removeSector,
    mergeSectors,
    markUpSector,
    hideSectorGenerator,
} = useSectors(entity, updateTippy);

const { schemeSvgRaw, setScheme, uploadScheme, openSchemeSector } = useSchema(entity, mergeSectors, markUpSector, updateTippy);

watchEffect(() => {
    if (uploadSchemeRef.value) {
        uploadSchemeRef.value.setSchemeUrl(entity.schema ? entity.schema : null);
    }
});

function transformEntity() {
    Object.assign(entity, { platformId: route.params.id ? route.params.id : null });
}

async function init() {
    entity.images = Object.keys(entity.images).length ? entity.images : entityItem.images;
    await uploadScheme(entity.schema ? entity.schema : null);
}

onActivated(async () => {
    if (route.params.varId) {
        const response = await store.dispatch(`${StoreName}/getEntityById`, {
            id: route.params.id,
            varId: route.params.varId,
        });

        if (response.success) {
            Object.assign(entity, _.cloneDeep(response.entity));
            await init();
        }
    } else {
        Object.assign(entity, _.cloneDeep(entityItem));
        await init();
    }
});

onDeactivated(() => {
    Object.assign(entity, _.cloneDeep(entityItem));
    hideSectorGenerator();
});

// onBeforeRouteLeave(() => {

//     store.dispatch("loader/hide");

//     // hideSectorGenerator();

//     if (showStateSectorGenerator.value) {
//         let result = confirm("Заполненые данные будут утеряны, продолжить?");

//         if (result) {
//             hideSectorGenerator();

//             return true;
//         }
//         return false;
//     }
// });
</script>
