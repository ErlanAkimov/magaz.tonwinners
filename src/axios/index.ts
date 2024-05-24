import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://magaz.tonwinners.com'
})

export default instance;