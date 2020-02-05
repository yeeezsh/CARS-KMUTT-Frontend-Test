import i from '../axios.interface';
import { Task } from './task.interface';
import moment from 'moment';
import stateDesc from './helpers/state.desc';

class TaskClass {
  async getLastTask(): Promise<Task | undefined> {
    try {
      const data = (await i.instance.get('/task/last')).data;
      if (!data) return undefined;

      return {
        ...data,
        reserve:
          data &&
          data.reserve.map((e: { start: string; stop: string }) => ({
            ...e,
            start: moment(e.start),
            stop: moment(e.stop),
          })),
        desc: stateDesc(data.state[data.state.length - 1]),
      };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export const task = new TaskClass();
