<template>
    <div class="app-tags component_offset">
        <label class="label app-input__label">{{ i18n("title") }}</label>

        <div class="app-tags__list">
            <div class="app-tags__item" v-for="tag in value">
                {{ tag }}
                <span @click="remove(tag)" class="del">×</span>
            </div>
        </div>

        <div class="row">
            <div class="form-inline app-tags__input-wrap">
                <div class="app-tags__relative">
                    <input
                        type="text"
                        class="input app-input__input"
                        :placeholder="i18n('placeholder')"
                        v-model="input"
                        @keypress.enter="
                            () => {
                                value.push(input);
                                clearInput();
                            }
                        "
                    />
                    <span @click="clearInput" class="del" v-show="input.length">×</span>
                </div>
            </div>

            <button
                class="btn btn_primary app-tags__btn"
                @click="
                    () => {
                        value.push(input);
                        clearInput();
                    }
                "
            >
                {{ i18n("buttons") }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import AppTagsLang from "../language/AppTagsLang";

const { t: i18n } = useI18n({ messages: AppTagsLang, useScope: "local" });

let input = ref("");

let { value } = defineProps({ value: Array });

let array = ref(value);

function clearInput() {
    input.value = "";
}

function remove(tag) {
    const index = value.indexOf(tag);

    value.splice(index, 1);
}

function clear() {
    value = [];
}
</script>

<script>
export default {
    name: "AppTags",
};
</script>

<!--<script>-->
<!--import I18n from "../../mixins/I18n";-->
<!--import AppTagsLang from "../language/AppTagsLang";-->

<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            input: "",-->
<!--            AppTagsLang: AppTagsLang,-->
<!--        };-->
<!--    },-->

<!--    methods: {-->
<!--        add() {-->
<!--            if (!this.input.trim().length) return;-->

<!--            this.value.push(this.input);-->

<!--            this.clearInput();-->
<!--        },-->

<!--        clearInput() {-->
<!--            this.input = "";-->
<!--        },-->

<!--        remove(tag) {-->
<!--            const index = this.value.indexOf(tag);-->

<!--            this.value.splice(index, 1);-->
<!--        },-->

<!--        clear() {-->
<!--            this.$emit("update:value", []);-->
<!--        },-->
<!--    },-->

<!--    props: ["value"],-->
<!--    emits: ["update:value"],-->
<!--    name: "AppTags",-->
<!--    mixins: [I18n],-->
<!--};-->
<!--</script>-->
