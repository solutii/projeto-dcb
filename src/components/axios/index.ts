import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.91.254.124:55081/',
});

export default api;