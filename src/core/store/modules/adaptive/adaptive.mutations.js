export default {
    getScreen(state) {
        const screen = document.documentElement.clientWidth;

        if (screen < 450) {
            state.screen = "mobile";
        } else if (screen > 450 && screen < 1080) {
            state.screen = "tablet";
        } else {
            state.screen = "desktop";
        }
    },

    toggleMenu(state) {
        state.isOpenMenu = !state.isOpenMenu;
        state.isOpenMenu ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "");
    },
};
