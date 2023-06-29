import { reactive } from "vue";

export default function (stylesAndSettings) {
    let styles = reactive({});
    let settings = reactive({});

    stylesAndSettings.classes.forEach((style) => {
        Object.assign(styles, { [style.var]: `${style.value}` });
    });

    Object.values(stylesAndSettings.settings).forEach((setting) => {
        Object.keys(setting.values).forEach((valuesKey) => {
            Object.assign(settings, { [valuesKey]: `${setting.values[valuesKey].value}` });
        });
    });

    return {
        styles,
        settings,
    };
}
