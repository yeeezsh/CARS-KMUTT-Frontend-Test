import { Moment } from 'moment';
import AreaBuildingType from '../@types/area.building.type';
import { AreaBuilding } from './area.building.interfaces';

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

export interface AreaServiceResponseAPI {
  _id: string;
  name: string;
  label: string;
  building?: AreaBuilding;
  required?: {
    requestor: number;
  };
  type: AreaBuildingType;
  forward: number;
  reserve: AreaReseveAPI[];
}
