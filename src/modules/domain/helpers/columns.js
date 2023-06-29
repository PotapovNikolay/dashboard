export default function columns(i18n) {
    return [
        {
            name: i18n("tableColumns.hosts"),
            entityProp: "host",
        },
        {
            name: i18n("tableColumns.domains"),
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
