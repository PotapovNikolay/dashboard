<template>
    <div v-if="entity">
        <div class="form-group">
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
                v-model:value="entity.address"
                :label="i18n('labels.main.address')"
                :error="errors.main.address"
                :min-width.number="450"
                :required="true"
            >
            </app-input>
        </div>

        <div class="form-group">
            <app-input v-model:value="entity.route" label="URL" :error="errors.main.route" :min-width.number="450"></app-input>
        </div>

        <div class="row">
            <div class="form-group form_inline">
                <app-input
                    v-model:value.number="entity.capacity"
                    :label="i18n('labels.main.capacity')"
                    :error="errors.main.capacity"
                    :min-width.number="300"
                    :required="true"
                ></app-input>
            </div>

            <div class="form-group form_inline">
                <app-input
                    v-model:value="entity.coords"
                    :label="i18n('labels.main.coordinates')"
                    :error="errors.main.coords"
                    :min-width.number="300"
                    required
                ></app-input>
            </div>
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
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PlatformViewLang from "../../language/PlatformViewLang";
import { useRoute } from "vue-router";
import { inject, onActivated, onDeactivated, ref, watch } from "vue";

const { t: i18n } = useI18n({ messages: PlatformViewLang, useScope: "local" });

const route = useRoute();

const entity = inject("entity");
const errors = inject("errors");

const descriptionRef = ref(null);
const isWatch = ref(true);

watch(
    () => [route.fullPath, entity.description],
    () => {
        if (isWatch.value) {
            isWatch.value = descriptionRef.value?.initValue(entity.description);
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
    name: "PlatformMainTab",
};
</script>

<style scoped></style>
