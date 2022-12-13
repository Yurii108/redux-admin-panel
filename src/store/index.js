import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import heroes from '../reducers';
import filters from '../reducers';

const stringMiddleware = () => (naxt) => (action) => {
    if (typeof action === 'string') {
        return naxt({
            type: action
        })
    }
    return naxt(action);
}

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;