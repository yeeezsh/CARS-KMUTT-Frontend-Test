import { AreaBuilding } from 'Models/area/area.building.interfaces';
import { Moment } from 'moment';
import { TaskArea } from './task.area.interface';
import { TaskStaffRequested } from './task.staff.requested.interface';
import { TimeSlot } from './timeslot.interface';

export interface TaskDesc {
  msg: string;
  createAt: Date | Moment;
}

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
  desc?: TaskDesc[];
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
  desc?: { msg: string; createAt: Date }[];
  createAt: Date;
  updateAt: Date;
}

export interface TaskDetail extends Task {
  staff: TaskStaffRequested[];
  requestor: TaskDetailRequestor[];
  building: AreaBuilding;
  desc: { msg: string; createAt: Moment }[];
  createAt: Moment;
  updateAt: Moment;
}

export type TaskDetailType = TaskDetail;
