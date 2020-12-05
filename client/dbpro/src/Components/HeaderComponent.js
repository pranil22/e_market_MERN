import React, { useState } from 'react';
import '../assets/css/index.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_FETCHED_FAILED, SEARCH_FETCHED_LOADING, SEARCH_FETCHED_SUCCESS } from '../actionTypes/product';
import { USER_LOGOUT } from '../actionTypes/user';

function Header(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const { user } = useSelector(state => state.user);
    const handleSearch = () => {
      dispatch({
        type: SEARCH_FETCHED_LOADING
      });

      history.push('/search');

      fetch('/search/'+query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuery("");
        dispatch({
          type: SEARCH_FETCHED_SUCCESS,
          payload: data
        })
        console.log(data);
      })
      .catch((err) => {
        dispatch({
          type: SEARCH_FETCHED_FAILED,
          payload: 'An unknown error occured'
        });
        console.log(err);
      })
    }
    
    return(
        <div>
            <div className="fixed">
        <div className="main center">
          <h1>E-Market</h1>
        </div>
        <nav className="m-0 p-0 navbar navbar-expand-sm back-ground main">
        <a href="#" className="navbar-brand"><span><i className="fab fa-pagelines fa-2x"></i></span></a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#xyz"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="xyz">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"><Link to="/home" className="nav-link">Home</Link></li>
                </ul>
                <ul className="navbar-nav">
                    <form className="form-inline">
                      <input type="text" 
                          className="input" 
                          placeholder="Search"
                          value={query}
                          onChange={(e) => { setQuery(e.target.value) }}
                        />
                        <button 
                          className="btn btn-sm" 
                          type="button"
                          onClick={ () => { handleSearch() }}
                          >Search
                        </button>
                    </form>
                    
                    {
                      user?
                      <>
                        <li className="nav-item"><Link to="/cart" className="nav-link">My Cart</Link></li>
                        <li className="nav-item"><Link to="/add-product" className="nav-link">Add Product</Link></li>
                        {
                          user.admin?
                          <li className="nav-item">
                            <Link to="/orders" className="nav-link">
                              Orders
                            </Link>
                          </li>:
                          null
                        }
                        
                        <li className="nav-item">
                        <a 
                          style={{ cursor: 'pointer' }}
                          className="nav-link" 
                          onClick={ () => { 
                            dispatch({
                              type: USER_LOGOUT
                            })

                            history.push('/login');

                          }}
                        >Logout</a>
                        </li>
                    </>:
                    <>
                      <li className="nav-item"><Link to="/sign-up" className="nav-link">Sign-Up</Link></li>
                      <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                    </>
                    }
                    
                </ul>
            </div>
        </nav>
      </div>
    </div>
    );
}


export default Header;