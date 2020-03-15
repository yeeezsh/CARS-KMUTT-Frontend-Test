import { Moment } from 'moment';

export interface TimeSlot {
  start: Date | Moment;
  stop: Date | Moment;
  allDay?: boolean;
}
