<template>
    <div class="app-input row app-boolean">
        <label class="app-input__label app-boolean-label" for="checkbox">
            {{ entity.comment }}
        </label>

        <input
            ref="checkbox"
            style="margin-left: 10px"
            type="checkbox"
            :checked="entity.data.value"
            @change="updateBooleanSettingValue"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            allowEdit: false,
        };
    },

    methods: {
        async updateBooleanSettingValue() {
            await this.$store.dispatch("setting/updateSettingValue", {
                key: this.entity.key,
                newValue: this.$refs.checkbox.checked,
            });
        },
    },

    props: ["entity"],

    name: "SettingValueBoolean",
};
</script>
