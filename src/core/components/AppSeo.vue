<template>
    <div class="app-seo">
        <div class="subtitle">SEO</div>

        <div class="row">
            <div class="app-seo__left">
                <div class="seo__group">
                    <div class="app-input app-input_inline">
                        <label class="label app-input__label">Заголовок</label>

                        <input
                            v-if="entity"
                            type="text"
                            class="input product-view__input"
                            :class="{ input_err: errors.seo_title }"
                            :title="errors.seo_title"
                            v-model="entity.seo_title"
                        />
                    </div>
                </div>

                <div class="seo__group">
                    <div class="app-input app-input_inline">
                        <label class="label app-input__label">Описание</label>

                        <textarea
                            v-if="entity"
                            class="input app-seo__description"
                            :class="{ input_err: errors.seo_description }"
                            :title="errors.seo_description"
                            v-model="entity.seo_description"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="app-seo__right">
                <div class="app-input app-input_inline">
                    <label class="label app-input__label">Комментарий</label>

                    <textarea
                        v-if="entity"
                        type="text"
                        class="input app-seo__comment"
                        :class="{ input_err: errors.seo_comment }"
                        :title="errors.seo_comment"
                        v-model="entity.seo_comment"
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        entity: {
            type: Object,
        },
        errors: {
            type: Object,
        },
    },

    name: "AppSeo",
};
</script>
