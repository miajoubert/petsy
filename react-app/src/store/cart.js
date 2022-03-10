const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const SUBTRACT_FROM_CART = 'cart/SUBTRACT_FROM_CART';

export const populateCart = (productId) => {
    return {
        type: ADD_TO_CART,
        productId
    }
}

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        productId
    }
}

export const subtractFromCart = (productId) => {
    return {
        type: SUBTRACT_FROM_CART,
        productId
    }
}

export default function cartReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
            newState = { ...state }
            if (newState[action.productId]) {
                newState[action.productId].count++
            } else {
                newState[action.productId] = {
                    id: action.productId,
                    count: 1
                }
            }
            return newState;
        case REMOVE_FROM_CART:
            newState = { ...state }
            delete newState[action.productId]
            return newState;
        case SUBTRACT_FROM_CART:
            newState = { ...state }
            if (newState[action.productId] > 1) {
                newState[action.productId].count--
            } else {
                delete newState[action.productId]
            }
            return newState;
        default:
            return state;
    }
}
