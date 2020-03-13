export type AreaBuildingType = 'sport' | 'area' | 'meeting';

export interface AreaTableAPI {
  _id: string;
  name: string;
  label: string;
  building: {
    name: string;
    label: string;
  };
  type: AreaBuildingType;
}
