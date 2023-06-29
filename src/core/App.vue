<template>
    <div class="app">
        <app-preloader ref="appPreloader"></app-preloader>

        <app-header ref="appHeader"></app-header>

        <div class="content-body">
            <AppSideBar ref="appSidebar"></AppSideBar>
            <!--            <app-breadcrumbs></app-breadcrumbs>-->

            <div class="content">
                <div class="content__white">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" :key="route.fullPath" />
                        </keep-alive>
                    </router-view>

                    <!--                    <keep-alive>-->
                    <!--                        <router-view/>-->
                    <!--                    </keep-alive>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<script>
import AppPreloader from "./components/AppPreloader";
import AppHeader from "./components/AppHeader";
import AppSideBar from "./components/AppSidebar";
import AppBreadcrumbs from "./components/AppBreadcrumbs";

export default {
    name: "App",
    components: {
        AppPreloader,
        AppHeader,
        AppSideBar,
        AppBreadcrumbs,
    },

    beforeCreate() {
        this.$store.commit("adaptive/getScreen");
        window.addEventListener("resize", () => {
            this.$store.commit("adaptive/getScreen");
        });
    },
};
</script>
