export default function columns(i18n) {
    return [
        {
            name: "id",
            entityProp: "id",
        },
        {
            name: i18n("tableColumns.news"),
            entityProp: "name",
        },
        {
            name: i18n("tableColumns.dateCreate"),
            entityProp: "created_at",
        },
        {
            name: i18n("tableColumns.dateUpdate"),
            entityProp: "updated_at",
        },
    ];
}
