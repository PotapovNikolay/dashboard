export default {
    setPagination(state, pagination) {
        state.pagination = pagination;
    },

    setNews(state, news) {
        state.entities.news = news;
    },

    setNewsById(state, news) {
        state.entities.newsById.push(news);
    },

    deleteNewsById(state, id) {
        state.entities.news = state.entities.news.filter((news) => news.id !== id);
    },
};
