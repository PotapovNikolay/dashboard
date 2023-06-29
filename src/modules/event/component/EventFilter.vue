<template>
    <div ref="filter" class="order-filter">

        <div class="row order-filter__content">

            <app-input label="id"
                       v-model.number="form.id"
                       :inline="true"
                       @input="update('id', $event)"
                       @keypress-enter="applyFilter"
            ></app-input>

            <div class="app-input app-input_inline checkboxes-wrap order-filter__checkboxes">
                <span class="label app-input__label">Сортировать по опубликованности</span>

                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.publish" value="0" @change="update('publish', $event.target.value)">
                    Все
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.publish" value="1" @change="update('publish', $event.target.value)">
                    Опубликованные
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.publish" value="2" @change="update('publish', $event.target.value)">
                    Не опубликованные
                </label>
            </div>

            <br>

            <div class="app-input app-input_inline checkboxes-wrap order-filter__checkboxes">
                <span class="label app-input__label">Сортировать по дате</span>

                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.date" value="0" @change="update('date', $event.target.value)">
                    В обычном порядке
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.date" value="1" @change="update('date', $event.target.value)">
                    По возрастанию
                </label>
                <label class="checkbox order-filter_checkbox inline">
                    <input type="radio" v-model.number="form.date" value="2" @change="update('date', $event.target.value)">
                    По убыванию
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

export default {

    data() {

        return {

            form: {
                id: null,
                publish: 0,
                date: 0,
            },
        }
    },

    methods: {

        update(key, value) {

            this.$store.commit('event/updateFilter', {
                key: key,
                value: value
            });
        },

        applyFilter() {

            this.$store.dispatch('event/getEntities');
        },

        resetFilter() {

            this.$store.dispatch('event/resetFilter');

            this.form = Object.assign({}, this.$store.state.event.filter);
        },
    },

    name: "EventFilter"
}
</script>
