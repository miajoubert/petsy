const GET_PRODUCTS = "product/GET_PRODUCTS";
const GET_PRODUCT = "products/GET_PRODUCT";
const ADD_PRODUCT = "products/ADD_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";
const EDIT_PRODUCT = "products/EDIT_PRODUCT";

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/products");
  console.log("%%%%%%%%%%%%%%", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(getProducts(data.products));
    return data.products;
  }
};

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      const newState = {};
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    default:
      return { ...state };
  }
};

// const initialState = {};

// const productsReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case GET_PRODUCTS:
//       newState = { ...state };
//       const entries = {};
//       action.products.forEach((product) => (entries[product.id] = product));
//       newState.entries = entries;
//       return newState;
//     default:
//       return state;
//   }
// };

export default productsReducer;
