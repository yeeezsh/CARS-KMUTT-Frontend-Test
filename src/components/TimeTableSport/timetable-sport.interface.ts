import { Moment } from 'moment';

interface TimeNodeSport {
  value: Moment;
  type?: 'selecting' | 'disabled' | 'available';
}

export default TimeNodeSport;
