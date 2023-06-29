function removeTags(str) {
    return str.replace(/<\/?[a-zA-Z]+>/gi, "").slice(0, 30) + "...";
}

export default function columns(i18n) {
    return [
        {
            name: "id",
            entityProp: "id",
        },
        {
            name: i18n( "tableColumns.name"),
            entityProp: "name",
        },
        {
            name: i18n( "tableColumns.city"),
            entityProp: "city",
        },
        {
            name: i18n( "tableColumns.review"),
            entityProp: (entity) => removeTags(entity.comment),
        },

        {
            name: i18n( "tableColumns.dateCreate"),
            entityProp: "created_at",
        },
        {
            name: i18n( "tableColumns.dateUpdate"),
            entityProp: "updated_at",
        },

        ];
}
