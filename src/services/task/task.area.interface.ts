import AreaBuildingType from 'Services/area/@types/area.building.type';
import { AreaBuilding } from 'Services/area/area.building.interfaces';
import { AreaInfo } from 'Store/reducers/areaForm/types';

export interface TaskArea extends AreaInfo {
  _id: string;
  name: string;
  label?: string;
  building?: AreaBuilding;
  type?: AreaBuildingType;
}
