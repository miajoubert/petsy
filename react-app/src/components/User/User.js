import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/orders';

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer);
  const ordersObj = useSelector(state => state.orders);
  const ordersArr = Object.values(ordersObj);

  let orders = {}
  ordersArr.map(order => {
    if (!orders[order.order_number]) {
      orders[order.order_number] = [order]
    } else if (orders[order.order_number]) {
      orders[order.order_number].push(order)
    }
  })

  let myOrders = Object.values(orders)
  console.log('THIS IS MY ORDERS AFTER REORG', myOrders)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/profile`);
      const user = await response.json();
      setUser(user);
    })();
    dispatch(listOrders())
  }, []);

  if (!user) {
    return null;
  }

  let subtotal = parseInt(0);
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
        <div><b> Order History </b></div>
        <ul>
          {myOrders.map(orders => (
            <li key={orders[0]?.id}>
              <div>Order: {orders[0]?.order_number}</div>
              <div hidden={true}>{subtotal = parseInt(0)}</div>
              <div>{orders.map(order => (
                <>
                  <div>{products[order.product_id].name} -- {order.quantity}</div>
                  <div hidden={true}> {subtotal += parseFloat(products[order.product_id].price * order.quantity)} </div>
                </>
              ))}
                <div>Order Total: $ {parseFloat(subtotal * 1.055).toFixed(2)}</div>
                <div> - </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default User;
