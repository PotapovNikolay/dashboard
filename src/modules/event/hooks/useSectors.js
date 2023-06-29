import { reactive, ref } from "vue";

export function useSectors(entity, updateTippy) {
    const newSector = reactive({ name: "", type: "place" });
    const editSectorRef = ref();
    const showEditSector = ref();

    function openSector(sector) {
        showEditSector.value = true;
        editSectorRef.value.openSector(sector);
    }
    function hideEditSector() {
        showEditSector.value = false;
    }

    function addSectors(sectors) {
        for (let i = 0; i < sectors.length; ++i) {
            sectors[i].price = null;
            sectors[i].places = null;

            sectors[i].attachBasePlaceProps = true;
            sectors[i].attachedBasePlaceProps = false;
            sectors[i].additionalProperties = false;

            entity.sectors.push(sectors[i]);
        }
    }

    async function setSectors(sectors) {
        for (let i = 0; i < sectors.length; ++i) {
            sectors[i].additionalProperties = false;

            sectors[i].attachBasePlaceProps = false;
            sectors[i].attachedBasePlaceProps = true;
        }

        entity.sectors = sectors;
    }

    function getSectors() {
        let sectors = [];

        for (let i = 0; i < entity.sectors.length; ++i) {
            for (let j = 0; j < entity.sectors[i].rows.length; ++j) {
                entity.sectors[i].rows[j].number =
                    entity.sectors[i].rows_direction === "ASC"
                        ? j + entity.sectors[i].row_index_start
                        : entity.sectors[i].rows.length - 1 + entity.sectors[i].row_index_start - j;
            }

            sectors.push(entity.sectors[i]);
        }

        return sectors;
    }

    function addSector() {
        if (!newSector.name.trim().length) return;

        entity.sectors.push({
            id: 0,
            name: newSector.name.trim(),
            type: newSector.type,
            price: null,
            places: null,
            rows: [],
        });

        newSector.name = "";
    }

    function removeSector(sector) {
        entity.sectors.splice(entity.sectors.indexOf(sector), 1);
    }

    function saveSector(updatedSector) {
        let sectorIndex = entity.sectors.findIndex((sector) => sector.name === updatedSector.name);
        entity.sectors[sectorIndex] = updatedSector;

        let el = document.getElementById(entity.sectors[sectorIndex].name);

        if (el && entity.sectors[sectorIndex].places > 0) {
            el.classList.add("active");
        } else if (entity.sectors[sectorIndex].places === 0) {
            el.classList.remove("active");
        }

        hideEditSector();

        updateTippy();
    }

    function setSectorPlaces(sector) {
        let places = prompt("Кол-во мест");

        if (!places) return;

        places = parseInt(places.trim());

        if (isNaN(places)) {
            alert("Неправильно значение");
        }

        sector.places = places;
    }

    function setSectorText(sector) {
        let text = prompt("Ваш текст");

        if (!text) return;

        sector.text = text;
    }

    function setSectorPrice(sector) {
        let price = prompt("Стоимость");

        if (price === null) return;

        price = parseInt(price.trim());

        if (isNaN(price)) {
            alert("Некорректное значение");
        }

        sector.price = price;
    }

    function getSectorType(sector) {
        switch (sector.type) {
            case "place":
                return "Места";
            case "parter":
                return "Партер";
            case "other":
                return "Другое";
            default:
                "Не определен";
        }
    }

    return {
        editSectorRef,
        showEditSector,
        newSector,
        openSector,
        hideEditSector,
        addSector,
        addSectors,
        setSectors,
        getSectors,
        getSectorType,
        removeSector,
        saveSector,
        setSectorPlaces,
        setSectorText,
        setSectorPrice,
    };
}
