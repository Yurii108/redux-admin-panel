import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'heroes/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request("https://6304aa4694b8c58fd7225d37.mockapi.io/filters")
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (bilder) => {
        bilder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = filterSlice;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export default reducer;
export const {
    filterChanged
} = actions;