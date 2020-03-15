import i from 'Models/axios.interface';
import { AreaTableAPI, AreaAPI as AreaAPIInterfaces } from './interfaces';
import { AreaAvailableAPI } from './area.interface';
import moment from 'moment';

class AreaAPI {
  async getBuildingTable(): Promise<AreaTableAPI[]> {
    try {
      const data = (await i.instance.get('/area/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAreaAvailable(id: string): Promise<AreaAvailableAPI[]> {
    try {
      const data = (await i.instance.get('/area/available/' + id)).data;
      console.log('data', data, id);
      return data.map((e: any) => ({ ...e, date: moment(e.date) }));
    } catch (err) {
      throw err;
    }
  }

  async getAreaInfo(id: string): Promise<AreaAPIInterfaces> {
    try {
      const data: AreaAPIInterfaces = (await i.instance.get('/area/' + id))
        .data;

      return {
        ...data,
        reserve: data.reserve.map(e => ({
          ...e,
          start: moment(e.start),
          stop: moment(e.stop),
        })),
      };
      // return {
      //   ...data,
      //   createAt: moment(data.createAt),
      //   updateAt: moment(data.updateAt),
      // };
    } catch (err) {
      throw err;
    }
  }
}

export const areaAPI = new AreaAPI();
