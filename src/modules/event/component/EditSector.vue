<template>
    <div class="generator-sector-mask" v-if="sector">
        <div class="generator-sector-close">
            <button @click="emit('close')">X</button>
        </div>
        <div>
            <div class="generator-sector__title">
                {{ i18n("labels.platform.sector") }}: <b>{{ sector.name }}</b>
            </div>

            <div class="generator-sector" @mousedown="mousedownStatus = true" @mouseup="mousedownStatus = false">
                <!--
                <div class="form-group">
                    <input type="text" class="input app-input__input generator-sector__input"
                           placeholder="Добавить по шаблону"
                           @keypress.enter="addRow($event, 0)"
                    >
                </div> -->

                <div class="form-group platform_overflow row">
                    <div class="number-row_offset">
                        <div v-for="(row, index) in sector.rows" @click="selectRow(row)" class="generator-sector__number-row">
                            {{
                                sector.rows_direction === "ASC"
                                    ? sector.rows_index_start
                                        ? sector.rows_index_start + index
                                        : sector.row_index_start + index
                                    : sector.rows.length - 1 + sector.row_index_start - index
                            }}
                        </div>
                    </div>

                    <div>
                        <div v-for="(row, index) in sector.rows" class="row place_row">
                            <div
                                v-for="place in row.places"
                                class="generator-sector__place"
                                :title="place.price"
                                :class="[
                                    { 'generator-sector__place_selected': place.selected },
                                    { 'generator-sector__place_has_price': place.price },
                                    { 'generator-sector__place_unavailable': !place.available },
                                ]"
                                @mousedown="place.selected = !place.selected"
                                @mouseenter="onMouseEnterPlace(place)"
                                :style="[{ 'margin-left': (place.offset < 0 ? 20 * -place.offset : 0) + 'px' }, { cursor: 'pointer' }]"
                            >
                                {{ place.name }}
                            </div>

                            <!-- <div class="generator-sector__input-wrap">
                                <input type="text"
                                       class="input app-input__input generator-sector__input-place"
                                       @keypress.enter="changePattern($event, row)"
                                       v-model="row.pattern"
                                >

                                <span class="del" @click="removeRow(row)">&times;</span>
                            </div> -->
                        </div>
                    </div>

                    <div class="number-row_offset">
                        <div v-for="(row, index) in sector.rows" @click="selectRow(row)" class="generator-sector__number-row">
                            {{
                                sector.rows_direction === "ASC"
                                    ? sector.rows_index_start
                                        ? sector.rows_index_start + index
                                        : sector.row_index_start + index
                                    : sector.rows.length - 1 + sector.row_index_start - index
                            }}
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-bottom: 20px">
                    <div class="row" style="margin-right: 10px">
                        <div style="width: 15px; height: 15px; border: 1px solid #b0afaf; background: #cfcfcf; margin-right: 5px"></div>
                        <span style="font-size: 12px">- {{ i18n("labels.platform.withoutPrice") }}</span>
                    </div>

                    <div class="row" style="margin-right: 10px">
                        <div style="width: 15px; height: 15px; border: 1px solid #b0afaf; background: #d7a121; margin-right: 5px"></div>
                        <span style="font-size: 12px">- {{ i18n("labels.platform.priceIsIndicated") }}</span>
                    </div>

                    <div class="row" style="margin-right: 10px">
                        <div style="width: 15px; height: 15px; border: 1px solid #b0afaf; background: #fff; margin-right: 5px"></div>
                        <span style="font-size: 12px">- {{ i18n("labels.platform.busyUnavailable") }}</span>
                    </div>

                    <div class="row" style="margin-right: 10px">
                        <div style="width: 15px; height: 15px; border: 1px solid #b0afaf; background: #84b0f5; margin-right: 5px"></div>
                        <span style="font-size: 12px">- {{ i18n("labels.platform.highlighted") }}</span>
                    </div>
                </div>

                <div class="label">* {{ i18n("labels.platform.placesWithoutCostWillBeMarkedAsUnavailableAutomatically") }}</div>

                <div class="generator-sector__btn-wrap row">
                    <div style="margin-right: 2rem">
                        <button @click="selectAll" style="display: block; width: 100%" class="btn btn_primary">
                            {{ i18n("buttons.selectAll") }}
                        </button>

                        <button @click="unSelected" style="display: block; width: 100%" class="btn btn_primary">
                            {{ i18n("buttons.deselectSelection") }}
                        </button>
                    </div>
                    <div style="margin-right: 2rem">
                        <button @click="setAvailableSelectedPlaces" style="display: block; width: 100%" class="btn btn_primary">
                            {{ i18n("buttons.makeTheAllocatedPlacesAvailable") }}
                        </button>

                        <button @click="setUnavailableSelectedPlaces" style="display: block; width: 100%" class="btn btn_primary">
                            {{ i18n("buttons.makeTheAllocatedPlacesInaccessible") }}
                        </button>
                    </div>

                    <div style="display: flex; margin-top: 1rem">
                        <button @click="setPriceSelectedPlaces(price)" style="display: block" class="btn btn_primary">
                            {{ i18n("buttons.assignCostToAllocatedPlaces") }}
                        </button>

                        <input v-model.number="price" class="app-input__input" style="margin-bottom: 10px" />
                    </div>
                </div>

                <div class="save">
                    <button class="btn btn_primary btn_inline save__btn" @click="save">{{ i18n("buttons.save") }}</button>
                    <button class="btn btn_primary btn_inline" @click="emit('close')">{{ i18n("buttons.closeWithoutSaving") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

import { ref, inject } from "vue";
import clone from "lodash/cloneDeep";
import EventViewLang from "../language/EventViewLang";

const axios = inject("useAxios");

const mousedownStatus = ref(false);
const sector = ref(null);
const price = ref();
const avaliblePlaces = ref(0);

const emit = defineEmits(["save", "close"]);

async function addRow(event, position) {
    let pattern = event.target.value;

    if (position === "last") {
        position = sector.value.rows.length;
    }

    sector.value.rows.splice(position, 0, {
        pattern: pattern,
        places: await getPlacesFromPattern(pattern),
    });

    event.target.value = "";
}

async function changePattern(event, row) {
    row.places = await getPlacesFromPattern(event.target.value);
}

async function getPlacesFromPattern(pattern) {
    const response = await axios.get("/sector/pattern/parse", {
        params: {
            pattern: pattern,
        },
    });

    return response.data.result;
}

function removeRow(row) {
    sector.value.rows.splice(sector.value.rows.indexOf(row), 1);
}

function onMouseEnterPlace(place) {
    if (mousedownStatus) {
        place.selected = true;
    }
}

function save() {
    unSelected();

    sector.value.places = getAvailableSelectedPlaces();

    emit("save", sector.value);

    sector.value = null;
}

function openSector(currentSector) {
    if (!currentSector.additionalProperties && currentSector.rows.length) {
        currentSector = attachProperties(currentSector);
    }
    sector.value = currentSector;
}

function attachProperties(sector) {
    sector = clone(sector);

    sector.additionalProperties = true;

    for (let rowIndex = 0; rowIndex < sector.rows.length; ++rowIndex) {
        for (let placeIndex = 0; placeIndex < sector.rows[rowIndex].places.length; ++placeIndex) {
            // sector.rows[rowIndex].places[placeIndex].changed = false;
            sector.rows[rowIndex].places[placeIndex].selected = false;

            if (sector.attachBasePlaceProps && !sector.attachedBasePlaceProps) {
                sector.rows[rowIndex].places[placeIndex].price = null;
                sector.rows[rowIndex].places[placeIndex].available = true;
            }
        }
    }

    sector.attachedBasePlaceProps = true;

    return sector;
}

function setPriceSelectedPlaces(price) {
    if (!price) {
        alert("Неправильно значение");
        return;
    }

    let places = getSelectedPlaces();

    for (let i = 0; i < places.length; ++i) {
        places[i].price = price;
        places[i].changed = true;
    }

    unSelected();
}

function getSelectedPlaces() {
    let places = [];

    for (let rowIndex = 0; rowIndex < sector.value.rows.length; ++rowIndex) {
        for (let placeIndex = 0; placeIndex < sector.value.rows[rowIndex].places.length; ++placeIndex) {
            if (sector.value.rows[rowIndex].places[placeIndex].selected) {
                places.push(sector.value.rows[rowIndex].places[placeIndex]);
            }
        }
    }

    return places;
}

function setUnavailableSelectedPlaces() {
    let places = getSelectedPlaces();

    for (let i = 0; i < places.length; ++i) {
        places[i].available = false;
        places[i].changed = true;
    }

    unSelected();
}

function setAvailableSelectedPlaces() {
    let places = getSelectedPlaces();

    for (let i = 0; i < places.length; ++i) {
        places[i].available = true;
        places[i].changed = true;
    }

    //unSelected();
}

function getAvailableSelectedPlaces() {
    let availablePlaces = 0;
    for (let rowIndex = 0; rowIndex < sector.value.rows.length; ++rowIndex) {
        for (let placeIndex = 0; placeIndex < sector.value.rows[rowIndex].places.length; ++placeIndex) {
            if (
                sector.value.rows[rowIndex].places[placeIndex].available === true &&
                sector.value.rows[rowIndex].places[placeIndex].price !== null
            ) {
                availablePlaces += 1;
            }
        }
    }
    return availablePlaces;
}

function selectAll() {
    for (let rowIndex = 0; rowIndex < sector.value.rows.length; ++rowIndex) {
        for (let placeIndex = 0; placeIndex < sector.value.rows[rowIndex].places.length; ++placeIndex) {
            sector.value.rows[rowIndex].places[placeIndex].selected = true;
        }
    }
}

function selectRow(row) {
    if (row.places.findIndex((place) => !place.selected) === -1) {
        for (let i = 0; i < row.places.length; ++i) {
            row.places[i].selected = false;
        }
    } else {
        for (let i = 0; i < row.places.length; ++i) {
            row.places[i].selected = true;
        }
    }
}

function unSelected() {
    let places = getSelectedPlaces();

    for (let i = 0; i < places.length; ++i) {
        places[i].selected = false;
    }
}

defineExpose({
    openSector,
});
</script>
