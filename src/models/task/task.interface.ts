import { Moment } from 'moment';

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
  reserve: TimeSlot[];
  state: Array<'wait' | 'approve' | 'reject' | 'accept' | 'drop'>;
  area: Area;

  cancle: boolean;
  createAt: Moment;
  updateAt: Moment;
}
