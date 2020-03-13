import i from 'Models/axios.interface';
import { AreaTableAPI } from './interfaces';

class AreaAPI {
  async getAreaTable(): Promise<AreaTableAPI> {
    try {
      const data = (await i.instance.get('/area/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const areaAPI = new AreaAPI();
