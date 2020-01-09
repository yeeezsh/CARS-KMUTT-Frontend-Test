import { Moment } from 'moment';
import TimeNode from '../../components/TimeTable/timetable.interface';

interface Area {
  area: {
    id: string;
    label: string;
  };
  time: {
    start: Moment;
    stop: Moment;
    disabled?: TimeNode[];
  };
}

export default Area;
