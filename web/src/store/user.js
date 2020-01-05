import loginFn from '../service/login'
import registerFn from '../service/register'

const userInfo = JSON.parse(localStorage.getItem('user_info')) || {};

const userReducer = (state = userInfo, action) => {
    switch (action.type) {
        case 'login':
            localStorage.setItem('user_info', JSON.stringify(action.payload));
            return action.payload;
        case 'logout':
            localStorage.removeItem('user_info');
            return {};
        default:
            return state;
    }
}

const login = payload => dispatch => {
    return loginFn(payload).then((res) => {
        const data = res.data.data;
        dispatch({ type: 'login', payload: data });
        return res
    });
}

const logout = () => ({ type: 'logout' })

const register = payload => () => {
    return registerFn(payload);
}

export { login, logout, register }
export default userReducer