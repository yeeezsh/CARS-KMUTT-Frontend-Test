import { combineReducers } from 'redux';
import { SportReducers, SportPagesStore } from './sports';

export default combineReducers({
  SportReducers,
});

export interface RootReducers {
  SportReducers: SportPagesStore;
}
