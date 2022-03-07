
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <li>
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </div>
    )
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          {sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
