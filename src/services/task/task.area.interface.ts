import { AreaBuilding } from 'Services/area/area.building.interfaces';
export interface TaskArea {
  _id: string;
  name: string;
  label?: string;
  building?: AreaBuilding;
  type?: string | any;
}
