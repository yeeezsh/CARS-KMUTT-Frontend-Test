import { AreaBuilding } from 'Services/area/@interfaces/area.building.interfaces';
import AreaBuildingType from 'Services/area/@types/area.building.type';
import { AreaInfo } from 'Store/reducers/areaForm/types';

export interface TaskArea extends AreaInfo {
  _id: string;
  name: string;
  label?: string;
  building?: AreaBuilding;
  type?: AreaBuildingType;
}
