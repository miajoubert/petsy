import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/orders';

import './Profile.css'

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

  return (
    <div className='order-history-main'>
      <ul className='user-info-container'>
        <div className='user-info-name'>
          Welcome back, {user.username}
        </div>
        {/* <button>Change Password</button> */}
      </ul>
      <div className='order-history-container'>
        <div><b> Review your order history: </b></div>
        <ul className='order-history-all-container'>
          <div className='order-tiles-container'>
            {myOrders.map(orders => (
              <>
                <div className='order-history-tile'>
                  <div className='tile-header'>
                    <div className='header-left'>
                      Purchased on {new Date(orders[0]?.created_at).toDateString()} at {new Date(orders[0]?.created_at).getHours()}:{new Date(orders[0]?.created_at).getMinutes()}
                    </div>
                    <div className='header-right'>
                      <b>#{orders[0]?.order_number}</b>
                    </div>
                  </div>
                  <div className='tile-body'></div>

                  <div className='order-history-details-container'>
                    <div hidden={false} key={orders[0]?.id}>
                      <div hidden={true}>{subtotal = parseInt(0)}</div>
                      <div>{orders.map(order => (
                        <>
                          <div className='product-in-list'>{products[order.product_id].name} -- <b>{order.quantity}</b></div>
                          <div hidden={true}> {subtotal += parseFloat(products[order.product_id].price * order.quantity)} </div>
                        </>
                      ))}
                        <div className='order-total'><b>Order Total: $ {parseFloat(subtotal * 1.055).toFixed(2)}</b></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
export default User;
