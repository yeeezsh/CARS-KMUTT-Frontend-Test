import { Moment } from 'moment';
import TimeNode from '../../components/TimeTable/timetable.interface';

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

export default Area;
