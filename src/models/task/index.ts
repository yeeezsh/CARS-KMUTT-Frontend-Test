import i from '../axios.interface';
import { Task } from './task.interface';
import moment from 'moment';

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
      };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export const task = new TaskClass();
