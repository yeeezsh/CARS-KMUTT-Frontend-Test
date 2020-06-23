import { Moment } from 'moment';
import { ReserveStateDesc } from '../reserve/interface';
import { TimeSlot } from './timeslot.interface';
import { AreaBuilding } from 'Models/area/area.building.interfaces';
import { TaskArea } from './task.area.interface';
import { TaskStaffRequested } from './task.staff.requested.interface';

export type TaskStateType =
  | 'wait'
  | 'approve'
  | 'reject'
  | 'accept'
  | 'drop'
  | 'requested'
  | 'forward';

export type TaskType =
  | 'common'
  | 'common-sport'
  | 'sport'
  | 'meeting-club'
  | 'meeting-room';
export interface Task {
  _id: string;
  reserve: TimeSlot[];
  state: TaskStateType[];
  area: TaskArea;
  desc?: ReserveStateDesc;
  forms?: any;
  type?: TaskType | string;

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
  building: AreaBuilding;
  createAt: Date;
  updateAt: Date;
}

export interface TaskDetail extends Task {
  staff: TaskStaffRequested[];
  requestor: TaskDetailRequestor[];
  building: AreaBuilding;
  createAt: Moment;
  updateAt: Moment;
}

export type TaskDetailType = TaskDetail;
