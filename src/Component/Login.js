import React,{useRef} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

import style from './SignUp.module.css';

import Card from "../Layout/Card";
import {authActions} from '../store/authReducer';
 
const Login = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
                    history.replace('/home');
                    const token = data.idToken;
                    localStorage.setItem('token',token);
                    dispatch(authActions.login(token));
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
        <React.Fragment>
            <Card>
                <h1>Login</h1>
                <form onSubmit={loginHandler}>
                    <div>
                        <label htmlFor="email" className={style.label}>Email:</label>
                        <input 
                            type='email'
                            id='email'
                            className={style.input}
                            ref={enteredEmailRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={style.label}>Password:</label>
                        <input 
                            type='password'
                            id='password'
                            className={style.input}
                            ref={enteredPasswordRef}
                        />
                    </div>
                    <button>Login</button>
                    <p><a href='#'>Forgot Password</a></p>
                </form>
            </Card>
            <Card>
                <p>
                    Don't have an account?
                    <a href='/SignUp'>Sign Up</a>
                </p>
            </Card>
        </React.Fragment>
    )
};

export default Login;
