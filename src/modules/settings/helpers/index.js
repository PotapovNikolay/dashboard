let entityItem = {
    pKey: null,
    linkPay: null,
    payments: {
        name: null,
        url: null,
        public_key: null,
        active: false,
    },
    date: null,
    description: null,
    slug: null,
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
