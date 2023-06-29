import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

export function useFiles() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let file = ref();
    let fileRef = ref();

    function fileImport() {
        file.value = fileRef.value.files[0];

        let fileSaveButton = document.querySelector(`._file_save_button`);

        if (file.value.type === "text/csv" || file.value.type === "application/vnd.ms-excel" || file.value.name?.split(".")[1] === "csv") {
            fileSaveButton.classList.add("file_success");
            return;
        }
        fileSaveButton.classList.add("file_error");
    }

    async function fileUpload() {
        await store.dispatch("loader/show");

        const response = await store.dispatch("events/import", {
            file: file.value,
            id: route.params.id,
        });

        await store.dispatch("loader/hide");

        if (response.data.success) {
            await router.push({ name: "events.list" });

            alert("Сектора успешно скопированы");

            return;
        }

        alert("Произошла ошибка, обратитесь в тех поддержку");
    }

    return { file, fileRef, fileImport, fileUpload };
}
