<template>
    <div v-if="entity">
        <div class="row">
            <div class="form-group">
                <app-input
                    :label="i18n('labels.main.name')"
                    :required.boolean="true"
                    v-model:value="entity.name"
                    :error="errors.main.name"
                    :min-width.number="450"
                ></app-input>
            </div>

            <div class="form-group">
                <app-input
                    :label="i18n('labels.main.url')"
                    v-model:value="entity.slug"
                    :error="errors.main.url"
                    :min-width.number="450"
                ></app-input>
            </div>
        </div>

        <div class="row">
            <div class="form-group">
                <app-debounce-select
                    v-model:value="entity.category"
                    :initialValue="entity.category?.name"
                    ref="categoryRef"
                    :error="errors.main.category_id"
                    :label="i18n('labels.main.category')"
                    :required.boolean="true"
                    urlString="/categories/search"
                    :min-width.number="450"
                >
                </app-debounce-select>
            </div>
            <div class="form-group">
                <app-age-select
                    :label="i18n('labels.main.age')"
                    :required.boolean="true"
                    :error="errors.main.age"
                    v-model:value.number="entity.age"
                    :min-width.number="50"
                >
                </app-age-select>
            </div>
        </div>

        <div class="row">
            <div class="form-group">
                <app-input
                
                    :label="i18n('labels.main.duration')"
                    :required.boolean="false"
                    v-model:value.number="entity.duration"
                    :error="errors.main.duration"
                    :min-width.number="300"
                ></app-input>
            </div>
            <div class="form-group">
                <app-input
                    :label="i18n('labels.main.date')"
                    type="date"
                    v-model:value="entity.date"
                    :error="errors.main.date"
                    :min-width.number="300"
                ></app-input>
            </div>
            <div class="form-group">
                <app-input
                    :label="i18n('labels.main.time')"
                    type="time"
                    v-model:value="entity.time"
                    :error="errors.main.time"
                    :min-width.number="300"
                ></app-input>
            </div>
        </div>

        <div class="form-group">
            <app-input
                :label="i18n('labels.main.timeCart')"
                :required.boolean="false"
                v-model:value.number="entity.lock_time"
                :error="errors.main.lock_time"
                :min-width.number="450"
            ></app-input>
        </div>

         <div class="form-group">
            <app-tags v-model:value="entity.tags" />
        </div>

        <div class="form-group">
            <app-description
                :label="i18n('labels.main.description')"
                ref="descriptionRef"
                v-model:value="entity.description"
                :error="errors.main.description"
                :min-width.number="600"
            ></app-description>
        </div>

        <div class="form-group">
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.publish" />
                {{ i18n("labels.main.publish") }}
            </label>
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.display" />
                {{ i18n("labels.main.display") }}
            </label>
        </div>

         <div class="form-group">
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.popular" />
                {{ i18n("labels.main.popular") }}
            </label>

            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.news_slider" />
                {{ i18n("labels.main.news_slider") }}
            </label>

        </div> 
        <div class="form-group">
            <app-input
                v-if="entity.popular"
                :label="i18n('labels.main.order')"
                v-model:value="entity.order"
                :error="errors.main.order"
                :min-width.number="450"
            ></app-input>
        </div>
    </div>
</template>


<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { inject, onActivated, onDeactivated, ref, watch } from "vue";
import EventViewLang from "../../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });
const route = useRoute();
const {translit} = inject("useHelpers")();

const descriptionRef = ref(null);
const categoryRef = ref(null);
const isWatch = ref(true);

const entity = inject("entity");
const errors = inject("errors");

watch(
    () => entity.name,
    () => {
        if (!route.params.id && entity.name) {
            entity.slug = translit(entity.name);
        }
    }
);

watch(
    () => [route.fullPath, entity.description],
    () => {
        if (isWatch.value) {
            isWatch.value = descriptionRef.value?.initValue(entity.description);
            isWatch.value = categoryRef.value?.initValue(entity.category.name);
        }
    },
    {
        immediate: true,
    }
);

onActivated(() => {
    isWatch.value = true;
});
onDeactivated(() => {
    isWatch.value = false;
});
</script>

<script>
export default {
    name: "EventMainTab",
};
</script>

<style scoped></style>
