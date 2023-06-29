export default function columns(i18n) {
    return [
        {
            name: "id",
            entityProp: "id",
        },
        {
            name: i18n("tableColumns.events"),
            entityProp: "name",
        },
        {
            name: i18n("tableColumns.dateEvent"),
            entityProp: "date",
        },
        {
            name: i18n("tableColumns.publish"),
            entityProp: (service) => (service.publish ? i18n("labels.published") : i18n("labels.noPublished")),
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
