import axios from 'axios';
const END_POINT = 'http://0.0.0.0:3000/api';
const instance = axios.create({
  baseURL: END_POINT,
  proxy: {
    host: 'http://157.245.147.102',
    port: 3000,
  },
  timeout: 5000,
});

export default instance;
