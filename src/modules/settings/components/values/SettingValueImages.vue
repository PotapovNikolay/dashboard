<template>
    <div class="setting_image-item">
        <label class="label app-input__label">
            {{ entity.comment }}
        </label>

        <div class="row">
            <draggable :list="entity?.data.values" item-key="id" class="row app-images__list"  v-if="entity.data.values && entity.data.values.length">
                <template #item="{element}">
                    <div class="setting_image setting_images" >
                        <img :src="element.source" alt="Изображение" class="app-images__image" />

                        <div class="app-images__del" @click="removeImage(element.id)" title="Убрать изображение">×</div>
                    </div>
                </template>
            </draggable>

            <label class="btn p_rel setting-image-btn">
                <input type="file" ref="file" @change="updateSettingImage" />
            </label>
        </div>
    </div>
</template>

<script>
// import draggable from 'vuedraggable'
import draggable from 'vuedraggable'



export default {
    data() {
        return {
            allowEdit: false,
            drag: false,
        };
    },

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

                this.entity.data.values.push(image_upload_response.data.entity);
            }

            await this.imageSync();
        },

        async imageSync() {
            await this.$store.dispatch("loader/show");

            const images_sync_response = await this.$store.dispatch("setting/syncImages", {
                key: this.entity.key,
                images_ids: this.entity.data.values.map((image) => image.id),
            });

            await this.$store.dispatch("loader/hide");

            if (!images_sync_response.data.success) {
                alert("Произошла ошибка, обратитесь в тех поддержку");
            }
        },

        removeImage(image_id) {
            this.entity.data.values = this.entity.data.values.filter((array_image) => array_image.id !== image_id);

            this.imageSync();
        },
    },

    props: ["entity"],

    components: {
        draggable
    },

    name: "SettingValueImages",
};
</script>
