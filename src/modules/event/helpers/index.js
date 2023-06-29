let entityItem = {
    id: null,
    name: null,
    url: null,
    category: {
        name: "",
        id: null,
    },
    age: 0,
    date: null,
    slug: null,
    publish: true,
    popular: false,
    description: "",
    duration: null,
    time: null,
    tags: [],
    news_slider: false,
    lock_time: null,
    display: false,
    order: null,

    first_team: null,
    second_team: null,

    sectors: [],

    event_platform: {
        name: null,
        capacity: null,
        description: "",
        images: {
            gallery: [],
            preview: {},
        },
    },

    platform_variant: {
        name: null,
        schema: null,
        capacity: null,
        description: "",
        images: {
            gallery: [],
            preview: {},
        },
    },

    images: {
        cover: {},
        gallery: [],
        mobile_cover: {},
        mobile_preview: {},
        preview: {},
        platform_variant: [],
        event_news_slider_preview: {},
    },

    seo_title: null,
    seo_description: null,
    seo_comment: null,
};

let errors = {
    main: {
        name: { value: null, missing: false },
        category_id: { value: null, missing: false },
        url: null,
        age: { value: null, missing: false },
        duration: { value: null, missing: false },
        date: { value: null, missing: false },
        time: { value: null, missing: false },
        lock_time: { value: null, missing: false },
        description: { value: null, missing: false },
        order: { value: null, missing: false },
    },

    media: {
        cover: null,
        gallery: null,
        mobile_cover: null,
        mobile_preview: null,
        preview: null,
        platform_variant: null,
        event_news_slider_preview: null,
    },

    platform: {
        platform_variant_id: { value: null, missing: false },
    },

    archive: {
        score: null,
        goals: null,
    },

    teams: {
        first_team_id: { value: null, missing: false },
        second_team_id: { value: null, missing: false },
    },
    seo: {
        seo_title: null,
        seo_description: null,
        seo_comment: null,
    },
};

export { entityItem, errors };
