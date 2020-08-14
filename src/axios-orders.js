import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-2d5d8.firebaseio.com/'
})

export default instance;