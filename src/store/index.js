import { createStore, combineReducers, compose } from 'redux';
import heroes from '../reducers';
import filters from '../reducers';

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDespatch = store.dispatch;
    store.dispatch = action => {
        if (typeof action === 'string') {
            return oldDespatch({
                type: action
            })
        }
        return oldDespatch(action);
    }
    return store;
}

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;