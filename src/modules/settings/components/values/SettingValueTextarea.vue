<template>
    <div class="form-group">
        <label class="label app-input__label">{{ entity.comment }}</label>

        <textarea
            type="text"
            class="input app-seo__description"
            :title="entity.data.value"
            v-model="entity.data.value"
        ></textarea>

        <div class="form-group">
            <div class="save">
                <button
                    class="btn btn_primary save__btn"
                    @click="updateSettingValue"
                >
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        async updateSettingValue() {
            await this.$store.dispatch("setting/updateSettingValue", {
                key: this.entity.key,
                newValue: this.entity.data.value
                    .trim()
                    .replaceAll("\n", "\r\n"),
            });

            alert("Обновлено");
        },
    },

    props: ["entity"],

    name: "SettingValueString",
};
</script>
