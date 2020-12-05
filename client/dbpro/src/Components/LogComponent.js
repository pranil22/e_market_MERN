import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { USER_LOGIN } from '../actionTypes/user';

import '../assets/css/login.css';
import Spinner from './Spinner';


function Login(params) {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const [loading, setloading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        setloading(true);
        fetch('/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => {
            
            return res.json();
        })
        .then((data) => {
            setloading(false);
            if(data.error) {
                setError(data.error);
            }
            else {
                console.log(data);
                localStorage.setItem("token", data.token);
                dispatch({
                    type: USER_LOGIN,
                    payload: data.user
                })
                localStorage.setItem("user", JSON.stringify(data.user));
                history.push("/");
            }
        })
        .catch((err) => {
            setloading(false);
            console.log(err);
        });
    }

    return(
        <>
            {
                loading?
                <Spinner/>:
                (
                    <div >
                        <div id="bg-image">
                        </div>
                        <div id="main" style={{clear: "both"}}>
                        <div className="content1 float1 center">
                            <h1>Sign-in</h1>
                            <div>
                                Login for best experience
                            </div>
                        </div>  
                        <div className="frm float1" style={{ marginTop: '100px' }}>
                            <form>
                                <div className="from-group">
                                    <label htmlFor="uname">Username</label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        placeholder="Email" 
                                        id="uname" 
                                        className="form-control"
                                        value = {email}
                                        onChange={ (e) => { setEmail(e.target.value)  } }
                                    />
                                </div>             
                                <div className="from-group">
                                    <label htmlFor="">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Password" 
                                        className="form-control"
                                        value={password}
                                        onChange={ (e) => { setPassword(e.target.value) } }
                                    />
                                </div>
                                <div className="form-group" style={{ color: 'red' }}>
                                    {  error }
                                </div>
                                <button 
                                    className="btn" 
                                    type="submit"
                                    onClick={ (e) => { handleSubmit(e) }}>
                                        Login
                                </button>
                                <div>
                                    <a href="#">Forgot Password</a>
                                </div>
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

export default Login;