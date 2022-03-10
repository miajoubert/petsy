const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const SUBTRACT_FROM_CART = 'cart/SUBTRACT_FROM_CART';
const REFRESH_CART = 'cart/REFRESH_CART';
const UPDATE_COUNT = 'cart/UPDATE_COUNT';

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
    return {
        type: REFRESH_CART,
        cart
    }
}

export const updateCount = (itemId, count) => {
    if (count < 1) return removeFromCart(itemId);
    return {
        type: UPDATE_COUNT,
        itemId,
        count
    };
};


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
        case REMOVE_FROM_CART:
            newState = { ...state }
            delete newState[action.productId]
            return newState;
        case SUBTRACT_FROM_CART:
            newState = { ...state }
            if (newState[action.product.id].count > 1) {
                newState[action.product.id].count--
            } else {
                delete newState[action.product.id]
            }
            return newState;
        case REFRESH_CART:
            newState = { ...state }

            return newState;
        default:
            return state;
    }
}
