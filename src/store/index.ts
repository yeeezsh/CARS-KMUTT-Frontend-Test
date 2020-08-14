import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const DEBUGMODE = process.env.NODE_ENV === 'development';

export default function configureStore() {
  const middleware: any = [thunk];
  if (DEBUGMODE) {
    const logger = createLogger();
    middleware.push(logger);
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
}
