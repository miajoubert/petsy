const LIST_RESULTS = 'results/LIST'

const list = (results) => ({
    type: LIST_RESULTS,
    payload: results
})

export const listResults = () => async (dispatch) => {
    const res = await fetch('/results');

    const results = await res.json();

    dispatch(list(results))
}

const initialState = {}

const resultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_RESULTS:
            return { results: action.payload }
        default:
            return state;
    }
}

export default resultsReducer;
