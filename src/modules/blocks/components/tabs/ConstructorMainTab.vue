<template>
    <div style="padding: 2rem; margin-top: 2rem">
        <div class="form-group">
            <app-input
                :label="i18n('labels.name')"
                v-model:value="entity.name"
                :error="errors.main.name"
                :min-width.number="450"
                :required.boolean="true"
            ></app-input>
        </div>

        <div class="form-group">
            <app-description
                :label="i18n('labels.description')"
                ref="descriptionRef"
                v-model:value="entity.description"
                :error="errors.main.description"
            ></app-description>
        </div>
    </div>
</template>

<script setup>
//i18n - функция для интернализации
import { useI18n } from "vue-i18n";
import ConstructorViewLang from "../../language/ConstructorViewLang";
import { onActivated, onDeactivated, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });
const route = useRoute();

const { entity, errors } = defineProps({ entity: Object, errors: Object });
const emit = defineEmits(["update:entity"]);

const descriptionRef = ref();

const isWatch = ref(true);

watch(
    () => [route.fullPath, entity.description, entity.content],
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
    name: "ConstructorMainTab",
};
</script>

<style scoped></style>
