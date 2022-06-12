import React,{useRef} from "react";

import Card from "../Layout/Card";

import style from './SignUp.module.css';

const SignUp = (props) => {
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
        <React.Fragment>
        <Card>
            <h1>Sign Up</h1>
            <form onSubmit={signUpHandler}>
                <div>
                    <label htmlFor='email' className={style.label}>Email:</label>
                    <input 
                        className={style.input}     
                        type='email' 
                        id='email' 
                        required={true}
                        ref={enteredEmailRef}
                    />
                </div>
                <div>
                    <label htmlFor='password' className={style.label}>Password:</label>
                    <input 
                        className={style.input} 
                        type='password' 
                        id='password'  
                        required={true}
                        ref={enteredPasswordRef}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword' className={style.label}>Confirm Password</label>
                    <input 
                        className={style.input} 
                        type='password' 
                        id='confirmPassword'  
                        required={true}
                        ref={enteredConfirmPasswordRef}
                    />
                </div>
                <button>Sign up</button>
            </form>
        </Card>
        <Card>
            <p>Have an account? <a href='/login'>Login</a></p>
        </Card>
        </React.Fragment>
    )    
};

export default SignUp;