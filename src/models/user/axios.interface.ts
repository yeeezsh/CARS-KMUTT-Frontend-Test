import axios from 'axios';
const END_POINT = 'http://0.0.0.0:3000/api';
const instance = axios.create({
  baseURL: END_POINT,
  timeout: 5000,
});

export default instance;
