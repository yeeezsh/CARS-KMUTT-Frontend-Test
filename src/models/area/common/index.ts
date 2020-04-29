import Menu from 'Models/menu/interface';
import i from 'Models/axios.interface';
import { FetchMenu } from '../sport/fetch.menu.interface';

// const commonAreasList: Menu[] =
import commonAreaLists from './data/common';
import meetingAreaLits from './data/meeting';

class CommonAreaClass {
  // async getAreas()
  list: Menu[];
  constructor() {
    this.list = commonAreaLists;
  }

  async getBuilding() {
    try {
      const fetch: FetchMenu[] = (
        await i.instance.get('/area/common/building/all')
      ).data;
      const mainMenu = commonAreaLists.map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const typeId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: `/reserve/common/${typeId}/1`,
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
        await i.instance.get('/area/common/meeting/all')
      ).data;
      const mainMenu = meetingAreaLits.map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const areaId = fetch[fetchIndex]._id;
        return {
          ...e,
          // link: `/reserve/common/${typeId}/types`,

          // link: `/reserve/area/meeting/${areaId}`,
          link: e.link + areaId,
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
