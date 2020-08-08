export type BuildingType = 'sport' | 'area' | 'meeting';

export interface BuildingTableAPI {
  _id: string;
  key: string;
  name: string;
  label: string;
  type: BuildingType;
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
  type: BuildingType;
}
