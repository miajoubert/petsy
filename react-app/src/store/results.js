const LIST_RESULTS = 'results/LIST'

const list = (results) => ({
    type: LIST_RESULTS,
    results
})

export const listResults = () => async (dispatch) => {
    const res = await fetch('/results');

    const results = await res.json();
    console.log("MY THUNK RESULTS!!!!!!!!!!!!!!!")

    dispatch(list(results))
    return results
}

const initialState = {}

const resultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_RESULTS:
            const newState = { ...state }
            console.log("ACTION RESULTS", action.results)
            // action.results.forEach(result => results[result.id] = result)
            // newState.results = results
            return newState
        default:
            return state;
    }
}

export default resultsReducer;
