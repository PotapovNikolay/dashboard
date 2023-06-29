export default {

    data() {
        return {
            show: false,
            position: {
                top: '0',
                left: '0',
            }
        }
    },

    methods: {

        handlerContextMenu(event, item) {

            this.position.top = event.clientY + 'px';
            this.position.left = event.clientX + 'px';

            this.show = true;

            this.item = item;
        }
    }
}
