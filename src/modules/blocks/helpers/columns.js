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
    ];
}
