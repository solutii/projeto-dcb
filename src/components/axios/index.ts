import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.234.3:55081/',
});

export default api;