<template>
    <div v-if="!entity.id" class="form-group">
        <app-debounce-select
            v-model:value="entity.event_platform"
            :initialValue="entity.event_platform.name"
            ref="platformSelectRef"
            :error="errors.platform.platform_variant_id"
            :label="i18n('labels.platform.platform')"
            :required.boolean="true"
            urlString="/platforms/search"
            :min-width.number="400"
        />
    </div>

    <div v-if="entity.event_platform.variants" class="form-group">
        <platform-variant-live-select
            :min-width.number="400"
            :label="i18n('labels.platform.variant')"
            :variants="entity.event_platform.variants"
            v-model:entity="entity.platform_variant"
        />
    </div>

    <div v-if="entity.id && entity.sectors">
        <div v-if="entity.platform_variant.name || entity.event_platform.variants">
            <label class="label app-input__label">{{ i18n("labels.platform.platform") }}</label>
            <div class="form-group">
                <div class="event-view__input_disabled">
                    {{ entity.event_platform.name }}
                </div>
            </div>

            <label class="label app-input__label">{{ i18n("labels.platform.variant") }}</label>
            <div class="form-group">
                <div class="event-view__input_disabled">
                    {{ entity.platform_variant.name ? entity.platform_variant.name : entity.event_platform.variants[0].name }}
                </div>
            </div>
        </div>
    </div>

    <div class="form-group" v-if="entity.platform_variant.id && entity.event_platform.id && entity.sectors">
        <platform-variant-sectors ref="platformVariantSectorsRef" :scheme="entity.platform_variant.schema" />

        <!-- <event-sector-live-list v-if="entity.sectors?.length" :label="'Сектора'" v-model:list="entity.sectors" /> -->
    </div>

    

    <div v-if="!entity.sectors">
        <h1>Подождите, пожалуйста, сектора загружаются</h1>
    </div>
</template>

<script setup>
import { inject, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave } from "vue-router";
import EventViewLang from "../../language/EventViewLang";
import PlatformVariantSectors from "../PlatformVariantSectors";
import PlatformVariantLiveSelect from "../PlatformVariantLiveSelect";
import EventSectorLiveList from "../EventSectorLiveList";


const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const platformVariantSectorsRef = ref();
const platformSelectRef = ref();

const entity = inject("entity");
const errors = inject("errors");



watchEffect(() => {
    if (platformVariantSectorsRef.value && entity.platform_variant) {
        init();
    }
});

watch(platformSelectRef, () => {
    if (platformSelectRef.value) {
        platformSelectRef.value.initValue(entity.event_platform.name);
    }
});

onBeforeRouteLeave(() => {
    if (platformVariantSectorsRef.value?.showEditSector) {
        let result = confirm("Заполненные данные будут утеряны, продолжить?");

        if (result) {
            platformVariantSectorsRef.value.hideEditSector();
        }

        return true;
    }
});

async function init() {
    if (entity.platform_variant.id && !entity.id) {
        platformVariantSectorsRef.value.setBasePlatformId(entity.platform_variant.id);
        platformVariantSectorsRef.value.load();
    }
    if (entity.id && entity.sectors) {
        await platformVariantSectorsRef.value.setSectors(entity.sectors);
        await platformVariantSectorsRef.value.setScheme(entity.platform_variant.schema);
    }
}
</script>

<script>
export default {
    name: "EventPlatformTab",
};
</script>

<style scoped></style>
