import React, { useEffect } from 'react';
import veg1 from '../assets/images/veg1.jpg';
import '../assets/css/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_FETCHED_FAILED, PRODUCT_FETCHED_LOADING, PRODUCT_FETCHED_SUCCESS } from '../actionTypes/product';
import Spinner from './Spinner';
import { Link, useHistory } from 'react-router-dom';
function Home(params) {

    const dispatch = useDispatch();
    const history = useHistory();

    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {

      dispatch({ type: PRODUCT_FETCHED_LOADING });

      fetch('/products', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        if(data.error) {
          dispatch({
            type: PRODUCT_FETCHED_FAILED,
            payload: data.error
          })
        }
        else {
          dispatch({
            type: PRODUCT_FETCHED_SUCCESS,
            payload: data.products
          })
        }
        console.log(data);
      })
      .catch((err) => {
        dispatch({
          type: PRODUCT_FETCHED_FAILED,
          payload: "Something went wrong"
        })
      });

    }, []);
    
    const renderItems = () => {
      if(products[0]) {
        const productsItems = products.map((product) => {
          return (
            <div 
              className="col-lg-3 col-md-4 col-sm-6 col-12"
              key={ product._id }
            >
              <Link to={`/product/${product._id}`}>
                  <div style={{ 
                        margin: '5px', 
                        border: "1px solid #52702b",
                        padding: "10px",
                        borderRadius: '5px',
                        backgroundColor: '#e0f8cc'
                      }}
                      className="product-item"
                      >
                    <div style={{ textAlign: "center" }}>
                      <img src={ product.productImage } alt="product" style={{ height: "200px" }}/>
                    </div>
                    <div><b>{ product.name }</b></div>
                    <div>
                      { product.description }
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <button 
                        className="btn btn-sm add-to-cart"
                        >
                        Add to Cart
                      </button>
                      <div style={{ marginTop: "5px" }}><b>&#x20B9;{ product.price }</b></div>
                    </div>
                  </div>
              </Link>
                        
            </div>
          )
        })

        return (
          <div className="row">
            { productsItems }
          </div>
        )
      }
      else {
        return <Spinner/>
      }
    }

    return(
        
        <div>
            <div>
            <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={veg1} alt="Los Angeles" width="100%" height="300"/>
                <div className="carousel-caption">
                  <div className="offer">
                      <h2>Buy Now</h2>
                      <div>Find Best Deals</div>
                  </div>
                </div>   
              </div>
           </div>
          </div>
    </div>
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5px' }}>
        <h4 id="ribbon">Availabe products</h4>
      </div>

      { renderItems() }        
    </div>
    </div>
  );
    
}

export default Home;
