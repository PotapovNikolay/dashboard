<template>
    <div class="event-view__content">
        <div v-if="entity" class="category-view__name form-group">
            <app-input :label="i18n('labels.name')" v-model:value="entity.name" :error="errors.name" :minWidth.number="255"></app-input>
        </div>

        <div v-if="entity" class="category-view__name form-group">
            <app-input :label="i18n('labels.domain')" v-model:value="entity.host" :error="errors.host" :minWidth.number="255"></app-input>
        </div>

        <div v-if="entity.user" class="category-view__name form-group">
            <app-input :label="i18n('labels.userName')" v-model:value="entity.user.name" :error="errors.user.name" :minWidth.number="255"></app-input>
        </div>

        <div v-if="entity.user" class="category-view__name form-group">
            <app-input :label="i18n('labels.email')" v-model:value="entity.user.email" :error="errors.user.email" :minWidth.number="255"></app-input>
        </div>

        <div v-if="!route.params.host" class="save form-group">
            <button class="btn btn_primary save__btn" @click="save">
                {{ route.params.host ? i18n("buttons.save") : i18n("buttons.add") }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import DomainViewLang from "../language/DomainViewLang";
import { StoreName } from "../store/index";
import { onActivated, reactive, inject } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { entityItem, errorsItem } from "../helpers";

const { t: i18n } = useI18n({ messages: DomainViewLang, useScope: "local" });

const route = useRoute();
const store = useStore();

let domain = reactive({});

const { entity, errors, save } = inject("useInitView")(StoreName, entityItem, errorsItem);

onActivated(async () => {
    if (route.params.host) {
        const response = await store.dispatch(`${StoreName}/getDomainByHost`, route.params.host);

        if (response.success) {
            Object.assign(entity, response.entity);
        }
    } else {
        Object.assign(entity, entityItem);

    }
});
</script>

<script>
export default {
    name: "DomainView",
};
</script>
