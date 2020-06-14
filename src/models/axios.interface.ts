import axios, { AxiosInstance } from 'axios';

const DEV_END_POINT =
  process.env.BACKEND_ENDPOINT || 'http://localhost:3000/api';
const PROD_END_POINT =
  process.env.BACKEND_ENDPOINT || 'http://0.0.0.0:3000/api';

const mode = process.env.NODE_ENV;
export const END_POINT =
  mode === 'development' ? DEV_END_POINT : PROD_END_POINT;

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
