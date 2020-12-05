import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FETCH_USERS } from '../actionTypes/users';
import '../assets/css/signUp.css';
import Spinner from './Spinner';

function Sign(params) {

    const dispatch = useDispatch();

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState('');
    const [isBuyer, setIsBuyer] = useState(false);
    const [loading, setloading] = useState(false);

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

    const createAccount = (e) => {
        e.preventDefault();
        console.log({ name, email, password, phone, address, isBuyer });

        const admin = false;
        setloading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password,phone,address,isBuyer,admin})
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setloading(false);
            if(data.error) {
                setError(error);
            }
            else {
                fetchUsers();
                console.log(data);
                history.push('/login');
            }
        })
        .catch((err) => {
            setloading(false);
            console.log(err);
        })
    }

    return(
        <>
         {
             loading?
             <Spinner/>:
             (
                <div>
                    <div id="main" style={{clear: "both"}}>
                        <div className="content1 float1 center">
                            <h1>Sign-Up</h1>
                            <div>
                                Create new Account
                            </div>
                        </div>  
                        <div className="frm float1">

                            <form method="post">
                                <div className="from-group">
                                    <label htmlFor="fname">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Name" 
                                        name="fname" 
                                        id="fname"
                                        value={name}
                                        onChange={ (e) => { setName(e.target.value) }}
                                        className="form-control" 
                                    />
                                </div>
                                
                                <div className="from-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" 
                                        name="username" 
                                        placeholder="Email" 
                                        id="email" 
                                        value={email}
                                        onChange={ (e) => { setEmail(e.target.value) }}
                                        className="form-control"
                                    />
                                </div>
                                <div className="from-group">
                                    <label htmlFor="add">Address</label>
                                    <input 
                                        type="text" 
                                        name="address" 
                                        placeholder="Address" 
                                        id="rounded-border" 
                                        id="add" 
                                        value={ address }
                                        onChange={ (e) => { setAddress(e.target.value) }}
                                        className="form-control"
                                    />
                                </div>


                                <div className="from-group">
                                    <label htmlFor="contact">Contact Number</label>
                                    <input 
                                        type="text" 
                                        name="contact" 
                                        placeholder="Contact Number" 
                                        id="rounded-border" 
                                        id="contact" 
                                        value={ phone }
                                        onChange={ (e) => { setPhone(e.target.value) }}
                                        className="form-control" 
                                        />
                                </div>
                            
                                <div className="from-group">
                                    <label htmlFor="">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Password"
                                        value={ password }
                                        onChange={ (e) => { setPassword(e.target.value) }}
                                        className="form-control" />
                                </div>

                                <div className="form-group mt-2">
                                    <label>
                                        <input 
                                            type="radio"
                                            name="role"
                                            onClick={ () => { setIsBuyer(true) }}

                                        />
                                        Buyer
                                    </label>
                                    <label style={{ marginLeft: '10px' }}>
                                        <input 
                                            type="radio"
                                            onClick={ () => { setIsBuyer(false) }}
                                            name="role"
                                        />
                                        Seller
                                    </label>
                                </div>


                                <div className="form-group" style={{ color: 'red' }}>
                                    { error }
                                </div>

                                
                            
                                <button 
                                    className="btn" 
                                    type="submit"
                                    onClick={ (e) => { createAccount(e) } }>
                                        Create Account
                                </button>
                            </form>
                        </div>
                        <div style={{clear: "both"}}></div>
                    </div>
                </div>
             )
         }
        </>
        

    )
}

export default Sign;