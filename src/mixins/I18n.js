import { useI18n } from "vue-i18n";

export default {
    methods: {
        i18n(locale, args) {
            const { t } = useI18n({ messages: locale, useScope: "local" });
            return t(args);
        },
    },
};
