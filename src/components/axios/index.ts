import axios from 'axios';

const api = axios.create({
    //url mgcloud
    //baseURL: 'http://192.91.254.124:55081/',
    //url local
    baseURL: 'http://localhost:3000/',
});

export default api;