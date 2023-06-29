<template>
    <div>
        <div v-if="schemeSvgRaw" class="scheme-svg">
            <div v-html="schemeSvgRaw" @click="openSchemeSector" style="max-width: 100%; max-height: 500px"></div>

            <div v-if="entity.id && entity.sectors" class="row">
                <label class="btn btn_primary save__btn ml10 p_rel _file_save_button">
                    Выбрать файл
                    <input type="file" id="file" ref="fileRef" @change="fileImport" />
                </label>
                <div class="save ml10">
                    <button class="btn btn_primary save__btn" @click="fileUpload">Отправить</button>
                </div>
            </div>

            <div class="platform-variant-view__filter_container row">
                <span style="margin-right: 2rem"> {{ i18n("labels.platform.filter") }}: </span>
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
                    class="platform-variant-view__sector row"
                    v-for="sector in entity.sectors.filter((item) => (filter.includes(item?.type) ? item : null))"
                >
                    <div class="platform-variant-view__sector-info">
                        <div class="platform-variant-view__sector-value">
                            {{ i18n("labels.platform.name") }}: <span class="strong">{{ sector.name }}</span>
                        </div>

                        <div class="platform-variant-view__sector-value">Тип: {{ getSectorType(sector) }}</div>

                        <div v-if="sector.type === 'place'" class="platform-variant-view__sector-value">
                            {{ i18n("labels.platform.placesWithPrice") }}: {{ getPlaceCountWithPrice(sector) }}
                        </div>

                        <div
                            v-if="(sector.type === 'parter' || sector.type === 'other') && sector.price"
                            class="platform-variant-view__sector-value"
                        >
                            {{ i18n("labels.platform.costOfPlace") }}: {{ sector.price }}
                        </div>

                        <div
                            v-if="(sector.type === 'parter' || sector.type === 'other') && sector.places"
                            class="platform-variant-view__sector-value"
                        >
                            {{ i18n("labels.platform.numberOfSeats") }}: {{ sector.places }}
                        </div>

                        <div
                            v-if="(sector.type === 'parter' || sector.type === 'other') && sector.text"
                            class="platform-variant-view__sector-value"
                        >
                            <p style="word-wrap: break-word">{{ i18n("labels.platform.text") }}: {{ sector.text }}</p>
                        </div>
                    </div>

                    <span class="del" @click="removeSector(sector)">&times;</span>

                    <div>
                        <a
                            v-if="sector.type === 'place'"
                            href="#"
                            class="platform-variant-view__sector-link"
                            @click.prevent="openSector(sector)"
                        >
                            {{ i18n("buttons.assignCostToPlaces") }}
                        </a>

                        <a
                            v-if="sector.type === 'parter' || sector.type === 'other'"
                            href="#"
                            class="platform-variant-view__sector-link"
                            @click.prevent="setSectorPrice(sector)"
                        >
                            {{ i18n("buttons.assignCost") }}
                        </a>

                        <a
                            v-if="sector.type === 'parter' || sector.type === 'other'"
                            href="#"
                            class="platform-variant-view__sector-link"
                            @click.prevent="setSectorPlaces(sector)"
                        >
                            {{ i18n("buttons.assignNumberOfSeats") }}
                        </a>

                        <a
                            v-if="sector.type === 'parter' || sector.type === 'other'"
                            href="#"
                            class="platform-variant-view__sector-link"
                            @click.prevent="setSectorText(sector)"
                        >
                            {{ i18n("buttons.assignText") }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <edit-sector ref="editSectorRef" @close="hideEditSector" @save="saveSector" v-show="showEditSector"></edit-sector>

        <div class="form-group">
            <input
                type="text"
                placeholder="Название сектора"
                class="input app-input__input platform-variant-view__input"
                v-model="newSector.name"
                @keypress.enter="addSector"
            />

            <button class="btn btn_primary platform-variant-view__btn" @click="addSector">{{ i18n("buttons.add") }}</button>
        </div>
    </div>
</template>

<script setup>
import EditSector from "../component/EditSector";
import { inject, ref } from "vue";
import {useFiles, useSectors, useSchema, useUpdateTippy } from "../hooks";
import { useI18n } from "vue-i18n";
import EventViewLang from "../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const axios = inject("useAxios");

let basePlatform_id = ref(null);

const entity = inject("entity");
const { scheme } = defineProps(["scheme"]);

const { file, fileRef, fileImport, fileUpload } = useFiles();

const { filter, types, changeFilter } = inject("useFilter")();

const { updateTippy, getPlaceCountWithPrice } = useUpdateTippy(entity);

const {
    showEditSector,
    editSectorRef,
    newSector,
    openSector,
    addSectors,
    hideEditSector,
    addSector,
    setSectors,
    getSectors,
    getSectorType,
    removeSector,
    saveSector,
    setSectorPlaces,
    setSectorText,
    setSectorPrice,
} = useSectors(entity, updateTippy);

const { schemeSvgRaw, setScheme, openSchemeSector } = useSchema(entity, basePlatform_id, updateTippy, openSector, addSectors);

async function load(scheme = null) {
    const url = `/platforms/${entity.event_platform.id}/variants/${entity.platform_variant.id}`;

    const { data } = await axios.get(url);

    addSectors(data.entity.sectors);

    if (!scheme) {
        scheme = data.entity.schema ? data.entity.schema : null;
    }

    await setScheme(scheme);
}

function setBasePlatformId(id) {
    basePlatform_id.value = id;
}

defineExpose({
    load,
    showEditSector,
    hideEditSector,
    getSectors,
    setBasePlatformId,
    setSectors,
    setScheme,
});
</script>

<script>
export default {
    name: "PlatformVariantSectors",
};
</script>
