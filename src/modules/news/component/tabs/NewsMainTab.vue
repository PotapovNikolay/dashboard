<template>
    <div >
        <div class="row">
            <div class="form-group" style="margin-right: 2rem">
                <app-input
                    v-model:value="entity.name"
                    :label="i18n('labels.main.name')"
                    :error="errors.main.name"
                    :min-width.number="450"
                    :required="true"
                ></app-input>
            </div>
            <div class="form-group">
                <app-input
                    v-model:value="entity.slug"
                    :label="i18n('labels.main.url')"
                    :error="errors.main.name"
                    :min-width.number="450"
                    :required="true"
                ></app-input>
            </div>
        </div>
        <div class="form-group">
            <app-description
                :label="i18n('labels.main.content')"
                ref="contentRef"
                v-model:value="entity.content"
                :required.boolean="true"
                :error="errors.main.content"
                :min-width.number="600"
            ></app-description>
        </div>

        <div class="form-group">
            <app-description
                :label="i18n('labels.main.description')"
                ref="descriptionRef"
                :required.boolean="true"
                v-model:value="entity.description"
                :error="errors.main.description"
                :min-width.number="600"
            ></app-description>
        </div>

        <div class="form-group" style="margin-right: 2rem">
            <app-input v-model:value="entity.date" type="date" :label="i18n('labels.main.date')" :min-width.number="300"></app-input>
        </div>

        <div class="row">
            <div class="form-group">
                <label class="checkbox order-filter_checkbox inline">
                    <input type="checkbox" v-model="entity.publish" />
                    {{ i18n("labels.main.publish") }}
                </label>
            </div>
            <div class="form-group">
                <label class="checkbox order-filter_checkbox inline">
                    <input type="checkbox" v-model="entity.popular" />
                    {{ i18n("labels.main.popular") }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import NewsViewLang from "../../language/NewsViewLang";
import { inject, onActivated, onDeactivated, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { t: i18n } = useI18n({ messages: NewsViewLang, useScope: "local" });

const route = useRoute();
const {translit} = inject("useHelpers")();

const entity = inject("entity");
const errors = inject("errors");

const descriptionRef = ref(null);
const contentRef = ref(null);

const isWatch = ref(true);


watch(
    () => entity.name,
    () => {
        if (!route.params.id && entity.name) {
            entity.slug = translit(entity.name);
        }
    }
);

watch(
    () => [route.fullPath, entity.description, entity.content],
    () => {
        if (isWatch.value) {
        
            isWatch.value = descriptionRef.value?.initValue(entity.description);
            isWatch.value = contentRef.value?.initValue(entity.content);
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
    name: "NewsMainTab",
};
</script>
<style scoped></style>
