import { AreaBuilding } from './area.building.interfaces';
import { Moment } from 'moment';

export type AreaBuildingType = 'sport' | 'area' | 'meeting';
export interface AreaReseveAPI {
  interval: number;
  max: number;
  allDay: boolean;
  start: Moment;
  stop: Moment;
  week: string;
}

export interface AreaTableAPI {
  _id: string;
  key: string;
  name: string;
  label: string;
  building: {
    name: string;
    label: string;
  };
  type: AreaBuildingType;
}

export interface AreaAPI {
  _id: string;
  name: string;
  label?: string;
  building?: AreaBuilding;
  required?: {
    requestor: number;
  };
  forward: number;
  reserve: AreaReseveAPI[];
}
