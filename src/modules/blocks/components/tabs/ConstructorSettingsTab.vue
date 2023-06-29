<template>
    <!--    <div class="app-constructor__editor">-->
    <!--        <div class="constructor__container_scroll">-->
    <!--            <div v-if="entity.template" class="app-constructor__editor_list app-constructor__editor_list__journal-scroll">-->
    <!--                <div v-for="(setting, settingKey) in entity.settings" class="app-constructor__editor_settings">-->
    <!--                    <div class="app-constructor__editor_settings_name">-->
    <!--                        {{ setting.name }}-->
    <!--                    </div>-->
    <!--                    <div class="app-constructor__editor_settings_item">-->
    <!--                        <div v-for="(value, valueKey) in setting.values">-->
    <!--                            <div style="margin-bottom: 0.5rem; font-size: 14px">-->
    <!--                                {{ value.name }}-->
    <!--                            </div>-->
    <!--                            <div>-->
    <!--                                &lt;!&ndash;                        app-constructor__editor_input&ndash;&gt;-->
    <!--                                <input-->
    <!--                                    @input="handleInput({ value: valueKey, event: $event })"-->
    <!--                                    :type="value.type"-->
    <!--                                    :value="value.value"-->
    <!--                                    class="app-input__input"-->
    <!--                                    style="width: 100%"-->
    <!--                                />-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        &lt;!&ndash;        <div class="app-constructor__editor_warning" v-else>здесь пока нечего редактировать</div>&ndash;&gt;-->
    <!--    </div>-->
    <!--    <div-->
    <!--        class="app-constructor__sidebar_settings app-constructor__sidebar_scroll"-->
    <!--        v-click-outside="-->
    <!--            () => {-->
    <!--                emit('switchTab', 0, i18n('labels.main'));-->
    <!--            }-->
    <!--        "-->
    <!--    >-->
    <!--        <div class="app-constructor__sidebar_settings_title">{{ i18n("labels.settings") }}</div>-->

    <!--        <div>-->
    <!--            <div class="app-constructor__sidebar_settings_container" v-for="(setting, settingKey) in entity.settings">-->
    <!--                <div class="app-constructor__sidebar_header" @click="handleClick(setting.name)">-->
    <!--                    <div class="app-constructor__sidebar_settings_name">-->
    <!--                        {{ setting.name }}-->
    <!--                    </div>-->
    <!--                    <img v-if="currentSetting.includes(setting.name)" :src="'/admin/images/caret-down-fill.svg'" alt="caret-right-fill" />-->
    <!--                    <img v-else :src="'/admin/images/caret-right-white.svg'" alt="caret-right-fill" />-->
    <!--                </div>-->
    <!--                <TransitionGroup name="list">-->
    <!--                    <div-->
    <!--                        class="app-constructor__sidebar_settings_input_container"-->
    <!--                        v-if="currentSetting.includes(setting.name)"-->
    <!--                        v-for="(value, valueKey) in setting.values"-->
    <!--                    >-->
    <!--                        <div>-->
    <!--                            {{ value.name }}-->
    <!--                        </div>-->

    <!--                        <input-->
    <!--                            @input="handleInput({ value: valueKey, event: $event })"-->
    <!--                            class="app-input__input"-->
    <!--                            :type="value.type"-->
    <!--                            :value="value.value"-->
    <!--                            style="width: 100%"-->
    <!--                        />-->
    <!--                    </div>-->
    <!--                </TransitionGroup>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
</template>

<script setup>
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import ConstructorViewLang from "../../language/ConstructorViewLang";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const currentSetting = ref([]);

const { entity } = defineProps({ entity: Object });

const templateProps = inject("templateProps");
const emit = defineEmits(["switchTab"]);

function handleClick(name) {
    currentSetting.value.indexOf(name) === -1
        ? currentSetting.value.push(name)
        : currentSetting.value.splice(currentSetting.value.indexOf(name), 1);
}

function handleInput({ value, event }) {
    templateProps.settings[value] = event.target.value;
}
</script>

<script>
export default {
    name: "ConstructorSettingsTab",
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>

<!--<script>-->
<!--export default {-->
<!--    props: {-->
<!--        entity: { type: Object },-->

<!--        currentTemplate: {-->
<!--            type: [String, Number],-->
<!--        },-->
<!--    },-->

<!--    emits: ["editSettings"],-->
<!--    name: "ConstructorSettingsTab",-->
<!--};-->
<!--</script>-->
