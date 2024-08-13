// import { createStore } from 'redux';
// import rootReducer from './reducers';

// const store = createStore(rootReducer);

// export default store;

import { createStore } from 'redux';
import rootReducer from './reducers'; // Import the root reducer

const store = createStore(
  rootReducer,
  // Add Redux DevTools Extension for easier debugging
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
