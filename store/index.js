import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './reducers';
import dovile from './reducers';

export const initializeStore = (state = initialState) =>
  createStore(
    dovile,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
