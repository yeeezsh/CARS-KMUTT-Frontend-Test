import axios, { AxiosInstance } from 'axios';

const DEV_END_POINT =
  process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:3000/api';
const PROD_END_POINT =
  process.env.REACT_APP_BACKEND_ENDPOINT || 'http://10.2.14.109:3000/api';

const mode = process.env.NODE_ENV;
export const END_POINT =
  mode === 'development' ? DEV_END_POINT : PROD_END_POINT;

class Adapter {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 5000,
      withCredentials: true,
    });
  }
}
const adapter = new Adapter();

export default adapter;
