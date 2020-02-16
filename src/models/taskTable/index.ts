import { Moment } from 'moment';
import i from 'Models/axios.interface';

class TaskTable {
  async getAllTask(offset?: Moment, limit?: Moment) {
    const res = await i.instance.get('/task/manage/all', {
      params: {
        offset: offset?.toISOString(),
        limit: limit?.toISOString(),
      },
    });
    return res.data;
  }
}

export const taskTable = new TaskTable();
