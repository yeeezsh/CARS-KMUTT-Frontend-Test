import axios from 'axios';
const END_POINT = 'http://localhost:3000';
const instance = axios.create({
  baseURL: END_POINT,
  timeout: 2000,
});

export default instance;
