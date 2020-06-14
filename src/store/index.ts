import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const DEBUGMODE = process.env.NODE_ENV === 'development';

export default function configureStore() {
  const middleware: any = [thunk];
  if (DEBUGMODE) {
    const logger = createLogger();
    middleware.push(logger);
  }

  return createStore(rootReducer, applyMiddleware(...middleware));
}
