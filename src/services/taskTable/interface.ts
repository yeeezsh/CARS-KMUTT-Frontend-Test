import { Moment } from 'moment';
import {
  TaskDetailRequestor,
  TaskStateType,
  TaskType,
} from 'Services/task/task.interface';

export interface TaskTable {
  _id: string;
  vid: string;
  requestor: TaskDetailRequestor[];
  area: {
    name: string;
    label: string;
  };
  createAt: Moment;
  type: TaskType;
  state: TaskStateType[];
}

export type TaskTableType = TaskTable[];
export type TaskTableTypeAPI = { data: TaskTable[]; count: number };
