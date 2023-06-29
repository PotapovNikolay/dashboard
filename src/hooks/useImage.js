import { reactive, ref, inject } from "vue";

export default function useImage(entities) {
    const axios = inject("useAxios");

    const showModalCrop = ref(false);
    const showModalZoom = ref(false);
    const showMenu = ref(false);

    const coordinates = {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    };

    let result = reactive({
        coordinates: null,
        image: null,
    });

    const { emit } = entities;

    function onChange({ coordinates, image }) {
        Object.assign(result, {
            coordinates,
            image,
        });
    }

    async function crop(ref, value, index = null) {
        const { canvas } = ref.getResult();
        if (canvas) {
            const form = new FormData();
            canvas.toBlob(async (blob) => {
                form.append("file", blob);
                const response = await axios.post("/files/upload", form);

                if (response.data.success) {
                    if (Array.isArray(value)) {
                        value.splice(index, 1, response.data.entity);

                        emit("update:value", value);
                    } else {
                        emit("update:value", response.data.entity);
                    }
                } else {
                    alert("Не удалось загрузить изображение");
                }
            }, "image/jpeg");
        }
        showModalCrop.value = !showModalCrop.value;
    }

    function changeShowModalCrop() {
        disabledScroll();
        showModalCrop.value = !showModalCrop.value;
    }

    function changeShowModalZoom() {
        disabledScroll();
        showModalZoom.value = !showModalZoom.value;
    }

    function disabledScroll() {
        document.body.style.overflow === "hidden" ? (document.body.style.overflow = "") : (document.body.style.overflow = "hidden");
    }

    async function generateThumb(event, value) {
        let file = event.target.files.length > 1 ? event.target.files : event.target.files[0];

        // let file = event.target.files[0]
        if (!file) return;

        // if (!file.length) return;

        let formData = new FormData();

        formData.append("file", file);

        const response = await axios.post("/files/upload", formData);

        if (response.data.success) {
            if (Array.isArray(value)) {
                value.push(response.data.entity);
                emit("update:value", value);
                // assignValue(newValue);
            } else {
                emit("update:value", response.data.entity);
            }
        } else {
            alert("Не удалось загрузить изображение");
        }

        event.target.value = null;
    }

    function removeImage(image, value) {
        value.splice(image, 1);

        emit("update:value", value);
    }

    return {
        showModalCrop,
        showModalZoom,
        showMenu,
        result,
        changeShowModalCrop,
        changeShowModalZoom,
        disabledScroll,
        generateThumb,
        onChange,
        crop,
        removeImage,
    };
}
