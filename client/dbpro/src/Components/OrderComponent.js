import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

function OrderComponent() {
    const { products } = useSelector(state => state.products);
    const { users } = useSelector(state => state.users);

    const [orders, setOrders] = useState([]);
    const productById = (id) => {
        if(products[0]) {
            return products.filter((p) => p._id === id)[0];
        }
    }

    const userById = (id) => {
        if(users[0]) {
            return users.filter((u) => u._id === id )[0];
        }
    }


    useEffect(() => {
        fetch('/orders', {
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
            setOrders(data);
        })
        .catch((err) => {
            console.log(err); 
        })
    }, [])

    return (
        <div style={{
            padding: '20px'
        }}>
            <h3>Orders</h3>
            {
                !orders[0]?
                <Spinner/>:
                (
                    orders.map((o) => {
                        return (
                            <div key={ o._id }
                                style={{
                                    display: 'flex',
                                    backgroundColor: '#e1e1e1',
                                    marginTop: '5px',
                                    borderRadius: '5px'
                                }}
                            >
                                <div>
                                    <img 
                                        src={ productById(o.product).productImage } alt=""
                                        style={{
                                            height: '100px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <div>
                                        <b>{ productById(o.product).name }</b> 
                                    </div>
                                    <div>
                                        <b>Buyer: </b>{ userById(o.buyer).name }
                                    </div>
                                    <div>
                                        <b>Address: </b>{ userById(o.buyer).address }
                                    </div>
                                    <div>
                                        <b>Seller: </b>{ userById(o.seller).name }
                                    </div>
                                </div>
                                                
                            </div>
                        )
                    })
                )
            }
            
        </div>
    )
}

export default OrderComponent
