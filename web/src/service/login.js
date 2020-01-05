import axios from 'axios'

export default payload => {
    return axios.post('/login', payload)
}