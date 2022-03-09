import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginModal';
import SignupFormModal from './auth/SignupModal';
import SearchBar from './SearchBar';
import Cart from './Cart/Cart';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='nav-session-links'>
        <div>
          <NavLink to='/profile' exact={true}>
            Profile
          </NavLink>
          <button>
            <i className="fas fa-shopping-cart"></i>
          </button>
          <LogoutButton />
        </div>
      </li>
    )
  } else {
    sessionLinks = (
      <li className='nav-session-links'>
        <div>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </li>
    )
  }

  return (
    <nav>
      <ul className='nav-top'>
        <li className='nav-home'>
          <div>
            <NavLink to='/' exact={true} className='nav-logo'>
              Petsy
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
