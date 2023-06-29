<template>
    <app-image
        v-model:value="entity.images.preview"
        :error="errors.media.preview"
        :label="i18n('labels.media.cover')"
        :image_x.number="1920"
        :image_y.number="1024"
    />
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import NewsViewLang from "../../language/NewsViewLang";

const { t: i18n } = useI18n({ messages: NewsViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>

<script>
export default {
    name: "NewsMediaTab",
};
</script>

<style scoped></style>
