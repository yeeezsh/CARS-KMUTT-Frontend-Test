import { TimeSlot } from '../timeslot.interface';

export interface TaskSport {
  time: TimeSlot[];
  requestor: string[];
  area: string;
  owner: string;
}
