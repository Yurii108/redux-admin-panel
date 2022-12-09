const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(elem => elem.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(elem => elem.element === action.payload)
            }
        case 'HEROES_ADD':
            const newAddHeroeList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newAddHeroeList,
                filteredHeroes: state.activeFilter === 'all' ?
                newAddHeroeList :
                newAddHeroeList.filter(elem => elem.element === state.activeFilter)
            }
        case 'HEROES_DELETE':
            const newHeroesList = state.heroes.filter(elem => elem.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroesList :
                    newHeroesList.filter(elem => elem.element === state.activeFilter),
            }
        default: return state
    }
}

export default reducer;