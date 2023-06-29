<template>
    <div class="order-module" v-if="platform">
        <div class="row table__title">
            <div>{{ i18n("labels.variantsOfPlatform") }} - {{ platform.name }}</div>

            <router-link :to="{ name: 'platform.variants.new', params: { id: route.params.id } }" class="tab tab_primary tab_first">
                {{ i18n("buttons.add") }}
            </router-link>
        </div>

        <app-table
            :context-menu="platformVariantContextMenu"
            :entities="entities"
            :tableColumns="tableColumns"
            @entity-click="openEntity"
        ></app-table>

        <!-- :context-menu="platformContextMenu" -->
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { StoreName } from "../store";
import { computed, onActivated, shallowRef, ref } from "vue";
import { useI18n } from "vue-i18n";
import columns from "../helpers/columns";
import PlatformVariantListLang from "../language/PlatformVariantListLang";
import PlatformVariantContextMenu from "../component/PlatformVariantContextMenu.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const store = useStore();
const platformVariantStore = store.state[StoreName];
const entities = computed(() => platformVariantStore.entities);

const platform = ref();
const variants = ref();

const { t: i18n } = useI18n({ messages: PlatformVariantListLang, useScope: "local" });
const tableColumns = columns(i18n);

async function openEntity(entity) {
    await router.push({
        name: "platform.variants.edit",
        params: { id: route.params?.id, varId: entity.id },
    });
}

onActivated(async () => {
    platform.value = await store.dispatch(`platform/getEntityById`, route.params?.id);
    variants.value = await store.dispatch(`${StoreName}/getPlatformVariants`, route.params?.id);
});

const platformVariantContextMenu = shallowRef(PlatformVariantContextMenu);
</script>

<script>
export default {
    name: "PlatformVariantList",
};
</script>
