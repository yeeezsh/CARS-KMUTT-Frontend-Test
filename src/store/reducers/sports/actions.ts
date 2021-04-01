import { Moment } from 'moment';
import Area from 'Services/area/@interfaces/area.available.interface';
import { areaSportService } from 'Services/area/area.sport/area.sport.service';
import { SportReducer } from '.';

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

  const areas = await areaSportService.getFields(areaId, dateSelected);

  const maxForward = areas
    .map(area => area.time.forward)
    .sort((a, b) => -(a - b))[0];

  const areasGroupId = Array.from(
    areas.reduce((acc, cur) => acc.add(cur.area.id), new Set()),
  ) as string[];
  const areasGroup = areasGroupId.map(el =>
    areas.find(f => f.area.id === el),
  );

  return dispatch({
    type: QUERY_AREA,
    areas,
    maxForward,
    areasGroup: areasGroup,
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
    getState: () => { SportReducers: SportReducer },
  ) => {
    const { areas } = getState().SportReducers;
    const interval =
      areas.find((e: { area: { id: string } }) => e.area.id === area.id)
        ?.time.interval || 60;
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
