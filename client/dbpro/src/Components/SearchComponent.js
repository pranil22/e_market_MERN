import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from './Spinner';

function SearchComponent() {
    const history = useHistory();
    const { products, loading, error } = useSelector(state => state.search);

    

    return (
        <div style={{ maxWidth: '400px', margin: "20px auto" }}>
            {
                !products[0]?
                <Spinner/>:
                products.map((product) => {
                    return (
                        <div className="row" 
                            style={{ 
                            border: "1px solid #52702b",
                            backgroundColor: '#e0f8cc',
                            padding: '5px',
                            borderRadius: '5px',
                            marginTop: '5px',
                            cursor: 'pointer'
                         }}
                            key={ product._id }
                            onClick={ () => { history.push('/product/'+ product._id) } }

                         >
                            
                            <div className="col-4">
                                <img 
                                    src={ product.productImage } 
                                    alt=""
                                    style={{ maxHeight: "80px" }}
                                />
                            </div>
                            <div className="col-8">
                                <div><b>{ product.name }</b></div>
                                <div>&#x20B9;{ product.price }</div>
                                <div>{ product.description }</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchComponent
