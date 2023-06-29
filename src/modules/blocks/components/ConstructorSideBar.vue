<template>
    <div class="constructor__sidebar">
        <div
            class="app-constructor__sidebar_categories app-constructor__sidebar_scroll"
            :style="[toggleBlock !== '' ? 'background-color:#F7F7F7FF;' : '']"
        >
            <div class="app-constructor__sidebar_title">{{ i18n("sideBar.category") }}</div>
            <div
                v-for="[blockName, blockKey] in Object.entries(getBlocksName)"
                :key="blockKey"
                @click="setToggleCategory(blockName)"
                @click.once="getBlocksType(blockName)"
                class="app-constructor__blocks"
            >
                <div>
                    {{ blockKey }}
                </div>
                <div>
                    <img
                        v-if="blockName === toggleCategory"
                        :src="'/admin/images/arrow-right-circle-fill.svg'"
                        class="app-constructor__circle-svg"
                        alt="arrow-right-circle-fill"
                    />
                    <img v-else :src="'/admin/images/circle.svg'" class="app-constructor__circle-svg" alt="circle.svg" />
                </div>
            </div>
        </div>

        <div v-if="getBlocksTypeName(toggleCategory)" class="app-constructor__sidebar_blocks">
            <div class="app-constructor__sidebar_title">{{ i18n("sideBar.blocks") }}</div>
            <div
                v-for="[blockType, typeKey] in Object.entries(getBlocksTypeName(toggleCategory))"
                @click="getBlockByKey(toggleCategory, blockType)"
                @mouseenter="setToggleBlock(blockType)"
                class="app-constructor__blockTypes"
                :key="typeKey"
            >
                <div>
                    {{ typeKey }}
                </div>
                <div>
                    <img
                        v-if="blockType === toggleBlock"
                        :src="'/admin/images/plus-circle-fill.svg'"
                        alt="plus-circle-fill"
                        class="app-constructor__circle-svg"
                    />
                    <img v-else :src="'/admin/images/circle.svg'" class="app-constructor__circle-svg" alt="circle.svg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ConstructorViewLang from "../language/ConstructorViewLang";
import { useI18n } from "vue-i18n";
import { computed, ref, inject } from "vue";
import { StoreName } from "../store";
import { useStore } from "vuex";
import useTransform from "../hooks/useTransform";

//i18n - функция для интернализации
const { t: i18n } = useI18n({ messages: ConstructorViewLang, useScope: "local" });

const store = useStore();

const blockName = ref();
const toggleCategory = ref("");
const toggleBlock = ref("");

// const { getBlocksName } = defineProps({ getBlocksName: Object });
const emit = defineEmits(["updateTemplateVariablesFromSideBar", "openSideBar"]);

const getBlocksTypeName = computed(() => store.getters[`${StoreName}/getBlocksTypeName`]);
const getBlocksName = computed(() => store.getters[`${StoreName}/getBlocksName`]);

const templateProps = inject("templateProps");

function setToggleBlock(key) {
    toggleBlock.value = key;
}

function setToggleCategory(key) {
    toggleCategory.value = key;
}

function delToggleBlock() {
    toggleCategory.value = "";
}

function getBlocksType(type) {
    // toggleTypes = true
    store.dispatch(`${StoreName}/getBlockTypes`, type);
}
function getBlockByKey(block, type) {
    let result = store.dispatch(`${StoreName}/actionTemplateForBlockAvailable`, { type: block, key: type });

    result.then(() => {
        const templateAndStylesByKey = computed(() => store.getters[`${StoreName}/getterTemplateForBlockAvailable`](type));
        const newEntity = templateAndStylesByKey.value;

        const { styles, settings } = useTransform(templateAndStylesByKey.value);
        templateProps.styles = styles;
        templateProps.settings = settings;
        templateProps.block = block;

        emit("updateTemplateVariablesFromSideBar", newEntity);
        emit("openSideBar");
    });
}
</script>

<script>
export default {
    name: "ConstructorSideBar",
};
</script>

