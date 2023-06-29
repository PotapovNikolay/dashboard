<template>
    <div class="app-input app-input_inline" @click.stop>
        <label class="label app-input__label">{{ label }}</label>

        <div class="list-component__container" v-for="item in list">
            <div>
                <label class="label app-input__label">{{ i18n("labels.archive.minutes") }}: </label>
                <input
                    type="text"
                    class="input app-input__input"
                    :class="{ input_err: error }"
                    :title="error"
                    v-model="item.minute"
                    style="width: 100px"
                />
            </div>

            <div>
                <label class="label app-input__label">{{ i18n("labels.archive.score") }}: </label>
                <input
                    type="text"
                    class="input app-input__input"
                    :class="{ input_err: error }"
                    :title="error"
                    v-model="item.score"
                    style="width: 100px"
                />
            </div>

            <div>
                <label class="label app-input__label">{{ i18n("labels.archive.player") }}: </label>
                <input
                    type="text"
                    class="input app-input__input"
                    :class="{ input_err: error }"
                    :title="error"
                    v-model="item.player"
                    style="width: 200px"
                />
            </div>

            <button @click="remove(item)">{{ i18n("buttons.delete") }}</button>
        </div>

        <span @click="add" class="plus">+</span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import EventViewLang from "../language/EventViewLang";

const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

const { error, label, minWidth, initList } = defineProps({ error: String, label: String, minWidth: Number, initList: Array });

const list = ref(initList);

function add() {
    list.value.push({ minute: null, score: null, player: null });
}

function remove(item) {
    list.value.splice(list.value.indexOf(item), 1);
}

function setList(list) {
    list.value = list;
}

defineExpose({
    setList,
});
</script>

<script>
export default {
    name: "ListComponent",
};
</script>

<!--<script>-->
<!--import EventViewLang from "../language/EventViewLang";-->
<!--import I18n from "../../../mixins/I18n";-->

<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            list: this.initList,-->
<!--            EventViewLang: EventViewLang,-->
<!--        };-->
<!--    },-->

<!--    methods: {-->
<!--        add() {-->
<!--            this.list.push({ minute: null, score: null, player: null });-->
<!--        },-->

<!--        remove(item) {-->
<!--            this.list.splice(this.list.indexOf(item), 1);-->
<!--        },-->

<!--        setList(list) {-->
<!--            this.list = list;-->
<!--        },-->
<!--    },-->

<!--    props: ["error", "default", "label", "minWidth", "initList"],-->

<!--    name: "ListComponent",-->
<!--    mixins: [I18n],-->
<!--};-->
<!--</script>-->
