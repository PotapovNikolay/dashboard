let prototypeItem = {
    name: null,

    category: { id: 0, name: null },
    operator: { id: 0, name: null },

    price: 0,
    guests: 0,
    area: 0,

    popular: false,
    best: false,
    publish: true,
    slider: false,

    description: "",
    content: "",

    images: {
        preview: [],
        mini_preview: [],
        cover: [],
        mobile_cover: [],
        slider: [],
    },

    seo_title: null,
    seo_description: null,
    seo_comment: null,
};

let errors = {
    name: null,
    color: null,
    price: null,

    category_id: null,
    operator_id: null,

    description: null,
    content: null,

    images: {
        preview: null,
        mini_preview: null,
        cover: null,
        mobile_cover: null,
        slider: null,
    },

    seo_title: null,
    seo_description: null,
    seo_comment: null,
};

export { prototypeItem, errors };
