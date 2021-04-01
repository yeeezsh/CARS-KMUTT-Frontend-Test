import moment, { Moment } from 'moment';
import Area from 'Services/area/@interfaces/area.available.interface';
import {
  QUERY_AREA,
  RESET_STATE,
  SET_AREAID_SELECTED,
  SET_AREA_SELECTED,
  SET_DATE_SELECTED,
  SET_OWNER,
  SET_TIME_SELECTED,
  SET_USERS,
} from './actions';

export interface SportReducer {
  dateSelected: Moment;
  timeSelected: Moment | undefined;
  areaSelected: Area['area'];
  maxForward: number;
  owner: string;
  areas: Area[];
  areasGroup: Area[];
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
  areasGroup: [],
  areas: [],
  maxForward: 0,
  owner: '',
  areaId: '',
  users: [],
  interval: 0,
};

export const SportReducers = (
  state: SportReducer = initialState,
  action: any,
): SportReducer => {
  switch (action.type) {
    case SET_TIME_SELECTED:
      return { ...state, timeSelected: action.timeSelected };
    case SET_DATE_SELECTED:
      return { ...state, ...action };
    case QUERY_AREA:
      return {
        ...state,
        areas: action.areas,
        areasGroup: action.areasGroup,
        maxForward: action.maxForward,
      };
    case SET_AREA_SELECTED:
      return {
        ...state,
        areaSelected: action.areaSelected,
        interval: action.interval,
      };
    case SET_AREAID_SELECTED:
      return { ...state, areaId: action.areaId };
    case SET_OWNER:
      return { ...state, owner: action.owner, users: [action.owner] };
    case SET_USERS:
      return { ...state, users: action.users };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
