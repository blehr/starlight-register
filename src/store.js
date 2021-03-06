/* globals window */

import { compose, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import rootReducers from './reducers/index';
import * as actions from './actions';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};


const storeConfig = () => {
  const applyMiddlewares = applyMiddleware(
  reduxPromise,
    reduxThunk,
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStoreWithMiddleware(createStore)(
      rootReducers,
  );
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch(actions.verifyAuth());

  return store;
};

export default storeConfig;
