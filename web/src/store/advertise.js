import getAdvertiseFn from '../service/getAdvertise'

const advertiseReducer = (state = [], action) => {
    switch (action.type) {
        case 'setAdvertise':
            return action.payload || [];
        case 'getAdvertise':
            return state;
        default:
            return state
    }
}

const getAdvertise = () => dispatch => {
    getAdvertiseFn().then(res => {
        dispatch({ type: 'setAdvertise', payload: res.data.data });
    })
}

export { getAdvertise }
export default advertiseReducer
