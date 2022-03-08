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
  const response = await "/products";
  if (response.ok) {
    const products = await response.json();
    dispatch(getProducts(products));
    return products;
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

export default productsReducer;
