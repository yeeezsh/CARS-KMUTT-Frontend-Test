import TimeNode from 'Components/TimeTable/timetable.interface';
import moment, { Moment } from 'moment';
import adapter from 'Services/adapter.interface';
import { AreaAvailableAPI } from './area.interface';
import { AreaAPI as AreaAPIInterfaces, AreaTableAPI } from './interfaces';

class AreaAPI {
  async getBuildingTable(): Promise<AreaTableAPI[]> {
    try {
      const data = (await adapter.instance.get('/area/table')).data;
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAreaAvailable(id: string): Promise<AreaAvailableAPI[]> {
    try {
      const data = (await adapter.instance.get('/area/available/' + id))
        .data;
      return data.map((e: any) => ({ ...e, date: moment(e.date) }));
    } catch (err) {
      throw err;
    }
  }

  async getAreaAvailableMeeting(
    id: string,
    date: Moment,
  ): Promise<{ disabled: TimeNode[] }> {
    try {
      const data = (
        await adapter.instance.get('/area/available/meeting/' + id, {
          params: {
            date: date.toISOString(),
          },
        })
      ).data;

      return {
        disabled: data.map(
          (e: { value: Date; type: TimeNode['type'] }) => ({
            ...e,
            value: moment(e.value),
          }),
        ),
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAreaInfo(id: string): Promise<AreaAPIInterfaces> {
    try {
      const data: AreaAPIInterfaces = (
        await adapter.instance.get('/area/' + id)
      ).data;

      return {
        ...data,
        reserve: data.reserve.map(e => ({
          ...e,
          start: moment(e.start),
          stop: moment(e.stop),
        })),
      };
    } catch (err) {
      throw err;
    }
  }
}

export const areaAPI = new AreaAPI();
