import { inject, ref } from "vue";

export function useSchema(entity, basePlatform_id, updateTippy, openSector, addSectors) {
    const axios = inject("useAxios");

    const schemeSvgRaw = ref();

    async function setScheme(scheme) {
        if (scheme) {
            const response = await axios({
                url: scheme,
                baseURL: "/",
            });

            schemeSvgRaw.value = response.data;

            setTimeout(async () => {
                await updateTippy();
            }, 300);
        } else {
            schemeSvgRaw.value = null;
        }
    }

    async function openSchemeSector(event) {
        let target = null;
        if (event.target.classList.contains("_sector")) {
            target = event.target;
        } else if (event.target.parentNode.classList.contains("_sector")) {
            target = event.target.parentNode;
        }

        let exist = false;
        if (target && target.classList.contains("_sector")) {
            let id = target.getAttribute("id");

            // if exist sector
            for (let i = 0; i < entity.sectors.length; ++i) {
                if (entity.sectors[i].name === id) {
                    if (!entity.sectors[i].rows.length) {
                        continue;
                    }

                    openSector(entity.sectors[i]);
                    exist = true;
                    break;
                }
            }

            //new sector
            if (exist === false) {
                let response = await axios.get(`/variants/${basePlatform_id.value}/sector/${id}`);
                if (response.status === 200 && response.data.success) {
                    if (response.data.rows.length) {
                        exist = true;
                        let sector = response.data;
                        sector.id = 0;
                        addSectors([sector]);
                        openSector(response.data);
                    }
                }
            }
        }
        if (!exist && target && target.classList.contains("_sector")) {
            alert("Данный сектор не был размечен");
        }
    }

    return {
        schemeSvgRaw,
        setScheme,
        openSchemeSector,
    };
}
