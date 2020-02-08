import { Moment } from 'moment';
import Area from '../../../models/area/area.interface';
import { SET_DATE_SELECTED } from './actions';

interface SportPagesState {
  dateSelected: Moment | undefined;
  timeSelected: Moment | undefined;
  areaSelected: Area['area'] | undefined;
  maxForward: number;
  owner: string;
}

const initialState = {
  dateSelected: undefined,
  timeSelected: undefined,
  areaSelected: undefined,
  areas: undefined,
  maxForward: 0,
  owner: '',
};

export const SportReducers = (state: SportPagesState = initialState, action: { action: string } & any) => {
  switch (action.type) {
    case SET_DATE_SELECTED:
      return { ...state, dateSelected: action.dateSelected };
    default:
      return state;
  }
};
