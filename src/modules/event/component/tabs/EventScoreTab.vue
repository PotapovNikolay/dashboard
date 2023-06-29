<template>
    <div class="form-group">
        <app-input
            :label="i18n('labels.archive.scoreExample')"
            :error="errors.archive.score"
            v-model:value="entity.score"
            :min-width.number="450"
        ></app-input>
    </div>

    <div class="form-group">
        <list-component
            :init-list="entity.goals ? entity.goals : []"
            ref="goalsListRef"
            :error="errors.archive.goals"
            :label="i18n('labels.archive.goals')"
            :style="[entity.score && entity.score.length ? { display: 'block' } : { display: 'none' }]"
        ></list-component>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { inject, onMounted, ref } from "vue";
import ListComponent from "../ListComponent";
import EventViewLang from "../../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const goalsListRef = ref();

const entity = inject("entity");
const errors = inject("errors");

onMounted(() => {
    goalsListRef.value?.setList(entity.goals ? entity.goals : []);
});
</script>

<script>
export default {
    name: "EventScoreTab",
};
</script>
