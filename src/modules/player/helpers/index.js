let prototypeItem = {
    name: "",
    number: "",
    position: null,
    // category: { id: 0, name: null },
    category: "",

    images: {
        cover: {},

        flag: {},
    },
};

let errors = {
    name: null,
    number: null,
    position: null,
    images: {
        cover: null,

        flag: null,
    },
    category: null,
    preview_images_data: null,
    flag_images_data: null,
};

export { prototypeItem, errors };
