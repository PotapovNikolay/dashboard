<template>
    <div v-if="entity">
        <div class="form-group">
            <app-image
                v-model:value="entity.images.cover"
                :label="i18n('labels.media.cover')"
                :error="errors.media.cover"
                :image_x.number="150"
                :image_y.number="150"
            ></app-image>
        </div>
        <div class="form-group">
            <app-image
                v-model:value="entity.images.preview"
                :label="i18n('labels.media.preview')"
                :error="errors.media.preview"
                :image_x.number="150"
                :image_y.number="150"
            ></app-image>
        </div>

        <div class="form-group">
            <app-images
                v-model:value="entity.images.gallery"
                :label="i18n('labels.media.gallery')"
                :error="errors.media.gallery"
                :image_x.number="150"
                :image_y.number="150"
            ></app-images>
        </div>

        <div class="form-group">
            <app-image
                v-model:value="entity.images.mobile_cover"
                :label="i18n('labels.media.mobileCover')"
                :error="errors.media.mobile_cover"
                :image_x.number="150"
                :image_y.number="150"
            ></app-image>
        </div>

        <div class="form-group">
            <app-image
                v-model:value="entity.images.mobile_preview"
                :label="i18n('labels.media.mobilePreview')"
                :error="errors.media.mobile_preview"
                :image_x.number="150"
                :image_y.number="150"
            ></app-image>
        </div>

        <div v-if="entity.news_slider" class="form-group">
            <app-image
                v-model:value="entity.images.event_news_slider_preview"
                :label="i18n('labels.media.eventNewsSliderPreview')"
                :error="errors.media.event_news_slider_preview"
                :image_x.number="150"
                :image_y.number="150"
            ></app-image>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";
import EventViewLang from "../../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>

<script>
export default {
    name: "EventMediaTab",
};
</script>
