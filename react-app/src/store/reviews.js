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

const deleteReview = (id) => {
  console.log('1111111111'. id)
  return {
    type: DELETE_REVIEW,
    id,
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
  const response = await fetch("/api/reviews/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewDetails),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
    return data;
  }
};

export const deleteAReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(deleteReview(id));
    return response;
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
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
