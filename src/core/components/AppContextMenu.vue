<template>
    <div class="context-menu" :style="{ visibility: show ? 'visible' : 'hidden' }" @click.right.prevent>
        <div class="context-menu__mask" @click="hideContextMenu" @click.right="hideContextMenu"></div>

        <div ref="contentMenuContent" class="context-menu__content" @click.stop :style="position">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";

let show = ref(false);
let position = reactive({ top: "0", left: "0" });
const contentMenuContent = ref(null);

const showContextMenu = (event) => {
    position.top = event.clientY + "px";
    position.left = event.clientX + "px";

    if (event.clientX + contentMenuContent.value.clientWidth > window.innerWidth) {
        position.left = window.innerWidth - contentMenuContent.value.offsetWidth - 15 + "px";
    }

    show.value = true;

    if (document.body.scrollHeight > document.body.clientHeight) {
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = "15px";
    }

    //$store.commit('dispatcherShowComponents/register', this);
};

const hideContextMenu = () => {
    show.value = false;

    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0";
};

defineExpose({
    showContextMenu,
    hideContextMenu,
    position,
    show,
});
</script>

<script>
export default {
    name: "AppContextMenu",
};
</script>
