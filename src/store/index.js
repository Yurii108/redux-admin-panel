import { createStore } from 'redux';
import { combineReducers } from 'redux';
import heroes from '../reducers';
import filters from '../reducers';

const store = createStore(combineReducers({heroes, filters}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;