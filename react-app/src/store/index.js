import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import resultsReducer from './results'
import productsReducer from './products';
import reviewsReducer from './reviews';
import cartReducer from './cart';
import categoriesReducer from './category';

const rootReducer = combineReducers({
  session,
  results: resultsReducer,
  productsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  reviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
