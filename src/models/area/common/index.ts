import kfcBuildingIcon from 'Assets/icons/area/building/kfc.svg';
import parkBuildingIcon from 'Assets/icons/area/building/park.svg';
import lgBuildingIcon from 'Assets/icons/area/building/lg.svg';
import basketballBuildingIcon from 'Assets/icons/area/building/basketball.svg';
import Menu from 'Models/menu/interface';
import i from 'Models/axios.interface';
import { FetchMenu } from '../sport/fetch.menu.interface';

const commonAreasList: Menu[] = [
  {
    key: '1',
    label: [
      `อาคารพระจอมเกล้า
ราชานุสรณ์ 190 ปี มจธ.
(โรงยิม)`,
    ],
    icon: kfcBuildingIcon,
    link: '/reserve/area/common/',
    query: { name: 'kfc' },
  },
  {
    key: '2',
    label: [`สวนสุขภาพ`],
    icon: parkBuildingIcon,
    link: '/reserve/area/common/',
    query: { name: 'park' },
  },
  {
    key: '3',
    label: [`Learning Garden`],
    icon: lgBuildingIcon,
    link: '/reserve/area/common/',
    query: { name: 'lg' },
  },
  {
    key: '4',
    label: [`สนามบาสคณะวิทยาศาสตร์`],
    icon: basketballBuildingIcon,
    link: '/reserve/area/common/',
    query: { name: 'sci-basketball' },
  },
].map(e => ({
  ...e,
  style: 'center',
}));

class CommonAreaClass {
  // async getAreas()
  list: Menu[];
  constructor() {
    this.list = commonAreasList;
  }

  async getBuilding() {
    try {
      const fetch: FetchMenu[] = (
        await i.instance.get('/area/common/building/all')
      ).data;
      const mainMenu = commonAreasList.map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const typeId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: `/reserve/common/${typeId}/types`,
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
}

export const commonAreaAPI = new CommonAreaClass();
