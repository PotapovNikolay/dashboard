<template>
    <app-image
        v-model:value="entity.images.preview"
        :label="i18n('labels.media.cover')"
        ref="images"
        :image_x.number="1920"
        :image_y.number="1024"
    ></app-image>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import TeamsViewLang from "../../language/TeamsViewLang";

const { t: i18n } = useI18n({ messages: TeamsViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>

<script>
export default {
    name: "TeamsMediaTab",
};
</script>

<style scoped></style>
