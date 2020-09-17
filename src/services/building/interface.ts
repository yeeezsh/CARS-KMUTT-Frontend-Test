import AreaBuildingType from 'Services/area/@types/area.building.type';

export interface BuildingTableAPI {
  _id: string;
  key: string;
  name: string;
  label: string;
  type: AreaBuildingType;
  areas: Array<{
    _id: string;
    name: string;
    label: string;
  }>;
}

export interface BuildingInfo {
  _id: string;
  name: string;
  label: string;
  type: AreaBuildingType;
}
