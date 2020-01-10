import { Moment } from 'moment';
import TimeNode from '../../components/TimeTable/timetable.interface';

interface Area {
  area: {
    id: string;
    label: string;
    required: number;
  };
  time: {
    start: Moment;
    stop: Moment;
    disabled?: TimeNode[];
    interval?: number;
  };
}

export default Area;
