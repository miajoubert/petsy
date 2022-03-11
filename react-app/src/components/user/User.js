import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/orders';

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer);
  const ordersObj = useSelector(state => state.orders);
  const orders = Object.values(ordersObj);

  console.log('products', products)

  console.log(orders)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/profile`);
      const user = await response.json();
      setUser(user);
    })();
    dispatch(listOrders())
  }, [dispatch]);

  if (!user) {
    return null;
  }

  // let subtotal = parseInt(0);
  // orders.map(order => console.log(parseFloat(subtotal += parseFloat(products[order.product_id].price * order.quantity).toFixed(2))))
  // // parseFloat(subtotal += parseFloat(products[order.product_id].price * order.quantity)).toFixed(2)

  return (
    <div>
      <ul>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div className='order-history-container'>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <div>{order.order_number}</div>
              <div>{products[order.product_id].name}</div>
              <div>{order.quantity}</div>
              {/* <div>{parseFloat(subtotal * 1.055).toFixed(2)}</div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default User;
