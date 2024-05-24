import axios from 'axios';

const xApi = axios.create({
    baseURL: 'https://magaz.tonwinners.com/x-api'
})

export default xApi;