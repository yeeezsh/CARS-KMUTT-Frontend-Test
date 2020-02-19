import { Moment } from 'moment';
import i from 'Models/axios.interface';
import { TaskTableType } from './interface';

class TaskTable {
  async getTask(
    offset?: Moment,
    limit?: Moment,
    taskType?: 'all' | 'wait' | 'reject' | 'accept' | 'drop',
  ): Promise<TaskTableType> {
    const res = await i.instance.get(`/task/manage/${taskType}`, {
      params: {
        offset: offset?.toISOString(),
        limit: limit?.toISOString(),
      },
    });
    return res.data;
  }

  async getAllTask(offset?: Moment, limit?: Moment) {
    return this.getTask(offset, limit, 'all');
  }
  async getRejectTask(offset?: Moment, limit?: Moment) {
    return this.getTask(offset, limit, 'reject');
  }
  async getAcceptTask(offset?: Moment, limit?: Moment) {
    return this.getTask(offset, limit, 'accept');
  }
  async getWaitTask(offset?: Moment, limit?: Moment) {
    return this.getTask(offset, limit, 'wait');
  }
  async getDropTask(offset?: Moment, limit?: Moment) {
    return this.getTask(offset, limit, 'drop');
  }
}

export const taskTable = new TaskTable();
