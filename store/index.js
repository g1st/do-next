import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import dovile, { initialState } from './reducers';

export const initializeStore = (state = initialState, persistedState) =>
  createStore(
    dovile,
    { ...state, ...persistedState },
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
