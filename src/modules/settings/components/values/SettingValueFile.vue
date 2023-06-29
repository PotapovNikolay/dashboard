<template>
    <div>
        <span class="label app-input__label">
            {{ entity.comment }}
        </span>

        <div class="row">
            <a
                target="_blank"
                class="file_setting_center"
                :href="entity.data.values.source"
            >
                {{ entity.data.values.name }}
            </a>

            <label class="btn p_rel setting-image-btn">
                <input type="file" ref="file" @change="alertFileUploaded" />
            </label>
        </div>

        <div class="form-group">
            <app-input
                :label="'Название файла'"
                v-model:value="entity.data.values.name"
                min-width="600"
            ></app-input>
        </div>

        <div class="form-group">
            <div class="save">
                <button
                    class="btn btn_primary save__btn"
                    @click="updateFileSettingValue"
                >
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import AppInput from "../../../../core/components/AppInput";

export default {

    components:{AppInput},

    methods: {
        alertFileUploaded() {
            alert("Файл загружен, сохраните настройку");
        },

        async updateFileSettingValue() {
            await this.$store.dispatch("loader/show");

            const response = await this.$store.dispatch(
                "setting/importSettingFile",
                {
                    key: this.entity.key,
                    file: this.$refs.file.files[0],
                    name: this.entity.data.values.name,
                }
            );

            await this.$store.dispatch("loader/hide");

            if (response.data.success) {
                this.entity.data.values.source =
                    response.data.entity.data.values.source;

                return;
            }

            alert("Произошла ошибка, обратитесь в тех поддержку");
        },
    },

    props: ["entity"],

    name: "SettingValueString",
};
</script>
