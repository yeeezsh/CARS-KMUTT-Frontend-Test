import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

// const store = createStore(asyncReducer, applyMiddleware(thunk));

// export default store;
export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
