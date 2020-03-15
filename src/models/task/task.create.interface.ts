import { TimeNodeServerAPI } from './timeslot.interface';

export interface CreateTaskByStaff {
  time: TimeNodeServerAPI[];
  area: string;
  owner: string;
  requestor: string[];
}
