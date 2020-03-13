import i from '../axios.interface';
import { TaskDetail, TaskLastCard } from './task.interface';
import taskDetailParse from './parser/task.detail.parse';
import taskLastParse from './parser/task.last.parse';

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
}

export const taskAPI = new TaskClass();
