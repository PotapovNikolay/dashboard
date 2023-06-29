<template>
    <div>
        <div class="category-view__name form-group">
            <app-input
                v-model:value="entity.name"
                :label="i18n('labels.main.name')"
                :error="errors.main.name"
                :min-width="400"
                :required="true"
            ></app-input>
        </div>

        <div class="category-view__name form-group">
            <app-input
                v-model:value="entity.city"
                :label="i18n('labels.main.city')"
                :error="errors.main.city"
                :min-width="400"
                required
            ></app-input>
        </div>

        <!--    <div class="row form-group">-->
        <!--        <app-debounce-select-->
        <!--            v-model.number="entity.event.id"-->
        <!--            :default="entity.event.name"-->
        <!--            ref="eventLiveSelect"-->
        <!--            :error="errors.main.event_id"-->
        <!--            label="Мероприятие"-->
        <!--            minWidth="400"-->
        <!--        ></app-debounce-select>-->
        <!--    </div>-->

        <div class="form-group">
            <app-description
                :label="i18n('labels.main.comment')"
                ref="commentRef"
                v-model:value="entity.comment"
                :error="errors.main.comment"
                :required="true"
            ></app-description>
        </div>
        <div class="form-group">
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.publish" />
                {{ i18n("labels.main.publish") }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import NewsViewLang from "../../language/ReviewViewLang";
import { inject, onActivated, onDeactivated, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { t: i18n } = useI18n({ messages: NewsViewLang, useScope: "local" });

const route = useRoute();

const entity = inject("entity");
const errors = inject("errors");

const commentRef = ref(null);
const isWatch = ref(true);

watch(
    () => [route.fullPath, entity.comment],
    () => {
        if (isWatch.value) {
            isWatch.value = commentRef.value?.initValue(entity.comment);
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
