import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

let intialState = null;

let store = createStore(
    rootReducer,
    intialState,
    applyMiddleware(thunkMiddleware)
);

export default store;
