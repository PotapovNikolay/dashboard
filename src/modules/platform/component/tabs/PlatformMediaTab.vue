<template>
    <div class="form-group" v-if="entity.images.preview">
        <app-image
            v-model:value="entity.images.preview"
            :label="i18n('labels.media.preview')"
            :error="errors.media.preview"
            :image_x.number="150"
            :image_y.number="150"
        ></app-image>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PlatformViewLang from "../../language/PlatformViewLang";
import { inject } from "vue";

const { t: i18n } = useI18n({ messages: PlatformViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>

<script>
export default {
    name: "PlatformMediaTab",
};
</script>

<style scoped></style>
