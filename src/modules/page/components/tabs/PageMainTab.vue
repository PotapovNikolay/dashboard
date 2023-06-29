<template>
    <!--    <div class="app-page__pageInfo">-->

    <div>
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
            <app-input
                :label="i18n('labels.url')"
                v-model:value="entity.url"
                :min-width.number="450"
                :error="errors.main.url"
                :required.boolean="true"
            ></app-input>
        </div>

        <div class="form-group">
            <app-input
                :label="i18n('labels.priority')"
                v-model:value.number="entity.priority"
                :error="errors.main.priority"
                :min-width.number="450"
            ></app-input>
        </div>

        <div class="form-group">
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.dynamic" />
                {{ i18n("labels.dynamic") }}
            </label>
        </div>

        <div class="form-group" v-if="entity.dynamic">
            <app-debounce-select
                v-model:value="entity.entity"
                :initialValue="entity.entity?.name"
                ref="selectRef"
                :label="i18n('labels.entity')"
                :required.boolean="true"
                :error="errors.main.entityOfPage.name"
                urlString="/pages/dynamic/entities"
                :min-width.number="500"
            >
            </app-debounce-select>
        </div>

        <div class="form-group row" v-if="entity.entity && entity.dynamic">
            <div style="margin-right: 2rem" v-for="attribute in entity.entity.attributes">{{ attribute.name }} - {{ attribute.value }}</div>
        </div>
    </div>

    <!--    {{ entity.entity }}-->
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PageViewLang from "../../language/PageViewLang";
import { watch, ref, onActivated } from "vue";
import { useRoute } from "vue-router";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: PageViewLang, useScope: "local" });
const route = useRoute();

const selectRef = ref(null);
const isWatch = ref(false);

const { entity, errors, css, isOpenNewWindow } = defineProps({
    entity: Object,
    errors: Object,
    css: String,
    isOpenNewWindow: Boolean,
});

// watch(
//     () => entity.entity,
//     () => {
//         if (entity.entity?.name === "Мероприятие") {
//             entity.url = "/events/{slug}";
//         } else if (entity.entity?.name === "Новость") {
//             entity.url = "/news/{slug}";
//         }
//     },
//     {
//         immediate: true,
//     }
// );

watch(
    () => [route.fullPath, selectRef],
    () => {
        if (isWatch.value) {
            isWatch.value = selectRef.value?.initValue(entity.entity?.name);
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

<style scoped></style>
