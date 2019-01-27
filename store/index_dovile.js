import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './reducers/index_dovile';
import dovile from './reducers/index_dovile';

// const store = createStore(dovile, initialState);

// export default store;

export function initializeStore(state = initialState) {
  return createStore(
    dovile,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
