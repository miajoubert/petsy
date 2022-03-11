import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import CartItem from "./CartItem";
import { submitOrder } from "../../store/orders";
import { resetCart } from "../../store/cart";
import './Cart.css';

const Cart = () => {
    let cart = useSelector(state => state.cart);
    const products = useSelector(state => state.productsReducer)
    const dispatch = useDispatch();
    const history = useHistory();

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

        let order_number = Date.now();

        Object.values(cart)
            .map(item => {
                const payload = {
                    order_number,
                    product_id: item.id,
                    quantity: item.count
                }

                dispatch(submitOrder(payload))
            });

        dispatch(resetCart());
        localStorage.removeItem('cart');
        history.push('/products');
    }

    let subtotal = parseInt(0);
    cartItems.map(item => parseFloat(subtotal += parseFloat(item.price * item.count)).toFixed(2))

    return (
        <div className='cart'>
            <ul>
                {cartItems.map(item => <CartItem key={item.id} item={item} />)}
            </ul>
            <hr />
            <div className='cart-totals'>
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
