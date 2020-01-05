import getCategoryFn from '../service/getCategory'

const categoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'setCategory':
            return action.payload || [];
        case 'getCategory':
            return state;
        default:
            return state
    }
}

const getCategory = () => dispatch => {
    return getCategoryFn().then(res => {
        dispatch({ type: 'setCategory', payload: res.data.data });
        return res
    })
}

export { getCategory }
export default categoryReducer
