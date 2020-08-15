import { Moment } from 'moment';
import { AreaBuilding } from 'Services/area/area.building.interfaces';
import { TaskArea } from './task.area.interface';
import { TaskStaffRequested } from './task.staff.requested.interface';
import { TimeSlot } from './timeslot.interface';

export interface TaskDesc {
  msg: string;
  createAt: Date | Moment;
}

export enum TaskStateType {
  wait = 'wait',
  approve = 'approve',
  reject = 'reject',
  accept = 'accept',
  drop = 'drop',
  requested = 'requested',
  forward = 'forward',
}

export enum TaskType {
  common = 'common',
  commonSport = 'common-sport',
  sport = 'sport',
  meetingClub = 'meeting-club',
  meetingRoom = 'meeting-room',
}

export interface Task {
  _id: string;
  reserve: TimeSlot[];
  state: TaskStateType[];
  area: TaskArea;
  desc?: TaskDesc[] | string; // string for last card api only
  forms?: any;
  type?: TaskType;

  cancle: boolean;
  createAt: Moment | Date;
  updateAt: Moment | Date;
}

export interface TaskLastCard extends Task {
  owner: string;
  desc: string;
  createAt: Moment;
  updateAt: Moment;
}
export interface TaskLastCardAPI extends Task {
  owner: string;
  createAt: Date;
  desc: undefined;
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
