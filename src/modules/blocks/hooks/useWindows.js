import { ref } from "vue";

export default function useWindows() {
    const isOpenNewWindow = ref(false);
    const isOpenSideBar = ref(false);
    const isOpenContextMenu = ref(false);
    const isOpenSettings = ref(false);
    const isOpenStyles = ref(false);
    const isOpenPickr = ref(true);
    function openContextMenu() {
        isOpenContextMenu.value = !isOpenContextMenu.value;
    }

    function openSideBar() {
        isOpenSideBar.value = !isOpenSideBar.value;
    }

    function openNewWindow() {
        isOpenNewWindow.value = !isOpenNewWindow.value;
    }

    function openSettings() {
        isOpenSettings.value = !isOpenSettings.value;
    }

    function openStyles() {
        isOpenStyles.value = !isOpenStyles.value;
    }

    return {
        isOpenNewWindow,
        isOpenSideBar,
        isOpenContextMenu,
        isOpenSettings,
        isOpenStyles,
        isOpenPickr,
        openContextMenu,
        openSideBar,
        openNewWindow,
    };
}
