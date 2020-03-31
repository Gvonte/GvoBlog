// 这里写一些全局操作
import axios from 'axios'

const globalInit = () => {
    // axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.baseURL = '/api';
    axios.interceptors.request.use(config => {
        // 在发送请求之前做些什么
        const user_info = JSON.parse(localStorage.getItem('user_info'));
        if (user_info) {
            config.headers['Authorization'] = 'Bearer ' + user_info.token;
        }
        return config;
    });
};

export default globalInit