let entityItem = {
    name: null,
    description: null,
    capacity: null,
    address: null,
    route: null,
    tags: [],
    videos: [],

    publish: true,

    images: {
        preview: {},
    },
    cover_images: [],
    scheme_images: [],

    coords: null,

    seo_title: "",
    seo_description: "",
    seo_comment: "",
};

let errorsItem = {
    main: {
        name: { value: null, missing: false },
        description: null,
        capacity: { value: null, missing: false },
        address: { value: null, missing: false },
        coords: null,
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
