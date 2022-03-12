import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginModal';
import SignupFormModal from './auth/SignupModal';
import SearchBar from './SearchBar';
import Cart from './Cart/Cart';
import './NavBar.css';

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart)

  let cartCount = 0;
  Object.values(cart)
    .map(product => (
      cartCount += product.count
    ))


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='nav-session-links'>
        <div>
          <NavLink className='profile-btn' to='/profile' exact={true}>
            Profile
          </NavLink>
          <button className='shopping-cart-btn' type="button" onClick={() => setShowCart(!showCart)}>
            <i className="fas fa-shopping-cart"></i>
          </button>
          <div style={showCart ? { transform: 'translateX(-100%)' } : {}} className="sidebar">
            <div className='sidebar-header'>
              <button className="arrow-button" onClick={() => setShowCart(false)}>
                <i className="fas fa-arrow-right"></i>
              </button>
              <div
                className='item-count'
                hidden={!(cartCount > 1)}
              >
                {cartCount} items in your shopping cart
              </div>
              <div
                className='item-count'
                hidden={!(cartCount === 1)}
              > {cartCount} item in your shopping cart
              </div>
              <div
                className='item-count'
                hidden={!(cartCount === 0)}
              > {cartCount} items in your shopping cart
              </div>
            </div>
            <Cart showCart={() => setShowCart()} />
          </div>
          <LogoutButton />
        </div>
      </li>
    )
  } else {
    sessionLinks = (
      <li className='nav-session-links'>
        <div className='login-signup'>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </li>
    )
  }

  return (
    <nav className='nav-container'>
      <ul className='nav-top'>
        <li className='nav-home'>
          <div>
            <NavLink to='/' exact={true} className='nav-logo'>
              <div >
                Petsy
              </div>
            </NavLink>
          </div>
        </li>
        <li className='nav-search'>
          <SearchBar />
        </li>
        {sessionLinks}
      </ul>
      <ul className='nav-bottom'>
        <li>
          <NavLink to='/products' exact={true} activeClassName='active'>All Products</NavLink>
        </li>
        <li>
          <NavLink to='/categories/1' exact={true} activeClassName='active'>Dog Food</NavLink>
        </li>
        <li>
          <NavLink to='/categories/2' exact={true} activeClassName='active'>Dog Toys</NavLink>
        </li>
        <li>
          <NavLink to='/categories/3' exact={true} activeClassName='active'>Cat Food</NavLink>
        </li>
        <li>
          <NavLink to='/categories/4' exact={true} activeClassName='active'>Cat Toys</NavLink>
        </li>
        <li>
          <NavLink to='/categories/5' exact={true} activeClassName='active'>Cat Litter</NavLink>
        </li>
        <li>
          <NavLink to='/categories/6' exact={true} activeClassName='active'>Bowls & Feeders</NavLink>
        </li>
        <li>
          <NavLink to='/categories/7' exact={true} activeClassName='active'>Grooming</NavLink>
        </li>
        <li>
          <NavLink to='/categories/8' exact={true} activeClassName='active'>Clothing & Accessories</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
