<template>
    <div class="order-module-view module-style"   v-if="room">
        <div class="page_title">
            {{ room.id ? "Редактирование" : "Новый номер" }}
        </div>

        <div class="form-group">
            <app-input
                label="Название"
                required="true"
                v-model:value="room.name"
                :error="errors.name"
                min-width="600"
            ></app-input>
        </div>

        <div class="form-group">
            <app-input
                label="Количество гостей"
                required="true"
                v-model:value.number="room.guests"
                :error="errors.guests"
                min-width="600"
            ></app-input>
        </div>

        <div class="form-group">
            <app-input
                label="Площадь"
                required="true"
                v-model:value.number="room.area"
                :error="errors.area"
                min-width="600"
            ></app-input>
        </div>

        <div class="row form-group">
            <app-debounce-select
                    v-model:value.number="room.category.id"
                    :default="room.category.name"
                    ref="categoryLiveSelect"
                    :error="errors.category"
                    label="Категория"
                    minWidth="400"
                    required="true"
                    urlString="/categories/select/list">
            </app-debounce-select>
<!--            <category-live-select-->
<!--                v-model:value.number="room.category.id"-->
<!--                :default="room.category.name"-->
<!--                ref="categoryLiveSelect"-->
<!--                :error="errors.category"-->
<!--                label="Категория"-->
<!--                minWidth="400"-->
<!--                required="true"-->
<!--            ></category-live-select>-->
        </div>

        <div class="row form-group">
            <app-debounce-select
                    v-model:value.number="room.operator.id"
                    :default="room.operator.name"
                    ref="operatorLiveSelect"
                    :error="errors.operator"
                    label="Номер оператора"
                    minWidth="400"
                    required="true"
                    urlString="/operator-rooms/select/list">
            </app-debounce-select>
        </div>

        <div class="form-group">
            <app-input
                label="Минимальная цена"
                required="true"
                v-model:value.number="room.min_price"
                min-width="600"
            ></app-input>
        </div>

        <div class="form-group">
            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="room.publish"/>
                Опубликовать
            </label>

            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="room.popular"/>
                Популярное
            </label>

            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="room.best"/>
                Лучшие
            </label>

            <label class="checkbox order-filter_checkbox inline">
                <input type="checkbox" v-model="room.slider"/>
                Выводить в слайдер
            </label>
        </div>

        <app-description
            label="Описание"
            ref="description"
            v-model:value="room.description"
            :error="errors.description"
        ></app-description>
        <app-description
            label="Контент"
            ref="content"
            v-model:value="room.content"
            :error="errors.content"
        ></app-description>

        <app-image
            v-model:value="room.images.preview"
            label="Превью"
            :error="errors.images.preview"
            image_x="400"
            image_y="550"
        ></app-image>

        <app-image
                v-model:value="room.images.chapter_preview"
            label="Превью для раздела"
            :error="errors.images.chapter_preview"
            image_x="300"
            image_y="350"
        ></app-image>

        <app-image
            v-model:value="room.images.mini_preview"
            label="Мини превью"
            :error="errors.images.mini_preview"
            image_x="400"
            image_y="550"
        ></app-image>

        <app-image
            v-model:value="room.images.cover"
            label="Обложка"
            :error="errors.images.cover"
            image_x="370"
            image_y="600"
        ></app-image>

        <app-image
            v-model:value="room.images.mobile_cover"
            label="Мобильная обложка"
            :error="errors.images.mobile_cover"
            image_x="1920"
            image_y="600"
        ></app-image>

        <app-images
            v-model:value="room.images.slider"
            label="Слайдер"
            :error="errors.images.slider"
            image_x="800"
            image_y="385"
        ></app-images>

        <app-seo v-model:value="room" :errors="errors"></app-seo>

        <div class="form-group">
            <div class="save">
                <button class="btn btn_primary save__btn" @click="save">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import {StoreName} from "../store";
import {ScrollTop} from "../../../mixins";
import cloneDeep from "lodash/cloneDeep";
import {errors, prototypeItem} from "../helpers";
import CategoryLiveSelect from "../components/CategoryLiveSelect";
import RoomOperatorLiveSelect from "../components/RoomOperatorLiveSelect";
import AppImage from "../../../core/components/AppImage";
import AppImages from "../../../core/components/AppImages";
import AppSeo from "../../../core/components/AppSeo";
import AppDescription from "../../../core/components/AppDescription";
import AppInput from "../../../core/components/AppInput";
import AppDebounceSelect from "../../../core/components/AppDebounceSelect";
import AppMedia from "../../../core/components/AppMedia";

export default {

    components: {
        CategoryLiveSelect,
        RoomOperatorLiveSelect,
        AppImages,
        AppImage,
        AppSeo,
        AppDescription,
        AppInput,
        AppDebounceSelect,
        AppMedia
    },

    data() {
        return {
            room: null,

            preview: [],

            errors: cloneDeep(errors),
        };
    },
    methods: {
        ...mapActions(StoreName, {getEntityById: "getEntityById"}),

        async save() {
            await this.$store.dispatch("loader/show");

            const form = {
                id: this.room.id ? this.room.id : null,

                name: this.room.name,
                description: this.room.description,
                content: this.room.content,
                min_price: this.room.min_price,
                guests: this.room.guests,
                area: this.room.area,

                category_id: this.room.category.id
                    ? this.room.category.id
                    : null,

                operator_id: this.room.operator.id
                    ? this.room.operator.id
                    : null,

                popular: this.room.popular,
                publish: this.room.publish,
                best: this.room.best,
                slider: this.room.slider,

                images: this.room.images,

                seo_title: this.room.seo_title,
                seo_description: this.room.seo_description,
                seo_comment: this.room.seo_comment,
            };

            const response = await this.$store.dispatch(
                "room/newOrUpdate",
                form
            );

            await this.$store.dispatch("loader/hide");

            if (response.data.success) {
                this.scrollTop();

                await this.$router.push({name: "room.list"});

                await this.$store.dispatch("room/getEntities");
            } else {
                this.errors = Object.assign({}, errors, response.data.errors);

                alert("Проверьте правильность заполнения полей");
            }
        },

        async init() {
            await this.$store.dispatch("loader/show");

            this.errors = cloneDeep(errors);

            if (this.$refs.categoryLiveSelect) {
                this.$refs.categoryLiveSelect.setSearchString(
                    this.room.category.name
                );
            }

            if (this.$refs.description) {
                this.$refs.description.setContent(this.room.description);
            }

            if (this.$refs.content) {
                this.$refs.content.setContent(this.room.content);
            }

            await this.$store.dispatch("loader/hide");
        },

        resetSingleImage(image) {
            image = {
                id: null,
                source: null,
            };
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if ("id" in to.params) {
                let item = vm.getEntityById(to.params.id);

                item.then((item) => {
                    vm.room = Object.assign({}, item);
                    vm.init();
                });
            } else {
                vm.room = Object.assign({}, prototypeItem);
                vm.init();
            }
        });
    },

    mixins: [ScrollTop],


    name: "RoomView",
};
</script>
