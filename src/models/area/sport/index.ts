import {
  footballIcon,
  badmintonIcon,
  basketballIcon,
  tennisIcon,
  volleyballIcon,
} from './icon.import';
import Menu from '../../menu/interface';
import i from '../../axios.interface';
import { FetchMenu } from './fetch.menu.interface';
import TimeAreaReserveType from '../time.interface';
import { AreaAPI } from './area.api.interface';
import moment, { Moment } from 'moment';

const category: Menu[] = [
  {
    key: '1',
    label: ['ฟุตบอล', 'football'],
    icon: footballIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['ฟุตบอล', 'football'],
    },
    query: { name: 'football' },
  },
  {
    key: '2',
    label: ['แบดมินตัน', 'badminton'],
    icon: badmintonIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['แบดมินตัน', 'badminton'],
    },
    query: { name: 'badminton' },
  },
  {
    key: '3',
    label: ['บาสเก็ตบอล', 'basketball'],
    icon: basketballIcon,
  },
  {
    key: '4',
    label: ['เทนนิส', 'tennis'],
    icon: tennisIcon,
  },
  {
    key: '5',
    label: ['วอลเลย์บอล', 'volleyball'],
    icon: volleyballIcon,
  },
];

class SportClass {
  data: Menu[];
  constructor() {
    this.data = [];
  }

  async getAreas(): Promise<Menu[]> {
    const fetch: FetchMenu[] = (
      await i.instance.get('/area/sport/building/all')
    ).data;
    const mainMenu = category
      .map(e => {
        const fetchIndex = fetch.findIndex(d => d.name === e.query?.name);
        if (fetchIndex < 0) return e;
        const typeId = fetch[fetchIndex]._id;
        return {
          ...e,
          link: `/reserve/sport/${typeId}/1`,
          query: {
            ...e.query,
            _id: typeId,
          },
        };
      })
      .filter(e => e.query?._id);
    return mainMenu;
  }

  async getFields(
    id: string,
    date: Moment,
  ): Promise<TimeAreaReserveType['areas'] | any> {
    try {
      const fetch: AreaAPI[] = (
        await i.instance.get(
          `/area/sport/fields/${id}/${date.toISOString()}`,
        )
      ).data;
      const mapped = fetch.map(e => {
        const minTime =
          e.reserve &&
          e.reserve.reduce((prev, cur) =>
            (prev.start || 0) < (cur.start || 0) ? prev : cur,
          );
        const maxTime =
          e.reserve &&
          e.reserve.reduce((prev, cur) =>
            (prev.stop || 0) > (cur.stop || 0) ? prev : cur,
          );
        console.log('api', e.disabled);
        return {
          area: {
            id: e._id,
            label: e.label,
            required: e.required && e.required.requestor,
          },
          time: {
            start: moment(minTime && minTime.start),
            stop: moment(maxTime && maxTime.stop),
            disabled: e.disabled
              ? e.disabled.map((e: string) => ({ value: moment(e) }))
              : [],
            interval: e.reserve && e.reserve[0].interval,
            week: e.reserve && e.reserve[0].week,
            forward: e.forward,
          },
        };
      });

      return mapped;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
const sport = new SportClass();

export { category, sport };
