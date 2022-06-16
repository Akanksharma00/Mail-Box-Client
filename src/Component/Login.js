import React,{useRef} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

import '../Style/Login.css';

import Card from "./Card";
import {authActions} from '../store/authReducer';
 
const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const enteredEmailRef = useRef();
    const enteredPasswordRef = useRef();

    const loginHandler = (event) => {
        event.preventDefault();

        const email = enteredEmailRef.current.value;
        const password = enteredPasswordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxxHi43AbZTL3L75B4VxemFyAR4fXeErA',{
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                console.log('User logged in!');
                res.json().then((data)=>{
                    const token = data.idToken;
                    localStorage.setItem('token',token);
                    localStorage.setItem('email',email);
                    dispatch(authActions.login(token));
                    navigate('/inbox');
                })

            }else{
                res.json().then((data)=>{
                    const errMsg = data.error.message;
                    alert(errMsg);
                })
            }
        })
    }

    return(
        <div className="login">
            <Card>
                <h1 className="heading">Login</h1>
                <form onSubmit={loginHandler}>
                    <div className='input-div'>
                        <input 
                            type='email'
                            id='email'
                            className='input'
                            ref={enteredEmailRef}
                            autoComplete='off'
                            required
                        />
                        <label htmlFor="email" className='label'>Email</label>
                    </div>
                    <div className='input-div'>
                        <input 
                            type='password'
                            id='password'
                            className='input'
                            ref={enteredPasswordRef}
                            autoComplete='off'
                            required
                        />
                        <label htmlFor="password" className='label'>Password</label>
                    </div>
                    <button className='button'>Login</button>
                    {/* <p >Forgot Password</p> */}
                </form>
            </Card>
            <Card>
                <p>
                    Don't have an account? 
                    <Link to='/signup'>Signup</Link>
                </p>
            </Card>
        </div>
    )
};

export default Login;
