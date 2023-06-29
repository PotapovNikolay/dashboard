<template>
    <div class="order-module">
        <div>
            <div class="form-group">
                <app-input v-model:value="entity.pKey" :label="i18n('labels.pKey')" :error="''" :min-width.number="450"></app-input>
            </div>
            <div class="form-group">
                <app-input v-model:value="entity.linkPay" :label="i18n('labels.linkPay')" :error="''" :min-width.number="450"></app-input>
            </div>
            <div class="form-group">
                <label class="label app-input__label"> Приём платежей </label>
                <button @click="toggle" class="button-primary">
                    <span v-if="entity?.name"> {{ посмотреть }} </span>
                    <span v-else>добавить</span>
                </button>
            </div>
        </div>

        <SettingsModal v-if="show" />
    </div>
</template>

<script setup>
import { reactive, ref, provide, onActivated, inject } from "vue";
import SettingsModal from "../../components/SettingsModal";
import { useI18n } from "vue-i18n";

import TeamsViewLang from "../../language/SettingsLang";
const { t: i18n } = useI18n({ messages: TeamsViewLang, useScope: "local" });

const entity = inject("entity");

const show = ref(false);

const toggle = () => {
    show.value = show.value === true ? false : true;
};

provide("toggle", toggle);
</script>
