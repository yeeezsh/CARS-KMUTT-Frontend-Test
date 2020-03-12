import { Moment } from 'moment';
import { ReserveStateDesc } from '../reserve/interface';

interface TimeSlot {
  start?: Moment;
  stop?: Moment;
  allDay?: boolean;
}

interface Area {
  _id: string;
  name: string;
  label?: string;
  building?: string;
  type?: string;
}

export interface Task {
  _id: string;
  reserve: TimeSlot[];
  state: Array<
    'wait' | 'approve' | 'reject' | 'accept' | 'drop' | 'requested'
  >;
  area: Area;
  desc?: ReserveStateDesc;

  cancle: boolean;
  createAt: Moment | Date;
  updateAt: Moment | Date;
}

export interface TaskLastCard extends Task {
  owner: string;
  createAt: Moment;
  updateAt: Moment;
}
export interface TaskLastCardAPI extends Task {
  owner: string;
  createAt: Date;
  updateAt: Date;
}

export interface TaskDetailRequestor {
  username: string;
  confirm: boolean;
}

export interface TaskDetailAPI extends Task {
  staff: [];
  requestor: TaskDetailRequestor[];
  createAt: Date;
  updateAt: Date;
}

export interface TaskDetail extends Task {
  staff: [];
  requestor: TaskDetailRequestor[];
  createAt: Moment;
  updateAt: Moment;
}

export type TaskDetailType = TaskDetail;
