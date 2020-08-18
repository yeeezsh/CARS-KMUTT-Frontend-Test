import { combineReducers } from '@reduxjs/toolkit';
import { AreaFormReducers } from 'Store/reducers/areaForm';
import { SportReducers } from './sports';
import { UserReducers } from './users';

const rootReducer = combineReducers({
  SportReducers,
  UserReducers,
  AreaFormReducers,
});

export default rootReducer;

export type RootReducersType = ReturnType<typeof rootReducer>;
