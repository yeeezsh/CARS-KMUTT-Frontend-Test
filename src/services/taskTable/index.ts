import i from 'Models/axios.interface';
import moment from 'moment';
import {
  // TaskTableType,
  TaskTable as TaskTableInterface,
  TaskTableTypeAPI,
} from './interface';

class TaskTable {
  async getTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
    taskType?: 'all' | 'wait' | 'reject' | 'accept' | 'drop' | 'forward',
  ): Promise<TaskTableTypeAPI> {
    const res = await i.instance.get(`/task/staff/${taskType}`, {
      params: {
        current,
        size,
        orderCol,
        order,
      },
    });

    console.log('task staff', res.data);
    return {
      data: res.data.data.map((e: TaskTableInterface) => ({
        ...e,
        createAt: moment(e.createAt),
      })),
      count: res.data.count,
    };
  }

  async getAllTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'all');
  }
  async getRejectTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'reject');
  }
  async getAcceptTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'accept');
  }

  async getForwardTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'forward');
  }
  async getWaitTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'wait');
  }
  async getDropTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(current, size, orderCol, order, 'drop');
  }
}

export const taskTable = new TaskTable();
