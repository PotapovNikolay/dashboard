<template>
    <div class="app-input app-input_inline" @click.stop>

        <label class="label app-input__label">{{ label }}</label>

        <div class="app-select" @click="toggle">

            <input type="text"
                   class="app-select__current input"
                   :class="{input_err: error}"
                   :title="error"
                   v-model="searchString"
                   @input="categoryDebounce()"
                   @focus="onFocus"
                   :style="{
                        minWidth: minWidth ? minWidth + 'px' : 'auto'
                   }"
            >

            <div class="app-select__dropdown" :class="[{'show': showDropdown}]">

                <div class="app-select__option" @click.stop="select(0)">Не выбрано</div>

                    <div class="app-select__option" @click.stop="select(category)" v-for="(category, i) in categories">

                        <span>
                            {{ category.name }}
                        </span>

                    </div>

            </div>

        </div>

    </div>
</template>

<script>

    import debounce from 'lodash/debounce'

    export default {

        data() {

            return {

                showDropdown: false,

                categories: [],

                searchString: '',

                categoryDebounce: debounce(this.fetchCategories, 450),

            }
        },

        watch: {

            value: function(nVal) {

                if (nVal === 0) {

                    this.searchString = '';

                    this.categories = [];
                }
            }
        },

        methods: {

            async fetchCategories() {

                const response = await this.$http.post('/playerCategory/search', {
                    searchString: this.searchString
                });

                this.categories = response.data.entities;

                this.show();
            },

            select(category) {

                this.searchString = category === 0 ? 'Не выбрано' : category.name;

                this.categoryDebounce.cancel();

                this.$emit('input', category.id ? category.id : category);

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

                if (this.searchString === 'Не выбрано') {

                    this.searchString = '';
                }
            },
        },

        mounted() {

            this.$store.commit('dispatcherShowComponents/register', this);

            this.searchString = this.default ? this.default : 'Не выбрано';
        },

        props: ['value', 'error', 'default', 'label', 'minWidth', 'allowNoCategory'],

        name: "categoryLiveSelect"
    }
</script>
