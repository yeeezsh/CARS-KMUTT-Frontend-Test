import { combineReducers } from 'redux';
import { SportReducers } from './sports';
import { UserReducers } from './users';
import { AreaFormReducers } from 'Store/reducers/areaForm';

const rootReducer = combineReducers({
  SportReducers,
  UserReducers,
  AreaFormReducers,
});

export default rootReducer;

export type RootReducersType = ReturnType<typeof rootReducer>;
