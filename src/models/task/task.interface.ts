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
  createAt: Moment;
  updateAt: Moment;
}

export interface TaskLastCard extends Task {
  owner: string;
}

export interface TaskDetailRequestor {
  username: string;
  confirm: boolean;
}

export interface TaskDetail extends Task {
  staff: [];
  requestor: TaskDetailRequestor[];
}

export type TaskDetailType = TaskDetail;
