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

export const findResults = (searchTerm) => async (dispatch) => {
    const res = await fetch('/results', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchTerm)
    });
    const results = await res.json();
    console.log('find results', results)
    dispatch(find(results.products))
    return results.products
}

export const listResults = () => async (dispatch) => {
    const res = await fetch('/results');
    console.log('list res', res)
    const results = await res.json();
    console.log('list results', results)
    dispatch(list(results.products))
    return results.products
}

const initialState = {}

const resultsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case FIND_RESULTS:
            newState = { ...state }
            action.results.forEach(result => newState[result.id] = result)
            return newState
        case LIST_RESULTS:
            newState = { ...state }
            console.log('list action.results', action.results)
            action.results.forEach(result => newState[result.id] = result)
            console.log('newState', newState)
            return newState
        default:
            return state;
    }
}

export default resultsReducer;
