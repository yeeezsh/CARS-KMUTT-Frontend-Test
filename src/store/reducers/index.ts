import { combineReducers } from 'redux';
import { SportReducers, SportPagesStore } from './sports';
import { UserStore, UserReducers } from './users';

export default combineReducers({
  SportReducers,
  UserReducers,
});

export interface RootReducers {
  SportReducers: SportPagesStore;
  UserReducers: UserStore;
}
