import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/user/UsersList';
import User from './components/user/User';
import Results from './components/Results';
import AllProducts from './components/ProductsPage/AllProducts';
import SingleProduct from './components/ProductsPage/ProductDetail';
import AddProduct from './components/ProductsPage/AddProduct';
import { authenticate } from './store/session';
import { findResults } from './store/results'

function App() {
  const [loaded, setLoaded] = useState(false);
  let term = ""
  if (localStorage.search) term = localStorage.search
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      await dispatch(findResults(term))
      setLoaded(true);
    })();
  }, [dispatch, term]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/products' exact={true}>
          <AllProducts />
        </Route>
        <Route path='/products/new' exact={true} >
          <AddProduct />
        </Route>
        <Route path='/products/:id' exact={true}>
          <SingleProduct />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='/results' exact={true} >
          <Results />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
