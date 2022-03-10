import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.productsReducer)
    const dispatch = useDispatch();

    const cartItems = Object.values(cart)
        .map(item => {
            return {
                ...item,
                ...products[item.id]
            }
        });

    if (!cartItems.length) return (
        <div>
            No items in cart. Add products to continue.
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch()
    }

    let subtotal = parseInt(0);
    cartItems.map(item => parseFloat(subtotal += parseFloat(item.price * item.count)).toFixed(2))

    return (
        <div>
            <ul>
                {cartItems.map(item => <CartItem key={item.id} item={item} />)}
            </ul>
            <hr />
            <div>
                <div> Subtotal: {parseFloat(subtotal).toFixed(2)} </div>
                <div> Tax (5.5%): {parseFloat(subtotal * .055).toFixed(2)} </div>
                <div> Total: {parseFloat(subtotal * 1.055).toFixed(2)} </div>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Submit Order</button>
                </form>
            </div>
        </div>
    )
}

export default Cart;
