import moment, { Moment } from 'moment';

import i from '../../axios.interface';

// interfaces
import Menu from '../../menu/interface';
import { FetchMenu } from './fetch.menu.interface';
import TimeAreaReserveType from '../time.interface';
import { AreaAPI } from './area.api.interface';

// data
import category from './data/sport.category';

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
      // console.log(fetch, 'raw areas');
      const newMapped: TimeAreaReserveType['areas'] = [];
      fetch.forEach(area => {
        const minTime =
          area.reserve &&
          area.reserve.reduce((prev, cur) =>
            (prev.start || 0) < (cur.start || 0) ? prev : cur,
          );
        const maxTime =
          area.reserve &&
          area.reserve.reduce((prev, cur) =>
            (prev.stop || 0) > (cur.stop || 0) ? prev : cur,
          );

        area.reserve?.forEach(reserve => {
          newMapped.push({
            area: {
              id: area._id,
              label: area.label,
              required: (area.required && area.required.requestor) || 0,
            },
            time: {
              start: moment(minTime && minTime.start),
              stop: moment(maxTime && maxTime.stop),
              disabled: area.disabled
                ? area.disabled.map((e: string) => ({ value: moment(e) }))
                : [],
              interval: reserve && reserve.interval,
              week: reserve && reserve.week,
              forward: area.forward || 0,
            },
          });
        });
      });

      // const mapped = fetch.map(e => {
      //   const minTime =
      //     e.reserve &&
      //     e.reserve.reduce((prev, cur) =>
      //       (prev.start || 0) < (cur.start || 0) ? prev : cur,
      //     );
      //   const maxTime =
      //     e.reserve &&
      //     e.reserve.reduce((prev, cur) =>
      //       (prev.stop || 0) > (cur.stop || 0) ? prev : cur,
      //     );

      //   return {
      //     area: {
      //       id: e._id,
      //       label: e.label,
      //       required: e.required && e.required.requestor,
      //     },
      //     time: {
      //       start: moment(minTime && minTime.start),
      //       stop: moment(maxTime && maxTime.stop),
      //       disabled: e.disabled
      //         ? e.disabled.map((e: string) => ({ value: moment(e) }))
      //         : [],
      //       interval: e.reserve && e.reserve[0].interval,
      //       week: e.reserve && e.reserve[0].week,
      //       forward: e.forward,
      //     },
      //   };
      // });

      // console.log('raw mapped', mapped);
      console.log('new mapped', newMapped);

      return newMapped;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
const sport = new SportClass();

export { category, sport };
