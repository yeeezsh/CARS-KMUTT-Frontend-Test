import axios from 'axios';
// const END_POINT = 'http://0.0.0.0:3000/api';
// const END_POINT = 'http://157.245.147.102:3000/api';
const END_POINT = 'http://10.26.100.205:3000/api';

const instance = axios.create({
  baseURL: END_POINT,
  timeout: 5000,
});

export default instance;
