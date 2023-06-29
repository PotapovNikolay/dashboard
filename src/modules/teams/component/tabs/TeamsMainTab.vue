<template>
    <div v-if="entity">
        <div class="form-group">
            <app-input
                v-model:value="entity.name"
                :label="i18n('labels.main.name')"
                :error="errors.main.name"
                :min-width.number="600"
                :required.boolean="true"
            ></app-input>
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
import TeamsViewLang from "../../language/TeamsViewLang";
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const { t: i18n } = useI18n({ messages: TeamsViewLang, useScope: "local" });

const entity = inject("entity");
const errors = inject("errors");
</script>

<script>
export default {
    name: "TeamsMainTab",
};
</script>

<style scoped></style>
