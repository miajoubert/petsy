import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateCart, subtractFromCart, removeFromCart } from "../../store/cart";

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const inputRef = useRef()
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
