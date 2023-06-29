<template>
    <div v-if="entity">
        <div class="form-group">
            <app-input
                v-model:value="entity.seo_title"
                :label="i18n('labels.name')"
                :error="errors.seo.seo_title"
                :min-width.number="450"
            ></app-input>
        </div>

        <div class="form-group">
            <app-description
                :label="i18n('labels.description')"
                ref="seoDescription"
                v-model:value="entity.seo_description"
                :error="errors.seo.seo_description"
                :min-width.number="450"
            ></app-description>
        </div>

        <div class="form-group">
            <app-input
                v-model:value="entity.seo_comment"
                :label="i18n('labels.comment')"
                :error="errors.seo.seo_comment"
                :min-width.number="450"
            ></app-input>
        </div>
    </div>
</template>

<script setup>
import { inject, onActivated, ref,  watch } from "vue";
import { useI18n } from "vue-i18n";
import AppSeoLang from "../language/AppSeoLang";
import { useRoute } from "vue-router";

const { t: i18n } = useI18n({ messages: AppSeoLang, useScope: "local" });
const route = useRoute();

const entity = inject("entity");
const errors = inject("errors");

const seoDescription = ref(null);
const isWatch = ref(false);

watch(
    () => [route.fullPath, entity.seo_description],
    () => {
        if (isWatch.value) {
            isWatch.value = seoDescription?.value.initValue(entity.seo_description);
        }
    }
);

function stopWatching() {
    isWatch.value = false;
}

onActivated(() => {
    isWatch.value = true;
});
</script>

<script>
export default {
    name: "AppSeoTab",
};
</script>
