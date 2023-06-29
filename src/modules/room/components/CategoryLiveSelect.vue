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
                @input="categoryDebounce()"
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
                    @click.stop="select(category)"
                    v-for="category in categories"
                >
                    <span>
                        {{ category.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'vue-debounce'
import {vue3Debounce} from "vue-debounce";
import Axios from "@axios";

export default {

    directives: {
        debounce: vue3Debounce({
            lock: true,
            listenTo: 'keyup',
            defaultTime: '400ms',
            fireOnEmpty: false,
            trim: false
        })
    },

    data() {
        return {
            showDropdown: false,

            categories: [],

            searchString: "",

            categoryDebounce: debounce(this.fetchCategories, '450ms'),
        };
    },

    watch: {
        value: function (nVal) {
            if (nVal === 0) {
                this.searchString = "";

                this.categories = [];
            }
        },
    },

    methods: {
        async fetchCategories() {
            const response = await this.$axios.get("/categories/select/list", {
                params: {
                    searchString: this.searchString,
                },
            });

            this.categories = response.data.entities;
            console.log(response.data.entities)
            this.show();
        },

        select(category) {
            this.searchString = category === 0 ? "Не выбрано" : category.name;

            this.categoryDebounce.cancel();

            this.$emit("input", category.id ? category.id : category);

            this.hide();
        },

        show() {
            this.showDropdown = true;
        },

        toggle() {
            this.showDropdown = !this.showDropdown;
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
