import { Moment } from 'moment';

interface TimeSlotInherit {
  start: Date | Moment;
  stop: Date | Moment;
  allDay?: boolean;
}
export interface TimeSlot extends TimeSlotInherit {
  start: Moment;
  stop: Moment;
  allDay?: boolean;
}

export interface TimeNodeServerAPI extends TimeSlotInherit {
  start: Date;
  stop: Date;
  allDay: boolean;
}
