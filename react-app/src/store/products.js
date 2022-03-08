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
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  }
}

const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/products");
  if (response.ok) {
    const data = await response.json();
    dispatch(getProducts(data.products));
    return data.products;
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  const response = await fetch(`/products/${id}`);
  if (response.ok) {
    const product = await response.json();
    dispatch(getProduct(product));
    return product;
  }
};

export const addAProduct = (product) => async (dispatch) => {
  const response = await fetch('/products/new', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  console.log('1111111111111', response)
  if(response.ok) {
    const product = await response.json()
    console.log('222222222', product)
    dispatch(addProduct(product))
    return product
  }
}

export const deleteSingleProduct = (id) => async (dispatch) => {
  const response = await fetch(`/products/delete/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(deleteProduct(id));
    return response;
  }
};

const productsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PRODUCTS:
      newState = { ...state };
      action.products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    case GET_PRODUCT:
      newState = { ...state };
      newState[action.product.id] = action.product;
      return newState;
    case ADD_PRODUCT:
      newState = { ...state }
      newState[action.product.id] = action.product
      return newState
    case DELETE_PRODUCT:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default productsReducer;
