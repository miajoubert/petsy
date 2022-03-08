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

const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  }
}

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/products");
  if (response.ok) {
    const data = await response.json();
    dispatch(getProducts(data.products));
    return data.products;
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  const response = await fetch(`/products/${id}`)
  if (response.ok) {
    const product = await response.json()
    dispatch(getProduct(product))
    return product
  }
}


const productsReducer = (state = {}, action) => {

  switch (action.type) {
    case GET_PRODUCTS:
      const newState = {}
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    case GET_PRODUCT:
      const singleState = { ...state }
      singleState[action.product.id] = action.product
      return singleState
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
