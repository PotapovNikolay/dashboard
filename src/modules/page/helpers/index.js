let entityItem = {
    id: null,
    name: "",
    url: "",
    entity: { name: "", page: "" },
    dynamic: false,
    priority: 0,
    seo_title: null,
    seo_description: null,
    seo_comment: null,
};

let errorsItem = {
    main: {
        nameOfPage: null,
        urlOfPage: null,
        entityOfPage: { name: { value: null, missing: false }, page: { value: null, missing: false } },
        dynamicOfPage: null,
        priority: null,
    },
};


export { entityItem, errorsItem };
