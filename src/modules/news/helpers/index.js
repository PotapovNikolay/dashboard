let entityItem = {
    content: null,
    created_at: null,
    date: null,
    description: null,
    slug: null,
    name: null,
    updated_at: null,
    publish: null,

    images: { preview: {} },
    popular: null,

    seo_title: "",
    seo_description: "",
    seo_comment: "",
};


let errorsItem = {
    main: {
        content: { value: null, missing: false },
        created_at: null,
        date: null,
        description: null,
        slug: null,
        name: { value: null, missing: false },
        updated_at: null,
        publish: null,
        popular: null,
    },
    media: {
        preview: null,
    },

    seo: {
        seo_title: "",
        seo_description: "",
        seo_comment: "",
    },
};

export { entityItem, errorsItem };
