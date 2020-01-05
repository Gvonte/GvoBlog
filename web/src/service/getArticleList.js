import axios from 'axios'

export default (id, page, key) => {
    if (key) {
        return axios.get('/article', {
            params: { page, key }
        })
    }

    if (id === 0) {
        return axios.get('/article', {
            params: { page }
        })
    } else {
        return axios.get('/article', {
            params: {
                category: id,
                page
            }
        })
    }
}   