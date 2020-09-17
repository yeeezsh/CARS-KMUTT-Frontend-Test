import AreaBuildingType from '../@types/area.building.type';

interface ReserveAPI {
  interval: number | -1 | 60;
  max: number;
  start?: Date;
  stop?: Date;
  allDay: boolean;
  week: string | '1-7' | '1,2,3';
}

export interface AreaSportResponseAPI {
  _id?: string;
  name?: string;
  label?: string;
  building?: string;
  required?: {
    form?: string;
    staff?: string[];
    requestor: number;
  };
  type?: AreaBuildingType;
  disabled?: string[];
  forward?: number;
  reserve?: ReserveAPI[];
  createAt?: Date;
  updateAt?: Date;
}
