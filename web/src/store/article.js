import getArticleFn from '../service/getArticle'

const initial = {
    title: '',
    author: '',
    content: '',
    browse: '',
    category: '',
    comment: []
};

const articleReducer = (state = initial, action) => {
    switch (action.type) {
        case 'setArticle':
            return action.payload || initial;
        case 'getArticle':
            return state;
        default:
            return state
    }
}

const getArticle = id => dispatch => {
    return getArticleFn(id).then(res => {
        const { title, author, content, browse, Category: { name: category } } = res.data.data.article;
        const comment = res.data.data.comment.rows;
        dispatch({ type: 'setArticle', payload: { title, author, content, browse, category, comment } });
        return res
    })
}

export { getArticle }
export default articleReducer
