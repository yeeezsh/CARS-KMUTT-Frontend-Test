import { Moment } from 'moment';
import Area from '../../../models/area/area.interface';
import { sport } from '../../../models/area/sport';
import { SportPagesStore } from '.';

export const SET_DATE_SELECTED = 'SET_DATE_SELECTED';
export const SET_TIME_SELECTED = 'SET_TIME_SELECTED';
export const SET_AREA_SELECTED = 'SET_AREA_SELECTED';
export const SET_AREAID_SELECTED = 'SET_AREAID_SELECTED';
export const SET_OWNER = 'SET_OWNER';
export const QUERY_AREA = 'QUERY_AREA';
export const SET_USERS = 'SET_USERS';
export const RESET_STATE = 'RESET_STATE';

export const resetState = () => ({ type: RESET_STATE });

export const queryArea = () => async (
  dispatch: any,
  getState: () => {
    (): any;
    new (): any;
    SportReducers: { areaId: any; dateSelected: any };
  },
) => {
  const { areaId, dateSelected } = getState().SportReducers;

  const areas = await sport.getFields(areaId, dateSelected);
  const maxForward = areas.reduce(
    (
      prev: { time: { forward: number } },
      cur: { time: { forward: number } },
    ) => (prev.time.forward > cur.time.forward ? prev : cur),
  ).time.forward;

  return dispatch({
    type: QUERY_AREA,
    areas,
    maxForward,
  });
};

export const setDateSelected = (date: Moment) => {
  return (
    dispatch: any,
    // getState: () => { SportReducers: SportPagesStore },
  ) => {
    dispatch({
      type: SET_DATE_SELECTED,
      dateSelected: date,
    });
  };
};

export const setTimeSelected = (time: Moment) => ({
  type: SET_TIME_SELECTED,
  timeSelected: time,
});

export const setAreaSelected = (area: Area['area']) => {
  return (
    dispatch: any,
    getState: () => { SportReducers: SportPagesStore },
  ) => {
    const { areas } = getState().SportReducers;
    const interval =
      areas.find(e => e.area.id === area.id)?.time.interval || 60;
    dispatch({
      type: SET_AREA_SELECTED,
      areaSelected: area,
      interval,
    });
  };
};

export const setOwner = (ownerId: string) => ({
  type: SET_OWNER,
  owner: ownerId,
});

export const setAreaId = (id: string) => ({
  type: SET_AREAID_SELECTED,
  areaId: id,
});

export const setUsers = (users: string[]) => ({
  type: SET_USERS,
  users,
});
