let entityItem = {
    id: null,
    classes: [],
    settings: {},
    template: null,
    css: null,
    name: "",
    description: "",

    seo_title: null,
    seo_description: null,
    seo_comment: null,
};

let errorsItem = {
    main: {
        classes: null,
        settings: null,
        template: null,
        css: null,
        name: null,
        description: null,
    },

    seo: {
        seo_title: null,
        seo_description: null,
        seo_comment: null,
    },
};

export { entityItem, errorsItem };
