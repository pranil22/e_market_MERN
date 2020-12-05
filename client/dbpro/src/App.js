import './App.css';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import Home from './Components/HomeComponent';
import Cart from './Components/CartComponent';
import Sign from './Components/SignComponent';
import Login from './Components/LogComponent';
import Header from './Components/HeaderComponent';
import AddProduct from './Components/AddProduct';
import Product from './Components/Product';
import SearchComponent from './Components/SearchComponent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_USERS } from './actionTypes/users';
import OrderComponent from './Components/OrderComponent';
function App() {

  const dispatch = useDispatch();

  const fetchUsers = () => {
    fetch('/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      dispatch({
        type: FETCH_USERS,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err)
    });
}

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div>
          <Router>
          <Header/>
          <div>
            
            <Switch>
              <Route exact path='/home' component={Home}></Route>
              <Route path='/cart/:id?' component={Cart}></Route>
              <Route exact path='/sign-up' component={Sign}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/add-product' component={AddProduct}></Route>
              <Route exact path='/search' component={ SearchComponent }></Route>
              <Route exact path='/orders' component={ OrderComponent }></Route>
              <Route exact path='/product/:id'component={ Product }></Route>
              <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            </Switch>
        </div>
        </Router>
    </div>
    

  );
}

export default App;
