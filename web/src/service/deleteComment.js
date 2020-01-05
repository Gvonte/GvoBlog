import axios from 'axios'

export default id => {
    return axios.delete(`/comment/${id}`)
}