import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.0.26:3333',
    baseURL: 'http://192.168.5.105:3333',
});

export { api };