export default {

    userEmail: state=>id => state.entities.domains[0],

    newsById: state => id => state.entities.newsById.find(news=>news.id===id)

}
