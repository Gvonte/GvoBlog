import axios from 'axios'

export default id => {
    return axios.get(`/article/${id}`)
}