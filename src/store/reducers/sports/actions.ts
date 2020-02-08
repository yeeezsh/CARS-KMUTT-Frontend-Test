import { Moment } from 'moment';

export const SET_DATE_SELECTED = 'SET_DATE_SELECTED';

export const setDateSelected = (date: Moment) => {
  return {
    type: SET_DATE_SELECTED,
    dateSelected: date,
  };
};
