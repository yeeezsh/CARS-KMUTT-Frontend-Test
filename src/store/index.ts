import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware: any[] = [thunk];
const DEBUGMODE = process.env.NODE_ENV === 'development';
if (DEBUGMODE) {
  const logger = createLogger();
  middleware.push(logger);
}
const store = configureStore({ reducer: rootReducer, middleware });
export default store;
