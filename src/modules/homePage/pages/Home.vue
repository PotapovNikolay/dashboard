<template>
    <!--    <div>-->
    <!--        <div class="app_tabs">-->
    <!--            <button v-for="(tab, index) in tabs" @click="goTo(index)"-->
    <!--                    :class="[index===currentTabIndex?'app_tabs_button_selected':'app_tabs_button']">-->
    <!--                {{ tab.name }}-->
    <!--            </button>-->

    <!--        </div>-->
    <!--        <component :is="tabs[currentTabIndex].component" :forms="forms"></component>-->

    <!--    </div>-->
</template>

<script>
import AppInput from "../../../core/components/AppInput";
import AppDebounceSelect from "../../../core/components/AppDebounceSelect";
import { tabs } from "../tabs";

export default {
    data() {
        return {
            currentTabIndex: 0,
            tabs: tabs,
            model1Value: "name1",
            model2Value: "name2",
            forms: {
                nameInput: {
                    label: "Название",
                    required: "true",
                    model: this.model1Value,
                },
                countInput: {
                    label: "кол-во гостей",
                    required: "true",
                    model: this.model2Value,
                },
            },
        };
    },
    methods: {
        goTo(index) {
            this.currentTabIndex = index;
        },
    },
    components: {
        AppInput,
        AppDebounceSelect,
    },
    name: "Home",
};
</script>

<style>
.app_tabs {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    border-bottom: 1px solid #9f9f9f;
    position: relative;
    z-index: 0;
}

.app_tabs_button {
    width: 8rem;
    height: 2rem;
    margin-right: 2rem;
    background-color: #e5e5e5;
    border-radius: 10px 10px 0 0;

    border-color: #cecece;
    border-style: solid;
    border-width: 1px;
    border-bottom-width: 0;
    transition: background-color 0.2s linear;
}

.app_tabs_button:hover {
    background-color: #f5f5f5;
}

.app_tabs_button_selected {
    width: 8rem;
    height: 2rem;
    margin-right: 2rem;
    background-color: white;
    border-radius: 10px 10px 0 0;

    border-color: #9f9f9f;
    border-style: solid;
    border-width: 1px;
    border-bottom-width: 0;
    position: relative;
    z-index: 100;
    transform: translateY(1px);
}
</style>
