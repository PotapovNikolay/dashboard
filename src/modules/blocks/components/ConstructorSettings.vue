<template>
    <div class="app-constructor__sidebar_settings app-constructor__sidebar_scroll">
        <div class="app-constructor__sidebar_settings_title">{{ i18n("labels.settings") }}</div>

        <div>
            <div class="app-constructor__sidebar_settings_container" :key="settingKey" v-for="(setting, settingKey) in entity.settings">
                <div class="app-constructor__sidebar_header" @click="handleClick(setting.name)">
                    <div class="app-constructor__sidebar_settings_name">
                        {{ setting.name }}
                    </div>
                    <img v-if="currentSetting.includes(setting.name)" :src="'/admin/images/caret-down-fill.svg'" alt="caret-right-fill" />
                    <img v-else :src="'/admin/images/caret-right-white.svg'" alt="caret-right-fill" />
                </div>
                <TransitionGroup name="list">
                    <div
                        class="app-constructor__sidebar_settings_input_container"
                        v-if="currentSetting.includes(setting.name)"
                        v-for="(value, valueKey, index) in setting.values"
                        :key="index"
                    >
                        <div>
                            {{ value.name }}
                        </div>

                        <!--                        <div v-if="value.type === 'text'">-->
                        <!--                            &lt;!&ndash;                            {{ i18n("buttons.openTextLong") }}&ndash;&gt;-->

                        <!--                            <app-description-->
                        <!--                                @update:value="-->
                        <!--                                    (event) => {-->
                        <!--                                        handleInput(event, settingKey, valueKey);-->
                        <!--                                    }-->
                        <!--                                "-->
                        <!--                                :label="i18n('buttons.openTextLong')"-->
                        <!--                                ref="descriptionRef"-->
                        <!--                                v-model:value="value.value"-->
                        <!--                            />-->
                        <!--                        </div>-->
                        <div v-if="value.type === 'file'">
                            <div @click="upload(index)" class="app-constructor__sidebar_settings__upload_button">
                                <img :src="'/admin/images/upload.svg'" alt="upload" />
                                <span>{{ i18n("buttons.upload") }}</span>
                            </div>
                            <input
                                :ref="setItemRef"
                                hidden
                                type="file"
                                accept="image/*"
                                @change="
                                    (event) => {
                                        uploadImage(event, settingKey, valueKey);
                                    }
                                "
                            />
                        </div>

                        <input
                            v-else
                            @input="
                                (event) => {
                                    handleInput(event, settingKey, valueKey);
                                }
                            "
                            class="app-input__input"
                            :type="value.type"
                            :value="value.value"
                            style="width: 100%"
                        />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onBeforeUpdate } from "vue";
import { useI18n } from "vue-i18n";
import ConstructorViewLang from "../language/ConstructorViewLang";

const axios = inject("useAxios");

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const currentSetting = ref([]);
let itemRefs = [];

const setItemRef = (el) => {
    if (el) {
        itemRefs.push(el);
    }
};

onBeforeUpdate(() => {
    itemRefs = [];
});

function upload(index) {
    itemRefs[index].click();
}

const { entity } = defineProps({ entity: Object });

const templateProps = inject("templateProps");

function handleClick(name) {
    currentSetting.value.indexOf(name) === -1
        ? currentSetting.value.push(name)
        : currentSetting.value.splice(currentSetting.value.indexOf(name), 1);
}

function handleInput(event, section, value) {
    if (event.target) {
        templateProps.settings[value] = event.target.value;
        entity.settings[section].values[value].value = event.target.value;
    } else {
        entity.template.replace("{{ settings.text }}");
        const el = document.querySelector("iframe")?.contentWindow.document.querySelector(".description");

        el.innerHTML = event;
        templateProps.settings[value] = event;
        entity.settings[section].values[value].value = event;
    }
}

async function uploadImage(event, section, value) {
    let file = event.target.files[0];

    if (!file) return;

    let formData = new FormData();

    formData.append("file", file);

    const response = await axios.post("/blocks/settings/file/upload", formData);

    if (response.data.success) {
        templateProps.settings[value] = response.data.src;
        entity.settings[section].values[value].value = response.data.src;
    } else {
        alert("Не удалось загрузить изображение");
    }

    event.target.value = null;
}
</script>

<script>
export default {
    name: "ConstructorSettings",
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
