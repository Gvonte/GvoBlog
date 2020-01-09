import axios from 'axios'

export default file => {
    const data = new FormData();
    data.append('file', file);
    return axios.post('/uploadImg', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}