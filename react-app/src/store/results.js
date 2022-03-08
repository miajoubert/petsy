const FIND_RESULTS = 'results/FIND'

const find = (results) => ({
    type: FIND_RESULTS,
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

const initialState = {}

const resultsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case FIND_RESULTS:
            newState = { ...state }
            action.results.forEach(result => newState[result.id] = result)
            return newState
        default:
            return state;
    }
}

export default resultsReducer;
