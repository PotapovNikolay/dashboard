import PlatformListLang from "../language/PlatformListLang";

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
            name: i18n("tableColumns.address"),
            entityProp: "address",
        },
        // {
        //     name: 'Вариантов площадки',
        //     entityProp: 'count_variants'
        // },
        {
            name: i18n("tableColumns.publish"),
            entityProp: (entity) => (entity.publish ? i18n("labels.published") : i18n("labels.unpublished")),
        },
    ];
}
