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
    dispatch(find(results.products))
    return results.products
}

const resultsReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_RESULTS:
            let newState = {}
            action.results.forEach(result => newState[result.id] = result)
            console.log("THIS IS MY NEW STATE!!!!!!!!!", newState)
            return newState
        default:
            return state;
    }
}

export default resultsReducer;
