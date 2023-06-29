export default {
    data() {
        return {
            list: this.value.length ? this.value : [],
            showModalCropp: false,
            showModalZoom: false,
            showMenu: false,
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            result: {
                coordinates: null,
                image: null,
            },
        };
    },

    methods: {
        removeImage(image) {
            let i = this.value.indexOf(image);

            this.value.splice(image, 1);
        },

        disabledScroll() {
            document.body.style.overflow === "hidden" ? (document.body.style.overflow = "") : (document.body.style.overflow = "hidden");
        },

        setShowMenu() {
            this.showMenu = true;
        },
        unsetShowMenu() {
            this.showMenu = false;
        },
        changeShowModalCropp() {
            this.disabledScroll();
            this.showModalCropp = !this.showModalCropp;
        },
        changeShowModalZoom() {
            this.disabledScroll();
            this.showModalZoom = !this.showModalZoom;
        },
        onChange({ coordinates, image }) {
            this.result = {
                coordinates,
                image,
            };
        },

        async crop() {
            const { canvas } = this.$refs.cropper.getResult();
            if (canvas) {
                const form = new FormData();
                canvas.toBlob(async (blob) => {
                    form.append("file", blob);
                    const response = await this.$axios.post("/files/upload", form);

                    if (response.data.success) {
                        this.$emit("update:value", response.data.entity);
                    } else {
                        alert("Неудалось загрузить изображение");
                    }
                }, "image/jpeg");
            }
            this.showModalCropp = !this.showModalCropp;
        },

        async generateThumb(event) {
            let file = event.target.files.length > 1 ? event.target.files : event.target.files[0];

            // let file = event.target.files[0]
            if (!file) return;

            // if (!file.length) return;

            let formData = new FormData();

            formData.append("file", file);

            const response = await this.$axios.post("/files/upload", formData);

            if (response.data.success) {
                if (Array.isArray(this.value)) {
                    this.value.push(response.data.entity);
                } else {
                    this.$emit("update:value", response.data.entity);
                }
            } else {
                alert("Неудалось загрузить изображение");
            }

            event.target.value = null;
        },
    },
};
