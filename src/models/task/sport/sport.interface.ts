import { Moment } from 'moment';

export interface TimeSlot {
  start: Date | Moment;
  stop: Date | Moment;
  allDay?: boolean;
}

export interface TaskSport {
  time: TimeSlot[];
  requestor: string[];
  area: string;
  owner: string;
}
