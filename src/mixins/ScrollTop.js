import AnimateScroll from "js-animate-scroll";

export default {
    methods: {
        scrollTop() {
            setTimeout(() => {
                new AnimateScroll(".app", {
                    duration: 300,
                    padding: 20,
                    easing: "easeInOutQuart",
                });
            }, 200);
        },
    },
};