<!--<script>-->
<!--import { mapActions, mapGetters } from "vuex";-->
<!--import { StoreName } from "../store";-->
<!--import { BubbleMenu } from "@tiptap/vue-3";-->
<!--import AppDebounceSelect from "../../../core/components/AppDebounceSelect";-->
<!--import AppDebounceSearch from "../../../core/components/AppDebounceSearch";-->
<!--import I18n from "../../../mixins/I18n";-->
<!--import ConstructorViewLang from "../language/ConstructorViewLang";-->

<!--export default {-->
<!--    components: { BubbleMenu, AppDebounceSelect, AppDebounceSearch },-->
<!--    data() {-->
<!--        return {-->
<!--            blockName: null,-->
<!--            toggleFirstLevel: false,-->
<!--            toggleCategory: "",-->
<!--            toggleBlock: "",-->
<!--            toggleSecondLevel: [],-->
<!--            searchingString: "",-->
<!--            ConstructorViewLang: ConstructorViewLang,-->
<!--        };-->
<!--    },-->

<!--    props: { getBlocksName: { type: Object } },-->
<!--    emits: ["updateTemplateVariablesFromSideBar", "openSideBar"],-->

<!--    computed: {-->
<!--        ...mapGetters(StoreName, {-->
<!--            getBlocksTypeName: "getBlocksTypeName",-->
<!--            getterTemplateForBlockAvailable: "getterTemplateForBlockAvailable",-->
<!--            searchBlocks: "searchBlocks",-->
<!--        }),-->
<!--    },-->

<!--    methods: {-->
<!--        ...mapActions(StoreName, ["getBlockTypes", "getAvailableBlocks", "actionTemplateForBlockAvailable"]),-->

<!--        setToggleBlock(key) {-->
<!--            this.toggleBlock = key;-->
<!--        },-->

<!--        setToggleCategory(key) {-->
<!--            this.toggleCategory = key;-->
<!--        },-->

<!--        delToggleBlock() {-->
<!--            this.toggleCategory = "";-->
<!--        },-->

<!--        setToggleSecondLevel(key) {-->
<!--            if (this.toggleSecondLevel.includes(key)) {-->
<!--                this.toggleSecondLevel = this.toggleSecondLevel.filter((item) => item !== key);-->
<!--            } else {-->
<!--                this.toggleSecondLevel.push(key);-->
<!--            }-->
<!--        },-->

<!--        getBlocksType(type) {-->
<!--            // this.toggleTypes = true-->
<!--            this.getBlockTypes(type);-->
<!--        },-->
<!--        getBlockByKey(block, type) {-->
<!--            let newEntity = {};-->
<!--            let ObjectsOfValues = {};-->
<!--            let newIFrameVariables = {};-->
<!--            let newSettingsVariables = {};-->
<!--            let result = this.actionTemplateForBlockAvailable({ type: block, key: type });-->

<!--            result.then(() => {-->
<!--                const templateAndStylesByKey = this.getterTemplateForBlockAvailable(type);-->

<!--                newEntity = templateAndStylesByKey;-->

<!--                ObjectsOfValues["currentTemplate"] = type;-->
<!--                ObjectsOfValues["currentBlock"] = block;-->

<!--                templateAndStylesByKey.classes.forEach((style) => {-->
<!--                    Object.assign(newIFrameVariables, { [style.var]: `${style.value}` });-->
<!--                });-->

<!--                Object.values(templateAndStylesByKey.settings).forEach((setting) => {-->
<!--                    Object.keys(setting.values).forEach((valuesKey) => {-->
<!--                        Object.assign(newSettingsVariables, { [valuesKey]: `${setting.values[valuesKey].value}` });-->
<!--                    });-->
<!--                });-->

<!--                ObjectsOfValues["styles"] = newIFrameVariables;-->
<!--                ObjectsOfValues["settings"] = newSettingsVariables;-->

<!--                this.$emit("updateTemplateVariablesFromSideBar", ObjectsOfValues, newEntity);-->
<!--                this.$emit("openSideBar");-->
<!--            });-->
<!--        },-->
<!--    },-->

<!--    name: "ConstructorSideBar",-->
<!--    mixins: [I18n],-->
<!--};-->
<!--</script>-->
