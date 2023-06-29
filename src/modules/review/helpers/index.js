let entityItem = {
    city: null,
    name: null,
    // score: 5,
    //likes: 0,
    //dislikes: 0,
    //content: "",
    comment: "",
    date: null,
    tags: [],
    publish: false,
    //popular: false,

    // partner: { id: 0, name: null },
    // answer: "",
    images: {
        preview: {},
    },
};

let errorsItem = {
    main: {
        name: { value: null, missing: false },
        content: null,
        score: null,
        answer: null,
        comment: { value: null, missing: false },
        tags: null,
    },
    media: {
        preview: null,
    },
};

export { entityItem, errorsItem };
