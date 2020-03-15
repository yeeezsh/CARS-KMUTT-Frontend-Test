import i from '../axios.interface';
import { TaskDetail, TaskLastCard } from './task.interface';
import taskDetailParse from './parser/task.detail.parse';
import taskLastParse from './parser/task.last.parse';
import { QuickTask, QuickTaskAPI } from './task.quick.interface';
import moment, { Moment } from 'moment';

class TaskClass {
  async getTaskById(id: string): Promise<TaskDetail | undefined> {
    try {
      const data = (await i.instance.get('/task/' + id)).data;
      console.log(data);
      return taskDetailParse(data);
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

  async cancleTaskByStaff(_id: string, desc?: string): Promise<void> {
    try {
      await i.instance.post('/task/cancle/byStaff', {
        _id,
        desc,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getLastTask(): Promise<TaskLastCard | undefined> {
    try {
      const data = (await i.instance.get('/task/last')).data;
      if (!data) return undefined;
      return taskLastParse(data);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async getQuickTask(
    areaId: string,
    start: Moment,
    stop: Moment,
  ): Promise<QuickTask[]> {
    try {
      if (!areaId) [];
      const data: QuickTaskAPI[] = (
        await i.instance.get('/task/quickTask', {
          params: {
            id: areaId,
            start: start.toISOString(),
            stop: stop.toISOString(),
          },
        })
      ).data;
      return data.map(e => ({ ...e, date: moment(e.date) }));
    } catch (err) {
      throw err;
    }
  }
}

export const taskAPI = new TaskClass();
