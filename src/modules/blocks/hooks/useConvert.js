export default function (entity, templateProps) {
    entity.classes.map((item) => {
        item.value = templateProps.styles[item.var];

        return item;
    });

    // Object.entries(entity.settings).forEach(([keySetting, setting]) => {
    //     Object.keys(setting.values).forEach((valuesKey) => {
    //         entity.settings[keySetting].values[valuesKey].value = templateProps.settings[valuesKey];
    //     });
    // });

    return entity;
}
