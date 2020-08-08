import adapter from '../../adapter.interface';
import { TaskSport } from './sport.interface';

class TaskSportClass {
  async create(data: TaskSport) {
    try {
      await adapter.instance.post('/task/sport', data);
      return;
    } catch (err) {
      throw err;
    }
  }
}

export const taskSport = new TaskSportClass();
