const GET_REVIEWS = "reviews/GET_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const getAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews");
  if (response.ok) {
    const data = await response.json();
    dispatch(getReviews(data.reviews));
    return data.reviews;
  }
};

const reviewsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
