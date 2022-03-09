import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.productsReducer)
    const dispatch = useDispatch();

    const cartItems = Object.values(cart);


    if (!cartItems.length) return (
        <div>
            No items in cart. Add products to continue.
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch()
    }

    return (
        <div>
            <ul>
                {cartItems.map(item => <div key={item.id} item={item}>{item.name}</div>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    )
}

export default Cart;
