<!--<template>-->
<!--    <div class="order-module-view module-style" v-if="entity">-->

<!--        <div class="page_title">-->
<!--            {{ entity.id ? 'Редактирование' : 'Новый игрок' }}-->
<!--        </div>-->

<!--        <div class="form-group">-->
<!--            <app-input-->
<!--                label="Имя"-->
<!--                v-model="entity.name"-->
<!--                :error="errors.name"-->
<!--                :minWidth="500"-->
<!--            ></app-input>-->
<!--        </div>-->

<!--        <div class="form-group">-->
<!--            <label class="checkbox order-filter_checkbox inline">-->
<!--                <input type="checkbox" v-model="entity.publish">-->
<!--                Опубликовать-->
<!--            </label>-->
<!--        </div>-->

<!--        <div class="row form-group">-->
<!--            <player-category-live-select v-model.number="entity.category.id"-->
<!--                               :default="entity.category.name"-->
<!--                               ref="categoryLiveSelect"-->
<!--                               :error="errors.category_id"-->
<!--                               label="Категория"-->
<!--                               minWidth="400"-->
<!--            ></player-category-live-select>-->
<!--        </div>-->

<!--        <div class="form-group">-->
<!--            <app-input-->
<!--                label="Должность"-->
<!--                v-model="entity.position"-->
<!--                :error="errors.position"-->
<!--                :minWidth="500"-->
<!--            ></app-input>-->
<!--        </div>-->

<!--        <div class="form-group">-->
<!--            <app-input-->
<!--                label="Номер"-->
<!--                v-model.number="entity.number"-->
<!--                :error="errors.number"-->
<!--                :minWidth="500"-->
<!--            ></app-input>-->
<!--        </div>-->

<!--        <app-images v-model="previewImage"-->
<!--                    label="Фотография"-->
<!--                    mode="single"-->
<!--                    ref="previewImage"-->
<!--                    :error="errors.preview_image_data"-->
<!--                    image_x="300"-->
<!--                    image_y="300"-->
<!--         ></app-images>-->

<!--        <app-images v-model="flagImage"-->
<!--                    label="Флаг игрока"-->
<!--                    mode="single"-->
<!--                    ref="flagImage"-->
<!--                    :error="errors.preview_image_data"-->
<!--                    image_x="20"-->
<!--                    image_y="15"-->
<!--        ></app-images>-->

<!--        <div class="save">-->
<!--            <button class="btn btn_primary save__btn" @click="save">Сохранить</button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<template>
    <app-nav-bar v-if="entity" :title="title" @save="save('player')" :tabs="tabs" v-model:entity="entity" v-model:errors="errors" />
</template>

<script>
import { mapActions } from "vuex";
import { StoreName } from "../store";
import { ScrollTop } from "../../../mixins";
import cloneDeep from "lodash/cloneDeep";
import { prototypeItem, errors } from "../helpers/index";
import PlayerCategoryLiveSelect from "../components/PlayerCategoryLiveSelect";
import Save from "../../../mixins/Save";
import { tabs } from "../helpers/tabs";

export default {
    data() {
        return {
            entity: {},
            tabs: tabs,
            errors: cloneDeep(errors),
            title: "Новый игрок",
            previewImage: [],

            flagImage: [],
        };
    },

    computed: {},

    methods: {
        ...mapActions(StoreName, { getNewById: "getPlayerById" }),

        async init() {
            this.errors = cloneDeep(errors);
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if ("id" in to.params) {
                let item = vm.getNewById(to.params.id);

                item.then((item) => {
                    vm.entity = Object.assign({}, item);
                    vm.init();
                });
            } else {
                vm.entity = Object.assign({}, prototypeItem);
                vm.init();
            }
        });
    },

    mixins: [ScrollTop, Save],

    components: {
        PlayerCategoryLiveSelect,
    },

    name: "PlayerView",
};
</script>
