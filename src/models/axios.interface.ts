import axios, { AxiosInstance } from 'axios';
const END_POINT = 'http://localhost:3000';

class Instance {
  instance: AxiosInstance;
  token: string;
  constructor() {
    this.instance = axios.create({
      baseURL: END_POINT,
      timeout: 2000,
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
