const ADD_TO_CART = 'cart/ADD_TO_CART';
const SUBTRACT_FROM_CART = 'cart/SUBTRACT_FROM_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const UPDATE_COUNT = 'cart/UPDATE_COUNT';
const REFRESH_CART = 'cart/REFRESH_CART';

export const populateCart = (product) => {
    return {
        type: ADD_TO_CART,
        product
    }
}

export const subtractFromCart = (product) => {
    return {
        type: SUBTRACT_FROM_CART,
        product
    }
}

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        productId
    }
}

export const refreshCart = (cart) => {
    const cartItems = Object.values(cart)
        .map(item => {
            return {
                ...item,
                // ...products[item.id]
            }
        });
    console.log('11111111111111111', cartItems)
    return {
        type: REFRESH_CART,
        cart
    }
}

export const updateCount = (product, count) => {
    if (count < 1) return removeFromCart(product.id);
    return {
        type: UPDATE_COUNT,
        product,
        count
    };
};

export const refreshCart = (cart) => {
    let cartItems = [];
    console.log("MY CARTTTTTTTTTT", cart)
    if (cart) {
        cartItems = Object.entries(cart)
    }
    console.log(cartItems)
    return {
        type: REFRESH_CART,
        cartItems
    }
}

export default function cartReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
            newState = { ...state }
            if (newState[action.product.id]) {
                newState[action.product.id].count++
            } else {
                newState[action.product.id] = {
                    ...action.product,
                    id: action.product.id,
                    count: 1
                }
            }
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case SUBTRACT_FROM_CART:
            newState = { ...state }
            if (newState[action.product.id].count > 1) {
                newState[action.product.id].count--
            } else {
                delete newState[action.product.id]
            }
            return newState;
        case REMOVE_FROM_CART:
            newState = { ...state }
            delete newState[action.productId]
            return newState;
        case UPDATE_COUNT:
            newState = { ...state }
            newState[action.product.id].count = action.count
            return newState;
        case REFRESH_CART:
            newState = { ...state }
            if (newState[action.cartItems?.id]) {
                newState[action.cartItems?.id].count++
            } else if (action.cartItems.id) {
                newState[action.cartItems?.id] = {
                    ...action.cartItems,
                    id: action.cartItems?.id,
                    count: 1
                }
            }
            return newState;
        default:
            return state;
    }
}
