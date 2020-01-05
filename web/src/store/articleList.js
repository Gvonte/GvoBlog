import getArticleListFn from '../service/getArticleList'

const articleListReducer = (state = [], action) => {
    switch (action.type) {
        case 'concatArticleList':
            return state.concat(action.payload) || [];
        case 'setArticleList':
            return action.payload;
        default:
            return state
    }
}

const getArticleList = (id, page, key) => dispatch => {
    return getArticleListFn(id, page, key).then(res => {
        if (res.data.data.rows.length) {
            dispatch({ type: 'concatArticleList', payload: res.data.data.rows });
        }
        return res
    })
}
const setArticleList = payload => ({ type: 'setArticleList', payload })

export { getArticleList, setArticleList }
export default articleListReducer
