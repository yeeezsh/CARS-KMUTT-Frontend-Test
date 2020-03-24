import { combineReducers } from 'redux';
import { SportReducers, SportPagesStore } from './sports';
import { UserStore, UserReducers } from './users';
import { AreaFormState } from 'Store/reducers/areaForm/types';
import { AreaFormReducers } from 'Store/reducers/areaForm';

export default combineReducers({
  SportReducers,
  UserReducers,
  AreaFormReducers,
});

export interface RootReducers {
  SportReducers: SportPagesStore;
  UserReducers: UserStore;
  AreaFormReducers: AreaFormState;
}
