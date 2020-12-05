import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { ADD_TO_CART } from '../actionTypes/cart';
import Spinner from './Spinner';

function Product() {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const history = useHistory();
    const { id } = useParams();

    const { products, loading ,error} = useSelector(state => state.products);

    const [product, setProduct] = useState(null);

    console.log(id);


    useEffect(() => {
        getProductById(id);
    }, [])


    const addToCart = (product) => {
        console.log(product);
        history.push('/cart/' + id + '?qty=' + qty);        

    } 

    const getProductById = (id) => {
        if(products[0]) {
            let requiredProduct = products.filter(product => product._id === id);
            setProduct(requiredProduct[0]);
        }

    }

    const renderCorrect = () => {

        console.log(product);

        if(product) {
            return (
                <div className="row mt-4 p-3">
                    <div className="col-lg-4 col-sm-4 col-12">
                        <img 
                            src={product.productImage}
                            style={{ maxWidth: "100%" }}
                        />    
                    </div>        
                    <div className="col-lg-4 col-12" style={{ padding: '20px' }}>
                        <div className="mt-1"><h4>{ product.name }</h4></div>
                        <div className="mt-1">Price: <b>&#x20B9;{ product.price }</b></div>
                        <div className="mt-1">{ product.description }</div>
                    </div>        
                    <div className="col-lg-4 col-12">
                        <div style={{ 
                                padding: '20px', 
                                borderRadius: '5px', 
                                backgroundColor: '#e0f8cc', 
                                border: '1px solid #52702b'
                            }}>
                            <div className="mt-1">Price: <b>&#x20B9;{ product.price }</b></div>
                            <div className="mt-1">Status: { product.quantity===0?'Out of Stock':'In Stock' }</div>
                            <div className="mt-1">
                                Qty: 
                                <select value={qty} onChange={ (e) => { setQty(e.target.value) } }>
                                    {
                                        [...Array(product.quantity).keys()].map((key) => {
                                            return <option key={key+1} value={key+1}>{key+1}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <button style={{ 
                                width: "100%", 
                                marginTop: '5px'
                            }}
                                className="btn"
                                onClick={ () => { addToCart(product) } }
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>        
                </div>
            );
        }
        else if(loading) {
            return <Spinner/>
        }
        else if(error){
            return <div></div>
        }
        else {
            return <div>Something went wrong</div>
        }

    }

    return (
        <>
            { renderCorrect() }
        </>        
    )
}

export default Product
