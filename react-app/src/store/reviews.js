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

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
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

export const addAReview = (reviewDetails) => async (dispatch) => {
  console.log("111111111", reviewDetails);
  const response = await fetch("/api/reviews/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewDetails),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("2222222222", data);
    dispatch(addReview(data));
    return data;
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
    case ADD_REVIEW:
      newState = { ...state };
      console.log('55555555', action)
      newState[action.review.id] = action.review;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
