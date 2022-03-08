const FIND_RESULTS = 'results/FIND'
const LIST_RESULTS = 'results/LIST'

const find = (results) => ({
    type: FIND_RESULTS,
    results
})

const list = (results) => ({
    type: LIST_RESULTS,
    results
})

export const findResults = () => async (dispatch) => {
    const res = await fetch('/results', {
        method: 'POST',
        body: ''
    });
    const results = await res.json();
    console.log('find results', results)
    dispatch(find(results))
    return results
}

export const listResults = () => async (dispatch) => {
    const res = await fetch('/results');
    const results = await res.json();
    console.log('list results', results)
    dispatch(list(results))
    return results
}

const initialState = {}

const resultsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case FIND_RESULTS:
            newState = { ...state }
            console.log('action.results', action.results)
            action.results.forEach(result => newState[result.id] = result)
            console.log('newState', newState)
            return newState
        case LIST_RESULTS:
            newState = { ...state }
            console.log('action.results', action.results)
            action.results.forEach(result => newState[result.id] = result)
            console.log('newState', newState)
            return newState
        default:
            return state;
    }
}

export default resultsReducer;
