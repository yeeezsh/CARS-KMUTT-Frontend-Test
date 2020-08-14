import TimeNode from 'Components/TimeTable/timetable.interface';
import { Moment } from 'moment';

interface Area {
  area: {
    id: string | any;
    label: string | undefined;
    required: number;
  };
  time: {
    start: Moment;
    stop: Moment;
    disabled?: TimeNode[];
    interval?: number;
    week: string;
    forward: number;
  };
}

export interface AreaAvailableAPI {
  _id: string;
  name: string;
  label: string;
  building: {
    _id: string;
    name: string;
    label: string;
  };
  disabled: TimeNode[];
  date: Moment;
}

export default Area;
