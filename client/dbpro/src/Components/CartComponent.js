import React, { useEffect, useState } from 'react';
import '../assets/css/cart.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes/cart';
import store from '../store';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Spinner from './Spinner';

function Cart(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const qty = props.location.search ? Number((props.location.search).split('=')[1]) : 1;
    const { cartItems } = useSelector(state => state.cart);
    const history = useHistory();

    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setloading] = useState(false);

    const addToCart = (id, qty) => {
      if(id) {
        fetch('/products/' + id, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if(data.error) {
            console.log(data.error);
          }
          else {
            const { _id ,name, description, productImage, seller,quantity, price } = data.product;

            dispatch({
              type: ADD_TO_CART,
              payload: {
                _id, name, description, productImage, seller, price, quantity, selectedQty: qty
              }
            });

            const { cart: {cartItems }} = store.getState();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            
            updateDetails();
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }


    const handlePlaceOrder = () => {
      setloading(true);
      fetch('/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "bearer " +  localStorage.getItem("token") 
        },
        body: JSON.stringify({
          items: JSON.parse(localStorage.getItem('cartItems')),
          price: totalPrice
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return axios.get('/receipt', { responseType: 'blob' })
      })
      .then((data) => {
        const pdfBlob = new Blob([data.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'receipt.pdf');
        setloading(false);
        history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
    }

    const updateDetails = () => {
      console.log("UpdateDeatails");
      let price = 0;
      let items = 0;

      let cI = JSON.parse(localStorage.getItem('cartItems')) || [];

      if(cI[0]) {
        cI.forEach((product) => {
          items = items + product.selectedQty;
          console.log("qty" + product.selectedQty);
          price = price + product.selectedQty * product.price;
          console.log()
        });
      }

      setTotalItems(items);
      setTotalPrice(price);
      console.log("price", price);
      console.log('items', items);

    }

    useEffect(() => {
      addToCart(id, qty);
      updateDetails();
    }, [])


    const removeFromCart = (id) => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: id
      });

      
      const { cart: {cartItems }} = store.getState();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      updateDetails();
    }

    return(

        <div>
          {
            loading?
            <Spinner/>:
            (
              <div className="container">
                <h3 id="green-color">Shopping Cart</h3>
                
                <div className="row" style={{margin:"5px"}}>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-12 mt-1 ">
                    {
                        cartItems.length === 0? <h5>Cart is empty</h5>:
                        (
                          <>
                            {
                              cartItems.map((product) => {
                                return (
                                  <div className="row" key={product._id}>
                                    <div className="col-4">
                                      <img src={ product.productImage } alt={product.name} 
                                      style={{ maxWidth: "100%", height: "170px", padding: '4px' }}/>
                                    </div>
                                    <div className="col-8 mt-1 p-2" id="item">
                                        <strong>{ product.name }</strong><br/>
                                        { product.quantity == 0?'Out of Stock':'In Stock' }<br/>
                                        <em>Quantity: { product.selectedQty }</em>
                                        <br/>
                                        <select 
                                          value={product.selectedQty} 
                                          onChange={ (e) => { 
                                            addToCart(product._id, +e.target.value) 
                                          }}>
                                          {
                                            [ ...Array(product.quantity).keys() ].map((key) => {
                                              return <option key={key + 1} value={key + 1}>{ key + 1}</option>
                                            })
                                          }
                                        </select>
                                        <button 
                                          className="btn delete"
                                          onClick={() => { 
                                              removeFromCart(product._id) 
                                            }}
                                          style={{ marginLeft: '5px' }}
                                        >
                                          Delete
                                        </button>
                                        <strong><p>&#x20B9;{ product.price }</p></strong>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </>
                        )
                      }

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 mt-1 ml-4 p-0" style={{height: "12em"}} id="summary">
                        <h4 className="p-2" style={{backgroundColor: "#82b440", color: "white"}}>Summary</h4>
                        <div className="p-2">
                          <h6>Subtotal(Items): { totalItems }</h6>
                          <div style={{ fontWeight: '100' }}>Buy added items</div>
                          <strong>Grand Total: &#x20B9;{ totalPrice }</strong>
                          <button 
                            className="btn btn-block"
                            onClick={ ()=> { handlePlaceOrder() }}
                            disabled={ totalPrice===0?true:false }
                            >
                            Place order
                          </button>
                        </div>
                  </div>
                </div>
            </div>
            )
          }
             
        </div>
    )
}

export default Cart;