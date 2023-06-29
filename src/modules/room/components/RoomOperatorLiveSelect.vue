<template>
    <div class="app-input app-input_inline" @click.stop>
        <label class="label app-input__label">
            {{ label }}
            <span v-if="required" class="text-red">*</span>
        </label>

        <div class="app-select" @click="toggle">
            <input
                type="text"
                class="app-select__current input"
                :class="{ input_err: error }"
                :title="error"
                v-model="searchString"
                @input="roomOperatorDebounce()"
                @focus="onFocus"
                :style="{
                    minWidth: minWidth ? minWidth + 'px' : 'auto',
                }"
            />

            <div class="app-select__dropdown" :class="[{ show: showDropdown }]">
                <div class="app-select__option" @click.stop="select(0)">
                    Не выбрано
                </div>

                <div
                    class="app-select__option"
                    @click.stop="select(room_operator)"
                    v-for="room_operator in room_operators"
                >
                    <span>
                        {{ room_operator.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'vue-debounce'

export default {
    data() {
        return {
            showDropdown: false,

            room_operators: [],

            searchString: "",

            roomOperatorDebounce: debounce(this.fetchRoomOperators, '450ms'),
        };
    },

    watch: {
        value: function (nVal) {
            if (nVal === 0) {
                this.searchString = "";

                this.room_operators = [];
            }
        },
    },

    methods: {
        async fetchRoomOperators() {

            console.log(typeof this.searchString, this.searchString)

            const response = await this.$axios.get(
                "/operator-rooms/select/list",
                {
                    params: {
                        searchString: this.searchString,
                    },
                }
            );

            this.room_operators = response.data.entities;

            this.show();
        },

        select(room_operator) {
            this.searchString =
                room_operator === 0 ? "Не выбрано" : room_operator.name;

            this.roomOperatorDebounce.cancel();

            this.$emit(
                "input",
                room_operator.id ? room_operator.id : room_operator
            );

            this.hide();
        },

        show() {
            console.log('dd')
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

    props: [
        "value",
        "error",
        "default",
        "label",
        "minWidth",
        "allowNoCategory",
        "required",
    ],

    name: "CategoryLiveSelect",
};
</script>
