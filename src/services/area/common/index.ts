import Menu from 'Models/kanbanCard/interface';
import adapter from 'Services/adapter.interface';
import { FetchMenu } from '../sport/fetch.menu.interface';

class CommonAreaClass {
  list?: Menu[];

  async getBuilding() {
    try {
      const fetch: FetchMenu[] = (
        await adapter.instance.get('/area/common/building/all')
      ).data;
      const commonAreaLists = (await import('./constant/common')).default;
      const mainMenu = commonAreaLists.map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const typeId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: e.allowSport
            ? `/reserve/common/${typeId}/typesSport`
            : `/reserve/common/${typeId}/types`,
          query: {
            ...e.query,
            _id: typeId,
          },
        };
      });
      return mainMenu;
    } catch (err) {
      throw err;
    }
  }

  async getMeeting() {
    try {
      const fetch: FetchMenu[] = (
        await adapter.instance.get('/area/common/meeting/all')
      ).data;
      const meetingAreaLits = (await import('./constant/meeting')).default;
      const mainMenu = meetingAreaLits.map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const areaId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: e.link + areaId + '/1',
          query: {
            ...e.query,
            _id: areaId,
          },
        };
      });
      return mainMenu;
    } catch (err) {
      throw err;
    }
  }
}

export const commonAreaAPI = new CommonAreaClass();
