import moment from 'moment';
import i from '../axios.interface';
import { TaskDetail, TaskLastCard } from './task.interface';
import stateDesc from './helpers/state.desc';

class TaskClass {
  async getTaskById(id: string): Promise<TaskDetail | undefined> {
    try {
      const data = (await i.instance.get('/task/' + id)).data;
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async confirmTaskById(id: string): Promise<void> {
    try {
      await i.instance.get('/task' + '/' + id + '/confirm');
    } catch (err) {
      throw new Error(err);
    }
  }

  async cancleTaskById(id: string): Promise<void> {
    try {
      await i.instance.get('/task' + '/' + id + '/cancle');
    } catch (err) {
      throw new Error(err);
    }
  }
  async getLastTask(): Promise<TaskLastCard | undefined> {
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
