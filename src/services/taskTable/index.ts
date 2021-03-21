import moment from 'moment';
import adapter from 'Services/adapter';
import { TaskStateType } from 'Services/task/task.interface';
import {
  // TaskTableType,
  TaskTable as TaskTableInterface,
  TaskTableTypeAPI,
} from './interface';
export type TaskTableQueryType = TaskStateType | 'all';
class TaskTable {
  async getTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
    queryType?: TaskTableQueryType,
  ): Promise<TaskTableTypeAPI> {
    const res = await adapter.instance.get(`/task/staff/${queryType}`, {
      params: {
        current,
        size,
        orderCol,
        order,
      },
    });

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
    return this.getTask(
      current,
      size,
      orderCol,
      order,
      TaskStateType.reject,
    );
  }
  async getAcceptTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(
      current,
      size,
      orderCol,
      order,
      TaskStateType.accept,
    );
  }

  async getForwardTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(
      current,
      size,
      orderCol,
      order,
      TaskStateType.forward,
    );
  }
  async getWaitTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(
      current,
      size,
      orderCol,
      order,
      TaskStateType.wait,
    );
  }
  async getDropTask(
    current: number,
    size: number,
    orderCol?: string,
    order?: 1 | -1,
  ) {
    return this.getTask(
      current,
      size,
      orderCol,
      order,
      TaskStateType.drop,
    );
  }
}

export const taskTable = new TaskTable();
