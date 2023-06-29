<template>
    <app-image
        v-model:value="entity.images.preview"
        :label="i18n('labels.media.preview')"
        :error="errors.media.preview"
        :image_x="800"
        :image_y="600"
    ></app-image>
</template>


<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import NewsViewLang from "../../language/ReviewViewLang";

const { t: i18n } = useI18n({ messages: NewsViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>


