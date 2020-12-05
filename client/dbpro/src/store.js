import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './Reducers/cartReducer';
import productReducer from './Reducers/productReducer';
import searchReducer from './Reducers/searchReducer';
import userReducer from './Reducers/userReducer';
import usersReducer from './Reducers/usersReducer';


console.log(JSON.parse(localStorage.getItem('cartItems')));
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const initialState = {cart: { cartItems }};

const reducers = combineReducers({
    products: productReducer,
    cart: cartReducer,
    search: searchReducer,
    user: userReducer,
    users: usersReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);


const store = createStore(reducers, initialState, enhancer);

export default store;