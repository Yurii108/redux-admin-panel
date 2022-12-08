const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
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
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            const newHeroesList = state.heroes.filter(elem => elem.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesList
            }
        case 'HEROES_ADD':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HEROES_FILTER':
            return {
                ...state,
                filters: action.payload
            }
        default: return state
    }
}

export default reducer;