import axios, { AxiosInstance } from 'axios';
const END_POINT = 'http://0.0.0.0:3000/api';

class Instance {
  instance: AxiosInstance;
  token: string;
  constructor() {
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 5000,
    });
    this.token = '';
  }

  addToken(token: string) {
    console.log('adding token to adapter', token);
    this.token = token;
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 2000,
      headers: {
        Authorization: token,
      },
    });
    return this;
  }

  removeToken() {
    this.token = '';
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 2000,
    });
    return this;
  }
}
const i = new Instance();

export default i;
