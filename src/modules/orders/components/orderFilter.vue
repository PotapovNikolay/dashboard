<template>
    <div ref="filter" class="order-filter">

        <div class="row order-filter__content">

            <app-input label="id"
                       v-model.number="form.id"
                       :inline="true"
                       @input="update('id', $event)"
                       @keypress-enter="applyFilter"
            ></app-input>

            <app-select v-model="form.status"
                        :options="statuses"
                        @input="update('status', $event)"
                        label="Статус"
                        :inline="true"
            ></app-select>

            <app-input label="id пользователя"
                       v-model.number="form.user_id"
                       :inline="true"
                       @input="update('user_id', $event)"
                       @keypress-enter="applyFilter"
            ></app-input>

            <div class="app-input app-input_inline">

                <label class="label app-input__label">Номер телефона</label>

                <imask-input
                        type="tel"
                        id="phoneInput"
                        class="input app-input__input"
                        @input="update('phone', $event)"
                        v-model="form.phone"
                        style="min-width: 150px"
                        :mask="[
                            {
                                mask: '+{7} (000) 000-00-00',
                                startsWith: '7'
                            },
                            {
                                mask: '{8} (000) 000-00-00',
                                startsWith: '8'
                            }
                        ]"
                        :dispatch="maskDispatch"
                />

            </div>

            <div class="app-input app-input_inline order-filter__checkboxes checkboxes-wrap">
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.paid" value="0" @change="update('paid', $event.target.value)">
                    Все
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.paid" value="1" @change="update('paid', $event.target.value)">
                    Оплачен
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.paid" value="2" @change="update('paid', $event.target.value)">
                    Не оплачен
                </label>
            </div>

            <div class="app-input app-input_inline order-filter__checkboxes checkboxes-wrap">
                <label class="checkbox order-filter_checkbox inline">
                    <input type="checkbox" v-model="form.hidden" @change="update('hidden', form.hidden)">
                    Скрытые
                </label>
            </div>

            <div class="app-input app-input_inline order-filter__btn-wrap">
                <button class="btn btn_primary order-filter__btn" @click="applyFilter">Применить</button>
            </div>

            <div class="app-input app-input_inline order-filter__btn-wrap">
                <button class="btn btn_gray order-filter__btn" @click="resetFilter">Сбросить</button>
            </div>

        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    import {IMaskComponent} from 'vue-imask';

    export default {

        data() {

            return {

                form: {
                    id: null,
                    status: null,
                    hidden: false,
                    paid: 0,
                    phone: null,
                    user_id: null,
                },
            }
        },

        // computed: {

        //     ...mapState('orderStatus', { statuses: state => state.orderStatuses }),
        // },

        methods: {

            update(key, value) {

                console.log(key, value);

                this.$store.commit('order/updateFilter', {
                    key: key,
                    value: value
                });
            },

            set(key, value) {

                this.form[key] = value;

                this.update(key, value);
            },

            applyFilter() {

                this.$store.dispatch('order/getItems');
            },

            resetFilter() {

                this.$store.dispatch('order/resetFilter');

                this.form = Object.assign({}, {
                    id: null,
                    status: null,
                    hidden: false,
                    paid: 0,
                    user_id: null,
                });
            },

            maskDispatch: function (appended, dynamicMasked) {

                let number = (dynamicMasked.value + appended).replace(/\D/g,'');

                return dynamicMasked.compiledMasks.find(function (m) {
                    return number.indexOf(m.startsWith) === 0;
                });
            },
        },

        components: {
            'imask-input': IMaskComponent
        },

        name: "orderFilter"
    }
</script>
