<template>
    <div class="setting_image-item">
        <label class="label app-input__label">
            {{ entity.comment }}
        </label>

        <div class="row">
            <div class="setting_image">
                <img v-if="entity.data.values" :src="entity.data.values.source" alt="not loaded" />
            </div>

            <label class="btn p_rel setting-image-btn">
                <input type="file" ref="file" @change="updateSettingImage" />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        updateSettingImage() {
            this.file = this.$refs.file.files[0];

            if (/^image\//.test(this.file.type)) {
                this.$refs.file.parentElement.classList.add("file_success");
                this.$refs.file.parentElement.classList.remove("file_error");
            } else {
                this.$refs.file.parentElement.classList.remove("file_success");
                this.$refs.file.parentElement.classList.add("file_error");
            }

            this.imageUpload();
        },

        async imageUpload() {
            await this.$store.dispatch("loader/show");

            const image_upload_response = await this.$store.dispatch("setting/uploadImage", { file: this.file });

            await this.$store.dispatch("loader/hide");

            if (image_upload_response.data.success) {
                setTimeout(() => {
                    this.$refs.file.parentElement.classList.remove("file_success");
                }, 500);
                this.$refs.file.parentElement.classList.remove("file_error");
            }

            const image_sync_response = await this.$store.dispatch("setting/syncImage", {
                key: this.entity.key,
                image_id: image_upload_response.data.entity.id,
            });

            if (image_sync_response.data.success) {
                this.entity.data.values.source = image_sync_response.data.entity.data.values.source;

                return;
            }

            alert("Произошла ошибка, обратитесь в тех поддержку");
        },
    },

    props: ["entity"],

    name: "SettingValueImage",
};
</script>
