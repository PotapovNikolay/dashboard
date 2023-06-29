import PlatformVariantListLang from "../language/PlatformVariantListLang";

export default function columns(i18n) {
    return [
        {
            name: "id",
            entityProp: "id",
        },
        {
            name: i18n("tableColumns.name"),
            entityProp: "name",
        },
        {
            name: i18n("tableColumns.map"),
            entityProp: (entity) => (entity.scheme && entity.scheme.id ? "+" : "-"),
        },
        {
            name: i18n("tableColumns.countOfSectors"),
            entityProp: (entity) => entity.sectors.length,
        },
    ];
}
