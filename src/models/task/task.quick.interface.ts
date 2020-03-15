import { Moment } from 'moment';

interface QuickTaskParent {
  _id: string;
  key: string;
  username: string;
  state: string;
  date: Moment | Date;
}

export interface QuickTask extends QuickTaskParent {
  date: Moment;
}
export interface QuickTaskAPI extends QuickTaskParent {
  date: Date;
}
