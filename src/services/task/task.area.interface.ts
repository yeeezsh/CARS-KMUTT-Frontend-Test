import { AreaBuilding } from 'Services/area/area.building.interfaces';
import { BuildingType } from 'Services/building/interface';
import { AreaInfo } from 'Store/reducers/areaForm/types';

export interface TaskArea extends AreaInfo {
  _id: string;
  name: string;
  label?: string;
  building?: AreaBuilding;
  type?: BuildingType;
}
