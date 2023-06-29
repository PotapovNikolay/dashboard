<template>
    <div>
        <p
            class="group__name setting__item"
            :class="[group_key === 'base' ? 'active' : '']"
            @click="toggleGroup"
            ref="setting_group"
        >
            {{ group_name }}
        </p>

        <div class="table__group setting__group">
            <template v-for="entity in entities">
                <component
                    v-bind:is="`SettingValue${entity.type}`"
                    :entity="entity"
                ></component>
            </template>
        </div>
    </div>
</template>

<script>
import SettingValueString from "./values/SettingValueString";
import SettingValueBoolean from "./values/SettingValueBoolean";
import SettingValueImage from "./values/SettingValueImage";
import SettingValueImages from "./values/SettingValueImages";
import SettingValueTextarea from "./values/SettingValueTextarea";
import SettingValueFile from "./values/SettingValueFile";

export default {
    name: "SettingTableItem",
    components: {
        SettingValueString,
        SettingValueBoolean,
        SettingValueImage,
        SettingValueImages,
        SettingValueTextarea,
        SettingValueFile,
    },

    methods: {
        toggleGroup() {
            this.$refs.setting_group.classList.toggle("active");
        },
    },

    props: {
        group_name: String,
        group_key: String,
        entities: Array,
    },
};
</script>
