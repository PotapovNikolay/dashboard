import AnimateScroll from "js-animate-scroll";

function scrollTop() {
    setTimeout(() => {
        new AnimateScroll(".app", {
            duration: 300,
            padding: 20,
            easing: "easeInOutQuart",
        });
    }, 200);
}
export default function paginate(page) {
    this.getEntities(
        Object.assign({
            page: page,
        })
    );

    scrollTop();
}
