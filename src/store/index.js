import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filterSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (naxt) => (action) => {
    if (typeof action === 'string') {
        return naxt({
            type: action
        })
    }
    return naxt(action);
}

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

const store = configureStore({
    reducer: {
        filters,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;