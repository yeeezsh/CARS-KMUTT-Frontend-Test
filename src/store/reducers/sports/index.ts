import moment, { Moment } from 'moment';
import Area from '../../../models/area/area.interface';
import {
  SET_DATE_SELECTED,
  SET_TIME_SELECTED,
  SET_AREA_SELECTED,
  SET_AREAID_SELECTED,
  SET_OWNER,
  QUERY_AREA,
  SET_USERS,
} from './actions';
import TimeAreaReserveType from '../../../models/area/time.interface';

export interface SportPagesStore {
  dateSelected: Moment;
  timeSelected: Moment | undefined;
  areaSelected: Area['area'];
  maxForward: number;
  owner: string;
  areas: TimeAreaReserveType['areas'];
  areaId: string;
  users: string[];
  interval: number;
}

export const DEFAULT_SELECTED_AREA = {
  id: '',
  label: '',
  required: 0,
};

const initialState = {
  dateSelected: moment(),
  timeSelected: undefined,
  areaSelected: DEFAULT_SELECTED_AREA,
  areas: [],
  maxForward: 0,
  owner: '',
  areaId: '',
  users: [],
  interval: 0,
};

export const SportReducers = (state: SportPagesStore = initialState, action: any) => {
  switch (action.type) {
    case SET_DATE_SELECTED:
      return { ...state, ...action };
    case QUERY_AREA:
      return { ...state, ...action };
    case SET_TIME_SELECTED:
      return { ...state, timeSelected: action.timeSelected };
    case SET_AREA_SELECTED:
      return { ...state, areaSelected: action.areaSelected };
    case SET_AREAID_SELECTED:
      return { ...state, areaId: action.areaId };
    case SET_OWNER:
      return { ...state, owner: action.owner };
    case SET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};
