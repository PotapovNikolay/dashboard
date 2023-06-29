<template>
    <div class="app-input app-input_inline" @click.stop>
        <label class="label app-input__label">{{ label }}</label>

        <div class="app-select" @click="toggle">
            <input
                type="text"
                class="app-select__current input"
                :class="{ input_err: error }"
                :title="error"
                v-model="searchString"
                @input="lodgeDebounce()"
                @focus="onFocus"
                :style="{
                    minWidth: minWidth ? minWidth + 'px' : 'auto',
                }"
            />

            <div class="app-select__dropdown" :class="[{ show: showDropdown }]">
                <div class="app-select__option" @click.stop="select(0)">Не выбрано</div>

                <div class="app-select__option" @click.stop="select(eventSector)" v-for="(eventSector, i) in eventSectors">
                    <span>
                        {{ eventSector.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    data() {
        return {
            showDropdown: false,

            eventSectors: [],

            searchString: "",

            lodgeDebounce: debounce(this.fetchEventSectors, 450),
        };
    },

    watch: {
        value: function (nVal) {
            if (nVal === 0) {
                this.searchString = "";

                this.eventSectors = [];
            }
        },
    },

    methods: {
        async fetchEventSectors() {
            const response = await this.axios.post("/event-sectors/search", {
                searchString: this.searchString,
                except: this.except,
            });

            this.eventSectors = response.data.entities;

            this.show();
        },

        select(eventSector) {
            this.searchString = eventSector === 0 ? "Не выбрано" : eventSector.name;

            this.lodgeDebounce.cancel();

            this.$emit("input", eventSector.id ? eventSector.id : eventSector);

            this.$emit("sync-name", { id: eventSector.id, name: eventSector.name });

            this.hide();
        },

        show() {
            this.showDropdown = true;
        },

        toggle() {
            this.showDropdown = ~this.showDropdown;
        },

        hide() {
            this.showDropdown = false;
        },

        setSearchString(string) {
            this.searchString = string;
        },

        onFocus() {
            if (this.searchString === "Не выбрано") {
                this.searchString = "";
            }
        },
    },

    mounted() {
        this.searchString = this.default ? this.default : "Не выбрано";
    },

    props: ["value", "error", "default", "label", "minWidth", "allowNoEventSector", "except"],

    name: "EventSectorLiveSelect",
};
</script>
