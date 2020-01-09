import { Moment } from 'moment';

interface TimeNode {
  value: Moment;
  type?: 'selecting' | 'disabled' | 'available';
}

export default TimeNode;
