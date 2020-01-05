import axios from 'axios'

export default payload => {
    return axios.post('/register', payload)
}