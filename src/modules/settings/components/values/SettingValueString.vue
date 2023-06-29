<template>
    <div
        @click.stop
        class="order-list__manager-comment"
        @keypress.enter="updateSettingValue"
    >
        <app-input
            :class="[this.saved_value !== entity.data.value ? 'unsaved' : '']"
            :label="entity.comment"
            v-model:value="entity.data.value"
            min-width="600"
        ></app-input>
    </div>
</template>

<script>
import AppInput from "../../../../core/components/AppInput";

export default {

    data() {
        return {
            saved_value: "",
        };
    },

    mounted() {
        this.saved_value = this.entity.data.value;
        console.log(this.entity)
    },

    methods: {
        async updateSettingValue() {
            this.saved_value = this.entity.data.value;

            await this.$store.dispatch("setting/updateSettingValue", {
                key: this.entity.key,
                newValue: this.entity.data.value.trim(),
            });
        },
    },

    props: ["entity"],

    components:{AppInput},

    name: "SettingValueString",
};
</script>
