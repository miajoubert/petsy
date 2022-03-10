import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateCart, subtractFromCart, removeFromCart } from "../../store/cart";
import { updateCount } from "../../store/cart";

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const [count, setCount] = useState(item?.count)

    useEffect(() => {
        setCount(item?.count)
    }, [item?.count])

    return (
        <li>
            <div> {item?.name} </div>
            <div className="cart-item-functions">
                <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    onBlur={() => dispatch(updateCount(item, Number(count)))}
                    min={1}
                />
                <button
                    onClick={() => dispatch(populateCart(item))}
                > + </button>
                <button
                    onClick={() => dispatch(subtractFromCart(item))}
                > - </button>
                <button
                    onClick={() => dispatch(removeFromCart(item?.id))}
                > Remove </button>
            </div>
        </li>
    )

}

export default CartItem
