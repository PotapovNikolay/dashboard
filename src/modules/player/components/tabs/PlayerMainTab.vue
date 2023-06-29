<template>
    <div class="form-group">
        <app-input v-model:value="entity.name" label="Имя" :error="errors.name" min-width="500" :required="true"></app-input>
    </div>
    <div class="form-group">
        <app-input
            v-model:value="entity.category"
            label="Категория игрока"
            :error="errors.category"
            min-width="500"
            :required="true"
        ></app-input>
    </div>
    <!--    <div class="form-group">-->
    <!--        <app-debounce-select-->
    <!--            v-model:value="entity.category"-->
    <!--            :default="entity.category?.name"-->
    <!--            ref="categorySelect"-->
    <!--            :error="errors.category_id"-->
    <!--            label="Категория"-->
    <!--            required="true"-->
    <!--            urlString="/categories/search"-->
    <!--            min-width="500"-->
    <!--        >-->
    <!--        </app-debounce-select>-->
    <!--    </div>-->

    <div class="form-group">
        <app-input label="Должность" v-model:value="entity.position" :error="errors.position" :minWidth="500"></app-input>
    </div>

    <div class="form-group">
        <app-input label="Номер" v-model:value.number="entity.number" :error="errors.number" :minWidth="500"></app-input>
    </div>

    <div class="form-group">
        <label class="checkbox order-filter_checkbox inline">
            <input type="checkbox" v-model="entity.publish" />
            Опубликовать
        </label>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
    props: {
        entity: {
            type: Object,
        },
        errors: {
            type: Object,
        },
    },

    setup(props) {
        const categorySelect = ref(null);

        watchEffect(() => {
            if (categorySelect.value) {
                categorySelect.value.setSearchString(props.entity.category?.name);
            }
        });

        return { categorySelect };
    },

    name: "PlayerMainTab",
};
</script>

<style scoped></style>
