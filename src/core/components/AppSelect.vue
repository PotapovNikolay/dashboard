<template>

    <div class="app-input" :class="{'app-input_inline' : inline}" @click.stop>

        <label class="label app-input__label" v-if="label">{{ label }}</label>

        <div class="app-select" @click="toggle">

            <div class="app-select__current input" :class="{'input_err' : error}" :title="error">{{ currentValueName }}</div>

            <div class="app-select__dropdown" :class="[{'show': showDropdown}]">

                <div class="app-select__option" v-if="noSelected" @click.stop="select(0)">Не выбрано</div>

                <div class="app-select__option" @click.stop="select(option.id)" v-for="option in options">
                    {{ option.name }}
                </div>

            </div>

        </div>

    </div>

</template>

<script>
    export default {

        data() {

            return {

                showDropdown: false,
            }
        },

        computed: {

            currentValueName() {

                const currentValue = this.options.find(o => o.id === this.value);

                return currentValue !== undefined ? currentValue.name : 'Не выбрано';
            }
        },

        methods: {

            select(id) {

                this.$emit('input', id);

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
            }
        },

        created() {

            if (this.noSelected === undefined) {

                this.noSelected = true;
            }
        },

        mounted() {

            // this.$store.commit('dispatcherShowComponents/register', this);
        },

        //props: ['value', 'options', 'inline', 'label', 'noSelected'],

        props: {

            value: {
                type: Number,
                default: 0,
            },

            options: Array,

            inline: {
                type: Boolean,
                default: false,
            },

            label: {
                type: String,
                default: ''
            },

            noSelected: {
                type: Boolean,
                default: true,
            },

            error: {
                type: String,
                default: ''
            }
        },

        name: "AppSelect"
    }
</script>
