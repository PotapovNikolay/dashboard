export default {

    entities: {

        // для таблицы
        pages:[],

        // для страницы по айди
        page: {},

        //
        blocks:[],

        // компоненты для создания страниц
        componentsForCreating:[],

        // компоненты страницы для редактирования
        componentsForEditing:[],

        // для модального окна
        nameOfComponents:[],
        selectedComponents:[],
    },
    pagination: {
        total: 0,
        current_page: 1,
        last_page: 1,
    },

    preloader:false,

    indexOfBlock:100

}
