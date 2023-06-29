import { reactive, ref } from "vue";

export function useSectors(entity, updateTippy) {
    const newSector = reactive({ name: "", type: "place" });
    const sectorGeneratorRef = ref();
    let showStateSectorGenerator = ref(false);

    function addSector() {
        if (!newSector.name.trim().length) return;

        entity.sectors.push({
            id:entity.sectors.length,
            name: newSector.name.trim(),
            type: newSector.type,
            rows_direction: "ASC",
            row_index_start: 1,
            rows: [],
        });

        newSector.name = "";
    }

    function removeSector(sector) {
        entity.sectors.splice(entity.sectors.indexOf(sector), 1);
    }

    function mergeSectors(sectorsForMerge) {
        for (let i = 0, sector = null; i < sectorsForMerge.length; ++i) {
            sector = entity.sectors.find((sector) => sector?.name === sectorsForMerge[i].name);

            if (!sector) {
                entity.sectors.push(sectorsForMerge[i]);
            }
        }
    }

    async function markUpSector(sector) {
        await showSectorGenerator();

        sectorGeneratorRef.value?.setSector(sector);
    }

    function showSectorGenerator() {
        document.body.style.overflowY = "hidden";

        showStateSectorGenerator.value = true;
    }

    function hideSectorGenerator() {
        document.body.style.overflowY = "auto";

        showStateSectorGenerator.value = false;

        updateTippy();
    }

    return {
        newSector,
        sectorGeneratorRef,
        showStateSectorGenerator,
        addSector,
        removeSector,
        mergeSectors,
        markUpSector,
        hideSectorGenerator,
    };
}
