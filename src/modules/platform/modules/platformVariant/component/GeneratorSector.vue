<template>
    <div class="generator-sector-mask" v-if="sector">
        <div class="generator-sector-close">
            <button @click="emit('close')">X</button>
        </div>

        <div class="generator-sector-mask_div">
            <div>
                {{ i18n("labels.name") }}: <b>{{ sector.name }}</b>
            </div>

            <br />
            <hr />
            <br />

            <div class="generator-sector">
                <div class="form-group">
                    <input
                        type="text"
                        class="input app-input__input generator-sector__input"
                        :placeholder="i18n('labels.addByTemplateToStart')"
                        @keypress.enter="addRow(patternTop, 0)"
                        v-model="patternTop"
                    />

                    <button class="btn btn_primary save__btn" @click="addRow(patternTop, 0)">
                        {{ i18n("buttons.add") }}
                    </button>
                </div>

                <div class="form-group row">
                    <div class="number-row_offset">
                        <div v-for="(row, index) in sector.rows" class="generator-sector__number-row">
                            {{
                                sector.rows_direction === "ASC"
                                    ? index + sector.row_index_start
                                    : sector.rows.length - 1 + sector.row_index_start - index
                            }}
                        </div>
                    </div>

                    <div>
                        <div v-for="(row, index) in sector.rows">
                            <div
                                v-for="place in row.places"
                                class="generator-sector__place"
                                :style="[
                                    { 'margin-left': (place.offset < 0 ? 20 * -place.offset : 0) + 'px' },
                                    { 'margin-right': (place.offset > 0 ? 20 * place.offset : 0) + 'px' },
                                ]"
                            >
                                {{ place.name }}
                            </div>

                            <div class="generator-sector__input-wrap">
                                <input
                                    type="text"
                                    class="input app-input__input generator-sector__input-place"
                                    @keypress.enter="changePattern($event, row)"
                                    v-model="row.pattern"
                                />

                                <span class="del" @click="removeRow(row)">&times;</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <input
                        type="text"
                        class="input app-input__input generator-sector__input"
                        :placeholder="i18n('labels.addByTemplateToEnd')"
                        @keypress.enter="addRow(patternBottom, 'last')"
                        v-model="patternBottom"
                    />

                    <button class="btn btn_primary save__btn" @click="addRow(patternBottom, 'last')">
                        {{ i18n("buttons.add") }}
                    </button>
                </div>

                <div class="generator-sector__checkboxes" style="display: inline-block">
                    <div class="generator-sector__checkbox-label label">{{ i18n("labels.directionOfRows") }}</div>

                    <label class="checkbox order-filter_checkbox inline">
                        <input type="radio" value="ASC" v-model="sector.rows_direction" />
                        {{ i18n("options.ascending") }}
                    </label>

                    <label class="checkbox order-filter_checkbox inline">
                        <input type="radio" value="DESC" v-model="sector.rows_direction" />
                        {{ i18n("options.descending") }}
                    </label>
                </div>

                <div class="generator-sector__checkboxes" style="display: inline-block">
                    <div class="generator-sector__checkbox-label label">{{ i18n("labels.startNumberingWith") }}</div>

                    <app-input v-model:value.number="sector.row_index_start"></app-input>
                </div>

                <div class="save">
                    <button class="btn btn_primary save__btn" @click="save">{{ i18n("buttons.save") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import GeneratorSectorLang from "../language/GeneratorSectorLang";
import { ref, inject } from "vue";
import { useI18n } from "vue-i18n";

const { t: i18n } = useI18n({ messages: GeneratorSectorLang, useScope: "local" });

const axios = inject("useAxios");

const patternBottom = ref(null);
const patternTop = ref(null);
const sector = ref(null);

const emit = defineEmits(["close"]);

async function addRow(pattern, position) {
    if (!pattern) return;

    let repeat = pattern.match(/\*(\d+)$/);

    if (repeat !== null) {
        repeat = parseInt(repeat[1]);
    } else {
        repeat = 1;
    }

    pattern = pattern.replace(/\*\d+$/, "");

    if (position === "last") {
        position = sector.value.rows.length;
    }

    let places = await getPlacesFromPattern(pattern);

    for (let i = 0; i < repeat; ++i) {
        sector.value.rows.splice(position, 0, {
            pattern: pattern,
            places: places,
        });
    }

    patternBottom.value = "";
    patternTop.value = "";
}

async function changePattern(event, row) {
    row.places = await getPlacesFromPattern(event.target.value);
}

async function getPlacesFromPattern(pattern) {
    const response = await axios.post("/platforms/sector/pattern/parse", {
        pattern: pattern,
    });

    return response.data.sectors;
}

async function removeRow(row) {
    sector.value.rows.splice(sector.value.rows.indexOf(row), 1);
}

async function save() {
    emit("close");

    sector.value = null;
}

function setSector(currentSector) {
    sector.value = currentSector;
}

defineExpose({
    setSector,
});
</script>

<script>
export default {
    name: "GeneratorSector",
};
</script>
