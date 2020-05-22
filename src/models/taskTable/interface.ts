import { Moment } from 'moment';
import { TaskDetailRequestor } from 'Models/task/task.interface';

export interface TaskTable {
  _id: string;
  requestor: TaskDetailRequestor[];
  area: {
    name: string;
    label: string;
  };
  createAt: Moment;
  type: string;
  state: string[];
}

export type TaskTableType = TaskTable[];
export type TaskTableTypeAPI = { data: TaskTable[]; count: number };
