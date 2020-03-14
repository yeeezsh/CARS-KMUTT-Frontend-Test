import i from 'Models/axios.interface';
import { BuildingTableAPI } from './interface';

class BuildingAPI {
  async getBuildingTable(): Promise<BuildingTableAPI[]> {
    try {
      const data = (await i.instance.get('/building/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const areaAPI = new BuildingAPI();
