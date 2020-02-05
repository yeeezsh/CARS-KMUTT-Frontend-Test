import i from '../../axios.interface';
import { TaskSport } from './sport.interface';

class TaskSportClass {
  async create(data: TaskSport) {
    try {
      await i.instance.post('/task/sport', data);
      return;
    } catch (err) {
      throw err;
    }
  }
}

export const Mutate = new TaskSportClass();
