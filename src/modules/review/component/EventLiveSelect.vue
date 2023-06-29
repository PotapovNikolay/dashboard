<template>
    <div class="app-input app-input_inline" @click.stop>

        <label class="label app-input__label">{{ label }}</label>

        <div class="app-select" @click="toggle">

            <input type="text"
                   class="app-select__current input"
                   :class="{input_err: error}"
                   :title="error"
                   v-model="searchString"
                   @input="eventDebounce()"
                   @focus="onFocus"
                   :style="{
                        minWidth: minWidth ? minWidth + 'px' : 'auto'
                   }"
            >

            <div class="app-select__dropdown" :class="[{'show': showDropdown}]">

                <div class="app-select__option" @click.stop="select(0)">Не выбрано</div>

                <!--                <div v-for="eventPath in events">-->

                <div class="app-select__option" @click.stop="select(event)" v-for="(event, i) in events">

                        <span>
                            {{ event.name }}
                        </span>

                </div>

                <!--                </div>-->

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

            events: [],

            searchString: '',

            eventDebounce: debounce(this.fetchEvents, 450),

        }
    },

    watch: {

        value: function (nVal) {

            if (nVal === 0) {

                this.searchString = '';

                this.events = [];
            }
        }
    },

    methods: {

        async fetchEvents() {

            const response = await this.$http.get('/events/search', {
                params: {
                    searchString: this.searchString
                }
            });

            this.events = response.data.entities;

            this.show();
        },

        select(event) {

            this.searchString = event === 0 ? 'Не выбрано' : event.name;

            this.eventDebounce.cancel();

            this.$emit('input', event.id ? event.id : event);

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

    props: ['value', 'error', 'default', 'label', 'minWidth', 'allowNoEvent'],

    name: "eventLiveSelect"
}
</script>
