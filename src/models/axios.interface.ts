import axios, { AxiosInstance } from 'axios';
// const END_POINT = 'http://157.245.147.102:3000/api';
// const END_POINT = 'http://localhost:3000/api';
const END_POINT = 'http://10.26.100.205:3000/api';

class Instance {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 5000,
      withCredentials: true,
    });
  }
}
const i = new Instance();

export default i;
