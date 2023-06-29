import tippy from "tippy.js";
import cloneDeep from "lodash/cloneDeep";
import { useI18n } from "vue-i18n";
import PlatformVariantViewLang from "../language/PlatformVariantViewLang";

export function useUpdateTippy(entity) {
    const { t: i18n } = useI18n({ messages: PlatformVariantViewLang, useScope: "local" });

    function getPlaceCount(rows) {
        let total = 0;

        if (rows) {
            for (let i = 0; i < rows.length; ++i) {
                total += rows[i].places.length;
            }
        }

        return total;
    }

    function updateTippy() {


        for (let i = 0, el = null; i < entity.sectors.length; ++i) {
            if (entity.sectors[i].rows) {
                el = document.getElementById(entity.sectors[i].name);

                if (el && !el.classList.contains("active")) {
                    el.classList.add("active");
                }
            }
        }

        tippy("._sector", {
            content: (reference) => {
                let sector = cloneDeep(entity.sectors.find((sector) => sector.name === reference.getAttribute("id")));

                if (!sector) return i18n("labels.noMarkUp");

                let sectorType = sector.type === "place" ? i18n("options.places") : i18n("options.stalls");

                let hh = "";

                if (sector.type === "place") {
                    hh += `[ ${i18n("labels.rows")}: ${sector.rows.length}, ${i18n("labels.places")}: ${getPlaceCount(sector.rows)}]`;
                }
                return `${i18n("labels.typeOfSector")}: ${sectorType}\n${hh}`;
            },
        });
    }

    return { getPlaceCount, updateTippy };
}
