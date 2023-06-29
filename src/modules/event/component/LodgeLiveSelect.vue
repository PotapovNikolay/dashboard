<template>
    <div class="app-input app-input_inline" @click.stop>

        <label class="label app-input__label">{{ label }}</label>

        <div class="app-select" @click="toggle">

            <input type="text"
                   class="app-select__current input"
                   :class="{input_err: error}"
                   :title="error"
                   v-model="searchString"
                   @input="lodgeDebounce()"
                   @focus="onFocus"
                   :style="{
                       minWidth: minWidth ? minWidth + 'px' : 'auto'
                   }"
            >

            <div class="app-select__dropdown" :class="[{'show': showDropdown}]">

                <div class="app-select__option" @click.stop="select(0)">Не выбрано</div>

                    <div class="app-select__option" @click.stop="select(lodge)" v-for="(lodge, i) in lodges">

                        <span>
                            {{ lodge.name }}
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

                lodges: [],

                searchString: '',

                lodgeDebounce: debounce(this.fetchLodges, 450),

            }
        },

        watch: {

            value: function(nVal) {

                if (nVal === 0) {

                    this.searchString = '';

                    this.lodges = [];
                }
            }
        },

        methods: {

            async fetchLodges() {

                const response = await this.$http.post('/lodges/search', {
                    searchString: this.searchString,
                    except: this.except
                });

                this.lodges = response.data.entities;

                this.show();
            },

            select(lodge) {

                this.searchString = lodge === 0 ? 'Не выбрано' : lodge.name;

                this.lodgeDebounce.cancel();

                this.$emit('input', lodge.id ? lodge.id : lodge);

                this.$emit('sync-name', {id: lodge.id, name: lodge.name});

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

        props: ['value', 'error', 'default', 'label', 'minWidth', 'allowNoLodge', 'except'],

        name: "LodgeLiveSelect"
    }
</script>
