import { inject, ref } from "vue";
import cloneDeep from "lodash/cloneDeep";

export function useSchema(entity, mergeSectors, markUpSector, updateTippy) {
    const axios = inject("useAxios");
    let schemeSvgRaw = ref();

    async function setScheme({ sectors, url }) {
        Object.assign(entity, { schema: url });

        await uploadScheme(url);

        Object.assign(entity, { sectors: sectors });
        // await mergeSectors(sectors);
    }

    async function uploadScheme(schema) {
        if (schema) {
            const response = await axios({
                url: schema,
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

    function openSchemeSector(event) {
        let target = null;
        if (event.target.classList.contains("_sector")) {
            target = event.target;
        } else if (event.target.parentNode.classList.contains("_sector")) {
            target = event.target.parentNode;
        }

        if (target && target.classList.contains("_sector")) {
            let id = target.getAttribute("id");

            for (let i = 0; i < entity.sectors.length; ++i) {
                if (entity.sectors[i].name === id) {
                    markUpSector(entity.sectors[i]);

                    break;
                }
            }
        }
    }

    return { schemeSvgRaw, setScheme, uploadScheme, openSchemeSector };
}
