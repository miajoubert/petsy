const LOAD_CATEGORIES = "categories/LOAD_CATEGORIES";

const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories,
  };
};

export const getCategories = () => async (dispatch) => {
  const res = await fetch("/api/categories");

  if (res.ok) {
    const categories = await res.json();
    dispatch(loadCategories(categories));
  }

  return res;
};

const categoriesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_CATEGORIES:
      newState = { ...state };
      action.categories.categories.forEach((category) => {
        newState[category.id] = category;
      });
      return newState;
    default:
      return state;
  }
};

export default categoriesReducer;
