<template>
    <div class="modal-container">
        <div class="modal" v-click-outside="toggle">
            <h5 class="modal-h5" style="margin-left: 0.5rem">Приём платежей</h5>

            <div class="form-group" style="margin-top: 1rem">
                <app-input
                    v-model:value="entity.payments.name"
                    :label="i18n('labels.payments.name')"
                    :error="''"
                    :min-width.number="400"
                ></app-input>
            </div>
            <div class="form-group">
                <app-input
                    v-model:value="entity.payments.url"
                    :label="i18n('labels.payments.url')"
                    :error="''"
                    :min-width.number="400"
                ></app-input>
            </div>
            <div class="form-group">
                <app-input
                    v-model:value="entity.payments.public_key"
                    :label="i18n('labels.payments.public')"
                    :error="''"
                    :min-width.number="400"
                ></app-input>
            </div>
            <label style="margin-left: 0.5rem" class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="entity.payments.active" />
                {{ i18n("labels.payments.active") }}
            </label>

            <div class="row" style="margin-left: 0.5rem; margin-top: 1.5rem">
                <button @click="create" class="button-primary">
                    <span> Сохранить </span>
                </button>

                <button class="button-default" @click="toggle">
                    <span> Отмена </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import SettingsLang from "../language/SettingsLang";
import { useStore } from "vuex";

const { t: i18n } = useI18n({ messages: SettingsLang, useScope: "local" });

const entity = inject("entity");
const toggle = inject("toggle");

const store = useStore();

const create = () => store.dispatch(`settings/createPaymentSettings`, entity.payments);

</script>
