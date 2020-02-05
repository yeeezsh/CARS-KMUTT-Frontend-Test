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
  reserve: TimeSlot[];
  state: Array<'wait' | 'approve' | 'reject' | 'accept' | 'drop'>;
  area: Area;
  desc?: ReserveStateDesc;

  cancle: boolean;
  createAt: Moment;
  updateAt: Moment;
}
