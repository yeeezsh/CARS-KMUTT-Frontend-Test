import adapter from 'Services/adapter.interface';
import { BuildingInfo, BuildingTableAPI } from './interface';

class BuildingAPI {
  async getBuildingInfo(id: string): Promise<BuildingInfo> {
    try {
      const data = (await adapter.instance.get('/building/' + id)).data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getBuildingTable(): Promise<BuildingTableAPI[]> {
    try {
      const data = (await adapter.instance.get('/building/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const buildingAPI = new BuildingAPI();
