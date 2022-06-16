import React,{useRef} from "react";
import { useNavigate,Link } from "react-router-dom";

import Card from "./Card";

import '../Style/Login.css';

const SignUp = (props) => {
    const navigate = useNavigate();
    const enteredEmailRef = useRef();
    const enteredPasswordRef = useRef();
    const enteredConfirmPasswordRef = useRef();

    const signUpHandler = (event) => {
        event.preventDefault();
        const email = enteredEmailRef.current.value;
        const password = enteredPasswordRef.current.value;
        const confirmPassword = enteredConfirmPasswordRef.current.value;

        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        console.log(data);
         
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxxHi43AbZTL3L75B4VxemFyAR4fXeErA',{
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
                console.log('User successfully submitted');
                navigate('/login');
                return res.json();
            }else{
                res.json().then((data)=>{
                    const errorMsg = data.error.message;
                    alert(errorMsg);
                })
            }
        });
    }

    return (
        <div className='login'>
        <Card>
            <h1 className='heading'>Sign Up</h1>
            <form onSubmit={signUpHandler}>
                <div className='input-div'>
                    <input 
                        className='input'    
                        type='email' 
                        id='email' 
                        required={true}
                        ref={enteredEmailRef}
                    />
                    <label htmlFor='email' className='label'>Email</label>
                </div>
                <div className='input-div'>
                    <input 
                        className='input' 
                        type='password' 
                        id='password'  
                        required={true}
                        ref={enteredPasswordRef}
                    />
                    <label htmlFor='password' className='label'>Password</label>
                </div>
                <div className='input-div'>  
                    <input 
                        className='input'
                        type='password' 
                        id='confirmPassword'  
                        required={true}
                        ref={enteredConfirmPasswordRef}
                    />
                    <label htmlFor='confirmPassword' className='label'>Confirm Password</label>
                </div>
                <button className='button'>Sign up</button>
            </form>
        </Card>
        <Card>
            <p>Have an account? 
                <Link to='/login'>Login</Link></p>
        </Card>
        </div>
    )    
};

export default SignUp;